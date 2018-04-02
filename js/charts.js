function setupHighcharts() {
  window.Highcharts.setOptions({
    credits: {
      enabled: false
    },
    chart: {
      height: 300,
      backgroundColor: `transparent`,
      spacingLeft: 0,
      spacingRight: 0,
      spacingTop: 0,
      spacingBottom: 0,
      style: {
        fontFamily: `Helvetica, Arial, sans-serif`
      },
      zoomType: `x`
    },
    legend: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    rangeSelector: {
      enabled: false,
      inputEnabled: false,
      buttonTheme: {
        visibility: `hidden`
      },
      labelStyle: {
        visibility: `hidden`
      }
    },
    series: {
      column: {
        pointWidth: 20
      }
    },
    title: {
      text: ``
    },
    xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: `transparent`,
      minorTickLength: 0,
      tickLength: 0
    },
    yAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      visible: false
    },
    height: 300,
  });
}

export default setupHighcharts;
