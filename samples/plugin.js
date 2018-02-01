// adapted from source: https://github.com/XDgov/data-design-standards/blob/lk-chart-js-errors/assets/js/charts/chartjs-plugin-usdvs.js

var errorBarsPlugin = {
  id: 'error-bars',

  afterDatasetDraw: function(chart, args) {
    var type = chart.config.type,
        moe = chart.config.config.plugins.errorBar.marginsOfError, // [100, 19, 3, 5, 2, 3] //13 // chart.config.config.moe),
        moeIsArray = Array.isArray(moe);

    if( type !== "bar" ){
      return false;
    }

    var elements = args.meta.data || [];
    var ilen = elements.length;
    var i, el, label;

    if (moeIsArray && ilen !== moe.length) {
      console.error("The length of the MOE array must match the length of the data array");
      return false;
    }

    for (i = 0; i < ilen; ++i) {
      var el = elements[i],
          view = el._view,
          border = view.borderWidth;

      if( moeIsArray ) {
        elMoe = moe[i];
      } else {
        elMoe = moe;
      }

      drawVerticalErrorBars(chart, view, border, elMoe);
    }
  }
};

function drawVerticalErrorBars(chart, view, border, value) {

  leftX = view.x - 4,
  rightX = view.x + 4,
  bottomY = view.y + value + border,
  topY = view.y - value;

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(view.x, bottomY);
  chart.ctx.lineTo(view.x, view.y);
  chart.ctx.stroke();

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(view.x, topY);
  chart.ctx.lineTo(view.x, view.y);
  chart.ctx.stroke();

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(leftX, topY);
  chart.ctx.lineTo(rightX, topY);
  chart.ctx.stroke();

  chart.ctx.beginPath();
  chart.ctx.strokeStyle = '#000000';
  chart.ctx.moveTo(leftX, bottomY);
  chart.ctx.lineTo(rightX, bottomY);
  chart.ctx.stroke();
}
