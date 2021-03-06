/*
 * File: MainView.tsx
 * Version: v3.11-1.0.0
 * Date: 2020-05-25
 * Description: View del pannello del plug-in (w/ plotly)
 */

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
  time: number;
  panelopt: any;
  paneldata: PanelData;
  panelwidth: number;
  panelheight: number;
}

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      border: 0px solid;
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

export class MainView extends PureComponent<Props> {
  valuesX: number[] = [];
  valuesY: number[] = [];

  render() {
    const styles = getStyles();
    const { type, coefficents, opt, lv, time } = this.props;
    this.valuesX.push(time);
    this.valuesY.push(lv);
    console.log(type + coefficents + opt + lv);
    return (
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
              x: this.valuesX,
              y: this.valuesY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'green' },
            },
            {
              x: this.valuesX,
              y: this.valuesY,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'green' },
              showlegend: false,
              hoverinfo: 'none',
            },
          ]}
          layout={{
            title: 'Prediction values',
            xaxis: {
              title: 'Time',
              showgrid: false,
            },
            yaxis: {
              title: 'Values',
            },
            width: this.props.panelwidth,
            height: this.props.panelheight,
            autosize: false,
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
          }}
        />
      </div>
    );
  }
}
