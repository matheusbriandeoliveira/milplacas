import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'
import { legalPages } from '../src/pages/legal/content.js'

// Generate real HTML for direct access and indexing, using the same components.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

try {
  const template = await readFile(resolve('dist/index.html'), 'utf8')
  const { renderLegalPage } = await server.ssrLoadModule('/src/pages/legal/render.jsx')
  for (const page of legalPages) {
    const html = template
      .replace('<title>Milplacas</title>', `<title>${escapeHtml(page.title)} | Milplacas</title>\n    <meta name="description" content="${escapeHtml(page.description)}" />`)
      .replace('<div id="root"></div>', `<div id="root">${renderLegalPage(page)}</div>`)
    const directory = resolve('dist', page.path.slice(1))
    await mkdir(directory, { recursive: true })
    await writeFile(resolve(directory, 'index.html'), html)
    console.log(`Página legal gerada: ${page.path}`)
  }
} finally {
  await server.close()
}
