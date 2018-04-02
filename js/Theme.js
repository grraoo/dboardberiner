import getInt from "./getInt";

class Theme {
  constructor(theme) {
    if (theme) {
      this.positive = getInt(theme.positive);
      this.neutral = getInt(theme.neutral);
      this.negative = getInt(theme.negative);
    } else {
      this.positive = 0;
      this.neutral = 0;
      this.negative = 0;
    }
    this.chart = {
      positive: [0, 0, 0, 0, 0],
      neutral: [0, 0, 0, 0, 0],
      negative: [0, 0, 0, 0, 0]
    };
  }

  getRate() {
    let notNegative = this.positive + this.neutral;
    let total = notNegative + this.negative;
    return total ? parseFloat((notNegative / total).toFixed(2)) : `-`;
  }
  total() {
    let total = this.positive + this.neutral + this.negative;
    return total;
  }
}

export default Theme;
