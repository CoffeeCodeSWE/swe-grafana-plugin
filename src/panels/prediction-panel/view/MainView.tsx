import React from 'react';
import { PureComponent } from 'react';
import Plot from 'react-plotly.js';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { PanelData } from '@grafana/data/types/panel';
interface Props {
  type: string;
  coefficents: any[];
  opt: any;
  lv: number;
  time: Date;
  panelopt: any;
  paneldata: PanelData;
  panelwidth: number;
  panelheight: number;
}

export class MainView extends PureComponent<Props> {
  valuesX!: number[];
  valuesY!: number[];

  addValueX(v: Date) {
    console.log('dentro addValueX, v (Date) è: ' + v);
    var d = Date.parse(v.getTime().toLocaleString());
    this.valuesX?.push(d);
    console.log('aggiunto un valore all array del tempo (x)');
  }

  addValueY(v: number) {
    console.log('dentro addValueY, v (number) è: ' + v);
    this.valuesY?.push(v);
    console.log('aggiunto un valore all array dei valori (y)');
  }

  render() {
    const styles = getStyles();
    const { type, coefficents, opt, lv, time } = this.props;
    console.log(type + coefficents + opt + lv + time);
    this.addValueX(time);
    this.addValueY(lv);
    return (
      /*<div>
        <Plot
          data={[
            {
              x: [1, 4, 5],
              y: [6, 3, 9],
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
      </div>*/
      <div
        className={cx(
          styles.wrapper,
          css`
            width: ${this.props.panelwidth}px;
            height: ${this.props.panelheight}px;
          `
        )}
      >
        <Plot
          className={cx(styles.plot)}
          data={[
            {
              x: [4, 2, 0],
              y: [4, 2, 0],
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'green' },
            },
            {
              x: [4, 2, 0],
              y: [4],
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'red' },
              showlegend: false,
              hoverinfo: 'none',
            },
          ]}
          layout={{
            width: this.props.panelwidth,
            height: this.props.panelheight,
            autosize: true,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
          }}
        />
      </div>
    );
  }
}

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      border: 1px solid blue;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    plot: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0px;
    `,
  };
});
