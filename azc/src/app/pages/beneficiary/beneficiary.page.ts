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
id: number;
//UIA data
Name_of_enterprise:string="";
region:string="";
district:string="";
specify_other_districts:string="";
street_address:string="";
lo: string="";
la: string="";
acc:string="";
business_telephone: string="";
website: string="";
email: string="";
year_established: string="";
number_of_employees: string="";
business_sector: string="";
business_activity: string="";
list_of_pdts_svcs: string="";
name_contact_person: string="";
contact_person_mobile: string="";
title_of_contact_person: string="";
references_main_customers: string="";
total_investment: string=""; 
total_assets_value: string="";
gross_annual_sales: string="";
annual_export_turnover: string="";
needs_or_challenges: string="";
business_type: string="";
company_reg_status: string="";
company_registration_number_allocated: string="";
submittername: string="";
title: string="";
fo: string; //name of the submitter
phone_:string="";
do_export:string="";

disabledButton;
name:string;
  currentImage: any;
  ib: any;

  latitude: any = 0;
  longitude: any = 0;
  accuracy: any =0;
  datastorage:any;
  //added token
  token:string;
  
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
term = '';
  data: any;
  ngOnInit() {
    fetch('./assets/district_subcounties.json').then(res => res.json())
    .then(json => {
      this.data = json;
    });
  }

  districts=[
    "Abim",
    "Adjumani",
    "Agago",
    "Alebtong",
    "Amolatar",
    "Amudat",
    "Amuria",
    "Amuru",
    "Apac",
    "Arua",
    "Budaka",
    "Bududa",
    "Bugiri",
    "Bugweri",
    "Buhweju",
    "Buikwe",
    "Bukedea",
    "Bukomansimbi",
    "Bukwo",
    "Bulambuli",
    "Buliisa",
    "Bundibugyo",
    "Bunyangabu",
    "Bushenyi",
    "Busia",
    "Butaleja",
    "Butambala",
    "Butebo",
    "Buvuma",
    "Buyende",
    "Dokolo",
    "Fort Portal",
    "Gomba",
    "Gulu",
    "Hoima",
    "Ibanda",
    "Iganga",
    "Isingiro",
    "Jinja",
    "Kaabong",
    "Kabale",
    "Kabarole",
    "Kaberamaido",
    "Kagadi",
    "Kakumiro",
    "Kalaki",
    "Kalangala",
    "Kaliro",
    "Kalungu",
    "Kampala",
    "Kamuli",
    "Kamwenge",
    "Kanungu",
    "Kapchorwa",
    "Kapelebyong",
    "Karenga",
    "Kasese",
    "Kassanda",
    "Katakwi",
    "Kayunga",
    "Kazo",
    "Kibaale",
    "Kiboga",
    "Kibuku",
    "Kikuube",
    "Kiruhura",
    "Kiryandongo",
    "Kisoro",
    "Kitagwenda",
    "Kitgum",
    "Koboko",
    "Kole",
    "Kotido",
    "Kumi",
    "Kwania",
    "Kween",
    "Kyankwanzi",
    "Kyegegwa",
    "Kyenjojo",
    "Kyotera",
    "Lamwo",
    "Lira",
    "Luuka",
    "Luweero",
    "Lwengo",
    "Lyantonde",
    "Madi-Okollo",
    "Manafwa",
    "Maracha",
    "Masaka",
    "Masindi",
    "Mayuge",
    "Mbale",
    "Mbarara",
    "Mitooma",
    "Mityana",
    "Moroto",
    "Moyo",
    "Mpigi",
    "Mubende",
    "Mukono",
    "Nabilatuk",
    "Nakapiripirit",
    "Nakaseke",
    "Nakasongola",
    "Namayingo",
    "Namisindwa",
    "Namutumba",
    "Napak",
    "Nebbi",
    "Ngora",
    "Ntoroko",
    "Ntungamo",
    "Nwoya",
    "Obongi",
    "Omoro",
    "Otuke",
    "Oyam",
    "Pader",
    "Pakwach",
    "Pallisa",
    "Rakai",
    "Rubanda",
    "Rubirizi",
    "Rukiga",
    "Rukungiri",
    "Rwampara",
    "Serere",
    "Sheema",
    "Sironko",
    "Soroti",
    "Ssembabule",
    "Terego",
    "Tororo",
    "Wakiso",
    "Yumbe",
    "Zombo"
    ];
  
  businessSector=[
    "Agriculture, Forestry and Fishing",
    "ICT",
    "Minerals",
    "Oil and Gas",
    "Tourism",
    "Energy",
    "Manufacturing",
    "Services" 
  ];
  
  businesstypes=[
  "Family Business",
  "Company",
  "Individual Business",
  ];
  
  needs=[
    "Lack of Funding",
    "Transport and communication",
    "Licensing costs",
    "Human Resource",
    "Market access",
    "Competition",
    "Resource access",
    "Transportation and communication" 
  ];
  registration=[
  "URSB",
  "District",
  "Not Registered",
  ];

ionViewDidEnter() {
  this.storage.get('storage_xxx').then((res)=>{
    console.log(res);
    this.datastorage = res;
    this.name = this.datastorage.name;
    this.token= this.datastorage.token;
    this.disabledButton = false;
});
    this.db.getAllDetails().then(data => this.details = data);
    //Checking for the network connectivity every after some milliseconds
    setInterval(() => {
      this.network.initializeNetworkEvents();
    }, 300);

  }

  //to include otherActivity
  addDetails(Name_of_enterprise:string,region:string,district:string,specify_other_districts:string,street_address:string,lo:string,la:string,acc:string,business_telephone:string,website:string,email:string,year_established:string,number_of_employees:string,business_sector:string,business_activity:string,list_of_pdts_svcs:string,name_contact_person:string,contact_person_mobile:string,title_of_contact_person:string,references_main_customers:string,total_investment:string,total_assets_value:string,gross_annual_sales:string,annual_export_turnover:string,needs_or_challenges:string,business_type:string,company_reg_status:string,company_registration_number_allocated:string,submittername:string,title:string,fo:string,phone_:string,do_export:string,token:string) {
  if(this.Name_of_enterprise==""){
      this.presentToast('The Enterprise name is required');
  }else if(this.region==""){
    this.presentToast('The Region is required');
  }
  else if(this.district==""){
    this.presentToast('The district is required');
  } 
  else if(this.district=="other" && this.specify_other_districts==''){
    this.presentToast('The Other district is required'); 
  }
  else if(this.district !="other" && this.specify_other_districts !=''){
    this.specify_other_districts=""; 
  }
  else if(this.street_address==""){
    this.presentToast('The street address is required');
  }
  else if(this.la==""){
    this.presentToast('Press the location button to generate the cordinates');
  }
  else if(this.lo==""){
    this.presentToast('Press the location button to generate the cordinates');
  }
  else if(this.business_telephone==""){
    this.presentToast('Business telephone is required');
  }
  /*else if(this.website==""){
    this.presentToast('Business website is required');
  }*/
  else if(this.year_established==""){
    this.presentToast('year established is required');
  }
  else if(this.number_of_employees==""){
    this.presentToast('Number of employees is required');
  }
  else if(this.business_sector==""){
    this.presentToast('Business sector is required');
  }
  else if(this.business_activity==""){
    this.presentToast('Business activity is required');
  }
  else if(this.list_of_pdts_svcs==""){
    this.presentToast('List of products or services offered is required');
  }
  else if(this.name_contact_person==""){
    this.presentToast('Name of contact person is required');
  }
  else if(this.contact_person_mobile==""){
    this.presentToast('Business owner mobile is required');
  }
  else if(this.title_of_contact_person==""){
    this.presentToast('Title of contact person is required');
  }
  else if(this.references_main_customers==""){
    this.presentToast('References of main customer is required');
  }
  else if(this.total_investment ==""){
    this.presentToast('Total investment is required');
  }
  else if(this.total_assets_value==""){
    this.presentToast('Total asset value is required');
  }
else if(this.gross_annual_sales==""){
this.presentToast('Gross annual sale is required');
}
else if(this.annual_export_turnover==""){
this.presentToast('Annual export turnover is required');
}
else if(this.needs_or_challenges==""){
this.presentToast('Needs or challenges is required');
}
else if(this.business_type==""){
this.presentToast('Business type is required');
}
else if(this.company_reg_status==""){
this.presentToast('Company registration status is required');
}
else if(this.company_registration_number_allocated==""){
this.presentToast('Company registration number is required');
}
else if(this.phone_==""){
  this.presentToast('Contact person mobile is required');
}
else if(this.do_export==""){
  this.presentToast('Specify whether the company does export');
}

  else{
      this.db.addDetails(Name_of_enterprise,region,district,specify_other_districts,street_address,lo,la,acc,business_telephone,website,email,year_established,number_of_employees,business_sector,business_activity,list_of_pdts_svcs,name_contact_person,contact_person_mobile,title_of_contact_person,references_main_customers,total_investment,total_assets_value,gross_annual_sales,annual_export_turnover,needs_or_challenges,business_type,company_reg_status,company_registration_number_allocated,submittername,title,fo,phone_,do_export,token).then(data => {
        this.details = data;
      });
      this.presentToast("Your activity has been saved locally, you can submit it later");
      this.disabledButton = false;
      this.Name_of_enterprise="";
            this.region="";
            this.district="";
            this.specify_other_districts="";
            this.street_address="";
            //for gps
            this.lo="";
            this.la="";
            this.acc="";
            this.business_telephone="";
            this.website="";
            this.email="";
            this.year_established="";
            this.number_of_employees="";
            this.business_sector="";
            this.business_activity="";
            this.list_of_pdts_svcs="";
            this.name_contact_person="";
            this.contact_person_mobile="" ;
            this.title_of_contact_person="";
            this.references_main_customers="" ;
            this.total_assets_value="";
            this.total_investment="";
            this.gross_annual_sales="";
            this.annual_export_turnover="";
            this.needs_or_challenges="";
            this.business_type="";
            this.company_reg_status="";
            this.company_registration_number_allocated="";
            this.title="";
            this.phone_="";
            this.do_export="";
            this.submittername=""; 
      //this.currentImage="";
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

        this.presentToast("Your activity has been submitted successfully");
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
      this.accuracy =resp.coords.accuracy;
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





// submit data to the end point when you have an active internet connection
  async Submit(){    
    
    if(this.Name_of_enterprise==""){
        this.presentToast('The Enterprise name is required');
    }else if(this.region==""){
      this.presentToast('The Region is required');
    }
    else if(this.district==""){
      this.presentToast('The district is required');
    } 
    else if(this.district=="other" && this.specify_other_districts==''){
      this.presentToast('The Other district is required'); 
    }
    else if(this.district !="other" && this.specify_other_districts !=''){
      this.specify_other_districts=""; 
    }
    else if(this.street_address==""){
      this.presentToast('The street address is required');
    }
    else if(this.la==""){
      this.presentToast('Press the location button to generate the cordinates');
    }
    else if(this.lo==""){
      this.presentToast('Press the location button to generate the cordinates');
    }
    else if(this.business_telephone==""){
      this.presentToast('Business telephone is required');
    }
    /*else if(this.website==""){
      this.presentToast('Business website is required');
    }*/
    else if(this.year_established==""){
      this.presentToast('year established is required');
    }
    else if(this.number_of_employees==""){
      this.presentToast('Number of employees is required');
    }
    else if(this.business_sector==""){
      this.presentToast('Business sector is required');
    }
    else if(this.business_activity==""){
      this.presentToast('Business activity is required');
    }
    else if(this.list_of_pdts_svcs==""){
      this.presentToast('List of products or services offered is required');
    }
    else if(this.name_contact_person==""){
      this.presentToast('Name of contact person is required');
    }
    else if(this.contact_person_mobile==""){
      this.presentToast('Business owner mobile is required');
    }
    else if(this.title_of_contact_person==""){
      this.presentToast('Title of contact person is required');
    }
    else if(this.references_main_customers==""){
      this.presentToast('References of main customer is required');
    }
    else if(this.total_investment ==""){
      this.presentToast('Total investment is required');
    }
    else if(this.total_assets_value==""){
      this.presentToast('Total asset value is required');
    }
else if(this.gross_annual_sales==""){
  this.presentToast('Gross annual sale is required');
}
else if(this.annual_export_turnover==""){
  this.presentToast('Annual export turnover is required');
}
else if(this.needs_or_challenges==""){
  this.presentToast('Needs or challenges is required');
}
else if(this.business_type==""){
  this.presentToast('Business type is required');
}
else if(this.company_reg_status==""){
  this.presentToast('Company registration status is required');
}
else if(this.company_registration_number_allocated==""){
  this.presentToast('Company registration number is required');
}
else if(this.phone_==""){
  this.presentToast('Contact person mobile is required');
}
else if(this.do_export==""){
  this.presentToast('Specify whether the company does export');
}

//Adding a constraint on the search
else if(this.term==""){
  this.presentToast('You need to search for your district and subcounty');
  this.district=="";

}


    else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'please wait ...',
      });
      loader.present();

      return new Promise(resolve => {
          let body = {
            aski:'submit',
            Name_of_enterprise:this.Name_of_enterprise,
            region:this.region,
            district:this.district,
            specify_other_districts:this.specify_other_districts,
            street_address:this.street_address,
            //for gps
            lo: this.lo,
            la: this.la,
            acc:this.acc,
            business_telephone:this.business_telephone ,
            website: this.website,
            email:this.email ,
            year_established:this.year_established ,
            number_of_employees:this.number_of_employees ,
            business_sector:this.business_sector ,
            business_activity:this.business_activity,
            list_of_pdts_svcs: this.list_of_pdts_svcs,
            name_contact_person:this.name_contact_person ,
            contact_person_mobile:this.contact_person_mobile ,
            title_of_contact_person:this.title_of_contact_person,
            references_main_customers:this.references_main_customers ,
            total_investment: this.total_investment, 
            total_assets_value: this.total_assets_value,
            gross_annual_sales: this.gross_annual_sales,
            annual_export_turnover: this.annual_export_turnover,
            needs_or_challenges:this.needs_or_challenges ,
            business_type:this.business_type ,
            company_reg_status:this.company_reg_status ,
            company_registration_number_allocated:this.company_registration_number_allocated,
            submittername:this.submittername,
            title:this.title,
            fo: this.fo,
            phone_:this.phone_,
            do_export:this.do_export,
            token:this.token
            }
            this.accsPrvds.postData(body, 'reg.php').subscribe((res:any)=> {
                        if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(res.msg);
                            this.router.navigate(['/beneficiary']);
                            this.Name_of_enterprise="";
            this.region="";
            this.district="";
            this.specify_other_districts="";
            this.street_address="";
            //for gps
            this.lo="";
            this.la="";
            this.acc="";
            this.business_telephone="";
            this.website="";
            this.email="";
            this.year_established="";
            this.number_of_employees="";
            this.business_sector="";
            this.business_activity="";
            this.list_of_pdts_svcs="";
            this.name_contact_person="";
            this.contact_person_mobile="" ;
            this.title_of_contact_person="";
            this.references_main_customers="";
            this.total_assets_value="";
            this.total_investment="";
            this.gross_annual_sales="";
            this.annual_export_turnover="";
            this.needs_or_challenges="";
            this.business_type="";
            this.company_reg_status="";
            this.company_registration_number_allocated="";
            this.title="";
            this.phone_="";  
            this.do_export=""; 
            this.submittername="";                         
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
            this.addDetails(this.Name_of_enterprise,this.region,this.district,this.specify_other_districts,this.street_address,this.lo,this.la,this.acc,this.business_telephone,this.website,this.email,this.year_established,this.number_of_employees,this.business_sector,this.business_activity,this.list_of_pdts_svcs,this.name_contact_person,this.contact_person_mobile,this.title_of_contact_person,this.references_main_customers,this.total_investment,this.total_assets_value,this.gross_annual_sales,this.annual_export_turnover,this.needs_or_challenges,this.business_type,this.company_reg_status,this.company_registration_number_allocated,this.submittername,this.title,this.fo,this.phone_,this.do_export,this.token);
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
           // this.SubmitOfflineData(this.id,this.region, this.district,this.la,this.lo,this.fo);
            
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


  //Changing the values in district when the search is empty
  clear_search_select(){
    this.district="";
    
  }
}

