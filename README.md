# rollup-plugin-svelte-svg

Import SVG files as Svelte Components

## Installation

```bash
npm i -D rollup-plugin-svelte-svg
```

## Usage

### Svelte
```js
// rollup.config.js
import svelteSVG from "rollup-plugin-svelte-svg";

export default {
	entry: "src/input.js",
	dest: "dist/output.js",
	plugins: [
		svelteSVG(),
    ],
    ...
}
```

### Sapper
```js
// rollup.config.js
import svelteSVG from "rollup-plugin-svelte-svg";

export default {
    client: {
        plugins: [
            svelteSVG({ dev }),            
        ],
        ...
    },
    server: {
        plugins: [
            svelteSVG({ generate: "ssr", dev }),
        ],
        ...
    }
}
```

You can then use svgs in your bundle thusly:

```html
<script>
	import Logo from "./logo.svg";
</script>

<Logo width="20" />
```

## Sources

This plugin was forked from [@antony/rollup-plugin-svg](https://github.com/antony/rollup-plugin-svg) to import SVGs as Svelte components.

## License

MIT
