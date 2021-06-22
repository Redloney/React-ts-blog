// 表情转为字符
export const utf16toEntities = (str: string): string => {
  const patt: RegExp = /[\ud800-\udbff][\udc00-\udfff]/g
  str = str.replace(patt, (char: string) => {
    let H: number, L: number, code: string | number
    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00 // 转换算法
      return '&#' + code + ';'
    } else {
      return char
    }
  })
  return str
}

// 字符转为表情
export const uncodeUtf16 = (str: string): string => {
  // eslint-disable-next-line
  const reg: RegExp = /\&#.*?;/g
  var result = str.replace(reg, (char: any) => {
    let H: number, L: number, code: string | number
    if (char.length === 9) {
      code = parseInt(char.match(/[0-9]+/g))
      H = Math.floor((code - 0x10000) / 0x400) + 0xd800
      L = ((code - 0x10000) % 0x400) + 0xdc00
      return unescape('%u' + H.toString(16) + '%u' + L.toString(16))
    } else {
      return char
    }
  })
  return result
}
