/*
 * File: config.ts
 * Version:
 * Date: 2020-05-25
 * Author:
 * Description: Pagina di configurazione del plug-in
 */

export class MainConfig {
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

MainConfig.templateUrl = 'components/config.html';
