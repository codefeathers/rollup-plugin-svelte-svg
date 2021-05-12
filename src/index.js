import { extname } from "path";
import { platform } from "os";

import { createFilter } from "rollup-pluginutils";
import Svelte from "svelte/compiler";

// Possible values are 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
// https://nodejs.org/api/os.html#os_os_platform
const isWindows = platform() === "win32";

const head = xs => xs[0];
const tail = xs => xs[xs.length - 1];

const validJS = /[a-zA-Z_$][0-9a-zA-Z_$]*/;

const toJSClass = text =>
	head(tail(text.split(isWindows ? "\\" : "/")).split("."))
		.split("-")
		// Uppercase first character of every segment after splitting out hyphens
		.map(segment => (segment ? segment[0].toUpperCase() + segment.slice(1) : segment))
		.join("")
		// split into characters
		.split("")
		// drop potentially unsafe characters
		.map(x => (validJS.test(x) ? x : ""))
		.join("");

export function svelteSVG(options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "svg",

		transform(source, id) {
			if (!filter(id) || extname(id) !== ".svg") {
				return null;
			}
			source = decodeURIComponent(source);
			const svgRegex = new RegExp(/(<svg.*?)(>.*)/, "s");
			const parts = svgRegex.exec(source);
			if (!parts) {
				throw new Error(
					"svg file did not start with <svg> tag. Unable to convert to Svelte component"
				);
			}
			const [, svgStart, svgBody] = parts;
			const content = `${svgStart} {...$$props}${svgBody}`;

			const {
				js: { code, map },
			} = Svelte.compile(content, {
				filename: id,
				name: toJSClass(id),
				format: "esm",
				generate: options.generate,
				hydratable: true,
				dev: options.dev,
			});

			return { code, map };
		},
	};
}
