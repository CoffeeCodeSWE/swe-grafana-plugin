import React from 'react';
import { PureComponent } from 'react';
import { GrafanaData } from './types/Data';
import { Model } from './model/model';
import { MainView } from './view/MainView';
import { PanelProps } from '@grafana/data';
import { Props } from './props';

export class PanelCtrl extends PureComponent<PanelProps<Props>> {
  private model: Model;
  private lv!: number;
  private time!: Date;

  constructor(props: PanelProps) {
    super(props);
    this.model = new Model();
  }

  private setData() {
    this.model.setData(GrafanaData.readValues(this.props.data.series));
  }

  private setPredictor() {
    console.log(
      'dentro setPredictor di PanelCtrl, setto this.props.options.predictor, che è ' + this.props.options.predictor
    );
    this.model.setPredictor(this.props.options.predictor);
  }

  private predict() {
    this.lv = this.model.predict();
    this.time = new Date();
  }

  private update() {
    this.setData();
    this.setPredictor();
    this.predict();
  }

  render() {
    const { options, data, width, height } = this.props;
    this.update();
    console.log('chiamato render di panelctrl, ho come this.lv e this.time questo: ');
    console.log(this.lv);
    console.log(this.time);
    const { predictor } = this.props.options;
    return (
      <div>
        <MainView
          type={predictor.type}
          coefficents={predictor.coefficients}
          opt={predictor.opt}
          lv={this.lv}
          time={this.time}
          panelopt={options}
          paneldata={data}
          panelwidth={width}
          panelheight={height}
        />
      </div>
    );
  }
}
