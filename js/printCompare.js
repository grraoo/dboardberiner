function printCompare(dataObj) {
  if (dataObj.text) {
    document.getElementById(`chart-info`).innerHTML = dataObj.text;
  }

  window.Highcharts.chart(`chart-posts`, {
    chart: {
      type: `bar`
    },
    title: {
      text: dataObj.header
    },
    xAxis: {
      categories: dataObj.names,
      min: 0
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: `Количество сообщений`
      }
    },
    tooltip: {
      pointFormat: `<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>`,
      shared: false
    },
    plotOptions: {
      column: {
        "stacking": dataObj.stacking
      }
    },
    series: [{
      type: `column`,
      name: `Негативные`,
      data: dataObj.negative,
      color: `red`
    }, {
      type: `column`,
      name: `Нейтральные`,
      data: dataObj.neutral,
      color: `#cecece`
    }, {
      type: `column`,
      name: `Позитивные`,
      data: dataObj.positive,
      color: `green`
    }]
  });
}
export default printCompare;
