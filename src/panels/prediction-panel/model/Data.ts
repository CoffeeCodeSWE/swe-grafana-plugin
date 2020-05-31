import { DataFrame } from '@grafana/data';

export class GrafanaData {
  inputGrafanaValues!: number[][];
  outputValues?: number[][];

  //legge i valori in input da grafana
  static readValues(vectors: DataFrame[]): GrafanaData {
    if (!vectors) {
      throw new Error('È necessario impostare almeno 2 query');
    }

    const time = vectors[0].fields[1].values.toArray();
    const values: number[][] = [];
    vectors.forEach(it => {
      values.push(it.fields[0].values.toArray());
    });

    const temp = [];
    for (let i of time.keys()) {
      const vec = [];
      values.forEach(val => {
        vec.push(val[i]);
      });
      vec.push(time[i]);
      temp.push(vec);
    }

    const data = new GrafanaData();
    data.inputGrafanaValues = temp;
    return data;
  }
}
