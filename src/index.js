import { extname } from 'path'
import { createFilter } from 'rollup-pluginutils'

function toDataUrl (code) {
  const mime = 'image/svg+xml'
  const buffer = Buffer.from(code, 'utf-8')
  const encoded = buffer.toString('base64')
  return `'data:${mime};base64,${encoded}'`
}

export default function svg (options = {}) {
  const filter = createFilter(options.include, options.exclude)

  return {
    name: 'svg',

    transform (code, id) {
      if (!filter(id) || extname(id) !== '.svg') {
        return null
      }

      const content = code.trim()
      const encoded = options.base64 ? toDataUrl(content) : JSON.stringify(content)

      return { code: `export default ${encoded}`, map: { mappings: '' } }
    }
  }
}
