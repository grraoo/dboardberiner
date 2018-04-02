import printThemes from "./printThemes";

function showScreen(screen) {
  screen = `table`;
  const regChoise = document.getElementById(`reg-choise`);
  const subjChoise = document.getElementById(`subj-choise`);
  const home = window.data.home;
  const container = document.querySelector(`.content`);

  container.className = `content`;
  container.classList.add(`show-` + screen);

  try {
    let currentList = window.currentState.getCurrentThemeList(region);
    printThemes(currentList);
  } catch (err) {
    window.data.errPrint = err.message;
  }
  home.classList.add(`tabnav__item--active`);
  subjChoise.classList.add(`tabnav__item--active`);
  subjChoise.classList.remove(`tabnav__item--disabled`);
  regChoise.classList.remove(`tabnav__item--disabled`);

}

export default showScreen;
