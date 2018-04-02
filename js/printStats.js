import charts from './charts';
import numberWithSpaces from './numberWithSpaces';

const moods = [
  `negative`,
  `neutral`,
  `positive`
];
const statsTable = document.querySelector(`.theme-details`);

const printStats = function (theme) {
  moods.forEach((mood) => {
    statsTable.querySelector(`.${mood} .text-right`).innerHTML = numberWithSpaces(theme[mood]);
  });
  try {
    charts();

    let chartId = `chart-posts`;
    document.getElementById(chartId).innerHTML = ``;


    let chartObj = theme.chart;

    window.Highcharts.chart(chartId, {
      xAxis: {
        categories: [`I неделя<br><br> 1-3 декабря`, `II неделя<br><br> 4-10 декабря`, `III неделя<br><br> 11-17 декабря`, `IV неделя<br><br> 18-26 декабря`, `V неделя<br><br> 27-31 декабря`],
        crosshair: true,
        tickInterval: 1
      },
      yAxis: {
        min: 0
      },

      series: [
        {
          name: `Позитивных`,
          data: chartObj.positive,
          color: `#0ef174`,
        },
        {
          name: `Негативных`,
          data: chartObj.negative,
          color: `#ff4d01`,
        },
        {
          name: `Нейтральных`,
          data: chartObj.neutral,
          color: `#acacac`,
        },
      ],
    });
  } catch (err) {
    window.data.err = err.message;
  }
};

export default printStats;
