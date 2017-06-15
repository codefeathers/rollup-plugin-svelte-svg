# rollup-plugin-svg

Import SVG files

## Installation

```bash
yarn add rollup-plugin-svg --dev
```

## Usage

```js
// rollup.config.js
import svg from 'rollup-plugin-svg';

export default {
  entry: 'src/input.js',
  dest: 'dist/output.js',
  plugins: [
    svg()
  ]
};
```

You can use svgs in your bundle thusly:

```js
import logo from './desirable-objects.svg'
document.body.appendChild( logo )
```

SVGs are encoded using base64, which means they will be 33% larger than the size on disk. You should therefore only use this for small images where the convenience of having them available on startup (e.g. rendering immediately to a canvas without co-ordinating asynchronous loading of several images) outweighs the cost.

## Sources

This plugin was built (based on the rollup-plugin-image plugin) because it appears that the two existing suitable plugins:

[rollup-plugin-image](https://github.com/rollup/rollup-plugin-image)
[rollup-plugin-url](https://github.com/rollup/rollup-plugin-url)

don't seem to work any more. I wanted a simple solution to provide SVG images to [Vudash](http://www.vudash.com)

## License

MIT
