import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';
import { Strategy } from '../interfaces/strategy';

export class PredictionRL implements Strategy {
  predict(data: GrafanaData, predictor: Predictor, opts: { toPredict: 0 | 1 }) {
    console.log('dentro predict di predictionRL, il data (grafanadata) che ricevo è questo ' + data);
    if (!opts || !opts.toPredict) {
      opts = { ...opts, toPredict: 0 };
    }
    console.log('sto predicendo con la RL');
    const coefficients = predictor.coefficients;
    console.log('coefficients = ' + coefficients);
    const base = 1 - opts.toPredict;
    console.log('base= ' + base);

    const f = (x: number) => {
      return x ? x * coefficients[0] + coefficients[1] : 0;
    };

    data.outputValues = [];
    console.log('dentro predict di prediction RL, inpuitGrafanaValues = ' + data.inputGrafanaValues);
    data.inputGrafanaValues.forEach(value => {
      if (data && value[base]) {
        data.outputValues?.push([value[2], f(value[base])]);
      }
    });
    console.log('ho predetto con la RL, questo è quello che ho in data.outputValues');
    console.log(data.outputValues);
    return data.outputValues;
  }
}
