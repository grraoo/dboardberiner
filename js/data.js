import load from './load';

function initData() {
  window.data = {
    home: document.getElementById(`home`),
    subjects: document.querySelector(`.subjects`),
    periodNumber: document.getElementById(`period-name`),
    total: {},
  };
  const endPointUrl = `https://monitoring.sn-mg.ru/service/monitoring/dashboards/?reportId=11475`;

  load(endPointUrl);
}

export default initData;
