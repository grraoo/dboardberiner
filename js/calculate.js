import Theme from "./Theme";
import getInt from "./getInt";

function totalCalc(data) {
  console.log(data);
  // let start = Date.now();
  let calculated = {};

  Object.keys(data).forEach((subj) => {
    calculated[subj] = {};
    calculated[subj].month = {};
    calculated[subj].month[`Russia`] = {};
    calculated[subj].month[`Russia`][`all`] = new Theme();

    let datasheets = data[subj].datasheets.sort((a, b) => {
      return getInt(a.sheetData.date_end) < getInt(b.sheetData.date_end) ? -1 : 1;
    });

    datasheets.forEach((period, periodNumber) => {
      calculated[subj].month = calculated[subj].month || {};
      calculated[subj][periodNumber] = calculated[subj][periodNumber] || {};

      period.sheetData.indecators.regions.forEach((region) => {
        calculated[subj].month[region.alias] = calculated[subj].month[region.alias] || {};
        calculated[subj][periodNumber][region.alias] = calculated[subj][periodNumber][region.alias] || {};

        calculated[subj].month[region.alias][`all`] = calculated[subj].month[region.alias][`all`] || new Theme();
        Object.keys(region.themes).forEach((theme) => {

          calculated[subj][periodNumber][region.alias][theme] = new Theme(region.themes[theme]);

          calculated[subj].month[`Russia`][theme] = calculated[subj].month[`Russia`][theme] || new Theme();

          calculated[subj].month[region.alias][theme] = calculated[subj].month[region.alias][theme] || new Theme();

          [`positive`, `neutral`, `negative`].forEach((mood) => {
            let int = getInt(region.themes[theme][mood]);
            calculated[subj].month[region.alias][theme][mood] += (int);
            calculated[subj].month[region.alias][theme].chart[mood][periodNumber] += (int);
            calculated[subj].month[region.alias][`all`][mood] += (int);
            calculated[subj].month[region.alias][`all`].chart[mood][periodNumber] += (int);
            calculated[subj].month[`Russia`][theme].chart[mood][periodNumber] += (int);
            calculated[subj].month[`Russia`][theme][mood] += (int);
            calculated[subj].month[`Russia`][`all`].chart[mood][periodNumber] += (int);
            calculated[subj].month[`Russia`][`all`][mood] += (int);
          });
        });
      });
    });
  });
  // console.log(Date.now() - start);
  return calculated;
}

export default totalCalc;
