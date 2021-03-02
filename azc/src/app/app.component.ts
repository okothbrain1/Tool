import { NetworkService, ConnectionStatus } from './services/network.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { OfflineManagerService } from './services/offline-manager.service';




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
    private networkService: NetworkService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
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

}
}
