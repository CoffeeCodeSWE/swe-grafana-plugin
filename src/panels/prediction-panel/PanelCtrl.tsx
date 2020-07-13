/*
 * File: PanelCtrl.tsx
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: Controller del panel plug-in
 */

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
  valuesX: number[] = [];
  valuesY: number[] = [];

  constructor(props: PanelProps) {
    super(props);
    this.model = new Model();
  }

  private setData() {
    this.model.setData(GrafanaData.readValues(this.props.data.series));
  }

  private setPredictor() {
    if (this.props.options.predictor) {
      this.model.setPredictor(this.props.options.predictor);
    }
  }

  private predict() {
    this.lv = this.model.predict();
    this.time = new Date();
  }

  private addValues() {
    this.valuesX?.push(this.time.getTime());
    this.valuesY?.push(this.lv);
  }

  private writeInflux() {
    this.model.writeInflux();
  }

  private update() {
    this.setData();
    this.setPredictor();
    this.predict();
    this.writeInflux();
    this.addValues();
  }

  render() {
    const { options, data, width, height } = this.props;
    this.update();
    const { predictor } = this.props.options;
    return (
      <div>
        <MainView
          type={predictor.type}
          coefficents={predictor.coefficients}
          opt={predictor.opt}
          lv={this.lv}
          time={this.time.getTime()}
          panelopt={options}
          paneldata={data}
          panelwidth={width}
          panelheight={height}
        />
      </div>
    );
  }
}
