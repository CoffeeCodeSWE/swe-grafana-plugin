import React from 'react';
import { PureComponent, ChangeEvent } from 'react';
import { Props } from '../../props';
import { PanelEditorProps } from '@grafana/data';
import '../../style/panel.css';

//copiata, da capire come farla bene noi
export class ConfigRL extends PureComponent<PanelEditorProps<Props>> {
  getN() {
    console.log('getN');
    return this.props.data.series.map(serie => {
      return serie.name || 'aaaa';
    });
  }
  queryOpt() {
    console.log('queryopt');
    const name = this.getN();
    const { opt } = this.props.options.predictor;
    const options: JSX.Element[] = [];
    for (const i of name.keys()) {
      options.push(
        <option value={i} selected={opt.toPredict === i}>
          {name[i]}
        </option>
      );
    }
    return options;
  }

  setP(event: ChangeEvent<HTMLSelectElement>) {
    console.log('setP');
    this.props.options.predictor.opt = {
      ...this.props.options.predictor.opt,
      toPredict: Number.parseInt(event.target.value, 10),
    };
    this.render();
  }

  render() {
    console.log('render() di configRL');
    let { predictor } = this.props.options;
    if (!this.props.options.predictor.opt) {
      this.props.options.predictor.opt = { ...predictor.opt, toPredict: 0 };
    }
    return (
      <div>
        <div className="panel">
          <div className="panel-title">Associa queries</div>
          <div className="gf-form-label width-10" style={{ display: 'inline-block' }}>
            <select className="input-small gf-form-input" onChange={event => this.setP(event)}>
              {this.queryOpt()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
