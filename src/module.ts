// Angular pages
import { ExampleConfigCtrl } from './components/config';
import { AppPlugin } from '@grafana/data';

// Legacy exports just for testing
export { ExampleConfigCtrl as ConfigCtrl };

export const plugin = new AppPlugin();
