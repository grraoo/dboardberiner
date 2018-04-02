class State {
  constructor(state) {
    this.subject = state.subject;
    this.periodType = state.periodType;
    this.periodNumber = state.periodNumber;
    this.theme = state.theme;
  }

  setHash() {
    const {
      subject,
      periodType,
      periodNumber,
      theme
    } = this;

    window.location.hash = `${subject}/${periodType}/${periodNumber}/${theme}`;
  }

  /**
   * Gets list of themes for chosen region
   * @param {String} id - id of region
   * @return {Object}
   */
  getCurrentRegList(id) {
    return this.currentTotal[this.subject].month[id];
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
  "subject": `x5`,
  "region": `Russia`,
  "periodType": `month`,
  "periodNumber": `0`,
  "theme": `all`,
  "screen": `subjects`
};
const currentState = new State(defaultState);
window.currentState = currentState;
export default currentState;
