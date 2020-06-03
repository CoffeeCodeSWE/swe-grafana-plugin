import React from 'react';
import { PureComponent } from 'react';
import { GrafanaData } from './model/Data';
import { Model } from './model/model';
import { MainView } from './MainView';
import { PanelProps } from '@grafana/data';
import { Props } from './props';

export class PanelCtrl extends PureComponent<PanelProps<Props>> {
  private model: Model;
  private lv!: number;
  private time!: Date;

  constructor(p: PanelProps) {
    super(p);
    this.model = new Model();
  }

  private setData() {
    this.model.setData(GrafanaData.readValues(this.props.data.series));
  }

  private setPredictor() {
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
    this.update();
    console.log('chiamato render di panelctrl, ho come this.lv e this.time questo: ');
    console.log(this.lv);
    console.log(this.time);
    return (
      <div>
        <MainView lv={this.lv} time={this.time} />
      </div>
    );
  }
}
