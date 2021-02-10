import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage:any;
  name:string;
  
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AccessProviders,
    private storage : Storage,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
        console.log(res);
        this.datastorage = res;
        this.name = this.datastorage.name;
    });
}

async processlogout(){
  this.storage.clear();
  this.navCtrl.navigateRoot(['/intro']);
  const toast = await this.toastCtrl.create({
    message: 'Logout Successful',
    duration:1500
  });
  toast.present();
}

opennew(){
  this.router.navigate(['/newsurvey']);
}

openff(){
  this.router.navigate(['/ff']);
}

opennotsent(){
  this.router.navigate(['/notsent']);
}

opensent(){
  this.router.navigate(['/sent']);
}

openupdate(){
  this.router.navigate(['/update']);
}

opensettings(){
  this.router.navigate(['/settings']);
}

}
