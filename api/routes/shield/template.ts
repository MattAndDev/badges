import { FontFamily, encodeFontName } from '../../../config'

export type TemplateParams = {
  totalWidth: number
  totalHeight: number
  fontSize: number
  leftText: string
  leftTextColor: string
  leftTextWidth: number
  leftBgColor: string
  rightText: string
  rightTextColor: string
  rightTextWidth: number
  rightBgColor: string
  borderRadius: string
  padHor: number
  padVer: number
  font: FontFamily
}

export const template = ({
  totalWidth,
  totalHeight,
  fontSize,
  leftText,
  leftTextColor,
  leftTextWidth,
  leftBgColor,
  rightText,
  rightTextColor,
  rightTextWidth,
  rightBgColor,
  borderRadius,
  padHor,
  padVer,
  font,
}: TemplateParams) => {
  console.log(leftBgColor)
  console.log('aaa')
  return `
  <svg width="${totalWidth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <style>
      ${
        font.type === 'google'
          ? `@import url('https://fonts.googleapis.com/css?family=${encodeFontName(
              font.name
            )}:${font.weight}&amp;text=${leftText}${rightText}');`
          : ``
      }
      
      .leftText, .rightText {
        font-family: '${font.name}', sans-serif  ;
        font-size: ${fontSize}px;
        font-weight: ${font.weight};
      }
      .leftText {
        fill: ${leftTextColor};
      }
      .rightText {
        fill: ${rightTextColor};
      }
      .leftRect {
        fill: ${leftBgColor};
      }
      .rightRect {
        fill: ${rightBgColor};
      }
    </style>
    <defs>
        <clipPath id="round-corner">
            <rect 
              x="0"
              y="0" 
              width="${totalWidth}"
              height="${totalHeight}" 
              rx="${borderRadius}" 
              ry="${borderRadius}"
            />
        </clipPath>
    </defs>
    <rect 
      clip-path="url(#round-corner)" 
      y="0" 
      x="0" 
      height="${totalHeight}" 
      width="${leftTextWidth + padHor * 2}" 
      class="leftRect"
    >
    </rect>
    <text 
      y="${fontSize + padVer}"
      x="${padHor}"
      class="leftText"
    >
      ${leftText}
    </text>
    <rect 
      clip-path="url(#round-corner)" 
      y="0" 
      x="${leftTextWidth + padHor * 2}" 
      height="${totalHeight}" 
      width="${rightTextWidth + padHor * 2}" 
      class="rightRect"
    >
    </rect>
    <text 
      y="${fontSize + padVer}" 
      x="${leftTextWidth + padHor * 3}" 
      class="rightText"
    >
      ${rightText}
    </text>
  </svg>
`
}
