# rollup-plugin-svg

Import SVG files as base64, or as Markup

[![CircleCI](https://circleci.com/gh/antony/github-backup.svg?style=shield)](https://circleci.com/gh/antony/rollup-plugin-svg) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```bash
npm i -D rollup-plugin-svg
```

## Usage

```js
// rollup.config.js
import svg from 'rollup-plugin-svg'

export default {
  entry: 'src/input.js',
  dest: 'dist/output.js',
  plugins: [
    svg()
  ]
}
```

You can then use svgs in your bundle thusly:

```js
import logo from './desirable-objects.svg'

// Without base64:
document.body.appendChild( logo )

// With base64:
<img src="{logo}" alt="Whatever" />
```

## Options:

### base64

Defaults to false.

Bas64 encoded SVGs will be 33% larger than the size on disk. You should therefore only use this for small images where the convenience of having them available on startup (e.g. rendering immediately to a canvas without co-ordinating asynchronous loading of several images) outweighs the cost.

## Sources

This plugin was built (based on the rollup-plugin-image plugin) because it appears that the two existing suitable plugins:

[rollup-plugin-image](https://github.com/rollup/rollup-plugin-image)
[rollup-plugin-url](https://github.com/rollup/rollup-plugin-url)

don't seem to work any more. I wanted a simple solution to provide SVG images to [Vudash](http://www.vudash.com)

## License

MIT
