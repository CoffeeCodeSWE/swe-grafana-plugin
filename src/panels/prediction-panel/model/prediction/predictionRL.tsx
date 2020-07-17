/*
 * File: predictionRL.tsx
 * Version: v3.11-1.0.0
 * Date: 2020-05-25
 * Description: File contente la classe di predizione con regressione lineare
 */

import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';
import { Strategy } from '../interfaces/strategy';

export class PredictionRL implements Strategy {
  predict(data: GrafanaData, predictor: Predictor, opts: { toPredict: 0 | 1 }) {
    if (!opts || !opts.toPredict) {
      opts = { ...opts, toPredict: 0 };
    }
    const coefficients = predictor.coefficients;
    const base = 1 - opts.toPredict;

    const f = (x: number) => {
      return x ? x * coefficients[0] + coefficients[1] : 0;
    };

    data.outputValues = [];
    data.inputGrafanaValues.forEach(value => {
      if (data && value[base]) {
        data.outputValues?.push([value[2], f(value[base])]);
      }
    });
    return data.outputValues;
  }
}
