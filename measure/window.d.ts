import { FontSizes, FontFamilies, FontFamily } from 'config'

export {}
export type RunPayload = {
  fontFamilies: FontFamilies
  fontSizes: FontSizes
}
export type SavePayload = {
  charCode: number
  char: string
  width: number
  font: FontFamily
  fontSize: number
}
declare global {
  interface Window {
    run: (payload: RunPayload) => void
    save: (payload: SavePayload) => void
    done: () => void
  }
}
