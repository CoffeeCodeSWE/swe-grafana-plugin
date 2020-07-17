/*
 * File: module.ts
 * Version: v3.11-1.0.0
 * Date: 2020-05-25
 * Description: Configurazione e creazione del panel plug-in e dell'EditorView
 */

import { PanelPlugin } from '@grafana/data';
import { EditorView } from './view/EditorView';
import { PanelCtrl } from './PanelCtrl';

export const plugin = new PanelPlugin(PanelCtrl);
plugin.setEditor(EditorView);
