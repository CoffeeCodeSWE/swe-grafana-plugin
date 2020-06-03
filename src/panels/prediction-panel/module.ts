import { PanelPlugin } from '@grafana/data';
import { EditorView } from './view/EditorView';
import { PanelCtrl } from './PanelCtrl';

export const plugin = new PanelPlugin(PanelCtrl);
plugin.setEditor(EditorView);
