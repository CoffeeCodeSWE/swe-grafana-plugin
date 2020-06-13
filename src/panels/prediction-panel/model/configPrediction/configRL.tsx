import React from 'react';
import { PureComponent, ChangeEvent } from 'react';
import { Props } from '../../props';
import { PanelEditorProps } from '@grafana/data';
import '../../view/style/panel.css';

export class ConfigRL extends PureComponent<PanelEditorProps<Props>> {
  bohprova() {
    alert('proviamo');
  }

  render() {
    //console.log('render() di configRL');
    let { predictor } = this.props.options;
    //console.log('predictor di render() di configRL= ' + predictor);
    if (!this.props.options.predictor.opt) {
      this.props.options.predictor.opt = { ...predictor.opt, toPredict: 0 };
    }
    //console.log(this.props);
    return (
      <div>
        <div className="panel">
          <div className="panel-title">Seleziona query</div>
          <div className="gf-form-select-wrapper max-width-10">
            <select className="input-small gf-form-input" onChange={event => this.showQueryAssociations(event)}>
              {this.queryAssociations()}
            </select>
          </div>
          <div>
            <button type="button" className="btn navbar-button gf-timepicker-nav-btn" onClick={this.bohprova}>
              Avvia predizione
            </button>
          </div>
        </div>
      </div>
    );
  }

  private queryNames() {
    //console.log('getN');
    //console.log('this.props.data= ' + this.props.data);
    return this.props.data.series.map(t => {
      return t.name;
    });
  }

  private queryAssociations() {
    console.log('queryopt');
    const name = this.queryNames();
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

  private showQueryAssociations(event: ChangeEvent<HTMLSelectElement>) {
    console.log('setP');
    this.props.options.predictor.opt = {
      ...this.props.options.predictor.opt,
      toPredict: Number.parseInt(event.target.value, 10),
    };
    this.render();
  }
}
