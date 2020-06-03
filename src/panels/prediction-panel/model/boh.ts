import { PureComponent } from 'react';
import { ConfigRL } from './configPrediction/configRL';

export const configs: { [index: string]: typeof PureComponent } = {
  RL: ConfigRL,
};
