import { DatabaseService, DetailsInterface } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { DatasetService } from '../../providers/dataset.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notsent',
  templateUrl: './notsent.page.html',
  styleUrls: ['./notsent.page.scss'],
})
export class NotsentPage implements OnInit {

  /*selectedView = 'devs';
  id: number;
  region: string="";
  district: string="";
  subcounty: string="";
  topic: string="";
  activity: string="";
  Photo_url: string="";
  males: string="";
  females: string="";
  total: string="";
  lo: string="";
  la: string="";
  */
  id: number;
  fo: string="";
  disabledButton;

  
  consent:string="";
  farmers_name:string="";
  do_you_have_disability:string="";
  disability_type:string="";
//More columns to be added.

 details: DetailsInterface[];



  constructor(private db: DatabaseService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private accsPrvds : DatasetService,
    private loadingCtrl: LoadingController,
    private router:Router,
    ) { }

  ngOnInit() {
    //this.db.getAllDetails().then(data => this.details = data);
  }

  ionViewDidEnter() {
    this.db.getAllDetails().then(data => this.details = data);
    //Checking for the network connectivity every after some milliseconds
    setInterval(() => {
      //this.network.initializeNetworkEvents();
    }, 300);

  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:5000,
    });
    toast.present();
  }

  deleteDetails(id: number) {
    this.db.deleteDetails(id)
      .then(data => this.details = data);
      this.presentToast("You have deleted this activity");     
  }

  dismissOnSubmit(id: number){
    this.db.deleteDetails(id)
      .then(data => this.details = data);
      this.presentToast("You activity has been submitted successfully");
  }
  //submitting data that is stored locally, more columns to be added. 
  async SubmitOfflineData(id: number, consent: string, farmers_name:string, do_you_have_disability:string, disability_type:string){
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait as we upload your offline data',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'submit',
//More columns to be added below
          consent: consent,
          farmers_name:farmers_name,
          do_you_have_disability:do_you_have_disability,
          disability_type:disability_type
          }
          this.accsPrvds.postData(body, 'process2.php').subscribe((res:any)=> {
                      if(res.success==true){
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                          this.router.navigate(['/beneficiary']);
                          this.dismissOnSubmit(id);

                      }else{
                        loader.dismiss();
                        this.disabledButton = false;
                        this.presentToast(res.msg);
                      }
                },(err)=>{
                  loader.dismiss();
                  this.disabledButton = false;
                  this.AlertforOfflineSubmission('Check your internet');
                  console.log('Error ', err);
          });

    });

} 
//More column names to be added
async AlertforOfflineSubmission(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          //More columns to be added
          this.SubmitOfflineData(this.id,this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type);
          
        }
      },
      {
        text: 'Cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          
        }
      }
      
    ]
  });

  await alert.present();
}
//ok
  async presentAlertforDelete(a:string, id:number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete Activity',
          handler: () => {
            this.deleteDetails(id);
          }
        },
         {
          text: 'Cancel',
          handler: () => {
           // this.Submit();
          }
        }
        
      ]
    });

    await alert.present();
  }
}
