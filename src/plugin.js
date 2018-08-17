'use strict';

import Chart from 'chart.js';
import ErrorBar from './error.bar';

Chart.plugins.register({
  id: 'us-error-bars',

  afterDatasetDraw: function(chart, args) {
    var type = chart.config.type;
    var moe = chart.config.config.plugins.errorBar.marginsOfError;
    var moeIsArray = Array.isArray(moe);

    if (type !== 'bar') {
      return false;
    }

    var elements = args.meta.data || [];
    var ilen = elements.length;
    var i, elMoe;

    if (moeIsArray && ilen !== moe.length) {
      console.error('The length of the MOE array must match the length of the data array');
      return false;
    }

    for (i = 0; i < ilen; ++i) {
      var el = elements[i];
      var view = el._view;
      var border = view.borderWidth;

      if (moeIsArray) {
        elMoe = moe[i];
      } else {
        elMoe = moe;
      }

      ErrorBar.draw(chart, view, border, elMoe);
    }
  }
});