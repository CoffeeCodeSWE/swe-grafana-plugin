//import { PluginMeta } from '@grafana/data';

export class ExampleConfigCtrl {
  static templateUrl: string;
  enabled: boolean;
  appEditCtrl: any;
  appModel: any;

  /** @ngInject */
  constructor($scope: any, $injector: any) {
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
    this.enabled = false;
    if (!this.appModel.jsonData) {
      this.appModel.jsonData = {};
    }

    // Required until we get the types sorted on appModel :(
    const appModel = this.appModel as any;
    if (!appModel.jsonData) {
      appModel.jsonData = {};
    }

    console.log(this);
  }

  postUpdate() {
    if (!this.appModel?.enabled) {
      console.log('Not enabled...');
      return;
    }

    this.enabled = true;
    console.log('Post Update:', this);
  }
}
