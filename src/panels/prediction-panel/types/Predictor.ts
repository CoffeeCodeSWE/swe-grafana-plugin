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
    let temp = JSON.parse(str);
    let pred = new Predictor('', 0, [], [], []);
    pred.type = temp.type;
    if (pred.type === 'rl') {
      pred.coefficients.push(temp.predictor.coefficents[Object.keys(temp.predictor.coefficents)[0]]);
      pred.coefficients.push(temp.predictor.intercept);
      pred.tuples = temp.predictor.tuples;
    } else if (pred.type === 'svm') {
      pred.coefficients.push(temp.predictor.b);
      pred.coefficients.push(temp.predictor.w[0]);
      pred.coefficients.push(temp.predictor.w[1]);
      pred.tuples = temp.predictor.N;
    }

    if ((pred.type !== 'rl' && pred.type !== 'svm') || !pred.coefficients || pred.tuples < 1) {
      throw new Error('File mal formato');
    }
    return pred;
  }
}
