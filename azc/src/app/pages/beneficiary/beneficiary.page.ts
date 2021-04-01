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

import { DatabaseService, Dev } from './../../services/database.service';


@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.page.html',
  styleUrls: ['./beneficiary.page.scss'],
})
export class BeneficiaryPage implements OnInit {


 
developers: Dev[] = [];

products: Observable<any[]>;
developer = {};
product = {};

selectedView = 'devs';
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
disabledButton

  currentImage: any;
  ib: any;

  latitude: any = 0;
  longitude: any = 0;
  name:string;
  datastorage:any;
  
  
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
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }

  


  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
        console.log(res);
        this.datastorage = res;
        this.name = this.datastorage.name;
        this.disabledButton = false;
    });

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
      duration:50000,
    });
    toast.present();
  }

  addDeveloper() {
    this.db.addDeveloper(this.developer['region'], this.developer['district'], this.developer['subcounty'], this.developer['topic'], this.developer['activity'], this.developer['Photo_url'], this.developer['males'], this.developer['females'], this.developer['total'], this.developer['la'], this.developer['lo'], this.developer['fo'])
    .then(_ => {
      this.developer = {};
      console.log(this.developer);
    }).catch((error) => {
      console.log('Error from beneficiaries inserting into db ', error);
    });
  }
  /*addDeveloper() {
    this.db.addDeveloper(this.region, this.district, this.subcounty, this.topic, this.activity, this.Photo_url, this.males, this.females, this.total, this.la, this.lo, this.fo)
    .then(_ => {
      this.developer = {};
    }).catch((error) => {
      console.log('Error from beneficiaries inserting into ', error);
    });
  }*/

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
    }else if(this.total==""){
      this.presentToast('The total attendance is required');
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
            total:this.total,
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
                            this.total ="";
                            this.lo ="";
                            this.la ="";
                        }else{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                        }
                  },(err)=>{
                    loader.dismiss();
                    this.disabledButton = false;
                    this.presentAlert('Timeout ');
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
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        },
         {
          text: 'Try Again',
          handler: () => {
            this.Submit();
          }
        }
      ]
    });

    await alert.present();
  }

}

