import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-newsurvey',
  templateUrl: './newsurvey.page.html',
  styleUrls: ['./newsurvey.page.scss'],
})
export class NewsurveyPage implements OnInit {

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage : Storage
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
}
