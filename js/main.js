import data from './data';
import printChart from './printChart';
import printCompare from './printCompare';

data();

// eventListeners for navigation

const btns = document.querySelector(`.left-btns-wrap`);
const tabs = document.querySelector(`.date-tabs`);
const totalGraphs = btns.querySelector(`#total-graphs`);
const drugGraphs = btns.querySelector(`#drug-graphs`);

btns.addEventListener(`click`, function (e) {
  let graph = e.target.dataset.graph;
  if (graph) {
    window.currentState.theme = graph;
    let active = document.querySelector(`.left-btns button.active`);
    if (active) {
      active.classList.remove(`active`);
    }
    e.target.classList.add(`active`);
    let graphObj = window.currentState.getCurrentGraph();
    switch (graph) {
      case `total`:
        printChart(graphObj);
        break;
      default:
        printCompare(graphObj);
        break;
    }
  }
});

tabs.addEventListener(`click`, function (e) {
  let tab = e.target.dataset.tab;
  if (tab) {
    window.currentState.subject = tab;

    switch (tab) {
      case `total`:
        totalGraphs.classList.remove(`hide`);
        drugGraphs.classList.add(`hide`); {
          let activeBtn = document.querySelector(`.left-btns button.active`);
          if (activeBtn) {
            activeBtn.classList.remove(`active`);
          }
          document.querySelector(`.left-btns button[data-graph="total"]`).classList.add(`active`);
          window.currentState.theme = `total`;
        }
        printChart(window.weekly.total[window.currentState.periodNumber]);
        break;
      case `Beringer`:
        totalGraphs.classList.add(`hide`);
        drugGraphs.classList.remove(`hide`);
        printCompare(window.weekly.beringer.sites[window.currentState.periodNumber]); {
          let activeBtn = document.querySelector(`.left-btns button.active`);
          if (activeBtn) {
            activeBtn.classList.remove(`active`);
          }
          document.querySelector(`.left-btns button[data-graph="tones-themes"]`).classList.add(`active`);
          window.currentState.theme = `tones-sites`;
        }
        break;
      case `Pradaxa`:
        totalGraphs.classList.add(`hide`);
        drugGraphs.classList.remove(`hide`);
        printCompare(window.weekly.pradaxa.sites[window.currentState.periodNumber]); {
          let activeBtn = document.querySelector(`.left-btns button.active`);
          if (activeBtn) {
            activeBtn.classList.remove(`active`);
          }
          document.querySelector(`.left-btns button[data-graph="tones-themes"]`).classList.add(`active`);
          window.currentState.theme = `tones-sites`;
        }
        break;
    }
    let active = document.querySelector(`.date-tab.active`);
    if (active) {
      active.classList.remove(`active`);
    }
    e.target.classList.add(`active`);
  }
});

const weeksSelect = document.getElementById(`weeksIndex`);
const weekSwitch = document.getElementById(`weekSwitch`);

weeksSelect.addEventListener(`change`, function (e) {
  window.currentState.periodNumber = e.target.value;
  const {
    subject,
    theme
  } = window.currentState;
  let graphObj = window.currentState.getCurrentGraph();
  if (subject === `total` && theme === `total`) {
    printChart(graphObj);
  } else {
    printCompare(graphObj);
  }
});

weekSwitch.addEventListener(`click`, function (e) {
  let dir = e.target.dataset.direction;
  if (dir) {
    let mod = window.weekly.weeks;
    // let index = parseInt(weeksSelect.value, 10);
    switch (dir) {
      case `forward`:
        window.currentState.periodNumber = ((++window.currentState.periodNumber) % mod);
        break;
      case `back`:
        window.currentState.periodNumber = ((--window.currentState.periodNumber + mod) % mod);
        break;
    }
    weeksSelect.value = window.currentState.periodNumber;
    const {
      subject,
      theme
    } = window.currentState;
    let graphObj = window.currentState.getCurrentGraph();
    if (subject === `total` && theme === `total`) {
      printChart(graphObj);
    } else {
      printCompare(graphObj);
    }
  }
});
