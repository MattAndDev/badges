import { FontsMap } from '../../../config'

export const getWidth = (
  s: string,
  fontSize: number,
  fontId: string,
  fontMap: FontsMap
) => {
  return s.split('').reduce((acc, char, index) => {
    const utf = char.charCodeAt(0)
    // TODO: emojis have an extra space for an unknown encoding reason
    // find out why and fix properly
    if (utf >= 50000 && index % 2 === 0) return acc

    // @ts-ignore
    const width = fontMap[fontId][char.charCodeAt(0)][fontSize]

    return acc + width
  }, 0)
}
