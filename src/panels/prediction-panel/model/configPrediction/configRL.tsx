import React from 'react';
import { PureComponent, ChangeEvent } from 'react';
import { Props } from '../../props';
import { PanelEditorProps } from '@grafana/data';
import '../../view/style/panel.css';

export class ConfigRL extends PureComponent<PanelEditorProps<Props>> {
  render() {
    let { predictor } = this.props.options;
    if (!this.props.options.predictor.opt) {
      this.props.options.predictor.opt = { ...predictor.opt, toPredict: 0 };
    }
    return (
      <div>
        <div className="panel">
          <div className="panel-title">Seleziona query</div>
          <div className="gf-form-select-wrapper max-width-10">
            <select className="input-small gf-form-input" onChange={event => this.showQueryAssociations(event)}>
              {this.queryAssociations()}
            </select>
          </div>
        </div>
      </div>
    );
  }

  private queryNames() {
    return this.props.data.series.map(t => {
      return t.name;
    });
  }

  private queryAssociations() {
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
    this.props.options.predictor.opt = {
      ...this.props.options.predictor.opt,
      toPredict: Number.parseInt(event.target.value, 10),
    };
    this.render();
  }
}
