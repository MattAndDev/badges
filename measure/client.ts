import { RunPayload } from './window'
export const run = async ({ fontFamilies, fontSizes }: RunPayload) => {
  const chars = []

  for (var i = 0; i < 5000; i++) {
    chars.push(String.fromCharCode(i))
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const target = document.getElementById('target')!

  // append all chars to page
  for (var i = 0; i < chars.length; i += 1) {
    const char = chars[i]
    const elem = document.createElement('span')!
    elem.className = 'char'
    elem.innerHTML = char
    target.appendChild(elem)
  }
  const paintedChars: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.char'
  )

  // for each font
  for (let y = 0; y < fontFamilies.length; y += 1) {
    const fontFamily = fontFamilies[y]

    // fot each size
    for (let z = 0; z < fontSizes.length; z += 1) {
      const fontSize = fontSizes[z]

      // style all elements
      for (let i = 0; i < paintedChars.length; i++) {
        const elem = paintedChars[i]
        elem.style.fontSize = `${fontSize}px`
        elem.style.fontWeight = `${fontFamily.weight}`
        elem.style.fontFamily = `${fontFamily.name}`
      }
      await sleep(1000)

      // pick all element precise sizes
      for (let i = 0; i < paintedChars.length; i++) {
        const elem = paintedChars[i]
        window.save({
          charCode: elem.innerHTML.charCodeAt(0),
          char: elem.innerHTML,
          width: elem.getBoundingClientRect().width,
          font: fontFamily,
          fontSize: fontSize,
        })
      }
    }
  }

  window.done()
}
