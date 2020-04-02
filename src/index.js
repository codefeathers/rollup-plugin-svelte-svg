import { extname } from "path";
import { platform } from "os";

import { createFilter } from "rollup-pluginutils";
import Svelte from "svelte/compiler";

// Possible values are 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'.
// https://nodejs.org/api/os.html#os_os_platform
const isWindows = platform() === "win32";

const toSvelte = (svgStart, svgBody) => `${svgStart} {...$$props}${svgBody}`;

const head = xs => xs[0];
const tail = xs => xs[xs.length - 1];

export default function svg(options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "svg",

		transform(source, id) {
			if (!filter(id) || extname(id) !== ".svg") {
				return null;
			}
			const svgRegex = new RegExp("(<svg.+?)(>.+)", "gs");
			const [, svgStart, svgBody] = svgRegex.exec(source);
			const content = toSvelte(svgStart, svgBody);
			const {
				js: { code, map },
			} = Svelte.compile(content, {
				filename: id,
				name: head(tail(id.split(isWindows ? "\\" : "/")).split(".")),
				format: "esm",
				generate: options.generate,
				hydratable: true,
				dev: options.dev,
			});

			return { code, map };
		}
	};
}
