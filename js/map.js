
function initMap() {

  const map = document.querySelector(`.map`);

  const regClick = function (e) {
    if (e.target.tagName.toLowerCase() === `path` && e.target.dataset.rate !== `-`) {
      window.currentState.setProps({
        screen: `table`,
        region: e.target.id,
      });
    }
  };

  map.addEventListener(`click`, regClick);
}

export default initMap;
