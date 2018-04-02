import showScreen from './showScreen.js';

function onHashChange() {
  window.start = Date.now();
  const hashSplit = window.location.hash.substr(1).split(`/`);

  const subjChoise = window.data.subjChoise;
  const subjNames = window.data.subjNames;
  const periodNumber = window.data.periodNumber;

  window.currentState.setProps({
    subject: hashSplit[0] || `x5`,
    region: hashSplit[1] || `Russia`,
    periodType: hashSplit[2] || `month`,
    periodNumber: hashSplit[3] || `0`,
    theme: hashSplit[4] || `obschee_otnoshenie_k_seti`,
    screen: hashSplit[5] || `subjects`,
  }, true);

  if (window.currentState.subject !== `All`) {
    subjChoise.innerText = subjNames[window.currentState.subject];
  }
  periodNumber.value = window.currentState.periodNumber;

  showScreen(window.currentState.screen);
}

export default onHashChange;
