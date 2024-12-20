import { dummy } from "../data/DTMResult";

const pearsonCorrelation = (xArray: number[], yArray: number[]) => {
    if (xArray.length !== yArray.length) {
      throw new Error("Input arrays must have the same length.");
    }

    const xMean = xArray.reduce((sum, value) => sum + value, 0) / xArray.length;
    const yMean = yArray.reduce((sum, value) => sum + value, 0) / yArray.length;

    let numerator = 0;
    let xDenominator = 0;
    let yDenominator = 0;

    for (let i = 0; i < xArray.length; i++) {
      const xDeviation = xArray[i] - xMean;
      const yDeviation = yArray[i] - yMean;

      numerator += xDeviation * yDeviation;
      xDenominator += xDeviation * xDeviation;
      yDenominator += yDeviation * yDeviation;
    }

    const correlation = numerator / (Math.sqrt(xDenominator) * Math.sqrt(yDenominator));
    return correlation;
}

const getTopicClusterSize = (nTopic: number) => {
    let res = new Array(nTopic-1);
    for (let i = 0; i < nTopic-1; i++) {
        res[i] = 0;
    }
    for (let obj of dummy) {
      if (obj.topicIdx == -1) continue;
      res[obj.topicIdx] += obj.frequency;
    }
    return res;
}

const _inArray = (item: any, arr: any[]) => {
  for (let i of arr) {
      if (i == item) return true;
  }
  return false;
};


const getMonthList = () => {
    let li = [];
    for (let obj of dummy) {
        if (!_inArray(obj.month, li)) {
            li.push(obj.month);
        }
    }
    return li;
}


const getTopicFrequencySeries = (nTopic: number) => {
    let months = getMonthList();
    let res = [];
    for (let i = 0; i < nTopic-1; i++) {
        let temp = [];
        for (let m of months) {
            let flag = 0;
            for (let obj of dummy) {
                if (obj.topicIdx == i && obj.month == m) {
                    temp.push(obj.frequency)
                    flag = 1;
                    break;
                }
            }
            if (!flag) {
                temp.push(0);
            }
        }
      res.push(temp);
    }
  
    return res;
}

export {pearsonCorrelation, getTopicFrequencySeries, getTopicClusterSize, getMonthList};