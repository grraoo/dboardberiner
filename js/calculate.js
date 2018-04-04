import getInt from "./getInt";
import printChart from "./printChart";
import currentState from './currentState';
window.currentState = currentState;
const TRANS_NAMES = {
  beringer: `Берингер`,
  pradaxa: `Прадакса`,
  eliquix: `Эликвикс`,
  xalreto: `Ксалрето`
};
function sortAsc(a, b) {
  let itemValA = 0;
  moods.forEach((mood) => {
    itemValA += getInt(a[mood], true);
  });
  let itemValB = 0;
  moods.forEach((mood) => {
    itemValB += getInt(b[mood], true);
  });
  return Math.sign(itemValB - itemValA);
}
const Q_DRUGS = [`eliquix`, `xalreto`];

const moods = [`negative`, `neutral`, `positive`];
const weeksSelect = document.getElementById(`weeksIndex`);

function totalCalc(weeks) {
  console.log(weeks);
  const total = {};
  const mentions = {};
  const mentionsBeringer = {};
  const mentionsPradaxa = {};
  const beringerSites = {};
  const beringerThemes = {};
  const pradaxaSites = {};
  const pradaxaThemes = {};

  weeks.forEach((element, index) => {

    let option = document.createElement(`option`);
    option.innerText = element.title;
    option.value = index;
    weeksSelect.appendChild(option);

    let title = index;
    total[title] = element.sheetData.total;
    let beringerData = [];
    let pradaxaData = [];
    total[title].chart = {
      categories: [],
      series: [{
          name: `Берингер`,
          data: beringerData
        },
        {
          name: `Прадакса`,
          data: pradaxaData
        }
      ]
    };
    let cats = total[title].chart.categories;

    total[title].date.forEach((item) => {
      cats.push(item.name);
      beringerData.push(getInt(item.beringer, true));
      pradaxaData.push(getInt(item.pradaxa, true));
    });

    let drugs = Object.keys(element.sheetData.mentions.data);
    mentions[title] = {
      negative: [],
      neutral: [],
      positive: [],
      names: [],
      text: element.sheetData.mentions.text,
      stacking: `percent`
    };
    mentionsBeringer[title] = {
      negative: [0, 0],
      neutral: [0, 0],
      positive: [0, 0],
      names: [`Прадакса`, `Препараты конкурентов`],
      text: element.sheetData.mentions.text,
      stacking: `percent`
    };
    mentionsPradaxa[title] = {
      negative: [0],
      neutral: [0],
      positive: [0],
      names: [`Прадакса`],
      text: element.sheetData.mentions.text,
      stacking: `percent`
    };

    drugs.forEach((drug) => {
      mentions[title].names.push(TRANS_NAMES[drug]);
      moods.forEach((mood) => {
        let drugg = element.sheetData.mentions.data[drug];
        mentions[title][mood].push(getInt(drugg[mood], true));
      });
    });

    Q_DRUGS.forEach((drug) => {
      moods.forEach((mood) => {
        let drugg = element.sheetData.mentions.data[drug];
        mentionsBeringer[title][mood][1] += (getInt(drugg[mood], true));
        mentionsPradaxa[title][mood][0] = mentionsBeringer[title][mood][0] = (mentions[title][mood][0]);
      });
    });


    beringerSites[title] = {
      negative: [],
      neutral: [],
      positive: [],
      names: [],
      text: element.sheetData.beringer.intro_sites,
      stacking: `normal`
    };
    beringerThemes[title] = {
      negative: [],
      neutral: [],
      positive: [],
      names: [],
      text: element.sheetData.beringer.intro_themes,
      stacking: `normal`
    };
    pradaxaSites[title] = {
      negative: [],
      neutral: [],
      positive: [],
      names: [],
      text: element.sheetData.pradaxa.intro_sites,
      stacking: `normal`
    };
    pradaxaThemes[title] = {
      negative: [],
      neutral: [],
      positive: [],
      names: [],
      text: element.sheetData.pradaxa.intro_themes,
      stacking: `normal`
    };

    const pradaSites = element.sheetData.pradaxa.sites.sort(sortAsc);
    const beringerSitesArr = element.sheetData.beringer.sites.sort(sortAsc);
    const beringerThemesArr = element.sheetData.beringer.themes.sort(sortAsc);
    const pradaThemesArr = element.sheetData.pradaxa.themes.sort(sortAsc);

    beringerSitesArr.forEach((item) => {
      let itemVal = 0;
      moods.forEach((mood) => {
        itemVal += getInt(item[mood], 10);
      });
      if (itemVal > 0) {
        let obj = beringerSites[title];
        obj.names.push(item.name);
        moods.forEach((mood) => {
          obj[mood].push(getInt(item[mood]));
        });
      }
    });

    beringerThemesArr.forEach((item) => {
      let itemVal = 0;
      moods.forEach((mood) => {
        itemVal += getInt(item[mood], 10);
      });
      if (itemVal > 0) {
        let obj = beringerThemes[title];
        obj.names.push(item.name);
        moods.forEach((mood) => {
          obj[mood].push(getInt(item[mood]));
        });
      }
    });
    pradaSites.forEach((item) => {
      let itemVal = 0;
      moods.forEach((mood) => {
        itemVal += getInt(item[mood], 10);
      });
      if (itemVal > 0) {
        let obj = pradaxaSites[title];
        obj.names.push(item.name);
        moods.forEach((mood) => {
          obj[mood].push(getInt(item[mood]));
        });
      }
    });
    pradaThemesArr.forEach((item) => {
      let itemVal = 0;
      moods.forEach((mood) => {
        itemVal += getInt(item[mood], 10);
      });
      if (itemVal > 0) {
        let obj = pradaxaThemes[title];
        obj.names.push(item.name);
        moods.forEach((mood) => {
          obj[mood].push(getInt(item[mood]));
        });
      }
    });

  });

  let calculated = {
    "total": total,
    "tonesTotal": mentions,
    "tonesBeringer": mentionsPradaxa,
    "tonesPradaxa": mentionsBeringer,
    "beringer": {
      sites: beringerSites,
      themes: beringerThemes,
    },
    "pradaxa": {
      sites: pradaxaSites,
      themes: pradaxaThemes,
    }
  };

  // let title = weeks[1].title;
  // картина за две недели
  printChart(total[0]);

  // тональность в общем
  // printCompare(calculated.tonesTotal[title]);

  // сравнение Прадаксы
  // printCompare(calculated.tonesBeringer[title]);

  // Прадакса
  // printCompare(calculated.tonesPradaxa[title]);

  // printCompare(beringerSites[title]);
  calculated.weeks = weeks.length;
  console.log(`calculated`, calculated);
  return calculated;
}


export default totalCalc;
