import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
//import { Props } from './props';
//import { Predictor } from 'types/types';
import './style/panel.css';
import { Predictor } from 'types/types';

//import { PanelOptionsGrid, PanelOptionsGroup } from '@grafana/ui';

export class EditorView extends PureComponent<PanelEditorProps> {
  private import(target: HTMLInputElement) {
    const reader = new FileReader();
    if (!target.files) {
      throw new Error('Seleziona un file');
    }
    reader.readAsText(target.files[0]);
    reader.onload = event => {
      try {
        this.props.options.predictor = Predictor.readJson(event.target?.result);
        alert('File caricato con successo');
      } catch (e) {
        alert(e);
      }
      this.render();
    };
  }

  render() {
    const { type } = this.props.options.predictor;
    
    return (
      <div className="panel">
        <div className="panel-title">Inserimento predittore</div>
        <input
          className="input gf-input gf-file centered-input"
          type="file"
          name="Import"
          id="import"
          onChange={event => this.import(event.target)}
        />
      </div>
    );
  }
}
