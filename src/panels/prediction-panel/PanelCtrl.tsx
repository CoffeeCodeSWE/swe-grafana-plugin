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
    console.log(
      'dentro setPredictor di PanelCtrl, setto this.props.options.predictor, che è ' + this.props.options.predictor
    );
    this.model.setPredictor(this.props.options.predictor);
  }

  private predict() {
    this.lv = this.model.predict();
    this.time = new Date();
  }

  private addValues() {
    //console.log('this.lv=' + this.lv);
    this.valuesX?.push(this.time.getTime());
    this.valuesY?.push(this.lv);
    //console.log('this.valuesY?.push(this.lv);' + this.valuesY);
  }

  private update() {
    this.setData();
    this.setPredictor();
    this.predict();
    this.addValues();
  }

  render() {
    const { options, data, width, height } = this.props;
    this.update();
    console.log('chiamato render di panelctrl, ho come this.lv e this.time questo: ');
    console.log(this.lv);
    console.log(this.time);
    //console.log('this.valuesX= ' + this.valuesX);
    //console.log('this.valuesY= ' + this.valuesY);
    const { predictor } = this.props.options;
    return (
      <div>
        <MainView
          type={predictor.type}
          coefficents={predictor.coefficients}
          opt={predictor.opt}
          valuesX={this.valuesX}
          valuesY={this.valuesY}
          panelopt={options}
          paneldata={data}
          panelwidth={width}
          panelheight={height}
        />
      </div>
    );
  }
}
