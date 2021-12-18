const { extname } = require("path");
const { readFile } = require("fs").promises;

const { optimize: optimise } = require("svgo");
const { createFilter } = require("rollup-pluginutils");

const svgRegex = /(<svg.*?)(>.*)/s;
const svgheader = /^\<\?xml.+?\>/;

function addProps(source) {
	const parts = svgRegex.exec(source);
	if (!parts) throw new Error("Unable to parse as svg.");

	const [, svgStart, svgBody] = parts;
	return `${svgStart} {...$$props} ${svgBody}`;
}

const SVELTE_EXT = ".rollup-plugin.svelte";
const SVG_SVELTE_EXT = ".svg" + SVELTE_EXT;

exports.svelteSVG = function svelteSVG(options = {}) {
	const { svgo, enforce } = options;
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "rollup-plugin-svelte-svg",

		// vite-only
		// https://vitejs.dev/guide/api-plugin.html#plugin-ordering
		...(enforce && { enforce }),

		async resolveId(source, importer, options) {
			if (!filter(source) || (extname(source) !== ".svg" && !source.endsWith(SVG_SVELTE_EXT))) {
				// We don't handle anything other than .svg and .svg.rollup-plugin.svelte
				return null;
			}

			if (source.endsWith(SVG_SVELTE_EXT)) {
				// vite is calling us  with ".svg.rollup-plugin.svelte"
				source = source.slice(0, -SVELTE_EXT.length);
			}

			return (
				(
					await this.resolve(source, importer, {
						skipSelf: true,
						...options,
					})
				).id + SVELTE_EXT
			);
		},

		load(id) {
			if (!id.endsWith(SVG_SVELTE_EXT)) return null;

			return readFile(id.slice(0, -SVELTE_EXT.length), "utf-8")
				.then(file => (svgo ? optimise(file, svgo).data : file))
				.then(file => file.replace(svgheader, "").trim())
				.then(addProps);
		},
	};
};
