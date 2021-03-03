import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  datastorage:any;
  name:string;
  email:string;
  gender:string;
  dob:string;
  

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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
        this.email = this.datastorage.email;
        this.gender = this.datastorage.gender;
        this.dob = this.datastorage.dob;
        this.phone = this.datastorage.phone;
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
}
