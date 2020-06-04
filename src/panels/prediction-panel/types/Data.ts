import { DataFrame } from '@grafana/data';

export class GrafanaData {
  inputGrafanaValues!: number[][];
  outputValues?: number[][];

  //legge i valori in input da grafana
  static readValues(series: DataFrame[]): GrafanaData {
    console.log('sono entrato in GrafanaData.readValues(), come series ho ricevuto: ');
    console.log(series);

    if (!series[0] || !series[1]) {
      throw new Error('È necessario impostare almeno 2 query');
    }

    //invertire time e values
    const time = series[0].fields[1].values.toArray();
    console.log('time= ' + time);
    const values: number[][] = [];
    series.forEach(it => {
      values.push(it.fields[0].values.toArray());
    });
    console.log('values= ' + values);
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
    console.log('alla fine di readValues ritorno questo: ');
    console.log(data);
    return data;
  }
}
