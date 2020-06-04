import React from 'react';
import { PureComponent, ChangeEvent } from 'react';
import { Props } from '../../props';
import { PanelEditorProps } from '@grafana/data';
import '../../view/style/panel.css';

//copiata, da capire come farla bene noi
export class ConfigRL extends PureComponent<PanelEditorProps<Props>> {
  private getN() {
    console.log('getN');
    console.log('this.props.data= ' + this.props.data);
    return this.props.data.series.map(serie => {
      return serie.name || 'aaaa';
    });
  }

  private queryOpt() {
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

  private setP(event: ChangeEvent<HTMLSelectElement>) {
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
    console.log('predictor di render() di configRL= ' + predictor);
    if (!this.props.options.predictor.opt) {
      this.props.options.predictor.opt = { ...predictor.opt, toPredict: 0 };
    }
    console.log(this.props);
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
