import api from 'fastify'
import { shield } from './routes'
import { fontFamilies, FontsMap, getFontId } from './../config'
;(async function () {
  const app = api({
    logger: true,
  })
  const fonts: FontsMap = {}
  for (let index = 0; index < fontFamilies.length; index++) {
    const font = fontFamilies[index]
    const fontId = getFontId(font)
    const data = await import(`./fonts/${fontId}.json`).catch(() => {
      console.log(`Can't find font file for ${fontId}`)
    })
    fonts[fontId] = data
  }

  shield(app, fonts)

  // Run the server!
  app.listen(3333, '0.0.0.0', (err, address) => {
    if (err) throw err
    app.log.info(`server listening on ${address}`)
  })
})()
