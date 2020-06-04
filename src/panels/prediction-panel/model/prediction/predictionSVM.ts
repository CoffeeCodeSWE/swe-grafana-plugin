import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';

export class PredictionSVM {
  predict(data: GrafanaData, predictor: Predictor, opts: { toPredict: 0 | 1 }) {
    console.log('sto predicendo con SVM');
    if (!opts || !opts.toPredict) {
      opts = { ...opts, toPredict: 0 };
    }

    const coefficents = predictor.coefficients;
    const x = opts.toPredict;
    const y = 1 - opts.toPredict;

    const f = (x: number, y: number) => {
      return x * coefficents[0] + y * coefficents[1] + coefficents[2];
    };
    data.outputValues = [];

    data.inputGrafanaValues.forEach(value => {
      const val = f(value[x], value[y]);
      let cls = 0; //classification
      if (val > 0) {
        cls = 1;
      } else if (val < 0) {
        cls = -1;
      }

      if (data && (value[0] || value[1])) {
        data.outputValues?.push([value[2], cls]);
      }
    });

    return data.outputValues;
  }
}
