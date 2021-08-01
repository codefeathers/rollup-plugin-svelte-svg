# rollup-plugin-svelte-svg

Import SVG files as Svelte Components

## Installation

```bash
npm i -D rollup-plugin-svelte-svg

yarn add -D rollup-plugin-svelte-svg

pnpm i -D rollup-plugin-svelte-svg
```

## Usage

Simply call `svelteSVG` before `svelte` in your rollup config.

### Svelte
```js
// rollup.config.js
import { svelteSVG } from "rollup-plugin-svelte-svg";

export default {
    entry: "src/input.js",
    dest: "dist/output.js",
    plugins: [
        svelteSVG({
            // optional SVGO options
            // pass empty object to enable defaults
            svgo: {}
        }),
    ],
    ...
}
```

### Sapper
```js
// rollup.config.js
import { svelteSVG } from "rollup-plugin-svelte-svg";

export default {
    client: {
        plugins: [
            svelteSVG({ dev }),            
        ],
        ...
    },
    server: {
        plugins: [
            svelteSVG({
                // optional SVGO options
                // pass empty object to enable defaults
                svgo: {}
            }),
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

<Logo width=20 />
```

## Credits

This plugin was originally forked from [@antony/rollup-plugin-svg](https://github.com/antony/rollup-plugin-svg), but has been rewritten since.

@featherbear's deleted fork and [metafy-gg's fork](https://github.com/metafy-gg/vite-plugin-svelte-svg) fork inspired svgo optimisation and vite support.

## License

MIT
