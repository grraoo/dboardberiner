class State {
  constructor(state) {
    this.subject = state.subject;
    this.periodNumber = state.periodNumber;
    this.theme = state.theme;
  }

  setHash() {
    const {
      subject,
      periodNumber,
      theme
    } = this;

    window.location.hash = `${subject}/${periodNumber}/${theme}`;
  }

  /**
   * Gets list of themes for chosen region
   * @param {String} id - id of region
   * @return {Object}
   */
  getCurrentGraph() {
    let weekly = window.weekly;
    // console.log(weekly);
    let obj = {};
    switch (this.subject) {
      case `total`:
        switch (this.theme) {
          case `total`:
            obj = weekly.total[this.periodNumber];
            break;
          case `tones-total`:
            obj = weekly.tonesTotal[this.periodNumber];
            break;
          case `tones-beringer`:
            obj = weekly.tonesBeringer[this.periodNumber];
            break;
          case `compare-pradaxa`:
            obj = weekly.tonesPradaxa[this.periodNumber];
            break;
        }
        break;
      case `Beringer`:
        switch (this.theme) {
          case `tones-sites`:
            obj = weekly.beringer.sites[this.periodNumber];
            break;
          case `tones-themes`:
            obj = weekly.beringer.themes[this.periodNumber];
            break;
        }
        break;
      case `Pradaxa`:
        switch (this.theme) {
          case `tones-sites`:
            obj = weekly.pradaxa.sites[this.periodNumber];
            break;
          case `tones-themes`:
            obj = weekly.pradaxa.themes[this.periodNumber];
            break;
        }

    }
    console.log(obj);
    return obj;
  }


  getProp(state) {
    return this[state];
  }

  setPropValue(state, value) {
    if (this[state] !== value) {
      this[state] = value;
      this.setHash();
    }
  }
  /**
   * Sets properties and sets new hash if needed
   * @param {Object} props
   * @param {Boolean} noSetHash
   */
  setProps(props, noSetHash) {
    Object.keys(props).forEach((prop) => {
      if (this[prop] !== props[prop]) {
        this[prop] = props[prop];
      }
    });
    if (!noSetHash) {
      this.setHash();
    }
  }
}

const defaultState = {
  "subject": `total`,
  "periodNumber": `0`,
  "theme": `total`,
};
const currentState = new State(defaultState);
console.log(currentState);
window.currentState = currentState;
export default currentState;
