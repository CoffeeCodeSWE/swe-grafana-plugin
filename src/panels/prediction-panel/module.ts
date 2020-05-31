import { PanelPlugin } from '@grafana/data';
import { EditorView } from './EditorView';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin(SimplePanel);
plugin.setEditor(EditorView);
