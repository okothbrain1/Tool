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

  selectedView = 'devs';
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
  fo: string="";
  disabledButton;

 // developers: Dev[] = [];

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
  async SubmitOfflineData(id: number, region: string, district:string, subcounty:string, topic:string,activity:string,Photo_url:string,males:string,females:string,total:string,la:string,lo:string,fo:string){
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait as we upload your offline data',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'submit',
          region:region,
          district:district,
          subcounty:subcounty,
          topic:topic,
          activity:activity,
          Photo_url:Photo_url,
          males:males,
          females:females,
          total:total,
          lo:lo,
          la:la,
          fo:fo
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

async AlertforOfflineSubmission(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          this.SubmitOfflineData(this.id,this.region, this.district, this.subcounty,this.topic,this.activity,this.Photo_url,this.males,this.females,this.total,this.la,this.lo,this.fo);
          
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
