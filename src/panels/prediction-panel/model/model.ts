/*
 * File: model.ts
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: Model del plug-in di predizione
 */

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
    return Number(this.data.outputValues[this.data.outputValues.length - 1][1].toFixed(3));
  }

  async writeInflux() {
    if (!this.data?.outputValues) {
      throw Error('Dati di output non trovati');
    }
    this.data.outputValues.forEach((it: number[]) => {
      $.post({
        url: 'http://localhost:8086/write?db=graf',
        data: 'key value=' + it[0] + ' ' + it[1] + '000000',
      });
    });
  }
}
