import React, { PureComponent } from 'react';
import { PanelEditorProps } from '@grafana/data';
//import { Props } from './props';
import './style/panel.css';
import { Predictor } from './model/Predictor';
export class EditorView extends PureComponent<PanelEditorProps> {
  getUploadedFile = (e: { target: { files: any } }) => {
    console.log('chiamato getuploadedfile editorview');
    const reader = new FileReader();
    let files = e.target.files,
      message: string;
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
      } catch (e) {
        alert(e);
      }
      if (message) {
        this.setState({ ...this.state, message });
      }
      this.render();
    };
  };

  render() {
    console.log('chiamato render() editorview');
    this.state = { message: 'Messaggio iniziale' };
    //const { type } = this.props.options.predictor;
    const inputStyle = {
      backgroundColor: '#212124',
      display: 'block',
      margin: 'auto',
      height: 'max-content',
      paddingTop: '30px',
    };
    return (
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
    );
  }
}
