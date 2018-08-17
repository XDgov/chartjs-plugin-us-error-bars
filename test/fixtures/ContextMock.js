export default class {
  constructor(mock) {
    this.mock = mock
  }

  beginPath() {
    this.mock.push('[beginPath]')
  }

  moveTo(x, y) {
    this.mock.push('[moveTo ' + x + ', ' + y + ']')
  }

  lineTo(x, y) {
    this.mock.push('[lineTo ' + x + ', ' + y + ']')
  }

  stroke() {
    this.mock.push('[stroke]')
  }
}