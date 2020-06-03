import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';

function calc(val: number, coeff: number[]): number {
  if (val) {
    return val * coeff[0] + coeff[1];
  } else {
    return 0;
  }
}
export class PredictionRL {
  static predict(data: GrafanaData, predictor: Predictor, opts: { toPredict: 0 | 1 }): number[][] {
    if (!opts || !opts.toPredict) {
      opts = { ...opts, toPredict: 0 };
    }
    console.log('sto predicendo con la RL');
    const coefficients = predictor.coefficients;
    const base = 1 - opts.toPredict;
    data.outputValues = [];

    data.inputGrafanaValues.forEach(value => {
      if (data && value[base]) {
        data.outputValues?.push([value[2], calc(value[base], coefficients)]);
      }
    });
    console.log('ho predetto con la RL, questo è quello che ho in data.outputValues');
    console.log(data.outputValues);
    return data.outputValues;
  }
}
