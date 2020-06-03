import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { Props } from '../props';
import './style/panel.css';
import { Predictor } from '../types/Predictor';

export class EditorView extends PureComponent<PanelEditorProps<Props>> {
  getUploadedFile = (e: { target: { files: any } }) => {
    console.log('chiamato getuploadedfile editorview');
    const reader = new FileReader();
    let files = e.target.files;
    if (!e.target.files) {
      throw new Error('Seleziona un file');
    }
    reader.readAsText(files[0]);
    reader.onload = event => {
      try {
        this.props.options.predictor = Predictor.readJson(event.target?.result);
        console.log('questo è quello che ho letto:');
        console.log(this.props.options.predictor);
        alert('File selezionato correttamente');
      } catch (a) {
        alert(a);
      }
      this.render();
    };
  };

  render() {
    console.log('chiamato render() editorview');
    const inputStyle = {
      backgroundColor: '#212124',
      display: 'block',
      margin: 'auto',
      height: 'max-content',
      paddingTop: '30px',
    };
    return (
      <div>
        <div className="panel">
          <div className="panel-title">Inserimento predittore</div>
          <input
            className="input gf-input gf-file"
            style={inputStyle}
            type="file"
            name="Input"
            id="input"
            onChange={this.getUploadedFile}
          />
        </div>
      </div>
    );
  }
}
