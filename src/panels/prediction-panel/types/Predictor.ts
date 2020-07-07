export class Predictor {
  type!: string;
  tuples!: number;
  coefficients!: number[];
  svmW!: number[];
  opt?: any;

  constructor(type: string, tuples: number, coefficients: number[], svmW: number[], opt?: any){
    this.type = type;
    this.tuples = tuples;
    this.coefficients = coefficients;
    this.svmW = svmW;
    this.opt = opt;
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
    //console.log('entrato dentro a readJson, l oggetto predictor è questo:');
    //console.log(pred);
    return pred;
  }
}