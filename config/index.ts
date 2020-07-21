export type FontSizes = [20]
export const fontSizes: FontSizes = [20]

export type FontFamily = {
  name: string
  type: 'system' | 'google'
  weight: number
}

export type FontFamilies = FontFamily[]

export const fontFamilies: FontFamilies = [
  {
    name: 'Arial',
    type: 'system',
    weight: 400,
  },
  {
    name: 'Arial',
    type: 'system',
    weight: 800,
  },
  {
    name: 'Red Rose',
    type: 'google',
    weight: 400,
  },
  {
    name: 'Roboto',
    type: 'google',
    weight: 400,
  },
  {
    name: 'Roboto',
    type: 'google',
    weight: 800,
  },
]

export type FontsMap = {
  [fontFamily: string]: {
    [char: string]: {
      [fontSize: string]: number
    }
  }
}

export const getFontId = (font: FontFamily) => {
  return `${encodeFontName(font.name)}_${font.weight}`
}

export const encodeFontName = (s: string) => {
  return s.replace(/ /g, '+')
}

export const decodeFontName = (s: string) => {
  return s.replace(/\+/g, ' ')
}
