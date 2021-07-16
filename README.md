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
import { svelteSVG } from "rollup-plugin-svelte-svg";

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

## TypeScript

If you are importing svgs in TypeScript files, you are likely to encounter an error:

```ts
import PersonIcon from './assets/person.svg'
// (x) Cannot find module './assets/person.svg' or its corresponding type declarations. ts(2307)
```

The solution is to add a file named `svg.d.ts` in your source folder containing:

```ts
declare module '*.svg' {
  export default Svelte2TsxComponent
}
```

*Adapted from [Allenaz's answer on Stack Overflow](https://stackoverflow.com/a/59901802).*

## Sources

This plugin was forked from [@antony/rollup-plugin-svg](https://github.com/antony/rollup-plugin-svg) to import SVGs as Svelte components.

## License

MIT
