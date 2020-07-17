/*
 * File: strategies.ts
 * Version: v3.11-1.0.0
 * Date: 2020-05-25
 * Description: File contenente gli array associativi necessari all'implementazione del design pattern Strategy
 */

import { PureComponent } from 'react';
import { Strategy } from './interfaces/strategy';
import { PredictionRL } from './prediction/predictionRL';
import { PredictionSVM } from './prediction/predictionSVM';
import { ConfigRL } from './configPrediction/configRL';
import { ConfigSVM } from './configPrediction/configSVM';

export const strategies: { [index: string]: Strategy } = {
  rl: new PredictionRL(),
  svm: new PredictionSVM(),
};

export const configs: { [index: string]: typeof PureComponent } = {
  rl: ConfigRL,
  svm: ConfigSVM,
};
