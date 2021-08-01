# rollup-plugin-svelte-svg

Import SVG files as Svelte Components

> Note: `rollup-plugin-svelte-svg` was rewritten from scratch recently, and no longer exposes Svelte options `({ dev, generate })` since we now delegate compilation to the Svelte plugin that's loaded after us. You should remove these options since they have no effect.
>
> This is a nonbreaking change for most users, however if you do face a problem, raise an issue.

## Contents
- [Installation](#installation)
- [Usage](#usage)
    - [Svelte](#svelte)
    - [Sapper](#sapper)
    - [Vite](#vite)
- [Credits](#credits)
- [License](#license)

## Installation

```bash
# using npm
npm i -D rollup-plugin-svelte-svg

# using yarn
yarn add -D rollup-plugin-svelte-svg

# using pnpm
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
            svelteSVG({
                // optional SVGO options
                // pass empty object to enable defaults
                svgo: {},
            }),
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
    },
}
```

### Vite

```js
// vite.config.js
import { defineConfig } from "vite"; 
import { svelteSVG } from "rollup-plugin-svelte-svg";

export default defineConfig({
    ...
    plugins: [
        svelteSVG({
            // optional SVGO options
            // pass empty object to enable defaults
            svgo: {},
            // vite-specific
            // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
            // enforce: 'pre' | 'post'
            enforce: "pre",
        }),
        ...
    ],
});
```

You can then import svg in your JS thusly:

```html
<script>
	import Logo from "./logo.svg";
</script>

<Logo width=20 />
```

## Credits

* This plugin was originally forked from [antony/rollup-plugin-svg](https://github.com/antony/rollup-plugin-svg), but has been rewritten since.

* [@featherbear's fork](https://github.com/featherbear/rollup-plugin-svelte-svg) and [metafy-gg's fork](https://github.com/metafy-gg/vite-plugin-svelte-svg) inspired svgo optimisation and vite support.

## License

MIT
