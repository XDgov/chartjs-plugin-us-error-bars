import ContextMock from './ContextMock.js'

export default class {
  constructor (width, height) {
    this.mock = [];
    this.width = width;
    this.height = height;
    this.ctx = new ContextMock(this.mock);
  }
}