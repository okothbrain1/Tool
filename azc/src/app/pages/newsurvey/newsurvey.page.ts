import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
//new
import { AccessProviders } from 'src/app/page/providers/access-providers';

@Component({
  selector: 'app-newsurvey',
  templateUrl: './newsurvey.page.html',
  styleUrls: ['./newsurvey.page.scss'],
})
export class NewsurveyPage implements OnInit {

  token: string;
  datastorage: any;
  name: string;
  email: string;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage : Storage,
    //new
    private accsPrvds : AccessProviders,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
  }

newagenttool(){
  this.router.navigate[('/agent')];
}
newbentool(){
  this.router.navigate[('/beneficiary')];
}

doRefresh(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}
ionViewDidEnter() {
  /*this.storage.get('ug').then((res)=>{
    console.log(res);
    this.datastorage = res;
    this.email = this.datastorage.email;
    this.token= this.datastorage.token;
    this.disabledButton = false;
});*/
this.storage.get('storage_xxx').then((res)=>{
  console.log(res);
  this.datastorage = res;
  this.email = this.datastorage.email;
});
}

disabledButton
//Try for UIA
async tryUIA (){
  if(this.token==""){
    this.presentToast('Enter token to proceed');
  }
  
  else{
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait ...',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'checktoken',
          token:this.token,
          email:this.datastorage.email    
          }
                this.accsPrvds.postData(body, 'process.php').subscribe((res:any)=> {
                      if(res.success==true){
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast('Welcome to the SME Registration tool');             
                          this.navCtrl.navigateRoot(['/beneficiary']);
                          this.storage.set('ug', res.result); //create storage session
                      }else{
                         loader.dismiss();
                         this.disabledButton = false;
                         this.presentToast('You entered an incorrect token');
                      }
                },(err)=>{
                  loader.dismiss();
                  this.disabledButton = false;
                  this.presentToast('An error has occurred, try again.');
                });
    });
  }
}


//YAP
async tryYAPP (){
  if(this.token==""){
    this.presentToast('Enter token to proceed');
  }
  
  else{
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait ...',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'checktoken',
          token:this.token,
          email:this.datastorage.email
          
          }
                this.accsPrvds.postData(body, 'process.php').subscribe((res:any)=> {
                      if(res.success==true){
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast('Welcome to the YAPP tool');
                          this.storage.set('ug', res.result); //create storage session
                          this.navCtrl.navigateRoot(['/agent']);
                      }else{
                        loader.dismiss();
                         this.disabledButton = false;
                         this.presentToast('You entered an incorrect token');
                      }
                },(err)=>{
                  loader.dismiss();
                  this.disabledButton = false;
                  this.presentToast('An error has occurred, try again.');
                });
    });
  }
}

async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration:1500,
  });
  toast.present();
}


}
