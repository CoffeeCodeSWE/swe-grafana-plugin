/*
 * File: Predictor.ts
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: File contenente la classe del predittore, il quale viene letto dalla funzione statica readJson
 */

export class Predictor {
  type!: string;
  tuples!: number;
  coefficients!: number[];
  svmW!: number[];
  opt?: any;

  constructor(type: string, tuples: number, coefficients: number[], svmW: number[], opt?: any) {
    this.type = type;
    this.tuples = tuples;
    this.coefficients = coefficients;
    this.svmW = svmW;
    this.opt = opt;
  }

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
    return pred;
  }
}
