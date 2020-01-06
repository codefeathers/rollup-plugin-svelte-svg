import { extname } from "path";
import { createFilter } from "rollup-pluginutils";

const toSvelte = svg = content => `
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
	{@html content}
</svg>
`;

export default function svg (options = {}) {
	const filter = createFilter(options.include, options.exclude);

	return {
		name: "svg",

		transform (code, id) {
			if (!filter(id) || extname(id) !== ".svg") {
				return null;
			}

			const content = JSON.stringify(code.trim());

			return { code: toSvelte(content) };
		}
	}
}
