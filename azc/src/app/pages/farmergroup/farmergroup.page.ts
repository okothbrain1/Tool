import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Camera} from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatasetService } from '../../providers/dataset.service';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Database4Service, Details4Interface } from './../../services/database4.service';

@Component({
  selector: 'app-farmergroup',
  templateUrl: './farmergroup.page.html',
  styleUrls: ['./farmergroup.page.scss'],
})
export class FarmergroupPage implements OnInit {
  id4:number;
   //name of the submitter
  disabledButton;
  name:string;

    ib: any;
    fs: any;
  
    latitude: any = 0;
    longitude: any = 0;
    accuracy: any =0;
    datastorage:any;
    //added token
    
    details4: Details4Interface[];
  public myForm: FormGroup;
  private fieldspaceCount: number = 1;
//Farmer group data
farmer_group_name:string="";
district_subcounty_fg:string="";
parish_fg:string="";
village_fg:string="";
meeting_venue:string="";
longitude_group:string="";
latitude_group:string="";
group_chairperson:string="";
chairperson_contact:string="";
secretary:string="";
secretary_contact:string="";
have_farmer_db:string="";
number_of_farmers:string="";
females:string="";
males:string="";
list_of_farmers:any[]=[];
members_in_group:string="";
main_enterprise:string="";
type_of_group_records:string="";
group_obtain_VSLA:string="";
people_took_loan:string="";
payback_percentage:string="";
mode_of_payment:string="";
group_total_loan:string="";
fo: string; //name of the submitter
token:string;


  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : DatasetService,
    private camera: Camera,

    private geolocation: Geolocation,
    private storage : Storage,
    private toastCtrl: ToastController,
    private db4: Database4Service,

  ) { 
    this.myForm = formBuilder.group({
      fieldspace1: ['', [Validators.required, Validators.minLength(15)]]
    });
  }

  term = '';
  data: any;
  ngOnInit() {
    fetch('./assets/district_subcounties.json').then(res => res.json())
    .then(json => {
      this.data = json;
    });
  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.token= this.datastorage.token;
      this.disabledButton = false;
    });
    this.db4.getAllDetails().then(data4 => this.details4 = data4);
      //Checking for the network connectivity every after some milliseconds
    setInterval(() => {
        //this.network.initializeNetworkEvents();
        //this.storage.set('farmergroup_data', [this.farmer_group_name,this.district_subcounty_fg,this.parish_fg,this.village_fg,this.meeting_venue,this.longitude_group,this.latitude_group,this.group_chairperson,this.chairperson_contact,this.secretary,this.secretary_contact,this.have_farmer_db,this.number_of_farmers,this.females,this.males,this.get_list_of_farmers(),this.members_in_group,this.main_enterprise,this.type_of_group_records,this.group_obtain_VSLA,this.people_took_loan,this.payback_percentage,this.mode_of_payment,this.group_total_loan]);
    }, 300);
  //Saving the data temporarily on local storage

//Saving the form data to ionic storage
   /*this.storage.get('farmergroup_data').then((res)=>{
    console.log(res);
    [this.farmer_group_name,this.district_subcounty_fg,this.parish_fg,this.village_fg,this.meeting_venue,this.longitude_group,this.latitude_group,this.group_chairperson,this.chairperson_contact,this.secretary,this.secretary_contact,this.have_farmer_db,this.number_of_farmers,this.females,this.males,this.list_of_farmers,this.members_in_group,this.main_enterprise,this.type_of_group_records,this.group_obtain_VSLA,this.people_took_loan,this.payback_percentage,this.mode_of_payment,this.group_total_loan] = res;
   });*/

    }

    restoreData(){
      this.presentToast("All the data from the last time your saved has been restored");
      return this.storage.get('farmergp').then((res)=>{
        console.log(res);
        //this.groups_submitted= this.myForm.value;
        [this.farmer_group_name,this.district_subcounty_fg,this.parish_fg,this.village_fg,this.meeting_venue,this.longitude_group,this.latitude_group,this.group_chairperson,this.chairperson_contact,this.secretary,this.secretary_contact,this.have_farmer_db,this.number_of_farmers,this.females,this.males,this.list_of_farmers,this.members_in_group,this.main_enterprise,this.type_of_group_records,this.group_obtain_VSLA,this.people_took_loan,this.payback_percentage,this.mode_of_payment,this.group_total_loan] = res;
       
      });
    }
    async storeData(){
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: "Your Form Data is Saved",
        message:"Continue filling the form.",
        backdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });
    
      await alert.present();
    
      return this.storage.set('farmergp', [this.farmer_group_name,this.district_subcounty_fg,this.parish_fg,this.village_fg,this.meeting_venue,this.longitude_group,this.latitude_group,this.group_chairperson,this.chairperson_contact,this.secretary,this.secretary_contact,this.have_farmer_db,this.number_of_farmers,this.females,this.males,this.list_of_farmers,this.members_in_group,this.main_enterprise,this.type_of_group_records,this.group_obtain_VSLA,this.people_took_loan,this.payback_percentage,this.mode_of_payment,this.group_total_loan]);
    }

  paybacks=[
    "10%","20%","30%","40%","50%","60%","70%","80%","90%","100%"
  ]

  mode_payment=[
    "Cash","Mobile money","bank"
  ]

  addControl(){
    this.fieldspaceCount++;
    this.myForm.addControl('fieldspace' +this.fieldspaceCount, new FormControl('', Validators.required));
  } 

  removeControl(control){
    this.myForm.removeControl(control.key);
  }
//Function that obtains the entered list of farmers
  get_list_of_farmers() {
  var list_of_farmers:any[]=[];
  list_of_farmers= this.myForm.value;
  return list_of_farmers;
  }

  //Assign list of farmers to the function
  
    //Saving the data locally in sqlite
    addDetails( farmer_group_name:string,district_subcounty_fg:string,parish_fg:string,village_fg:string,meeting_venue:string,longitude_group:string,latitude_group:string,group_chairperson:string,chairperson_contact:string,secretary:string,secretary_contact:string,have_farmer_db:string,number_of_farmers:string,females:string,males:string,list_of_farmers:any[],members_in_group:string,main_enterprise:string,type_of_group_records:string,group_obtain_VSLA:string,people_took_loan:string,payback_percentage:string,mode_of_payment:string,group_total_loan:string,fo: string,token: string) {
      this.db4.addDetails(farmer_group_name,district_subcounty_fg,parish_fg,village_fg,meeting_venue,longitude_group,latitude_group,group_chairperson,chairperson_contact,secretary,secretary_contact,have_farmer_db,number_of_farmers,females,males,list_of_farmers,members_in_group,main_enterprise,type_of_group_records,group_obtain_VSLA,people_took_loan,payback_percentage,mode_of_payment,group_total_loan,fo,token).then(data4 => {
        this.details4 = data4;
      });
      this.presentToast("Your activity has been saved locally, you can submit it later");
      this.disabledButton = false;

      this.router.navigate(['/farmergroup']);
    }
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
      if(this.farmer_group_name==""){//to be changed
          this.presentToast('Farmer group name is required');
      }
      else if(this.district_subcounty_fg==""){
        this.presentToast('Subcounty and District is required');
      }
      else if(this.parish_fg==""){
        this.presentToast('Parish is require');
      }

      else if(this.village_fg==""){
        this.presentToast('Village is required');
      }
      else if(this.meeting_venue==""){
        this.presentToast('Meeting venue is required');
      }
      else if(this.longitude_group=="" || this.latitude_group==""){
        this.presentToast('Longitude and latitude is required');
      }
      else if(this.group_chairperson==""){
        this.presentToast('Group chairperson is required');
      }
      else if(this.chairperson_contact==""){
        this.presentToast('Chairpersons contact is required');
      }
      else if(this.secretary==""){
        this.presentToast('Secretary is required');
      }      
      else if(this.secretary_contact==""){
        this.presentToast('Secretary contact is required');
      }
      else if(this.have_farmer_db==""){
        this.presentToast('Do you have a farmer group database/list is required');
      }
      
      //else if(this.number_of_farmers==""){
       // this.presentToast('Number of farmers is required');
      //}
      else if(this.females==""){
        this.presentToast('Number of females is required');
      }
      else if(this.males==""){
        this.presentToast('Number of males is required');
      }
      /*else if(!this.myForm.valueChanges){
        this.presentToast('List of farmers captured is required to proceed');
     }*/
     // stop here if form is invalid
    else if (this.myForm.invalid){
      this.presentToast('List of farmers captured is required to proceed');
    }
    else if(this.members_in_group==''){
        this.presentToast('How many members have been in the group for at least the past three years is required');
    }
    
    else if(this.main_enterprise==""){
        this.presentToast('Main enterprise is required');
    }
    else if(this.type_of_group_records==""){
        this.presentToast('Type of group records kept is required');
    }
    
    else if(this.group_obtain_VSLA==""){
        this.presentToast('Does the organization obtain a VSLA is required');
    }
    
    else if(this.people_took_loan==""){
        this.presentToast('How many people took a loan in the last season is required');
    }
    
    else if(this.payback_percentage==""){
        this.presentToast('On percentage, How many people paid back 100% of their loan is required');
    }
    
    else if(this.mode_of_payment==""){
        this.presentToast('What was the members mode of payment is required');
    }
    
    else if(this.group_total_loan==""){
        this.presentToast('Group Total loan requested is required to proceed');
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
              farmer_group_name:this.farmer_group_name,
              district_subcounty_fg:this.district_subcounty_fg,
              parish_fg:this.parish_fg,
              village_fg:this.village_fg,
              meeting_venue:this.meeting_venue,
              longitude_group:this.longitude_group,
              latitude_group:this.latitude_group,
              group_chairperson:this.group_chairperson,
              chairperson_contact:this.chairperson_contact,
              secretary:this.secretary,
              secretary_contact:this.secretary_contact,
              have_farmer_db:this.have_farmer_db,
              number_of_farmers:this.number_of_farmers,
              females:this.females,
              males:this.males,
              list_of_farmers:this.get_list_of_farmers(),// this needs to be worked on
              members_in_group:this.members_in_group,
              main_enterprise:this.main_enterprise,
              type_of_group_records:this.type_of_group_records,
              group_obtain_VSLA:this.group_obtain_VSLA,
              people_took_loan:this.people_took_loan,
              payback_percentage:this.payback_percentage,
              mode_of_payment:this.mode_of_payment,
              group_total_loan:this.group_total_loan,
              fo:this.fo,
              token:this.token
              }
              this.accsPrvds.postData(body, 'farmergroup.php').subscribe((res:any)=> {
                          if(res.success==true){
                              loader.dismiss();
                              this.disabledButton = false;
                              this.presentToast(res.msg);
                              this.router.navigate(['/farmergroup']);
                              this.farmer_group_name="";
                              this.district_subcounty_fg="";
                              this.parish_fg="";
                              this.village_fg="";
                              this.meeting_venue="";
                              this.longitude_group="";
                              this.latitude_group="";
                              this.group_chairperson="";
                              this.chairperson_contact="";
                              this.secretary="";
                              this.secretary_contact="";
                              this.have_farmer_db="";
                              this.number_of_farmers="";
                              this.females="";
                              this.males="";
                              this.get_list_of_farmers()==[];// this needs to be worked on
                              this.members_in_group="";
                              this.main_enterprise="";
                              this.type_of_group_records="";
                              this.group_obtain_VSLA="";
                              this.people_took_loan="";
                              this.payback_percentage="";
                              this.mode_of_payment="";
                              this.group_total_loan="";
                              //clearing the data from the form.
                              this.myForm.reset()

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
              this.addDetails(this.farmer_group_name,this.district_subcounty_fg,this.parish_fg,this.village_fg,this.meeting_venue,this.longitude_group,this.latitude_group,this.group_chairperson,this.chairperson_contact,this.secretary,this.secretary_contact,this.have_farmer_db,this.number_of_farmers,this.females,this.males,this.get_list_of_farmers(),this.members_in_group,this.main_enterprise,this.type_of_group_records,this.group_obtain_VSLA,this.people_took_loan,this.payback_percentage,this.mode_of_payment,this.group_total_loan,this.fo,this.token);
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

      //Prompt a user to save data when the back button is clicked
    
      async presentAlertBack(a) {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: a,
          backdropDismiss: false,
          buttons: [
            {
              text: 'I dont need this data',
              handler: () => {
                this.router.navigate(['/newsurvey']);
              }
            },
             {
              text: 'Save My Data',
              handler: () => {
                this.storeData();
                this.router.navigate(['/newsurvey']);
              }
            }
            
          ]
        });
    
        await alert.present();
      }
}
