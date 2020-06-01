/*
 * class: Predictor{type,tuples,coefficients,svmW}
 * Description: oggetto predittore
 */
export class Predictor {
  type: string;
  tuples: number;
  coefficients: number[];
  svmW?: number[];
  opt?: any;

  constructor(type: string, tuples: number, coefficients: number[], svmW: number[]) {
    this.type = type;
    this.tuples = tuples;
    this.coefficients = coefficients;
    this.svmW = svmW;
  }

  getType() {
    return this.type;
  }

  getTuples() {
    return this.tuples;
  }

  getCoefficients() {
    return this.coefficients;
  }

  getSvmW() {
    return this.svmW;
  }

  /*
   * static readJson(string)
   * @return Predictor
   * Description: riceve in input il file json e restituisce un oggetto di tipo predittore
   */
  static readJson(json: any): Predictor {
    if (!json) {
      throw new Error('Seleziona prima il file!');
    }

    let str: string;
    str = json.toString();
    let pred: Predictor = JSON.parse(str);

    if (
      (pred.type !== 'RL' && pred.type !== 'SVM') ||
      !pred.coefficients ||
      pred.tuples < 1 ||
      (pred.type === 'SVM' && !pred.svmW)
    ) {
      throw new Error('File mal formato');
    }
    console.log('entrato dentro a readJson, l oggetto predictor è questo:');
    console.log(pred);
    return pred;
  }
}
