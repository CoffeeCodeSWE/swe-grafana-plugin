/*
 * File: module.ts
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: Configurazione e creazione del panel plug-in e dell'EditorView
 */

import { PanelPlugin } from '@grafana/data';
import { EditorView } from './view/EditorView';
import { PanelCtrl } from './PanelCtrl';

export const plugin = new PanelPlugin(PanelCtrl);
plugin.setEditor(EditorView);
