import { NetworkService, ConnectionStatus } from './services/network.service';
import { Component } from '@angular/core';

import { Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { OfflineManagerService } from './services/offline-manager.service';


import { Location } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private offlineManager: OfflineManagerService,
    private networkService: NetworkService,

    private _location: Location,
    public alertController: AlertController

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });

    this.storage.get('storage_xxx').then((res)=>{
    if(res == null){
      this.navCtrl.navigateRoot('/intro');
    }else{
      this.navCtrl.navigateRoot('/home');
    }
  })

  this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
    if (status == ConnectionStatus.Online) {
      this.offlineManager.checkForEvents().subscribe();
    }
  });



  //new
  this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    console.log('Back press handler!');
    if (this._location.isCurrentPathEqualTo('/home')) {

      // Show Exit Alert!
      console.log('Show Exit Alert!');
      this.showExitConfirm();
      processNextHandler();
    }
    else if(this._location.isCurrentPathEqualTo('/farmerprofile')){
      // Show Exit Alert!
      console.log('Show Exit Alert!');
      this.showExitConfirm();
      processNextHandler();
    }
    else {

      // Navigate to back page
      console.log('Navigate to back page');
      this._location.back();

    }

  });

  this.platform.backButton.subscribeWithPriority(5, () => {
    console.log('Handler called to force close!');
    this.alertController.getTop().then(r => {
      if (r) {
        navigator['app'].exitApp();
      }
    }).catch(e => {
      console.log(e);
    })
  });

}


//new
showExitConfirm() {
  this.alertController.create({
    header: 'Exit Request',
    message: 'Ensure that you have saved your data!',
    backdropDismiss: false,
    buttons: [{
      text: 'Stay',
      role: 'cancel',
      handler: () => {
        console.log('Application exit prevented!');     
      }
    }, {
      text: 'Exit',
      handler: () => {
        navigator['app'].exitApp();
      }
    }]
  })
    .then(alert => {
      alert.present();
    });
}
}
