import { extname } from "path";
import { createFilter } from "rollup-pluginutils";
import Svelte from "svelte/compiler";

const toSvelte = content => `
<script>
	export let width;
	export let height;
	export let viewBox;
	export let fill;
	export let stroke;
	export let strokeWidth;
	export let content;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	{width}
	{height}
	{viewBox}
	{fill}
	{stroke}
	{strokeWidth}
>
	{@html ${content}}
</svg>
`;

const head = xs => xs[0];
const tail = xs => xs[xs.length - 1];

export default function svg (options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "svg",

		transform (code, id) {
			if (!filter(id) || extname(id) !== ".svg") {
				return null;
			}

			const content = toSvelte(
				JSON.stringify(code.trim()));
			const { js: { code, map } } = Svelte.compile(content, {
				filename: id,
				name: head(tail(id.split("/")).split(".")),
				format: "esm",
			});

			return { code, map };
		}
	}
}
