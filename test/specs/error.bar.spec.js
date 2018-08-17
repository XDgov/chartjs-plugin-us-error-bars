import ErrorBar from '../../src/error.bar';
import CanvasMock from '../fixtures/CanvasMock';
import CanvasWithErrorBar from '../fixtures/CanvasWithErrorBar';

function expectedCanvas() {
  { 
    mock: [
      '[beginPath]',
      '[moveTo 100, 136]',
      '[lineTo 100, 126]',
      '[stroke]',
      '[beginPath]',
      '[moveTo 100, 116]',
      '[lineTo 100, 126]',
      '[stroke]',
      '[beginPath]',
      '[moveTo 96, 116]',
      '[lineTo 104, 116]',
      '[stroke]',
      '[beginPath]',
      '[moveTo 96, 136]',
      '[lineTo 104, 136]',
      '[stroke]' 
    ]
  }
}

describe('error.bar.js', function() {

  describe('draw', function() {
    it('should attempt to draw a single margin of error bar', function() {
      var chart = new CanvasMock(300, 300);
      var view = {x: 100, y: 126};
      var border = 0;
      var moe = 10;
      var expectedCanvas = new CanvasWithErrorBar();
      
      ErrorBar.draw(chart, view, border, moe);
      expect(chart.mock).toEqual(expectedCanvas.mock);
    });
  });
});