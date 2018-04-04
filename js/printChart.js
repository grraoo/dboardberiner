function printChart(dataObj) {
  // console.log(dataObj);
  if (dataObj.text) {
    document.getElementById(`chart-info`).innerHTML = dataObj.text;
  }

  window.Highcharts.chart(`chart-posts`, {
    chart: {
      type: `line`
    },
    title: {
      text: `Субъекты исследования`
    },
    subtitle: {
      text: `Картина за две недели`
    },
    xAxis: {
      categories: dataObj.chart.categories,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: `Количество сообщений`
      }
    },
    tooltip: {
      headerFormat: `<span style="font-size:10px">{point.key}</span><table>`,
      pointFormat: `<tr><td style="color:{series.color};padding:0">{series.name}: </td>` +
        `<td style="padding:0"><b>{point.y}</b></td></tr>`,
      footerFormat: `</table>`,
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0
      }
    },
    series: dataObj.chart.series
  });
}

export default printChart;
