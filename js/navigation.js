import currentState from './currentState';
import setStateFromHash from './setStateFromHash.js';
import initWysiwyg from './wysiwyg.js';
import calculate from './calculate';
import numberWithSpaces from './numberWithSpaces';

function initNavigate() {

  currentState.currentTotal = calculate(window.data.total);
  const subjects = window.data.subjects;
  const periodNumber = window.data.periodNumber;
  const subjChoise = window.data.subjChoise;
  const regChoise = window.data.regChoise;
  const home = window.data.home;

  const getSubjectId = (e) => {
    if (e.target.classList.contains(`subject`)) {
      home.classList.add(`tabnav__item--active`);
      subjChoise.classList.remove(`tabnav__item--active`);
      window.currentState.setProps({
        subject: e.target.dataset.subject,
        screen: `map`,
      });
      subjChoise.classList.remove(`tabnav__item--disabled`);

    }
  };

  subjects.addEventListener(`click`, getSubjectId);

  periodNumber.addEventListener(`change`, (e) => {
    window.currentState.setPropValue(`periodNumber`, e.target.value);
  });

  subjChoise.addEventListener(`click`, () => {
    window.currentState.setPropValue(`screen`, `map`);
  });

  regChoise.addEventListener(`click`, () => {
    window.currentState.setPropValue(`screen`, `table`);
  });

  home.addEventListener(`click`, () => {
    window.currentState.setPropValue(`screen`, `subjects`);

  });

  setStateFromHash();
  initWysiwyg();
  const colors = [
    `#D94D4D`,
    `#D94D4D`,
    `#575757`,
    `#64b454`,
    `#64b454`,
  ];

  Object.keys(window.data.subjNames).forEach((subj) => {
    let subjCard = subjects.querySelector(`[data-subject="${subj}"]`);
    subjCard.querySelector(`.subject__number--posts`).innerHTML = numberWithSpaces(window.currentState.currentTotal[subj].month.Russia.all.total());
    subjCard.querySelector(`.subject__number--rate`).innerText = (window.currentState.currentTotal[subj].month.Russia.all.getRate()).toFixed(2);
    subjCard.querySelector(`.subject__number--rate`).style.color = colors[Math.round(window.currentState.currentTotal[subj].month.Russia.all.getRate()) * (colors.length - 1)];
  });

}

export default initNavigate;

