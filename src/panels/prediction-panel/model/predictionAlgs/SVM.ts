import { GrafanaData } from '../Data';
import { Predictor } from '../Predictor';

function calc(x: number, y: number, coeff: number[]): number {
  return x * coeff[0] + y * coeff[1] + coeff[2];
}
export class PredictionSVM {
  static predict(data: GrafanaData, predictor: Predictor, opts: { toPredict: 0 | 1 }): number[][] {
    console.log('sto predicendo con SVM');
    if (!opts || !opts.toPredict) {
      opts = { ...opts, toPredict: 0 };
    }

    const coefficents = predictor.coefficients;
    const x = opts.toPredict;
    const y = 1 - opts.toPredict;

    data.outputValues = [];
    data.inputGrafanaValues.forEach(value => {
      const t = calc(value[x], value[y], coefficents);
      let classification;
      if (t > 0) {
        classification = 1;
      } else {
        classification = -1;
      }

      if (data && (value[0] || value[1])) {
        data.outputValues?.push([value[2], classification]);
      }
    });

    console.log('ho predetto con SVM e data.outputValues contiene questi valori');
    console.log(data.outputValues);
    return data.outputValues;
  }
}
