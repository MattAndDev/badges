import { FontsMap } from '../../../config'

export const getWidth = (
  s: string,
  fontSize: number,
  fontId: string,
  fontMap: FontsMap
) => {
  return s.split('').reduce((acc, char, index) => {
    const utf = char.charCodeAt(0)
    const utfFallback = '0'.charCodeAt(0)
    const width = fontMap[fontId][utf] ? fontMap[fontId][utf][fontSize] : fontMap[fontId][utfFallback][fontSize]

    return acc + width
  }, 0)
}
