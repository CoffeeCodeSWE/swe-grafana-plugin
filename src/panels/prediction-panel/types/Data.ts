/*
 * File: Data.ts
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: File contenente la classe dei dati input e output di Grafana
 */

import { DataFrame } from '@grafana/data';

export class GrafanaData {
  inputGrafanaValues!: number[][];
  outputValues?: number[][];

  static readValues(series: DataFrame[]): GrafanaData {
    if (!series[0] || !series[1]) {
      throw new Error('È necessario impostare almeno 2 query');
    }

    const time = series[0].fields[1].values.toArray();
    const values: number[][] = [];
    series.forEach(it => {
      values.push(it.fields[0].values.toArray());
    });

    const temp = [];
    for (const i of time.keys()) {
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
