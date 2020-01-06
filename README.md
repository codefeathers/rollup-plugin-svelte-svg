# rollup-plugin-svelte-svg

Import SVG files as Svelte Components

## Installation

```bash
npm i -D rollup-plugin-svelte-svg
```

## Usage

```js
// rollup.config.js
import svelteSVG from "rollup-plugin-svelte-svg";

export default {
	entry: "src/input.js",
	dest: "dist/output.js",
	plugins: [
		svelteSVG(),
	],
}
```

You can then use svgs in your bundle thusly:

```html
<script>
	import logo from "./logo.svg";
</script>

<logo width="20" />
```

## Sources

This plugin was forked from [@antony/rollup-plugin-svg](https://github.com/antony/rollup-plugin-svg) to import SVGs as Svelte components.

## License

MIT
