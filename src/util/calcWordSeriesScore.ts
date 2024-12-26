// import { dummy } from "../data/DTMResult";

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

export {pearsonCorrelation};