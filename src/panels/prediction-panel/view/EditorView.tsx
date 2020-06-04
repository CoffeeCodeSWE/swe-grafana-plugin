import React from 'react';
import { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
import { Props } from '../props';
import './style/panel.css';
import { Predictor } from '../types/Predictor';
import '../model/strategies';
import { configs } from '../model/strategies';

const inputStyle = {
  backgroundColor: '#212124',
  display: 'block',
  margin: 'auto',
  height: 'max-content',
  paddingTop: '30px',
};

const setQueriesStyle = {
  backgroundColor: '#212124',
  display: 'block',
  margin: 'auto',
  height: '100px',
  paddingTop: '20px',
};
export class EditorView extends PureComponent<PanelEditorProps<Props>> {
  getUploadedFile = (e: { target: { files: any } }) => {
    console.log('chiamato getuploadedfile editorview');
    const reader = new FileReader();
    let files = e.target.files;
    if (!files) {
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
    let SetQueries;
    if (this.props.options.predictor) {
      const { type } = this.props.options.predictor;
      if (configs[type]) {
        SetQueries = configs[type];
      } else {
        SetQueries = typeof React.PureComponent;
      }
    } else {
      SetQueries = typeof React.PureComponent;
    }

    console.log('chiamato render() editorview');

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
        <SetQueries style={setQueriesStyle} data={this.props.data} options={this.props.options} />
      </div>
    );
  }
}
