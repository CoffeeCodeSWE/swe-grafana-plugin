import { GrafanaData } from '../types/Data';
import { Predictor } from '../types/Predictor';
import { strategies } from './strategies';
import { Strategy } from '../model/interfaces/strategy';

export class Model {
  private data?: GrafanaData;
  private predictor?: Predictor;
  //private algorithm?: string;
  private strategy?: Strategy;

  setData(data: GrafanaData) {
    this.data = data;
  }

  setPredictor(predictor: Predictor) {
    console.log('sono entrato in model > setpredictor');
    this.predictor = predictor;
    console.log('e il suo this.predictor è ' + this.predictor);
    console.log('mentre il predictor che gli arriva è ' + predictor);
    if (!strategies[predictor.type]) {
      throw new Error('Algoritmo sbagliato!');
    }
    this.strategy = strategies[predictor.type];
    console.log('this.strategy è ' + this.strategy);
  }

  predict() {
    if (!this.data || !this.predictor) {
      throw new Error('Predittore non trovato');
    }
    console.log('entrato dentro a predict del model');

    this.data.outputValues = this.strategy?.predict(this.data, this.predictor, this.predictor.opt);
    //altrimenti mi dà errore salve odio typescript
    if (!this.data.outputValues || this.data.outputValues.length < 1) {
      throw new Error('data non predetto');
    }
    return this.data.outputValues[this.data.outputValues.length - 1][1];
  }

  /*async writeInflux() {
      questa mi dovrebbe scrivere i dati già processati nel database influx. TODO prima o poi
  }*/
}
