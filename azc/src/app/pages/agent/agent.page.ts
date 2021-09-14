import { Platform } from '@ionic/angular';

import { Component, OnInit,  NgZone } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AgentService } from '../../providers/agent.service';
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

import { Database2Service, Details2Interface } from './../../services/database2.service';


@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
  styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit {
id2: number;
//UIA data
Name:string="";
gender:string="";
age:string="";
phone:string="";
email:string="";
live:string="";
nearest_township: string="";
select_qualification: string="";
specify_qualification: string="";
institution:string="";
qualification: string="";
year_of_q: string="";
work_experience: string="";
specify_areas_of_experience: string="";
position: string="";
employers: string="";
interest: string="";
specify_interest: string="";
skills: string="";
other_skills: string="";
recommend: string="";
fo: string="";//name_of_submitter
disabledButton;
name:string;
  currentImage: any;
  ib: any;

  //latitude: any = 0;
  //longitude: any = 0;
  //accuracy: any =0;
  datastorage:any;
  //added token
  token:string;
  
  details2: Details2Interface[];


  constructor(
    private router:Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AgentService,
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
    private db2: Database2Service
  ) { 

  }


  
  ngOnInit() {
    
  }

  nearest_townships=[
    "Buikwe",
    "Bukomansimbi",
    "Butambala",
    "Buvuma",
    "Gomba",
    "Kalangala",
    "Kalungu",
    "Kampala",
    "Kayunga",
    "Kiboga",
    "Kyankwanzi",
    "Luweero",
    "Lwengo",
    "Lyantonde",
    "Masaka",
    "Mityana",
    "Mpigi",
    "Mubende",
    "Mukono",
    "Nakaseke",
    "Nakasongola",
    "Rakai",
    "Sembabule",
    "Wakiso",
    "other",
    "Abim",
    "Amudat",
    "Amuria",
    "Budaka",
    "Bududa",
    "Bugiri",
    "Bukedea",
    "Bukwo",
    "Bulambuli",
    "Busia",
    "Butaleja",
    "Buyende",
    "Iganga",
    "Jinja",
    "Kaberamaido",
    "Kaliro",
    "Kamuli",
    "Kapchorwa",
    "Katakwi",
    "Kibuku",
    "Kumi",
    "Kween",
    "Luuka",
    "Manafwa",
    "Mayuge",
    "Mbale",
    "Namayingo",
    "Namutumba",
    "Ngora",
    "Pallisa",
    "Serere",
    "Sironko",
    "Soroti",
    "Tororo",
    "other",
    "Agago",
    "Alebtong",
    "Amolatar",
    "Amuru",
    "Apac",
    "Dokolo",
    "Gulu",
    "Kaabong",
    "Kitgum",
    "Koboko",
    "Kole",
    "Kotido",
    "Lamwo",
    "Lira",
    "Moroto",
    "Moyo",
    "Nakapiripirit",
    "Napak",
    "Nwoya",
    "Otuke",
    "Oyam",
    "Pader",
    "other",
    "Buliisa",
    "Bundibugyo",
    "Bushenyi",
    "Hoima ",
    "Ibanda",
    "Isingiro",
    "Kabale",
    "Kabarole",
    "Kamwenge",
    "Kanungu",
    "Kasese",
    "Kibaale",
    "Kiruhura",
    "Kiryandongo",
    "Kisoro",
    "Kyegegwa",
    "Kyenjojo",
    "Masindi",
    "Mbarara",
    "Mitooma",
    "Ntotorko",
    "Ntungamo",
    "Rukungiri",
    "Sheema",
    "other",
    "adjumani",
    "Arua",
    "Maracha",
    "Moyo",
    "Nebbi",
    "Yumbe ",
    "Zombo",
    "others",
      ];
    

/*districts*/interests=[
  "Record Keeping",
  "Stock taking and recording",
  "Customer services",
  "Marketing and sales",
  "Procurement",
  "Expert services eg Agronomist,veterinary,IT/Data,Engineering,education,Health",
  "Digital Solutions",
  "Legal",
  "Specify other"
  ];

/*businessSector*/skillss=[
  "Digital Literacy",
  "Budget and Planning",
  "Proposal Writing",
  "Application innovation and technology",
  "Exposure to technology trends, equipment and tools",
  "Ideation and creativity",
  "Leadership and personal development skills",
  "Any other"
];

/*businesstypes*/qualifications=[
  "Business Management",
  "Marketing",
  "Finance/Admin & Management",
  "Talents Management",
  "Specialist",
  "specify"
];


ionViewDidEnter() {
  this.storage.get('storage_xxx').then((res)=>{
    console.log(res);
    this.datastorage = res;
    this.name = this.datastorage.name;
    this.token= this.datastorage.token;
    this.disabledButton = false;
});
    this.db2.getAllDetails().then(data2 => this.details2 = data2);
    //Checking for the network connectivity every after some milliseconds
    setInterval(() => {
      this.network.initializeNetworkEvents();
    }, 300);

  }

  //to include otherActivity
  addDetails(Name:string,gender:string,age:string,phone:string,email:string,live:string,nearest_township:string,select_qualification:string,specify_qualification:string,institution:string,qualification:string,year_of_q:string,work_experience:string,specify_areas_of_experience:string,position:string,employers:string,interest:string,specify_interest:string,skills:string,other_skills:string,recommend:string,fo:string,token:string) {

 
    if(this.Name==""){
      this.presentToast('The Name is required');

  }else if(this.gender==""){
    this.presentToast('The Gender is required');

  }
  else if(this.age==""){
    this.presentToast('The Age is required');
  } 
  else if(this.phone==""){
    this.presentToast('The phone number is required');
  }
  else if(this.email==""){
    this.presentToast('The Email is required');

  }  else if(this.live==""){
    this.presentToast('The Location is required');

  }  else if(this.nearest_township==""){
    this.presentToast('The Nearest Township is required');

  }
  else if(this.select_qualification==""){
    this.presentToast('Your Qualification is required'); 

  }

  else if(this.select_qualification == "specify" && this.specify_qualification == ''){
    this.presentToast('Specify your qualification is required'); 

  }
  else if(this.select_qualification !="specify" && this.specify_qualification != ''){
    this.specify_qualification = "";
  }
  
  else if(this.institution==""){
    this.presentToast('The institution is required');
  }
  else if(this.qualification == ""){
    this.presentToast('The Educational Qualification is required');

  }
  else if(this.year_of_q == ""){
    this.presentToast('The Educational Qualification is required');

  }
  else if(this.work_experience==""){
    this.presentToast('The Work experience is required');

  }
  else if(this.work_experience =="Yes" && this.specify_areas_of_experience == ''){
    this.presentToast('Area of experience is required');
  }
  else if(this.work_experience !="Yes" && this.specify_areas_of_experience != ''){
    this.specify_areas_of_experience = "";
  }
  else if(this.work_experience == "Yes" && this.position == ''){
    this.presentToast('Specify the position');
  }
  else if(this.work_experience != "Yes" && this.position != ''){
    this.position = "";
  }
  /*else if(this.employers=="" && this.work_experience=="Yes"){
    //this.presentToast('specify the employer');
  
  }*/
  else if(this.interest==""){
    this.presentToast('Specify the interest');
  }
  else if(this.interest=="Specify other" && this.specify_interest == ''){
    this.presentToast('The Specify other interest is required');
  }
  else if(this.interest !="Specify other" && this.specify_interest != ''){
    this.specify_interest = "";
  }
  else if(this.skills ==""){
    this.presentToast('What are the areas of skills... is required');
  }
  else if(this.skills !="Any other" && this.other_skills != ''){
    this.other_skills = "";
  }
  else if(this.skills=="Any other" && this.other_skills == ''){
    this.presentToast('Specify other skills is required');
  }
  else{
      this.db2.addDetails(Name,gender,age,phone,email,live,nearest_township,select_qualification,specify_qualification,institution,qualification,year_of_q,work_experience,specify_areas_of_experience,position,employers,interest,specify_interest,skills,other_skills,recommend,fo,token).then(data2 => {
        this.details2 = data2;
      });
      this.presentToast("Your activity has been saved locally, you can submit it later");
      this.disabledButton = false;
      this.Name="";
      this.gender="";
      this.age="";
      this.phone = "";
      this.email="";
      this.live="";
      //for gps
      this.nearest_township="";
      this.select_qualification="";
      this.specify_qualification="";
      this.institution="";
      this.qualification="";
      this.year_of_q="";
      this.work_experience="";
      this.specify_areas_of_experience="";
      this.position="";
      this.employers="";
      this.interest = "";
      this.specify_interest="";
      this.skills="";
      this.other_skills="";
      this.recommend="";
//this.currentImage="";
      this.router.navigate(['/agent']);
      
    }
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
    
  if(this.Name==""){
      this.presentToast('The Name is required');

  }else if(this.gender==""){
    this.presentToast('The Gender is required');

  }
  else if(this.age==""){
    this.presentToast('The Age is required');
  } 
  else if(this.phone==""){
    this.presentToast('The phone number is required');
  }
  else if(this.email==""){
    this.presentToast('The Email is required');

  }
  else if(this.nearest_township==""){
    this.presentToast('The Nearest Township (District) is required');

  }
  else if(this.live==""){
    this.presentToast('The Parish of residence is required');
  }
  else if(this.select_qualification==""){
    this.presentToast('Your Qualification is required'); 
  }
  else if(this.select_qualification == "specify" && this.specify_qualification == ''){
    this.presentToast('Specific other Qualification');

  }
  else if(this.select_qualification != "specify" && this.specify_qualification != ''){
    this.specify_qualification="";

  } 
  else if(this.institution==""){
    this.presentToast('The institution is required');
  }
  else if(this.qualification == ""){
    this.presentToast('The Education Qualification is required');

  }
  else if(this.year_of_q == ""){
    this.presentToast('The Year of Qualification is required');

  }
  else if(this.work_experience==""){
    this.presentToast('The Work experience is required');

  }
  else if(this.work_experience =="Yes" && this.specify_areas_of_experience == ''){
    this.presentToast('Specify your area of experience.');
  }
  else if(this.work_experience !="Yes" && this.specify_areas_of_experience != ''){
    this.specify_areas_of_experience = "";
  }
  else if(this.work_experience =="Yes" && this.position == ''){
    this.presentToast('The Position is required');
  }
  else if(this.work_experience != "Yes" && this.position != ''){
    this.position = "";
  }
  else if(this.work_experience =="Yes" && this.employers==""){
    this.presentToast('The name of employer is required.');
  }
  else if(this.work_experience !="Yes" && this.employers !=""){
    this.employers="";
  }
  else if(this.interest==""){
    this.presentToast('If you are interested, Which of the... is required');
 
  }
  else if(this.interest !="Specify other" && this.specify_interest != ''){
    this.specify_interest = "";

  }
  else if(this.interest=="Specify other" && this.specify_interest == ''){
    this.presentToast('The Specify interest is required');
 
  }
  else if(this.skills ==""){
    this.presentToast('What are the areas of skills competence.... is required.');

  }
  else if(this.skills=="Any other" && this.other_skills == ''){
    this.presentToast('Specify other skills is required');
  }
  else if(this.skills !="Any other" && this.other_skills != ''){
    this.other_skills = "";

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
            Name:this.Name,
            gender:this.gender,
            age:this.age,
            phone:this.phone,
            email:this.email,
            live:this.live,
            nearest_township: this.nearest_township,
            select_qualification: this.select_qualification,
            specify_qualification:this.specify_qualification,
            institution:this.institution,
            qualification: this.qualification,
            year_of_q:this.year_of_q,
            work_experience:this.work_experience,
            specify_areas_of_experience:this.specify_areas_of_experience ,
            position:this.position,
            employers:this.employers,
            interest:this.interest,
            specify_interest: this.specify_interest,
            skills:this.skills ,
            other_skills:this.other_skills,
            recommend:this.recommend,
            fo:this.fo,  
            token:this.token
            }
            this.accsPrvds.postData(body, 'yapp.php').subscribe((res:any)=> {
                        if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(res.msg);
                            this.router.navigate(['/agent']);
                            this.Name = "";
                            this.gender = "";
                            this.age = "";
                            this.phone = "";
                            this.email = "";
                            this.live = "";
                            this.nearest_township = "";
                            this.select_qualification = "";
                            this.specify_qualification = "";
                            this.institution = "";
                            this.qualification = "";
                            this.year_of_q = "";
                            this.work_experience = "";
                            this.specify_areas_of_experience = "";
                            this.position = "";
                            this.employers = "";
                            this.interest = "";
                            this.specify_interest = "";
                            this.skills = "";
                            this.other_skills = "";
                            this.recommend = "";                           
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
            this.addDetails(this.Name,this.gender,this.age,this.phone,this.email,this.live,this.nearest_township,this.select_qualification,this.specify_qualification,this.institution,this.qualification,this.year_of_q,this.work_experience,this.specify_areas_of_experience,this.position,this.employers,this.interest,this.specify_interest,this.skills,this.other_skills,this.recommend,this.fo, this.token);
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


}