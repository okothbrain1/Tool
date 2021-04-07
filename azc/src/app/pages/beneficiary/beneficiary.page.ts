import { Platform } from '@ionic/angular';

import { Component, OnInit,  NgZone } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatasetService } from '../../providers/dataset.service';
import { ApiService } from '../../services/api.service';
import { NetworkService } from '../../services/network.service';

import { Storage } from '@ionic/storage';

import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';


import { Observable } from 'rxjs/Observable';

import { DatabaseService, DetailsInterface } from './../../services/database.service';


@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.page.html',
  styleUrls: ['./beneficiary.page.scss'],
})
export class BeneficiaryPage implements OnInit {

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
lo: string="";
la: string="";
fo: string="";
disabledButton;

  currentImage: any;
  ib: any;

  latitude: any = 0;
  longitude: any = 0;
  name:string;
  datastorage:any;
  
  details: DetailsInterface[];


  constructor(
    private router:Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : DatasetService,
    private camera: Camera,

    private geolocation: Geolocation,
    private apiService: ApiService, 
    private plt: Platform,
    private storage : Storage,
    private toastCtrl: ToastController,
    private transfer : FileTransfer,
    private filePath: FilePath,
    private FileChooser: FileChooser,
    private webview: WebView,
    private file: File,

    private network: NetworkService,

    private http: HttpClient,
    private db: DatabaseService
  ) { 

  }


  ngOnInit() {
    
  }

  


  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.disabledButton = false;
  });
    this.db.getAllDetails().then(data => this.details = data);
    //Checking for the network connectivity every after some milliseconds
    setInterval(() => {
      this.network.initializeNetworkEvents();
    }, 300);

  }

  
  addDetails(region: string, district:string, subcounty:string,topic:string,activity:string,Photo_url:string,males:string,females:string,la:string,lo:string,fo:string) {
    
  if(this.region==""){
      this.presentToast('The region is required');
  }else if(this.district==""){
    this.presentToast('The district is required');
  }else if(this.subcounty==""){
    this.presentToast('The subcounty is required');
  }else if(this.topic==""){
    this.presentToast('The topic is required');
  }else if(this.activity==""){
    this.presentToast('The activity is required');
  }else if(this.Photo_url==""){
    this.presentToast('Take a photo of the event to continue');
  }else if(this.males==""){
    this.presentToast('The number of male attendance is required');
  }else if(this.females==""){
    this.presentToast('The number of female attendance is required');
  }else if(this.lo==""){
    this.presentToast('Press the Get location button to get current location');
  }else if(this.la==""){
    this.presentToast('Press the Get location button to get current location');
  }else{
      this.db.addDetails(region, district, subcounty,topic,activity,Photo_url,males,females,la,lo,fo).then(data => {
        this.details = data;

      });
      this.presentToast("Your activity has been saved locally, you can submit it later");
      this.disabledButton = false;
      this.region ="";
      this.district ="";
      this.subcounty ="";
      this.topic ="";
      this.activity ="";
      this.Photo_url ="";
      this.males ="";
      this.females ="";
      this.lo ="";
      this.la ="";
      this.currentImage="";
      this.router.navigate(['/beneficiary']);
      
    }
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

    //show or hide the div when the button is clicked
    hideShowMe=false;
    buttonTitle:string = "Click to show";
    hideShow() {
      if(this.hideShowMe==false){
        this.hideShowMe = true;
        this.buttonTitle;
      }
      else{
        this.hideShowMe = false;
        this.buttonTitle="Click to hide";
      }
    }
    

  takePicture() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      this.ib = imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
      this.presentToast('Error taking Photo ' + err);
    });
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600,
    saveToPhotoAlbum: true,
    targetWidth: 50,
    targetHeight: 50,
    correctOrientation:true
  };

  
  // use geolocation to get user's device coordinates
  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition({
      timeout:30000,
      maximumAge: 60000, 
      enableHighAccuracy: true
    }).then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
       this.presentToast('Error getting GPS location ' + error);
     });
  }


  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:5000,
    });
    toast.present();
  }


//adding sqlite offline data to the end point.
async SubmitOfflineData(id: number, region: string, district:string, subcounty:string, topic:string,activity:string,Photo_url:string,males:string,females:string,la:string,lo:string,fo:string){
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
                          this.region ="";
                          this.district ="";
                          this.subcounty ="";
                          this.topic ="";
                          this.activity ="";
                          this.Photo_url ="";
                          this.males ="";
                          this.females ="";
                          this.lo ="";
                          this.la ="";
                          this.currentImage="";

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

//pending submission 



// submit data to the end point when you have an active internet connection
  async Submit(){
    /*console.log(ImageData);
    console.log(Option);   
    let url = 'http://3.12.97.246/azcollect/api/upload.php';
    let postData = new FormData();
    postData.append('file', this.currentImage);
    let data:Observable<any> = this.http.post(url, postData);
    data.subscribe((result) => {
      console.log(result);
    })*/
    
    if(this.region==""){
        this.presentToast('The region is required');
    }else if(this.district==""){
      this.presentToast('The district is required');
    }else if(this.subcounty==""){
      this.presentToast('The subcounty is required');
    }else if(this.topic==""){
      this.presentToast('The topic is required');
    }else if(this.activity==""){
      this.presentToast('The activity is required');
    }else if(this.Photo_url==""){
      this.presentToast('Take a photo of the event to continue');
    }else if(this.males==""){
      this.presentToast('The number of male attendance is required');
    }else if(this.females==""){
      this.presentToast('The number of female attendance is required');
    }else if(this.lo==""){
      this.presentToast('Press the Get location button to get current location');
    }else if(this.la==""){
      this.presentToast('Press the Get location button to get current location');
    }else if(this.fo==""){
      this.presentToast('Please re-login again to continue');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'please wait ...',
      });
      loader.present();

      return new Promise(resolve => {
          let body = {
            aski:'submit',
            region:this.region,
            district:this.district,
            subcounty:this.subcounty,
            topic:this.topic,
            activity:this.activity,
            Photo_url:this.Photo_url,
            males:this.males,
            females:this.females,
            lo:this.lo,
            la:this.la,
            fo:this.fo
            }
            this.accsPrvds.postData(body, 'process2.php').subscribe((res:any)=> {
                        if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(res.msg);
                            this.router.navigate(['/beneficiary']);
                            this.region ="";
                            this.district ="";
                            this.subcounty ="";
                            this.topic ="";
                            this.activity ="";
                            this.Photo_url ="";
                            this.males ="";
                            this.females ="";
                            this.lo ="";
                            this.la ="";
                            this.currentImage="";
                            
                        }else{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                        }
                  },(err)=>{
                    loader.dismiss();
                    this.disabledButton = false;
                    this.presentAlert('You are offline');
                    console.log('Error ', err);
            });

      });
    }
  

  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Save and submit when online',
          handler: () => {
            this.addDetails(this.region, this.district, this.subcounty,this.topic,this.activity,this.Photo_url,this.males,this.females,this.la,this.lo,this.fo);
          }
        },
         {
          text: 'Try Again',
          handler: () => {
            this.Submit();
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

  async AlertforOfflineSubmission(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
         {
          text: 'Try Again',
          handler: () => {
            this.SubmitOfflineData(this.id,this.region, this.district, this.subcounty,this.topic,this.activity,this.Photo_url,this.males,this.females,this.la,this.lo,this.fo);
            
          }
        },
        {
          text: 'Cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //this.deleteDetails(this.db);
          }
        }
        
      ]
    });

    await alert.present();
  }

}

