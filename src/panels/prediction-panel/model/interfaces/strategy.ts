import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';

export interface Strategy {
  predict: (data: GrafanaData, predictor: Predictor, options: any) => number[][];
}
