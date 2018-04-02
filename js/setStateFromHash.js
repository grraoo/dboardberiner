import onHashChange from './hashChange.js';

const setStateFromHash = function () {
  window.addEventListener(`hashchange`, onHashChange);
  // if (window.location.hash) {
  //   let hashSplit = window.location.hash.substr(1).split(`/`) || [];
  //   let newState = {
  //     subject: hashSplit[0] || `x5`,
  //     region: hashSplit[1] || `Russia`,
  //     periodType: hashSplit[2] || `month`,
  //     periodNumber: hashSplit[3] || `0`,
  //     theme: hashSplit[4] || `obschee_otnoshenie_k_seti`,
  //     screen: hashSplit[5] || `table`,
  //   };
  //   window.currentState.setProps(newState);

  // }
  onHashChange();
};

export default setStateFromHash;
