import React from 'react';
import { PureComponent } from 'react';
//import Plot from 'react-plotly.js';

interface Props {
  lv: number;
  time: Date;
}

export class MainView extends PureComponent<Props> {
  valuesX!: number[];
  valuesY!: number[];

  addValueX(v: Date) {
    var d = Date.parse(v.getTime().toLocaleString());
    this.valuesX.push(d);
    console.log('aggiunto un valore all array del tempo (x)');
  }

  addValueY(v: number) {
    this.valuesY.push(v);
    console.log('aggiunto un valore all array dei valori (y)');
  }

  render() {
    const { lv, time } = this.props;
    this.addValueX(time);
    this.addValueY(lv);
    console.log('chiamato render di MainView.tsx');
    return <div>Ciao</div>;
    /*return (
      <div>
        <Plot
          data={[
            {
              x: this.valuesX,
              y: this.valuesY,
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'green' },
            },
          ]}
          layout={{
            width: 800,
            height: 100,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
          }}
        />
      </div>
    );*/
  }
}
