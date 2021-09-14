import { Platform } from '@ionic/angular';
import { Component, OnInit,  NgZone,ViewChild, ElementRef, ErrorHandler} from '@angular/core';
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

import { Database5Service, Details5Interface } from './../../services/database5.service';
import { DatabaseSentService, Details6Interface  } from '../../services/databaseSent.service';
import { Subscription } from 'rxjs/Subscription';
import { count, filter } from 'rxjs/operators';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
//import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus/ngx';
import { CaptureVideoOptions, MediaCapture,CaptureError, MediaFile } from '@ionic-native/media-capture/ngx';
//import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { VideoPlayer } from '@ionic-native/video-player';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-updatesb',
  templateUrl: './updatesb.page.html',
  styleUrls: ['./updatesb.page.scss'],
})
export class UpdatesbPage implements OnInit {

  constructor(
    private router:Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : DatasetService,
    private camera: Camera,
    //private nativeStorage: NativeStorage,
    private geolocation: Geolocation,
    private apiService: ApiService, 
    private platform: Platform,
    private storage : Storage,
    private toastCtrl: ToastController,
    private transfer : FileTransfer,
    private filePath: FilePath,
    private FileChooser: FileChooser,
    private webview: WebView,
    private file: File,
    private network: NetworkService,

    private http: HttpClient,
    private db5: Database5Service,
    private db6:DatabaseSentService,
    //private appLauncher: AppLauncher
    private appLauncher: AppLauncher,
    private mediaCapture:MediaCapture,
    //public socialSharing:SocialSharing,
    private base64: Base64,
    
  ) { 

  }
  name:string;
  datastorage:any;

  disabledButton:boolean;
  farmers_name:string="";
  nin:string="";
  Photo_url:string="";
  ID_photo_url:string="";
  geoshape:string="";
  acreage:number=null;
  fo:string;
  token:string;
  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.token= this.datastorage.token;
      this.disabledButton = false;
    });
  }

  ngOnInit() {
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:5000,
    });
    toast.present();
  }
  currentImage: any;
  currentImageID:any;
  ib: any;
  im:any;
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

  takePictureID() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImageID = 'data:image/jpeg;base64,' + imageData;

      this.im = imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
      this.presentToast('Error taking Photo ' + err);
    });
  }

  launchapp(){
    var options:AppLauncherOptions={
    packageName: "org.odk.collect.android"
    
    }
    
    this.appLauncher.canLaunch(options).then((launched:Boolean) => {
    
    if (launched)
    
    {
    
    this.appLauncher.launch(options).then(() => {
    
    },(err) => {
    
    alert(JSON.stringify(err));
    
    })
    
    }
    
    else {
    alert("unable to launch.")
    }
    
    },(err)=>{
    
    alert(JSON.stringify(err));
    
    })
  }
  
 // submit data to the end point when you have an active internet connection
async SubmitUpdate(){
  if(this.farmers_name==""){
      this.presentToast('Farmer name is required on question 1.');
  }
  else if(this.nin==""){
    this.presentToast('NIN is required on question 2.');
  }
  else if(this.ID_photo_url==""){
    this.presentToast('The National ID photo is required on question 4.');
  }
  else if(this.Photo_url==""){
    this.presentToast('The farmer photo is required on question 4.');
  }
  /*else if(this.geoshape==""){
    this.presentToast('The geoshape is required on question 5.');
  }
  else if(this.acreage==null){
    this.presentToast('The acreage is required on question 6.');
  }*/
  //for the geoshape
  else{ 
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: 'please wait ...',
        });
        loader.present();
  
        return new Promise(resolve => {
            let body = {
              aski:'submit',
              farmers_name:this.farmers_name,
              nin:this.nin,
              Photo_url:this.Photo_url,
              ID_photo_url:this.ID_photo_url,       
              fo:this.name,
              token:this.token,              
              geoshape:this.geoshape,
              acreage:this.acreage
            }
              this.accsPrvds.postData(body, 'sbupdate.php').subscribe((res:any)=> {
          if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/updatesb']);
              this.farmers_name="";
              this.nin="";
              this.Photo_url="";
              this.ID_photo_url="";
              this.geoshape="";
              this.acreage=null;
          }else{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);                         }
                    },(err)=>{
                      loader.dismiss();
                      this.disabledButton = false;
                      this.presentAlert('Some thing went wrong');
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
            text: 'Try Again',
            handler: () => {
              this.SubmitUpdate();
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

  // Creating a modal with the consent information.
  

}
