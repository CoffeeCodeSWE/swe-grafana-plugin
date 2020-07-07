// Angular pages
import { MainConfig } from './components/config';
import { AppPlugin } from '@grafana/data';

// Legacy exports just for testing
export { MainConfig as ConfigCtrl };

export const plugin = new AppPlugin();
