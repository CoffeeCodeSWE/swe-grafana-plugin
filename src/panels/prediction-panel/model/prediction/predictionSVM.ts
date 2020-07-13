/*
 * File: predictionRL.tsx
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: File contente la classe di predizione con support vector machines
 */

import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';

export class PredictionSVM {
  //ATTENZIONE: è lo stesso algoritmo della RL, è da fare (questo è qui come placeholder)
  predict(data: GrafanaData, predictor: Predictor, opts: { toPredict: 0 | 1 }) {
    if (!opts || !opts.toPredict) {
      opts = { ...opts, toPredict: 0 };
    }
    const coefficients = predictor.coefficients;
    const first = opts.toPredict;
    const second = 1 - opts.toPredict;
    const f = (first: number, second: number) => {
      return first * coefficients[0] + second * coefficients[1] * coefficients[2];
    };

    data.outputValues = [];
    data.inputGrafanaValues.forEach(value => {
      let v = f(value[first], value[second]);
      let c = 0;
      if (v > 0) {
        c = 1;
      } else if (v < 0) {
        c = -1;
      }
      if (data && (value[0] || value[1])) {
        data.outputValues?.push([value[2], c]);
      }
    });
    return data.outputValues;
  }
}
