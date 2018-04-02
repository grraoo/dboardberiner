import initMap from './map.js';
import regHiglight from './regHiglight.js';
import Theme from './Theme';
import numberWithSpaces from './numberWithSpaces';

const colors = [
  `#D94D4D`,
  `#D94D4D`,
  `#575757`,
  `#64b454`,
  `#64b454`,
];


const getTotalRate = function (themes) {
  let themeNames = Object.keys(themes);
  const allThemes = new Theme();

  themeNames.forEach((themeName) => {
    if (themeName !== `all`) {
      let theme = themes[themeName];
      [`positive`, `neutral`, `negative`].forEach((mood) => {
        allThemes[mood] += theme[mood];
      });
    }
  });
  return allThemes;
};

function initWysiwyg() {
  initMap();
  const regNamesIds = window.data.regNamesIds;
  const map = document.querySelector(`.svg-map g`);
  const regNames = window.data.regNames;
  const wys = document.getElementById(`wysiwyg`);
  const srch = document.getElementById(`search-res`);
  const regHover = document.getElementById(`reg-hover`);
  const mapWrap = document.querySelector(`.map`);
  const printRegionBtn = function (regThemes, name) {
    let allReg = getTotalRate(regThemes);
    srch.innerHTML += `<button class="search-item" data-region="${regNamesIds[name]}" type="button">${name}: ${numberWithSpaces(allReg.total())}, <span style="color: ${colors[Math.round(allReg.getRate() * (colors.length - 1))]}">${allReg.getRate()}</span> </button>`;
  };
  const testWysiwyg = (e) => {
    srch.innerHTML = ``;

    let hasRes = false;
    if (e.target.value.length > 0) {
      regNames.forEach((name) => {

        if (hasRes) {
          srch.classList.remove(`search-results--hidden`);
        } else {
          srch.classList.add(`search-results--hidden`);
        }

        let re = new RegExp(e.target.value, `gi`);

        if (re.test(name)) {
          hasRes = true;
          let regThemes = window.currentState.getCurrentRegList(regNamesIds[name]);
          printRegionBtn(regThemes, name);
        }
      });
    } else {
      hasRes = false;
      srch.classList.add(`search-results--hidden`);
      printAllRegionsButtons();
    }
  };
  const switchRegion = function (e) {
    if (e.target.className === `search-item`) {
      let regId = e.target.dataset.region;
      regHiglight(map, regId, `active`);
      regHiglight(map, regId, `hover`, true);
      window.currentState.setProps({
        "region": `${e.target.dataset.region}`,
        "screen": `table`
      });

      wys.value = ``;
      srch.innerHTML = ``;
      srch.classList.add(`search-results--hidden`);
    }
  };
  const hoverRegion = function (e) {
    if (e.target.className === `search-item`) {
      regHiglight(map, e.target.dataset.region, `hover`);
    }
  };

  const srchResNavigate = function (e) {
    if (e.keyCode === 40) {
      e.preventDefault();
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    } else if (e.keyCode === 38) {
      e.preventDefault();
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      } else {
        wys.focus();
      }
    }
  };
  wys.addEventListener(`keydown`, function (e) {
    if (e.keyCode === 40 && srch.firstChild) {
      srch.firstChild.focus();
    }
  });
  srch.addEventListener(`click`, switchRegion);
  srch.addEventListener(`focus`, hoverRegion, true);
  srch.addEventListener(`keydown`, srchResNavigate);

  srch.addEventListener(`mouseover`, hoverRegion);

  srch.addEventListener(`mouseout`, function (e) {
    regHiglight(map, e.target.dataset.region, `hover`, true);
  });

  wys.addEventListener(`input`, testWysiwyg);

  const showRegName = function (evt) {
    if (evt.target.tagName.toLowerCase() === `path`) {
      srch.classList.add(`search-results--hidden`);
      wys.blur();
      let Rate = evt.target.dataset.rate === `-` ? `&mdash;` : evt.target.dataset.rate;
      regHover.style.display = `block`;
      regHover.innerHTML = `<h5>${window.data.regIdsNames[evt.target.id]}</h5>${evt.target.dataset.posts}, <span style="color: ${colors[Math.round(Rate * (colors.length - 1))]}">${Rate}</span>`;
      regHover.style.top = `${evt.target.getBoundingClientRect().top - regHover.getBoundingClientRect().height}px`;
      regHover.style.left = `${(evt.target.getBoundingClientRect().left + (evt.target.getBoundingClientRect().width / 2)) - (regHover.getBoundingClientRect().width / 2)}px`;
    } else {
      regHover.style.display = `none`;
    }
  };

  mapWrap.addEventListener(`mouseover`, showRegName);
  mapWrap.addEventListener(`mouseover`, showRegName);

  function printAllRegionsButtons() {
    regNames.forEach((name) => {
      let regId = regNamesIds[name];
      let Region = document.getElementById(regId);
      if (Region && Region.dataset.rate !== `-`) {
        srch.classList.remove(`search-results--hidden`);
        let regThemes = window.currentState.getCurrentRegList(regNamesIds[name]);
        printRegionBtn(regThemes, name);
      }
    });
  }
  wys.addEventListener(`focus`, function () {
    wys.value = ``;
    srch.innerHTML = ``;
    printAllRegionsButtons();
  });
}

export default initWysiwyg;
