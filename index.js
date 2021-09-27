const { extname, dirname, resolve } = require("path");
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

exports.svelteSVG = function svelteSVG(options = {}) {
	const { svgo, enforce } = options;
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "rollup-plugin-svelte-svg",

		// vite-only
		// https://vitejs.dev/guide/api-plugin.html#plugin-ordering
		...(enforce && { enforce }),

		resolveId(source, importer) {
			if (!filter(source) || extname(source) !== ".svg") return null;

			return resolve(dirname(importer), source + ".svelte");
		},

		load(id) {
			if (!id.endsWith(".svg.svelte")) return null;

			return readFile(id.slice(0, -".svelte".length), "utf-8")
				.then(file => (svgo ? optimise(file, svgo).data : file))
				.then(file => file.replace(svgheader, "").trim())
				.then(addProps);
		},
	};
};
