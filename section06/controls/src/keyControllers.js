export class KeyController {
  constructor() {
    // 생성자
    this.keys = []

    window.addEventListener('keydown', e => {
      console.log(e.code + ' 누름')
      this.keys[e.code] = true
    })
    window.addEventListener('keyup', e => {
      delete this.keys[e.code]
      console.log(e.code + ' 뗌')
    })
  }
}