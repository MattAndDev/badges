import puppeteer from 'puppeteer'
import { cwd } from 'process'
import { run } from './client'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import {
  fontFamilies,
  fontSizes,
  encodeFontName,
  getFontId,
  FontsMap,
} from '../config'
import { SavePayload } from './window'
;(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  const data: FontsMap = {}

  await page.exposeFunction(
    'save',
    ({ charCode, font, width, fontSize }: SavePayload) => {
      const id = getFontId(font)

      if (!data[id]) {
        data[id] = {}
      }
      if (!data[id][charCode]) {
        data[id][charCode] = {}
      }
      if (!data[id][charCode][fontSize]) {
        data[id][charCode][fontSize] = width
      }
    }
  )

  await page.exposeFunction('done', async () => {
    const fonts = Object.entries(data)
    if (!existsSync(`${cwd()}/api/fonts`)) {
      await mkdirSync(`${cwd()}/api/fonts`)
    }
    for (let i = 0; i < fonts.length; i++) {
      const [id, raw] = fonts[i]
      await writeFileSync(`${cwd()}/api/fonts/${id}.json`, JSON.stringify(raw))
    }
    process.exit(0)
  })

  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))
  let loadFonts = ``
  for (let i = 0; i < fontFamilies.length; i++) {
    const font = fontFamilies[i]
    if (font.type === 'google') {
      loadFonts += `@import url('https://fonts.googleapis.com/css?family=${encodeFontName(
        font.name
      )}:${font.weight}');\n`
    }
  }
  const fs = `
  <style type="text/css">
      ${loadFonts}
  </style>
  `

  page.setContent(`<div id="target"></div>${fs}`)

  page.addScriptTag({
    content: `
    window.run = ${run}
  `,
  })
  await page.evaluate(
    (fontFamilies, fontSizes) => {
      window.run({ fontFamilies, fontSizes })
    },
    fontFamilies,
    fontSizes
  )
})()
