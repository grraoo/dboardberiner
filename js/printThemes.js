import printStats from "./printStats";
import numberWithSpaces from "./numberWithSpaces";

const printThemes = function (themes) {
  const table = document.getElementById(`content-tbody`);

  let themeNames = Object.keys(themes).sort((a, b) => {
    return themes[a].total() < themes[b].total() ? 1 : -1;
  });

  table.innerHTML = ``;

  themeNames.forEach((themeName) => {
    let theme = themes[themeName];
    let total = theme.total();
    if (total) {
      let row = document.getElementById(`template`).content.querySelector(`.day-table-row`).cloneNode(true);
      if (!themes[window.currentState.theme].total()) {
        window.currentState.setProps({"theme": `all`});
      }
      if (window.currentState.theme === themeName) {
        row.classList.add(`selected`);
        printStats(theme);
      }
      row.querySelector(`.day-table-theme`).innerText = window.data.themes[themeName];
      row.querySelector(`.day-table-totalcount`).innerHTML = numberWithSpaces(total);
      row.querySelector(`.day-table-rate`).innerText = theme.getRate().toFixed(2);
      row.onclick = () => {
        window.currentState.setPropValue(`theme`, themeName);
      };
      table.appendChild(row);
    }
  });
};

export default printThemes;
