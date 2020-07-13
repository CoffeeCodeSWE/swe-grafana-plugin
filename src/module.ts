/*
 * File: module.ts
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: Configurazione e creazione dell'app plug-in
 * Remarks: Angular e non react per questioni di compatibilità del componente con Grafana
 */

import { MainConfig } from './components/config';
import { AppPlugin } from '@grafana/data';

export { MainConfig as ConfigCtrl };
export const plugin = new AppPlugin();
