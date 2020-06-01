import { GrafanaData } from './Data';
import { Predictor } from './Predictor';
import { PredictionRL } from './predictionAlgs/RL';
import { PredictionSVM } from './predictionAlgs/SVM';

export class Model {
  private data?: GrafanaData;
  private predictor?: Predictor;
  private algorithm?: string;

  setdata(data: GrafanaData) {
    this.data = data;
  }

  setPredictor(predictor: Predictor) {
    this.predictor = predictor;
    if (this.algorithm !== 'RL' && this.algorithm !== 'SVM') {
      throw new Error('Algoritmo sbagliato!');
    }
    this.algorithm = predictor.type;
  }

  predict() {
    if (!this.data || !this.predictor) {
      throw new Error('Predittore non trovato');
    }

    if (this.algorithm === 'RL') {
      this.data.outputValues = PredictionRL.predict(this.data, this.predictor, this.predictor.opt);
    } else if (this.algorithm === 'SVM') {
      this.data.outputValues = PredictionSVM.predict(this.data, this.predictor, this.predictor.opt);
    } else {
      throw new Error('Algoritmo sbagliato!');
    }

    //altrimenti mi dà errore salve odio typescript
    if (this.data.outputValues) {
      return this.data.outputValues[this.data.outputValues?.length - 1][1];
    } else {
      throw new Error('Predizione non effettuata');
    }
  }

  /*async writeInflux() {
      questa mi dovrebbe scrivere i dati già processati nel database influx. TODO prima o poi
  }*/
}
