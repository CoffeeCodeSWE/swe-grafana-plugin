/*
 * File: module.ts
 * Version: v3.11-1.0.0
 * Date: 2020-05-25
 * Description: Configurazione e creazione dell'app plug-in
 * Remarks: Angular e non react per questioni di compatibilità del componente con Grafana
 */

import { MainConfig } from './components/config';
import { AppPlugin } from '@grafana/data';

export { MainConfig as ConfigCtrl };
export const plugin = new AppPlugin();
