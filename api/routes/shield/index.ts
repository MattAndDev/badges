import { FastifyInstance, FastifyLoggerInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { template } from './template'
import { getWidth } from './get-width'
import {
  FontsMap,
  fontFamilies,
  getFontId,
  decodeFontName,
} from '../../../config'

type Query = {
  leftText?: string
  rightText?: string
  paddingHor?: string
  paddingVer?: string
  borderRadius?: string
  leftBgColor?: string
  rightBgColor?: string
  leftTextColor?: string
  rightTextColor?: string
  fontFamily?: string
  fontWeight?: string
}

const DEFAULT_VALUES: Required<Query> = {
  leftText: 'THE',
  rightText: 'SHIELD',
  paddingHor: '12',
  paddingVer: '8',
  borderRadius: '3',
  leftBgColor: '#18298C',
  rightBgColor: '#04BF8A',
  leftTextColor: '#FFF',
  rightTextColor: '#FFF',
  fontFamily: 'Roboto',
  fontWeight: '400',
}

export const shield = (
  app: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  >,
  fonts: FontsMap
) => {
  app.all<{
    Querystring: Query
  }>('/shield.svg', async (request, reply) => {
    const {
      leftText,
      rightText,
      paddingHor,
      paddingVer,
      fontFamily,
      fontWeight,
      ...rest
    } = { ...DEFAULT_VALUES, ...request.query }
    const padIntHor = parseInt(paddingHor, 10)
    const padIntVer = parseInt(paddingVer, 10)
    const fontSize = 20
    const font = fontFamilies.find(
      ({ name, weight }) =>
        name === decodeFontName(fontFamily) &&
        weight === parseInt(fontWeight, 10)
    )!
    if (!font) {
      reply.code(400)
      reply.send(`Font family '${decodeFontName(fontFamily)}' with weight '${fontWeight}' is not supported`)
    }
    console.log(rest, request.query)
    const fontId = getFontId(font)
    const leftTextWidth = getWidth(leftText, fontSize, fontId, fonts)
    const rightTextWidth = getWidth(rightText, fontSize, fontId, fonts)

    const totalWidth = leftTextWidth + rightTextWidth + padIntHor * 4
    const totalHeight = fontSize * 1.4 + padIntVer * 2
    reply.header('Content-type', 'image/svg+xml')
    reply.header('Cache-Control', 'no-cache')
    const svg = template({
      totalHeight,
      totalWidth,
      font,
      fontSize,
      leftText,
      leftTextWidth,
      rightText,
      rightTextWidth,
      padHor: padIntHor,
      padVer: padIntVer,
      ...rest,
    })
    reply.send(svg)
  })
}
