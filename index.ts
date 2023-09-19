import { extname } from "node:path";
import { readFile } from "node:fs/promises";

import { optimize as optimise, Config as SVGOConfig } from "svgo";
import { createFilter } from "rollup-pluginutils";
import type { Plugin } from "./rollup";

const svgRegex = /(<svg.*?)(>)(.*)/s;
const svgheader = /^\<\?xml.+?\>/;

function recompose(source: string) {
	const parts = svgRegex.exec(source);
	if (!parts) throw new Error("Unable to parse as svg.");

	const [, svgStart, end, svgBody] = parts;
	return `${svgStart} role="img" {...$$props} ${end}<slot/>${svgBody}`;
}

const SVELTE_EXT = ".rollup-svg.svelte";
const SVG_SVELTE_EXT = ".svg" + SVELTE_EXT;

interface SvelteSVGOptions {
	include?: string | RegExp | Array<string | RegExp>;
	exclude?: string | RegExp | Array<string | RegExp>;
	svgo?: SVGOConfig;
	/**
	 * Only for Vite
	 *
	 * @see https://vitejs.dev/guide/api-plugin.html#plugin-ordering
	 * */
	enforce?: "pre" | "post";
}

export function svelteSVG(options: SvelteSVGOptions = {}): Plugin {
	const { svgo, enforce } = options;
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "rollup-plugin-svelte-svg",

		// vite-only
		...(enforce && { enforce }),

		async resolveId(source, importer, options) {
			if (!filter(source) || (extname(source) !== ".svg" && !source.endsWith(SVG_SVELTE_EXT)))
				return null;

			// vite is calling us  with ".rollup-svg.svelte"
			if (source.endsWith(SVG_SVELTE_EXT)) source = source.slice(0, -SVELTE_EXT.length);

			const resolved = await this.resolve(source, importer, { ...options, skipSelf: true });
			if (resolved?.id.endsWith(SVG_SVELTE_EXT)) return resolved.id;
			return resolved && resolved.id + SVELTE_EXT;
		},

		load(id) {
			if (!id.endsWith(SVG_SVELTE_EXT)) return null;

			return readFile(id.slice(0, -SVELTE_EXT.length), "utf-8")
				.then(file => (svgo ? optimise(file, svgo).data : file))
				.then(file => file.replace(svgheader, "").trim())
				.then(recompose);
		},
	};
}
