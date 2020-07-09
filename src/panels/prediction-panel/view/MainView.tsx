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
  valuesX: number[];
  valuesY: number[];
  panelopt: any;
  paneldata: PanelData;
  panelwidth: number;
  panelheight: number;
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

export class MainView extends PureComponent<Props> {
  render() {
    const styles = getStyles();
    const { type, coefficents, opt, valuesX, valuesY } = this.props;
    console.log(type + coefficents + opt);
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
              x: valuesX,
              y: valuesY,
              type: 'scatter',
              mode: 'lines',
              marker: { color: 'green' },
            },
            {
              x: valuesX,
              y: valuesY,
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
