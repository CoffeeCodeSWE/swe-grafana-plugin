export interface ExampleAppSettings {
  customText?: string;
  customCheckbox?: boolean;
}

/*
 * obj: Predictor{type,tuples,coefficients,svmW}
 * Description: oggetto predittore
 */
export class Predictor {
  type!: string;
  tuples!: number;
  coefficients!: number[];
  svmW?: number[];

  /*
   * static readJson(string)
   * @return Predictor
   * Description: riceve in input il file json e restituisce un oggetto di tipo predittore
   */
  static readJson(json: any): Predictor {
    if (!json) {
      throw new Error('Seleziona prima il file!');
    }

    let pred: Predictor = new Predictor();
    let str: string;
    str = json.toString();
    pred = JSON.parse(str);

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
