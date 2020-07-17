/*
 * File: strategy.ts
 * Version: v3.11-1.0.0
 * Date: 2020-05-25
 * Description: File contenente l'interfaccia Strategy, la quale viene implementata dal model per l'utilizzo del corretto algoritmo di predizione
 */

import { GrafanaData } from '../../types/Data';
import { Predictor } from '../../types/Predictor';

export interface Strategy {
  predict: (data: GrafanaData, predictor: Predictor, options: any) => number[][];
}
