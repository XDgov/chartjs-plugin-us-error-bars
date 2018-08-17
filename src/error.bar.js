'use strict';

var ErrorBar = {
  draw: function(chart, view, border, value) {
    var barWidth = 4;
    var leftX = view.x - barWidth;
    var rightX = view.x + barWidth;
    var bottomY = view.y + value + border;
    var topY = view.y - value;

    ErrorBar.drawLine(chart, view.x, bottomY, view.x, view.y);
    ErrorBar.drawLine(chart, view.x, topY, view.x, view.y);
    ErrorBar.drawLine(chart, leftX, topY, rightX, topY);
    ErrorBar.drawLine(chart, leftX, bottomY, rightX, bottomY);
  },

  drawLine: function(chart, startX, startY, endX, endY) {
    chart.ctx.beginPath();
    chart.ctx.strokeStyle = '#000000';
    chart.ctx.moveTo(startX, startY);
    chart.ctx.lineTo(endX, endY);
    chart.ctx.stroke();
  }
};

export default ErrorBar;