import { PanelPlugin } from '@grafana/data';
import { EditorView } from './EditorView';
import { PanelCtrl } from './PanelCtrl';

export const plugin = new PanelPlugin(PanelCtrl);
plugin.setEditor(EditorView);
