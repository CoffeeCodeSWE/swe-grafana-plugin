import { GrafanaData } from '../types/Data';
import { Predictor } from '../types/Predictor';
import { strategies } from './strategies';
import { Strategy } from '../model/interfaces/strategy';

export class Model {
  private data?: GrafanaData;
  private predictor?: Predictor;
  private strategy?: Strategy;

  setData(data: GrafanaData) {
    this.data = data;
  }

  setPredictor(predictor: Predictor) {
    this.predictor = predictor;
    if (!strategies[predictor.type]) {
      throw new Error('Algoritmo sbagliato!');
    }
    this.strategy = strategies[predictor.type];
  }

  predict() {
    if (!this.data || !this.predictor) {
      throw new Error('Predittore non trovato');
    }
    this.data.outputValues = this.strategy?.predict(this.data, this.predictor, this.predictor.opt);
    if (!this.data.outputValues || this.data.outputValues.length < 1) {
      throw new Error('data non predetto');
    }
    return this.data.outputValues[this.data.outputValues.length - 1][1];
  }

  async writeInflux() {}
}
