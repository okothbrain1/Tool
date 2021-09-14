import { Platform,ModalController } from '@ionic/angular';
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
import { ModalPopupPage } from 'src/app/modal-popup/modal-popup.page';


@Component({
  selector: 'app-farmerprofile',
  templateUrl: './farmerprofile.page.html',
  styleUrls: ['./farmerprofile.page.scss'],
})
export class FarmerprofilePage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
    map: any;
    currentMapTrack = null;
   
    isTracking = false;
    trackedRoute = [];
    previousTracks = [];
   
    positionSubscription: Subscription;
    selectedVie//region: string="";
    //district: string="";
    //subcounty: string="";
    fo: string="";
    
    disabledButton;
    currentImage: any;
    currentImageID:any;
    //for the video
    currentVideoID:any
    ib: any;
    im:any;
    //for the video
    ivideo:any
    //for get location
    latitude1: any = 0;
    longitude1: any = 0;
    accuracy1: any = 0;
    lo1:string="";
    la1:string="";
    acc1:string="";
    //for the gps of main crop enterprise
    latitude2:any=0;
    longitude2:any=0;
    accuracy2:any=0;
    latitude3:any=0;
    longitude3:any=0;
    accuracy3:any=0;
    name:string;
    datastorage:any;

  details5: Details5Interface[];
  details6:Details6Interface[];
  id:number;
  //GPS_main_enterprise_long:any=null;
  //GPS_main_enterprise_lat:any=null;

  //Data for centenary
  consent:boolean=false;	//same as check agree.
  farmers_name:string="";
  do_you_have_disability:string="";
  disability_type:string="";
  own_a_mobile_phone:string="";
  What_type_of_phone_do_you_own:string="";
  No_of_contacts:number=null;
  tel_no1:string="";
  tel_No_2:string="";
  service_provider:string="";
  Specify_svc_provider:string="";
  mm_reg_status:string="";
  registered_mm_number:string="";
  nin:string="";
  ID_photo_url:string="";
  Photo_url:string="";
  video_url:string="";
  occupation:string="";
  specify_other_occupation:string="";
  Martial_status:string="";
  What_is_your_gender:string="";
  name_of_husband:string="";
  number_of_wives_husbands:string="";
  name_first_wife:string="";
  name_second_wife:string="";
  status_in_a_family:string=""; //This has been removed from the DB
  next_of_kin:string="";
  next_of_kin_has_contact:string="";
  next_of_kin_phone_no:string="";
  region:string="";
  //district:string="";
  distr:string="";

  other_district:string="";
  subcounty: string="";
  other_subcounty:string="";
  soiltype:string="";
  subcounty_other_district:string="";
  parish:string="";
  village:string="";
  nearest_town:string="";
  Local_council1_name:string="";
  resident_since:string="";
  Description_of_location:string="";
  DOB:string="";
  level_of_education:string="";
  head_of_the_household:string="";
  lo:string="";
  la:string="";
  Mobile_literacy:string="";
  any_dependants:string="";
  dependant_no:string="";
  dependants_age_bracket:any[]=[]; //The values are not being picked
  //farmer_org:string="";
  //name_of_farmer_org: string="";
  belong_farmergp:string="";
  name_farmergp:string="";
  //year_services:string="";
  position_in_FO:string="";
  Your_position_in_the_fo:string="";
  male_members_in_FO:string="";
  female_members_in_FO:string="";
  Affiliation:string="";
  Name_of_connected_ACE_or_DFA:string="";
  main_income_source:string="";
  mainincome_since:string="";
  sector:string="";
  main_income_relaibility:string="";
  main_income_amount:string="";
  annual_income:number=null; //add this new accidentally_removed
  other_income_sources:string="";
  other_income_activity:string="";
  years_of_experince:string="";
  other_income_reliability:string="";
  amount:number=null;
  income_trend:string="";
  access_to_Health_services:string="";
  health_expense:number=null;
  school_going_children:string="";
  no_of_school_going_children:number=null;
  school_fees_expense:string="";
  //expenditure:number=0;
  //disposable_income=0;
  what_is_the_land_tenor:string="";
  Specify_other:string="";

  value_of_land:string="";
  own_any_farm_machinery:any[]=[];
  house_ownership:string="";
  house_structure:string="";
  Farm_size:number=null;
  total_land_size:number=null;

  Main_crop_enterprise:string="";
  //Variety_of_mainenterprise:string=""; //it should be after main crop enterprise
  //Variety2_of_mainenterprise:string="";
  landsize_main_crop_enterprise:number=null;//follows Variety
  additional_land_main_enterprise:number=null;
  //season_of_planting:string="";
  yield_expected_main_enterprise:string="";
  farm_at_residence:string="";
  lo2:string="";
  la2:string="";
  acc2:string="";

  //postharvest_mgt:string="";
  //produce_storage:string="";
  //preservation:string="";
  crops_for_new_season:any[]=[];
  other_crops_intended:string="";
  //landsize_cropselected:string="";
  //landsize_cropselected:any[]=[];
  //yield_per_acre:number=null;
  //yield_per_acre:any[]=[];
  in_business_since:any[]=[];  
 /**these are in aloop */ 
  number_of_employees:string="";
  livestock:string="";
  specify_livestock:string="";
  cattle_number:number=null;
  goat_number:number=null;
  sheep_number:number=null;
  chicken_number:number=null;
  pigs_number:number=null;
  //donkey_number:number=null;
  Did_you_plant_last_season:string="";
  Specify_other_crops_grown:string="";

  yield_with_drought:any[]=[];
  year_of_severe_drought:string="";
  how_much_seed:any[]=[];

  yield_of_maize_with_adequate_rain_per_acre:number=null;
  yield_of_beans_with_adequate_rain_per_acre:number=null;
  yield_of_sesame_with_adequate_rain_per_acre:number=null;
  yield_of_soyabean_with_adequate_rain_per_acre:number=null;
  yield_of_rice_with_adequate_rain_per_acre:number=null;
  yield_of_millet_with_adequate_rain_per_acre:number=null;
  yield_of_sorghum_with_adequate_rain_per_acre:number=null;
  yield_of_irish_potatoes_with_adequate_rain_per_acre:number=null;
  yield_of_cotton_with_adequate_rain_per_acre:number=null;
  yield_of_sweet_potatoes_with_adequate_rain_per_acre:number=null;
  yield_of_sunflower_with_adequate_rain_per_acre:number=null;
  yield_of_groundnuts_with_adequate_rain_per_acre:number=null;
  yield_of_coffee_with_adequate_rain_per_acre:number=null;
  yield_of_banana_with_adequate_rain_per_acre:number=null;
  yield_of_cassava_with_adequate_rain_per_acre:number=null;

  crops_stored_from_last_season:string="";
  storage_time:string="";
  disturbances_in_storage:string="";
  Specify_others:string="";
  yield_last_season:any[]=[];
  yield_last_season2:any[]=[];
  maize_per_kg: number=null;
  beans_per_kg:number=null;
  rice_per_kg: number=null;
  sesame_per_kg: number=null;
  soyabean_per_kg:number=null;
  millet_per_kg: number=null;
  sorghum_per_kg: number=null;
  irish_potatoes_per_kg:number=null;
  cotton_per_kg:number=null;
  sweet_potatoes_per_kg:number=null;
  sunflower_per_kg: number=null;
  ground_nuts_per_kg: number=null;
  coffee_per_kg: number=null;
  Banana_per_bunch:number=null;
  cassava_per_kg: number=null;
  seed_variety:any[]=[];

  Did_you_apply_fertilizer:string="";
  Specify_the_type:string="";
  organic_specify:string="";
  Specify_other_organic:string="";
  inorganic_Specify:any[]=[];
  fertilizer_type:any[]=[];
  fertilizer_amount:any[]=[];

  use_pesticides_or_herbicides:string="";
  Please_specify_which_one:string="";
  //pesticide_effectiveness:string="";
  crop_use: string="";
  crop_subsistence:any[]=[];
  crop_commercial:any[]=[];
  income_from_crops:any[]=[];

  //involved_in_marketing: string="";

  //sell_of_produce_Nyakyera: string="";
  //sell_of_produce_green: string="";
  //sell_of_produce_equator: string="";
  //sell_of_produce_liraresort: string="";
  //sell_of_produce_cedo: string="";
  //sell_of_produce_orum: string="";
  //Marketlink: string="";
  //agent_name: string="";
  //produce_transport: string="";
  employ_any_farm_labour: string="";
  Specify_their_task:any[]=[];
  Who_assisted_you: any[]=[];
  How_much_did_you_pay_them: number=null;
  Are_you_aware_of_climate_shock:string="";
  which_ones_you_are_aware_of: string="";
  training_on_addressing_climate: string="";
  Please_specify: any[]=[];
//Ranking info


    Which_crops_for_rotation:string="";
    //Rank details
    _1st_choice:string="";
    _2nd_choice:string="";
    _3rd_choice:string="";
    crops_grown_last_season:any[]=[];
    crops_grown_last_season2:any[]=[];
    knoledge_of_rain_date: string="";
    heard_of_agri_insurance: string="";F
    access_to_agri_insurance: string="";
    Please_specify_the_agri_insurance_type: any[]=[];
    Specify_the_insurance_provider: string="";
    fair_charge_for_insurance: string="";
    prefer_ordinary_or_az_bunlde: string="";
    challenges_last_season: any[]=[];
    Specify: string="";
    What_type_of_pests: string="";
    type_of_weather_and_effect: string="";
    Do_you_have_a_bank_account: string="";

    financial_access: string="";
    transaction_monthly_costs: string="";
    Specify_other_monthly_transaction_costs: string="";
    travel_distance: string="";
    specify_other_travel_distance: string="";

    Have_you_ever_received_credit: string="";
    no_of_times_borrowed: string="";
    loanoutstanding: string="";
    How_much_repayment_was_made_per_month: string="";
    delay_time_for_repayment: string="";
    How_do_you_keep_your_money: any[]=[];
    financial_transaction_challeng: any[]=[];
    Specify_Other_financial_transaction_challeng: string="";
    action_access_to_financial_svc: string="";
    access_to_agric_ext_services: string="";
    How_do_you_access_Agric_ext_sv: any[]=[];
    extension_type_channel_receive: any[]=[];
    //adopted_practices: any[]=[];
    //most_mostadoptedpractice: string="";
    //Rate_services_training: string="";
    //frequently_access_ext_svcs: string="";
    //is_information_provided_accurt: string="";
    //trainingappropriate: string="";
    //benefits_of_practices: string="";
    //pay_anything_to_access_ext_svc: string="";
    //training: any[]=[];
    //pay_per_season: string="";
    //pest_fertilizer_pesticide_info: any[]=[];
    Do_you_receive_weather_data: string="";
    access_to_weather_data: any[]=[];
    How_accurate_is_the_info: string="";
    most_harmful_info: string="";
    biggest_prob_in_data_access: string="";
    spend_on_your_phone_monthly: string="";
    
    main_phone_use: any[]=[];
    Voice_calling_and_receiving:string="";
    SMS:string="";
    Internet:string="";
    Social_media:string="";


    subscribed_to_info_svces_on_ph: string="";
    services_suscribed_to: any[]=[];
    training_on_using_phone_servic: string="";
    training_on_weather_alerts: string="";
    //trainig_on_insurance: string="";
    Who_provided_the_training_on_insurance: string="";
    probs_of_using_cellphone: any[]=[];
    
    Who_provided_the_training_on_weather_alerts: string="";
    field_officer:string=this.fo;
    //Recently added


  //hhplanting_decision:string="";
  //hhproductionphase_decision:string=""; 
  //hhpostharvet_decision:string="";
  //hhmarketing_decision:string="";
  //hhincome_decision:string="";

  //meals_a_day:string="";
  //Vegetables:string=""; 
  //Carbohydrates:string="";
  //fruits:string="";
  //proteins:string=""; 

  farmers_cooperation_responding:string="";
  how_well_agent_knows_beneficiary:string="";
  accuracy_of_info_collected:string="";
  data_quality:string="";
  //farmers1_name: any="";
 //details: DetailsInterface[];
//newly added fields
sell_of_produce: string="";
date_of_harvest:string="";
specify_crops_for_new_season:string="";
rabbit_number:number=null;
farm_size_husbandry:string="";
livestock_breed:string="";
livestock_pdts:string=""
livestock_record:string="";
livestock_added:string="";
livestock_sold:string="";
livestock_sold_price:string="";
livestock_milk_produced:string="";
livestock_sales_income:string="";
fooder_produce:string="";
suppliment_livestock:string="";
concentrates_feeding:string="";
livestock_feeding_cost:string="";
livestock_healthsvcs:string="";
livestock_healthsvcs_arrival:string="";
livestock_healthsvcs_types: any[]=[];
livestock_death:string="";
livestock_death_cause:string="";
livestock_health_cost:string="";
livestock_type:string="";
preservation_mtds:string=""; //similar to preservation
planting_season:string="";
effective_sell_channel:string="";
reason_for_channel:string="";
need_loan:string="";
loan_amount:string="";
loan_security: any[]=[];
loan_purpose: any[]=[];
specify_loan_ammount:any[]=[];
first_payment_date:string="";
loan_period_xpctd:string="";
la_security:string="";
lo_security:string="";
//added on 24/08/16
acc_security:string="";


loan_failure_strategy:string="";
agric_ext_provider: any[]=[]; //changed to provider
other_extension_channel_receive:string="";
specify_training_mobilephones:string="";
mostusedapp_mobilephones:string="";
agribulker_belong:string="";
group_belong:string="";
token:string;

/**added Insurance variables */
spouse_name:string="";
DOB_spouse:string="";
no_of_child:string="";// this is just used at this point.
first_child_name:string="";
dob_first_child:string="";
second_child_name:string="";
dob_second_child:string="";
third_child_name:string="";
dob_third_child:string="";
forth_child_name:string="";
dob_forth_child:string="";
//Geoshape value
geoshape:string="";
acreage:string="";


//added on 24/08/2021

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

      public modalController: ModalController
      
    ) { 

    }
    dismiss() {
      this.modalController.dismiss();
    }
//Creating a model
    async openModal() {
      const modal = await this.modalController.create({
      component: ModalPopupPage,
      
      });
      return await modal.present();
     }

    // Only Integer Numbers
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
    launchapp(){
      this.storeData();
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

    term = '';
    district_data: any;

    agribulker_Details:any;
    group_details:any;
    ngOnInit() {
      fetch('../assets/district_subcounties.json').then(res => res.json())
      .then(json => {
        this.district_data = json;
      });
      fetch('http://3.12.97.246/standard_bank/public/api/agriDetails.php').then(res => res.json())
      .then(json => {
        this.agribulker_Details = json;
      });
      fetch('http://3.12.97.246/standard_bank/public/api/groupDetails.php').then(res => res.json())
      .then(json => {
        this.group_details = json;
      });
    }

  ionViewWillLeave(){
    this.storeData();
  }

  //Refreshing to obtain the updated list of farmers and agribulkers
  doRefresh(event) {
    fetch('http://3.12.97.246/standard_bank/public/api/agriDetails.php').then(res => res.json())
    .then(json => {
      this.agribulker_Details = json;
    });
    fetch('http://3.12.97.246/standard_bank/public/api/groupDetails.php').then(res => res.json())
    .then(json => {
      this.group_details = json;
    });
    setTimeout(() => {    
    fetch('http://3.12.97.246/standard_bank/public/api/agriDetails.php').then(res => res.json())
    .then(json => {
      this.agribulker_Details = json;
    });
    fetch('http://3.12.97.246/standard_bank/public/api/groupDetails.php').then(res => res.json())
    .then(json => {
      this.group_details = json;
    });
      event.target.complete();
    }, 3000);
  }

  //Variable for the number of profiles 
  profiles:number;

  ionViewDidEnter() { 
    this.restoreData();
//Saving the number of profile value to ionic storage
    this.storage.get('numberOfProfiles').then((res)=>{
        console.log(res);
        this.profiles = res;
    });
 
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.token= this.datastorage.token;
      this.disabledButton = false;
    });
      this.db5.getAllDetails().then(data5 => this.details5 = data5);
      this.db6.getAllDetails().then(data6 => this.details6 = data6);
  }
//Function to determine the sum of an array
sum_array(arr) { 
  let sum = 0; // initialize sum 

  // Iterate through all elements 
  // and add them to sum 
  for (let i = 0; i < arr.length; i++) 
      sum += arr[i]; 

  return sum; 
}


  addDetails(consent: boolean,farmers_name:string, do_you_have_disability:string, disability_type:string,own_a_mobile_phone:string,What_type_of_phone_do_you_own:string,No_of_contacts:number,tel_no1:string,tel_No_2:string,service_provider:string,Specify_svc_provider:string,mm_reg_status:string,registered_mm_number:string,nin:string,ID_photo_url:string,Photo_url:string,occupation:string,specify_other_occupation:string,Martial_status:string,What_is_your_gender:string,name_of_husband:string,number_of_wives_husbands:string,name_first_wife:string,name_second_wife:string,status_in_a_family:string,next_of_kin:string,next_of_kin_has_contact:string,next_of_kin_phone_no:string,region:string,distr:string,other_district:string,subcounty:string,other_subcounty:string,subcounty_other_district:string,soiltype:string,parish: string,village:string,nearest_town:string,Local_council1_name:string,resident_since:string,Description_of_location:string,DOB:string,level_of_education:string,head_of_the_household:string,la1:string,lo1:string,acc1:string,Mobile_literacy:string,any_dependants:string,dependant_no:string,dependants_age_bracket:any[],belong_farmergp:string,name_farmergp:string,position_in_FO:string,Your_position_in_the_fo:string,male_members_in_FO:string,female_members_in_FO:string,Affiliation:string,Name_of_connected_ACE_or_DFA:string,main_income_source:string,mainincome_since:string,sector:string,main_income_relaibility:string,main_income_amount:string,annual_income:number,other_income_sources:string,other_income_activity:string,years_of_experince:string,other_income_reliability:string,amount:number,income_trend:string,access_to_Health_services:string,health_expense:number,school_going_children:string,no_of_school_going_children:number,school_fees_expense:string,what_is_the_land_tenor:string,Specify_other:string,value_of_land:string,own_any_farm_machinery:any[],house_ownership:string,house_structure:string,Farm_size:number,total_land_size:number,Main_crop_enterprise:string,landsize_main_crop_enterprise:number,additional_land_main_enterprise:number,yield_expected_main_enterprise:string,farm_at_residence:string,la2:string,lo2:string,acc2:string,crops_for_new_season:any[],other_crops_intended:string,in_business_since:any[],number_of_employees:string,livestock:string,specify_livestock:string,cattle_number:number,goat_number:number,sheep_number:number,chicken_number:number,pigs_number:number,Did_you_plant_last_season:string,crops_grown_last_season:any[],crops_grown_last_season2:any[],Specify_other_crops_grown:string,yield_of_maize_with_adequate_rain_per_acre:number,yield_of_beans_with_adequate_rain_per_acre:number,yield_of_sesame_with_adequate_rain_per_acre:number,yield_of_soyabean_with_adequate_rain_per_acre:number,yield_of_rice_with_adequate_rain_per_acre:number,yield_of_millet_with_adequate_rain_per_acre:number,yield_of_sorghum_with_adequate_rain_per_acre:number,yield_of_irish_potatoes_with_adequate_rain_per_acre:number,yield_of_cotton_with_adequate_rain_per_acre:number,yield_of_sweet_potatoes_with_adequate_rain_per_acre:number,yield_of_sunflower_with_adequate_rain_per_acre:number,yield_of_groundnuts_with_adequate_rain_per_acre:number,yield_of_coffee_with_adequate_rain_per_acre:number,yield_of_banana_with_adequate_rain_per_acre:number,yield_of_cassava_with_adequate_rain_per_acre:number,crops_stored_from_last_season:string,storage_time:string,disturbances_in_storage:string,Specify_others:string,yield_last_season:any[],yield_last_season2:any[],yield_with_drought:any[],year_of_severe_drought:string,how_much_seed:any[],maize_per_kg: number,beans_per_kg:number,rice_per_kg: number,sesame_per_kg: number,soyabean_per_kg:number,millet_per_kg: number,sorghum_per_kg: number,irish_potatoes_per_kg:number,cotton_per_kg:number,sweet_potatoes_per_kg:number,sunflower_per_kg: number,ground_nuts_per_kg: number,coffee_per_kg: number,Banana_per_bunch:number,cassava_per_kg: number,seed_variety:any[],Did_you_apply_fertilizer:string,Specify_the_type:string,organic_specify:string,Specify_other_organic:string,inorganic_Specify:any[],fertilizer_type:any[],fertilizer_amount:any[],use_pesticides_or_herbicides:string,Please_specify_which_one:string,crop_use:string,crop_subsistence:any[],crop_commercial:any[],income_from_crops:any[],employ_any_farm_labour:string,Specify_their_task:any[],Who_assisted_you:any[],How_much_did_you_pay_them,Are_you_aware_of_climate_shock:string,which_ones_you_are_aware_of:string,training_on_addressing_climate:string,Please_specify:any[],Which_crops_for_rotation:string,_1st_choice:string,_2nd_choice:string,_3rd_choice:string,knoledge_of_rain_date:string,heard_of_agri_insurance:string,access_to_agri_insurance:string,Please_specify_the_agri_insurance_type:any[],Specify_the_insurance_provider: string,fair_charge_for_insurance: string,prefer_ordinary_or_az_bunlde: string,challenges_last_season: any[],Specify: string,What_type_of_pests: string,type_of_weather_and_effect: string,Do_you_have_a_bank_account: string,financial_access: string,transaction_monthly_costs: string,Specify_other_monthly_transaction_costs: string,travel_distance:string,specify_other_travel_distance:string,Have_you_ever_received_credit: string,no_of_times_borrowed: string,loanoutstanding: string,How_much_repayment_was_made_per_month: string,delay_time_for_repayment: string,How_do_you_keep_your_money: any[],financial_transaction_challeng: any[],Specify_Other_financial_transaction_challeng: string,action_access_to_financial_svc: string,access_to_agric_ext_services: string,How_do_you_access_Agric_ext_sv: any[],extension_type_channel_receive: any[],Do_you_receive_weather_data: string,access_to_weather_data:any[],How_accurate_is_the_info: string,most_harmful_info: string,biggest_prob_in_data_access: string,spend_on_your_phone_monthly: string,main_phone_use: any[],Voice_calling_and_receiving:string,SMS:string,Internet:string,Social_media:string,subscribed_to_info_svces_on_ph: string,services_suscribed_to:any[],training_on_using_phone_servic:string,training_on_weather_alerts: string,Who_provided_the_training_on_weather_alerts: string,Who_provided_the_training_on_insurance: string,probs_of_using_cellphone: any[],farmers_cooperation_responding:string,how_well_agent_knows_beneficiary:string,accuracy_of_info_collected:string,data_quality:string,sell_of_produce:string,date_of_harvest:string,specify_crops_for_new_season:string,rabbit_number:number,farm_size_husbandry:string,livestock_breed:string,livestock_pdts:string,livestock_record:string,livestock_added:string,livestock_sold:string,livestock_sold_price:string,livestock_milk_produced:string,livestock_sales_income:string,fooder_produce:string,suppliment_livestock:string,concentrates_feeding:string,livestock_feeding_cost:string,livestock_healthsvcs:string,livestock_healthsvcs_arrival:string,livestock_healthsvcs_types:any[],livestock_death:string,livestock_death_cause:string,livestock_health_cost:string,livestock_type:string,preservation_mtds:string,planting_season:string,effective_sell_channel:string,reason_for_channel:string,need_loan:string,loan_amount:string,loan_security:any[],loan_purpose:any[],specify_loan_ammount:any[],first_payment_date:string,loan_period_xpctd:string,la_security:string,lo_security:string,loan_failure_strategy:string,agric_ext_provider:any[],other_extension_channel_receive:string,specify_training_mobilephones:string,mostusedapp_mobilephones:string,agribulker_belong:string,group_belong:string,fo:string,token:string,spouse_name:string,DOB_spouse:string,first_child_name:string,dob_first_child:string,second_child_name:string,dob_second_child:string,third_child_name:string,dob_third_child:string,forth_child_name:string,dob_forth_child:string,geoshape:string,acreage:string
  ) {  
    if(this.consent==false){
        this.presentToast('The consent is required');
    }else{
       this.db5.addDetails(consent,farmers_name,do_you_have_disability,disability_type,own_a_mobile_phone,What_type_of_phone_do_you_own,No_of_contacts,tel_no1,tel_No_2,service_provider,Specify_svc_provider,mm_reg_status,registered_mm_number,nin,ID_photo_url,Photo_url,occupation,specify_other_occupation,Martial_status,What_is_your_gender,name_of_husband,number_of_wives_husbands,name_first_wife,name_second_wife,status_in_a_family,next_of_kin,next_of_kin_has_contact,next_of_kin_phone_no,region,distr,other_district,subcounty,other_subcounty,subcounty_other_district,soiltype,parish,village,nearest_town,Local_council1_name,resident_since,Description_of_location,DOB,level_of_education,head_of_the_household,la1,lo1,acc1,Mobile_literacy,any_dependants,dependant_no,dependants_age_bracket,belong_farmergp,name_farmergp,position_in_FO,Your_position_in_the_fo,male_members_in_FO,female_members_in_FO,Affiliation,Name_of_connected_ACE_or_DFA,main_income_source,mainincome_since,sector,main_income_relaibility,main_income_amount,annual_income,other_income_sources,other_income_activity,years_of_experince,other_income_reliability,amount,income_trend,access_to_Health_services,health_expense,school_going_children,no_of_school_going_children,school_fees_expense,what_is_the_land_tenor,Specify_other,value_of_land,own_any_farm_machinery,house_ownership,house_structure,Farm_size,total_land_size,Main_crop_enterprise,landsize_main_crop_enterprise,additional_land_main_enterprise,yield_expected_main_enterprise,farm_at_residence,la2,lo2,acc2,crops_for_new_season,other_crops_intended,in_business_since,number_of_employees,livestock,specify_livestock,cattle_number,goat_number,sheep_number,chicken_number,pigs_number,Did_you_plant_last_season,crops_grown_last_season,crops_grown_last_season2,Specify_other_crops_grown,yield_of_maize_with_adequate_rain_per_acre,yield_of_beans_with_adequate_rain_per_acre,yield_of_sesame_with_adequate_rain_per_acre,yield_of_soyabean_with_adequate_rain_per_acre,yield_of_rice_with_adequate_rain_per_acre,yield_of_millet_with_adequate_rain_per_acre,yield_of_sorghum_with_adequate_rain_per_acre,yield_of_irish_potatoes_with_adequate_rain_per_acre,yield_of_cotton_with_adequate_rain_per_acre,yield_of_sweet_potatoes_with_adequate_rain_per_acre,yield_of_sunflower_with_adequate_rain_per_acre,yield_of_groundnuts_with_adequate_rain_per_acre,yield_of_coffee_with_adequate_rain_per_acre,yield_of_banana_with_adequate_rain_per_acre,yield_of_cassava_with_adequate_rain_per_acre,crops_stored_from_last_season,storage_time,disturbances_in_storage,Specify_others,yield_last_season,yield_last_season2,yield_with_drought,year_of_severe_drought,how_much_seed,maize_per_kg,beans_per_kg,rice_per_kg,sesame_per_kg,soyabean_per_kg,millet_per_kg,sorghum_per_kg,irish_potatoes_per_kg,cotton_per_kg,sweet_potatoes_per_kg,sunflower_per_kg,ground_nuts_per_kg,coffee_per_kg,Banana_per_bunch,cassava_per_kg,seed_variety,Did_you_apply_fertilizer,Specify_the_type,organic_specify,Specify_other_organic,inorganic_Specify,fertilizer_type,fertilizer_amount,use_pesticides_or_herbicides,Please_specify_which_one,crop_use,crop_subsistence,crop_commercial,income_from_crops,employ_any_farm_labour,Specify_their_task,Who_assisted_you,How_much_did_you_pay_them,Are_you_aware_of_climate_shock,which_ones_you_are_aware_of,training_on_addressing_climate,Please_specify,Which_crops_for_rotation,_1st_choice,_2nd_choice,_3rd_choice,knoledge_of_rain_date,heard_of_agri_insurance,access_to_agri_insurance,Please_specify_the_agri_insurance_type,Specify_the_insurance_provider,fair_charge_for_insurance,prefer_ordinary_or_az_bunlde,challenges_last_season,Specify,What_type_of_pests,type_of_weather_and_effect,Do_you_have_a_bank_account,financial_access,transaction_monthly_costs,Specify_other_monthly_transaction_costs,travel_distance,specify_other_travel_distance,Have_you_ever_received_credit,no_of_times_borrowed,loanoutstanding,How_much_repayment_was_made_per_month,delay_time_for_repayment,How_do_you_keep_your_money,financial_transaction_challeng,Specify_Other_financial_transaction_challeng,action_access_to_financial_svc,access_to_agric_ext_services,How_do_you_access_Agric_ext_sv,extension_type_channel_receive,Do_you_receive_weather_data,access_to_weather_data,How_accurate_is_the_info,most_harmful_info,biggest_prob_in_data_access,spend_on_your_phone_monthly,main_phone_use,Voice_calling_and_receiving,SMS,Internet,Social_media,subscribed_to_info_svces_on_ph,services_suscribed_to,training_on_using_phone_servic,training_on_weather_alerts,Who_provided_the_training_on_weather_alerts,Who_provided_the_training_on_insurance,probs_of_using_cellphone,farmers_cooperation_responding,how_well_agent_knows_beneficiary,accuracy_of_info_collected,data_quality,sell_of_produce,date_of_harvest,specify_crops_for_new_season,rabbit_number,farm_size_husbandry,livestock_breed,livestock_pdts,livestock_record,livestock_added,livestock_sold,livestock_sold_price,livestock_milk_produced,livestock_sales_income,fooder_produce,suppliment_livestock,concentrates_feeding,livestock_feeding_cost,livestock_healthsvcs,livestock_healthsvcs_arrival,livestock_healthsvcs_types,livestock_death,livestock_death_cause,livestock_health_cost,livestock_type,preservation_mtds,planting_season,effective_sell_channel,reason_for_channel,need_loan,loan_amount,loan_security,loan_purpose,specify_loan_ammount,first_payment_date,loan_period_xpctd,la_security,lo_security,loan_failure_strategy,agric_ext_provider,other_extension_channel_receive,specify_training_mobilephones,mostusedapp_mobilephones,agribulker_belong,group_belong,fo, token,spouse_name,DOB_spouse,first_child_name,dob_first_child,second_child_name,dob_second_child,third_child_name,dob_third_child,forth_child_name,dob_forth_child,geoshape,acreage
      ).then(data5 => {
          this.details5 = data5;
        }); 
        this.presentToast("Profile saved locally, you can submit it later");
        this.disabledButton = false;
        this.consent=false;
        this.farmers_name="";
        this.do_you_have_disability="";
        this.disability_type="";
        this.own_a_mobile_phone="";
        this.What_type_of_phone_do_you_own="";
        this.No_of_contacts=null;
        this.tel_no1="";
        this.tel_No_2="";
        this.service_provider="";
        this.Specify_svc_provider="";
        this.mm_reg_status="";
        this.registered_mm_number="";
        this.nin="";
        this.Photo_url="";
        this.ID_photo_url="";
        this.currentImage="";
        this.currentImageID="";
        //for the video
        this.currentVideoID="";
        this.occupation="";
        this.specify_other_occupation="";
        this.Martial_status="";
        this.What_is_your_gender="";
        this.name_of_husband="";
        this.number_of_wives_husbands="";
        this.name_first_wife="";
        this.name_second_wife="";
        this.status_in_a_family="";
        this.next_of_kin="";
        this.next_of_kin_has_contact="";
        this.next_of_kin_phone_no="";
        this.region="";
        this.distr="";
        this.other_district="";
        this.subcounty="";
        this.other_subcounty="";
        this.subcounty_other_district="";
        this.soiltype="";
        this.parish="";
        this.village="";
        this.nearest_town="";
        this.Local_council1_name="";
        this.resident_since="";
        this.Description_of_location="";
        this.DOB="";
        this.level_of_education="";
        this.head_of_the_household="";
        this.lo1="";
        this.la1="";
        this.acc1="";

        this.lo2="";
        this.la2="";
        this.acc2="";

        this.Mobile_literacy="";
        this.any_dependants="";
        this.dependant_no="";
        this.dependants_age_bracket=[];
        //Casa Data 
        this.belong_farmergp="";
        this.name_farmergp="";

        this.belong_farmergp="";
        this.position_in_FO="";
        this.Your_position_in_the_fo="";
        this.male_members_in_FO="";
        this.female_members_in_FO="";
        this.Affiliation="";
        this.Name_of_connected_ACE_or_DFA="";
        this.main_income_source="";
        //Here we include the values that are in aloop for other income source.
        

        this.mainincome_since="";
        this.sector="";
        this.main_income_relaibility="";
        this.main_income_amount="";
        this.annual_income = null;
        this.other_income_reliability="";
        this.amount=null;
        this.income_trend="";
        this.access_to_Health_services="";
        this.health_expense=null;
        this.school_going_children="";
        this.no_of_school_going_children=null;
        this.school_fees_expense="";
        //expenditure
        //disposable_income
        this.what_is_the_land_tenor="";
        this.Specify_other="";
        this.value_of_land="";
        this.own_any_farm_machinery=[];
        this.house_ownership="";
        this.house_structure="";
        this.Farm_size=null;
        this.total_land_size=null;
        this.Main_crop_enterprise="",
        this.yield_expected_main_enterprise;
        this.farm_at_residence="";
        //Gps
        this.crops_for_new_season=[];

        this.other_crops_intended="";
        
        this.number_of_employees="";

        this.livestock="";
        this.specify_livestock="";
        this.cattle_number=null;
        this.goat_number=null;
        this.sheep_number=null;
        this.chicken_number=null;
        this.pigs_number=null;
        this.Did_you_plant_last_season="";
        this.crops_grown_last_season=[];
        this.crops_grown_last_season2=[];
        this.Specify_other_crops_grown="";
        this.in_business_since=[];
        this.yield_with_drought=[];
        this.year_of_severe_drought="";
        this.how_much_seed=[];

        this.yield_of_maize_with_adequate_rain_per_acre=null;
        this.yield_of_beans_with_adequate_rain_per_acre=null;
        this.yield_of_sesame_with_adequate_rain_per_acre=null;
        this.yield_of_soyabean_with_adequate_rain_per_acre=null;
        this.yield_of_rice_with_adequate_rain_per_acre=null;
        this.yield_of_millet_with_adequate_rain_per_acre=null;
        this.yield_of_sorghum_with_adequate_rain_per_acre=null;
        this.yield_of_irish_potatoes_with_adequate_rain_per_acre=null;
        this.yield_of_cotton_with_adequate_rain_per_acre=null;
        this.yield_of_sweet_potatoes_with_adequate_rain_per_acre=null;
        this.yield_of_sunflower_with_adequate_rain_per_acre=null;
        this.yield_of_groundnuts_with_adequate_rain_per_acre=null;
        this.yield_of_coffee_with_adequate_rain_per_acre=null;
        this.yield_of_banana_with_adequate_rain_per_acre=null;
        this.yield_of_cassava_with_adequate_rain_per_acre=null;
        this.crops_stored_from_last_season="";
        this.disturbances_in_storage="";
        this.storage_time="";
        this.Specify_others="";

        this.yield_last_season=[];
        this.yield_last_season2=[];

        this.yield_with_drought=[];
        this.year_of_severe_drought="";

        this.maize_per_kg=null;
        this.beans_per_kg=null;
        this.sesame_per_kg=null;
        this.soyabean_per_kg=null;
        this.rice_per_kg=null;
        this.millet_per_kg=null;
        this.sorghum_per_kg=null;
        this.irish_potatoes_per_kg=null;
        this.cotton_per_kg=null;
        this.sweet_potatoes_per_kg=null;
        this.sunflower_per_kg=null;
        this.ground_nuts_per_kg=null;
        this.coffee_per_kg=null;
        this.Banana_per_bunch=null;
        this.cassava_per_kg=null;
        this.seed_variety=[];
//More
      this.Did_you_apply_fertilizer=null;
      this.Specify_the_type=null;
      this.organic_specify=null;
      this.Specify_other_organic=null;
      this.inorganic_Specify=[];
      this.fertilizer_type=[];
      this.fertilizer_amount=[];

      this.use_pesticides_or_herbicides="";
      this.Please_specify_which_one="";
      this.crop_use="";
      this.crop_subsistence=[];
      this.crop_commercial=[];
      this.income_from_crops=[];

      this.employ_any_farm_labour="";
      this.Specify_their_task=[];
      this.Who_assisted_you=[];
      this.How_much_did_you_pay_them=null;
      this.Are_you_aware_of_climate_shock="";
      this.which_ones_you_are_aware_of="";
      this.training_on_addressing_climate="";
      this.Please_specify=[];
      this.Which_crops_for_rotation="";
      this._1st_choice="";
      this._2nd_choice="";
      this._3rd_choice="";

      this.knoledge_of_rain_date="";
      this.heard_of_agri_insurance="";
      this.access_to_agri_insurance="";
      this.Please_specify_the_agri_insurance_type=[];
      this.Specify_the_insurance_provider="";
      this.fair_charge_for_insurance="";
      this.prefer_ordinary_or_az_bunlde="";
      this.challenges_last_season=[];
      this.Specify="";
      this.What_type_of_pests="";
      this.type_of_weather_and_effect="";
      this.Do_you_have_a_bank_account="";
      this.financial_access="";
      this.transaction_monthly_costs="";
      this.Specify_other_monthly_transaction_costs="";
      this.travel_distance="";
      this.specify_other_travel_distance="";
      this.Have_you_ever_received_credit="";
      this.no_of_times_borrowed="";
      this.loanoutstanding="";
      this.How_much_repayment_was_made_per_month="";
      this.delay_time_for_repayment="";
      this.How_do_you_keep_your_money=[];
      this.financial_transaction_challeng=[];
      this.Specify_Other_financial_transaction_challeng="";
      this.action_access_to_financial_svc="";
      this.access_to_agric_ext_services="";
      this.How_do_you_access_Agric_ext_sv=[];
      this.extension_type_channel_receive=[];
      this.Do_you_receive_weather_data="";
      this.access_to_weather_data=[];
      this.How_accurate_is_the_info="";
      this.most_harmful_info="";
      this.biggest_prob_in_data_access="";
      this.spend_on_your_phone_monthly="";
      this.main_phone_use=[];
      this.subscribed_to_info_svces_on_ph="";
      this.services_suscribed_to=[];
      this.training_on_using_phone_servic="";
      this.training_on_weather_alerts="";
      this.Who_provided_the_training_on_weather_alerts="";
      this.Who_provided_the_training_on_insurance="";
      this.probs_of_using_cellphone=[];

      this.landsize_main_crop_enterprise=null;
      this.additional_land_main_enterprise=null;
      this.farmers_cooperation_responding="";
      this.how_well_agent_knows_beneficiary="";
      this.accuracy_of_info_collected="";
      this.data_quality="";
      this.other_income_sources=="";
      this.mainincome_since=="";
      this.sell_of_produce="";
      
      this.date_of_harvest="";
      this.specify_crops_for_new_season="";
      this.rabbit_number=null;
      this.farm_size_husbandry="";
      this.livestock_breed="";
      this.livestock_pdts="";
      this.livestock_record="";
      this.livestock_added="";
      this.livestock_sold="";
      this.livestock_sold_price="";
      this.livestock_milk_produced="";
      this.livestock_sales_income="";
      this.fooder_produce="";
      this.suppliment_livestock="";
      this.concentrates_feeding="";
      this.livestock_feeding_cost="";
      this.livestock_healthsvcs="";
      this.livestock_healthsvcs_arrival="";
      this.livestock_healthsvcs_types=[];
      this.livestock_death="";
      this.livestock_death_cause="";
      this.livestock_health_cost="";
      this.livestock_type="";
      this.preservation_mtds="";
      this.planting_season="";
      this.effective_sell_channel="";
      this.reason_for_channel="";
      this.need_loan="";
      this.loan_amount="";
      this.loan_security=[];
      this.loan_purpose=[];
      this.specify_loan_ammount=[];
      this.first_payment_date="";
      this.loan_period_xpctd="";
      this.la_security="";
      this.lo_security="";
      this.loan_failure_strategy="";
      this.agric_ext_provider=[];
      this.other_extension_channel_receive="";
      this.specify_training_mobilephones="";
      this.mostusedapp_mobilephones="";
      this.agribulker_belong="";
      this.group_belong="";
      //added more 10 columns for insurance
      this.no_of_child="";
      this.spouse_name="";
      this.DOB_spouse="";
      this.first_child_name="";
      this.dob_first_child="";
      this.second_child_name="";
      this.dob_second_child="";
      this.third_child_name="";
      this.dob_third_child="";
      this.forth_child_name="";
      this.dob_forth_child="";
      this.geoshape="";
      this.acreage="";

      this.Voice_calling_and_receiving="";
      this.SMS="";
      this.Internet="";
      this.Social_media="";
      this.term="";

      this.other_income_sources="";
      this.other_income_activity="";
      this.years_of_experince="";
      this.yield_expected_main_enterprise="";
      this.router.navigate(['/farmerprofile']);
      }
  }

  //Function to send farmer profile data to the sent tab on submit
  addDetails_sent(consent: boolean,farmers_name:string, do_you_have_disability:string, disability_type:string,own_a_mobile_phone:string,What_type_of_phone_do_you_own:string,No_of_contacts:number,tel_no1:string,tel_No_2:string,service_provider:string,Specify_svc_provider:string,mm_reg_status:string,registered_mm_number:string,nin:string,ID_photo_url:string,Photo_url:string,occupation:string,specify_other_occupation:string,Martial_status:string,What_is_your_gender:string,name_of_husband:string,number_of_wives_husbands:string,name_first_wife:string,name_second_wife:string,status_in_a_family:string,next_of_kin:string,next_of_kin_has_contact:string,next_of_kin_phone_no:string,region:string,distr:string,other_district:string,subcounty:string,other_subcounty:string,subcounty_other_district:string,soiltype:string,parish: string,village:string,nearest_town:string,Local_council1_name:string,resident_since:string,Description_of_location:string,DOB:string,level_of_education:string,head_of_the_household:string,la1:string,lo1:string,acc1:string,Mobile_literacy:string,any_dependants:string,dependant_no:string,dependants_age_bracket:any[],belong_farmergp:string,name_farmergp:string,position_in_FO:string,Your_position_in_the_fo:string,male_members_in_FO:string,female_members_in_FO:string,Affiliation:string,Name_of_connected_ACE_or_DFA:string,main_income_source:string,mainincome_since:string,sector:string,main_income_relaibility:string,main_income_amount:string,annual_income:number,other_income_sources:string,other_income_activity:string,years_of_experince:string,other_income_reliability:string,amount:number,income_trend:string,access_to_Health_services:string,health_expense:number,school_going_children:string,no_of_school_going_children:number,school_fees_expense:string,what_is_the_land_tenor:string,Specify_other:string,value_of_land:string,own_any_farm_machinery:any[],house_ownership:string,house_structure:string,Farm_size:number,total_land_size:number,Main_crop_enterprise:string,landsize_main_crop_enterprise:number,additional_land_main_enterprise:number,yield_expected_main_enterprise:string,farm_at_residence:string,la2:string,lo2:string,acc2:string,crops_for_new_season:any[],other_crops_intended:string,in_business_since:any[],number_of_employees:string,livestock:string,specify_livestock:string,cattle_number:number,goat_number:number,sheep_number:number,chicken_number:number,pigs_number:number,Did_you_plant_last_season:string,crops_grown_last_season:any[],crops_grown_last_season2:any[],Specify_other_crops_grown:string,yield_of_maize_with_adequate_rain_per_acre:number,yield_of_beans_with_adequate_rain_per_acre:number,yield_of_sesame_with_adequate_rain_per_acre:number,yield_of_soyabean_with_adequate_rain_per_acre:number,yield_of_rice_with_adequate_rain_per_acre:number,yield_of_millet_with_adequate_rain_per_acre:number,yield_of_sorghum_with_adequate_rain_per_acre:number,yield_of_irish_potatoes_with_adequate_rain_per_acre:number,yield_of_cotton_with_adequate_rain_per_acre:number,yield_of_sweet_potatoes_with_adequate_rain_per_acre:number,yield_of_sunflower_with_adequate_rain_per_acre:number,yield_of_groundnuts_with_adequate_rain_per_acre:number,yield_of_coffee_with_adequate_rain_per_acre:number,yield_of_banana_with_adequate_rain_per_acre:number,yield_of_cassava_with_adequate_rain_per_acre:number,crops_stored_from_last_season:string,storage_time:string,disturbances_in_storage:string,Specify_others:string,yield_last_season:any[],yield_last_season2:any[],yield_with_drought:any[],year_of_severe_drought:string,how_much_seed:any[],maize_per_kg: number,beans_per_kg:number,rice_per_kg: number,sesame_per_kg: number,soyabean_per_kg:number,millet_per_kg: number,sorghum_per_kg: number,irish_potatoes_per_kg:number,cotton_per_kg:number,sweet_potatoes_per_kg:number,sunflower_per_kg: number,ground_nuts_per_kg: number,coffee_per_kg: number,Banana_per_bunch:number,cassava_per_kg: number,seed_variety:any[],Did_you_apply_fertilizer:string,Specify_the_type:string,organic_specify:string,Specify_other_organic:string,inorganic_Specify:any[],fertilizer_type:any[],fertilizer_amount:any[],use_pesticides_or_herbicides:string,Please_specify_which_one:string,crop_use:string,crop_subsistence:any[],crop_commercial:any[],income_from_crops:any[],employ_any_farm_labour:string,Specify_their_task:any[],Who_assisted_you:any[],How_much_did_you_pay_them,Are_you_aware_of_climate_shock:string,which_ones_you_are_aware_of:string,training_on_addressing_climate:string,Please_specify:any[],Which_crops_for_rotation:string,_1st_choice:string,_2nd_choice:string,_3rd_choice:string,knoledge_of_rain_date:string,heard_of_agri_insurance:string,access_to_agri_insurance:string,Please_specify_the_agri_insurance_type:any[],Specify_the_insurance_provider: string,fair_charge_for_insurance: string,prefer_ordinary_or_az_bunlde: string,challenges_last_season: any[],Specify: string,What_type_of_pests: string,type_of_weather_and_effect: string,Do_you_have_a_bank_account: string,financial_access: string,transaction_monthly_costs: string,Specify_other_monthly_transaction_costs: string,travel_distance:string,specify_other_travel_distance:string,Have_you_ever_received_credit: string,no_of_times_borrowed: string,loanoutstanding: string,How_much_repayment_was_made_per_month: string,delay_time_for_repayment: string,How_do_you_keep_your_money: any[],financial_transaction_challeng: any[],Specify_Other_financial_transaction_challeng: string,action_access_to_financial_svc: string,access_to_agric_ext_services: string,How_do_you_access_Agric_ext_sv: any[],extension_type_channel_receive: any[],Do_you_receive_weather_data: string,access_to_weather_data:any[],How_accurate_is_the_info: string,most_harmful_info: string,biggest_prob_in_data_access: string,spend_on_your_phone_monthly: string,main_phone_use: any[],Voice_calling_and_receiving:string,SMS:string,Internet:string,Social_media:string,subscribed_to_info_svces_on_ph: string,services_suscribed_to:any[],training_on_using_phone_servic:string,training_on_weather_alerts: string,Who_provided_the_training_on_weather_alerts: string,Who_provided_the_training_on_insurance: string,probs_of_using_cellphone: any[],farmers_cooperation_responding:string,how_well_agent_knows_beneficiary:string,accuracy_of_info_collected:string,data_quality:string,sell_of_produce:string,date_of_harvest:string,specify_crops_for_new_season:string,rabbit_number:number,farm_size_husbandry:string,livestock_breed:string,livestock_pdts:string,livestock_record:string,livestock_added:string,livestock_sold:string,livestock_sold_price:string,livestock_milk_produced:string,livestock_sales_income:string,fooder_produce:string,suppliment_livestock:string,concentrates_feeding:string,livestock_feeding_cost:string,livestock_healthsvcs:string,livestock_healthsvcs_arrival:string,livestock_healthsvcs_types:any[],livestock_death:string,livestock_death_cause:string,livestock_health_cost:string,livestock_type:string,preservation_mtds:string,planting_season:string,effective_sell_channel:string,reason_for_channel:string,need_loan:string,loan_amount:string,loan_security:any[],loan_purpose:any[],specify_loan_ammount:any[],first_payment_date:string,loan_period_xpctd:string,la_security:string,lo_security:string,loan_failure_strategy:string,agric_ext_provider:any[],other_extension_channel_receive:string,specify_training_mobilephones:string,mostusedapp_mobilephones:string,agribulker_belong:string,group_belong:string,fo:string,token:string,spouse_name:string,DOB_spouse:string,first_child_name:string,dob_first_child:string,second_child_name:string,dob_second_child:string,third_child_name:string,dob_third_child:string,forth_child_name:string,dob_forth_child:string,geoshape:string,acreage:string
  ) {  
    if(this.consent==false){
        this.presentToast('The consent is required');
    }else{
       this.db6.addDetails(consent,farmers_name,do_you_have_disability,disability_type,own_a_mobile_phone,What_type_of_phone_do_you_own,No_of_contacts,tel_no1,tel_No_2,service_provider,Specify_svc_provider,mm_reg_status,registered_mm_number,nin,ID_photo_url,Photo_url,occupation,specify_other_occupation,Martial_status,What_is_your_gender,name_of_husband,number_of_wives_husbands,name_first_wife,name_second_wife,status_in_a_family,next_of_kin,next_of_kin_has_contact,next_of_kin_phone_no,region,distr,other_district,subcounty,other_subcounty,subcounty_other_district,soiltype,parish,village,nearest_town,Local_council1_name,resident_since,Description_of_location,DOB,level_of_education,head_of_the_household,la1,lo1,acc1,Mobile_literacy,any_dependants,dependant_no,dependants_age_bracket,belong_farmergp,name_farmergp,position_in_FO,Your_position_in_the_fo,male_members_in_FO,female_members_in_FO,Affiliation,Name_of_connected_ACE_or_DFA,main_income_source,mainincome_since,sector,main_income_relaibility,main_income_amount,annual_income,other_income_sources,other_income_activity,years_of_experince,other_income_reliability,amount,income_trend,access_to_Health_services,health_expense,school_going_children,no_of_school_going_children,school_fees_expense,what_is_the_land_tenor,Specify_other,value_of_land,own_any_farm_machinery,house_ownership,house_structure,Farm_size,total_land_size,Main_crop_enterprise,landsize_main_crop_enterprise,additional_land_main_enterprise,yield_expected_main_enterprise,farm_at_residence,la2,lo2,acc2,crops_for_new_season,other_crops_intended,in_business_since,number_of_employees,livestock,specify_livestock,cattle_number,goat_number,sheep_number,chicken_number,pigs_number,Did_you_plant_last_season,crops_grown_last_season,crops_grown_last_season2,Specify_other_crops_grown,yield_of_maize_with_adequate_rain_per_acre,yield_of_beans_with_adequate_rain_per_acre,yield_of_sesame_with_adequate_rain_per_acre,yield_of_soyabean_with_adequate_rain_per_acre,yield_of_rice_with_adequate_rain_per_acre,yield_of_millet_with_adequate_rain_per_acre,yield_of_sorghum_with_adequate_rain_per_acre,yield_of_irish_potatoes_with_adequate_rain_per_acre,yield_of_cotton_with_adequate_rain_per_acre,yield_of_sweet_potatoes_with_adequate_rain_per_acre,yield_of_sunflower_with_adequate_rain_per_acre,yield_of_groundnuts_with_adequate_rain_per_acre,yield_of_coffee_with_adequate_rain_per_acre,yield_of_banana_with_adequate_rain_per_acre,yield_of_cassava_with_adequate_rain_per_acre,crops_stored_from_last_season,storage_time,disturbances_in_storage,Specify_others,yield_last_season,yield_last_season2,yield_with_drought,year_of_severe_drought,how_much_seed,maize_per_kg,beans_per_kg,rice_per_kg,sesame_per_kg,soyabean_per_kg,millet_per_kg,sorghum_per_kg,irish_potatoes_per_kg,cotton_per_kg,sweet_potatoes_per_kg,sunflower_per_kg,ground_nuts_per_kg,coffee_per_kg,Banana_per_bunch,cassava_per_kg,seed_variety,Did_you_apply_fertilizer,Specify_the_type,organic_specify,Specify_other_organic,inorganic_Specify,fertilizer_type,fertilizer_amount,use_pesticides_or_herbicides,Please_specify_which_one,crop_use,crop_subsistence,crop_commercial,income_from_crops,employ_any_farm_labour,Specify_their_task,Who_assisted_you,How_much_did_you_pay_them,Are_you_aware_of_climate_shock,which_ones_you_are_aware_of,training_on_addressing_climate,Please_specify,Which_crops_for_rotation,_1st_choice,_2nd_choice,_3rd_choice,knoledge_of_rain_date,heard_of_agri_insurance,access_to_agri_insurance,Please_specify_the_agri_insurance_type,Specify_the_insurance_provider,fair_charge_for_insurance,prefer_ordinary_or_az_bunlde,challenges_last_season,Specify,What_type_of_pests,type_of_weather_and_effect,Do_you_have_a_bank_account,financial_access,transaction_monthly_costs,Specify_other_monthly_transaction_costs,travel_distance,specify_other_travel_distance,Have_you_ever_received_credit,no_of_times_borrowed,loanoutstanding,How_much_repayment_was_made_per_month,delay_time_for_repayment,How_do_you_keep_your_money,financial_transaction_challeng,Specify_Other_financial_transaction_challeng,action_access_to_financial_svc,access_to_agric_ext_services,How_do_you_access_Agric_ext_sv,extension_type_channel_receive,Do_you_receive_weather_data,access_to_weather_data,How_accurate_is_the_info,most_harmful_info,biggest_prob_in_data_access,spend_on_your_phone_monthly,main_phone_use,Voice_calling_and_receiving,SMS,Internet,Social_media,subscribed_to_info_svces_on_ph,services_suscribed_to,training_on_using_phone_servic,training_on_weather_alerts,Who_provided_the_training_on_weather_alerts,Who_provided_the_training_on_insurance,probs_of_using_cellphone,farmers_cooperation_responding,how_well_agent_knows_beneficiary,accuracy_of_info_collected,data_quality,sell_of_produce,date_of_harvest,specify_crops_for_new_season,rabbit_number,farm_size_husbandry,livestock_breed,livestock_pdts,livestock_record,livestock_added,livestock_sold,livestock_sold_price,livestock_milk_produced,livestock_sales_income,fooder_produce,suppliment_livestock,concentrates_feeding,livestock_feeding_cost,livestock_healthsvcs,livestock_healthsvcs_arrival,livestock_healthsvcs_types,livestock_death,livestock_death_cause,livestock_health_cost,livestock_type,preservation_mtds,planting_season,effective_sell_channel,reason_for_channel,need_loan,loan_amount,loan_security,loan_purpose,specify_loan_ammount,first_payment_date,loan_period_xpctd,la_security,lo_security,loan_failure_strategy,agric_ext_provider,other_extension_channel_receive,specify_training_mobilephones,mostusedapp_mobilephones,agribulker_belong,group_belong,fo, token,spouse_name,DOB_spouse,first_child_name,dob_first_child,second_child_name,dob_second_child,third_child_name,dob_third_child,forth_child_name,dob_forth_child,geoshape,acreage

          ).then(data6 => {
          this.details6 = data6;
        }); 
        //this.presentToast("Profile saved locally, you can submit it later");
        this.disabledButton = false;
        this.consent=false;
        this.farmers_name="";
        this.do_you_have_disability="";
        this.disability_type="";
        this.own_a_mobile_phone="";
        this.What_type_of_phone_do_you_own="";
        this.No_of_contacts=null;
        this.tel_no1="";
        this.tel_No_2="";
        this.service_provider="";
        this.Specify_svc_provider="";
        this.mm_reg_status="";
        this.registered_mm_number="";
        this.nin="";
        this.Photo_url="";
        this.ID_photo_url="";
        this.currentImage="";
        this.currentImageID="";
        //for the video
        this.currentVideoID="";
        this.occupation="";
        this.specify_other_occupation="";
        this.Martial_status="";
        this.What_is_your_gender="";
        this.name_of_husband="";
        this.number_of_wives_husbands="";
        this.name_first_wife="";
        this.name_second_wife="";
        this.status_in_a_family="";
        this.next_of_kin="";
        this.next_of_kin_has_contact="";
        this.next_of_kin_phone_no="";
        this.region="";
        this.distr="";
        this.other_district="";
        this.subcounty="";
        this.other_subcounty="";
        this.subcounty_other_district="";
        this.soiltype="";
        this.parish="";
        this.village="";
        this.nearest_town="";
        this.Local_council1_name="";
        this.resident_since="";
        this.Description_of_location="";
        this.DOB="";
        this.level_of_education="";
        this.head_of_the_household="";
        this.lo1="";
        this.la1="";
        this.acc1="";

        this.lo2="";
        this.la2="";
        this.acc2="";

        this.Mobile_literacy="";
        this.any_dependants="";
        this.dependant_no="";
        this.dependants_age_bracket=[];
        //Casa Data 
        this.belong_farmergp="";
        this.name_farmergp="";

        this.belong_farmergp="";
        this.position_in_FO="";
        this.Your_position_in_the_fo="";
        this.male_members_in_FO="";
        this.female_members_in_FO="";
        this.Affiliation="";
        this.Name_of_connected_ACE_or_DFA="";
        this.main_income_source="";
        //Here we include the values that are in aloop for other income source.
        

        this.mainincome_since="";
        this.sector="";
        this.main_income_relaibility="";
        this.main_income_amount="";
        this.annual_income = null;
        this.other_income_reliability="";
        this.amount=null;
        this.income_trend="";
        this.access_to_Health_services="";
        this.health_expense=null;
        this.school_going_children="";
        this.no_of_school_going_children=null;
        this.school_fees_expense="";
        //expenditure
        //disposable_income
        this.what_is_the_land_tenor="";
        this.Specify_other="";
        this.value_of_land="";
        this.own_any_farm_machinery=[];
        this.house_ownership="";
        this.house_structure="";
        this.Farm_size=null;
        this.total_land_size=null;
        this.Main_crop_enterprise=null;
        this.yield_expected_main_enterprise;
        this.farm_at_residence="";
        //Gps
        this.crops_for_new_season=[];

        this.other_crops_intended="";
        
        this.number_of_employees="";

        this.livestock="";
        this.specify_livestock="";
        this.cattle_number=null;
        this.goat_number=null;
        this.sheep_number=null;
        this.chicken_number=null;
        this.pigs_number=null;
        this.Did_you_plant_last_season="";
        this.crops_grown_last_season=[];
        this.crops_grown_last_season2=[];
        this.Specify_other_crops_grown="";
        this.in_business_since=[];
        this.yield_with_drought=[];
        this.year_of_severe_drought="";
        this.how_much_seed=[];

        this.yield_of_maize_with_adequate_rain_per_acre=null;
        this.yield_of_beans_with_adequate_rain_per_acre=null;
        this.yield_of_sesame_with_adequate_rain_per_acre=null;
        this.yield_of_soyabean_with_adequate_rain_per_acre=null;
        this.yield_of_rice_with_adequate_rain_per_acre=null;
        this.yield_of_millet_with_adequate_rain_per_acre=null;
        this.yield_of_sorghum_with_adequate_rain_per_acre=null;
        this.yield_of_irish_potatoes_with_adequate_rain_per_acre=null;
        this.yield_of_cotton_with_adequate_rain_per_acre=null;
        this.yield_of_sweet_potatoes_with_adequate_rain_per_acre=null;
        this.yield_of_sunflower_with_adequate_rain_per_acre=null;
        this.yield_of_groundnuts_with_adequate_rain_per_acre=null;
        this.yield_of_coffee_with_adequate_rain_per_acre=null;
        this.yield_of_banana_with_adequate_rain_per_acre=null;
        this.yield_of_cassava_with_adequate_rain_per_acre=null;
        this.crops_stored_from_last_season="";
        this.disturbances_in_storage="";
        this.storage_time="";
        this.Specify_others="";

        this.yield_last_season=[];
        this.yield_last_season2=[];

        this.yield_with_drought=[];
        this.year_of_severe_drought="";

        this.maize_per_kg=null;
        this.beans_per_kg=null;
        this.sesame_per_kg=null;
        this.soyabean_per_kg=null;
        this.rice_per_kg=null;
        this.millet_per_kg=null;
        this.sorghum_per_kg=null;
        this.irish_potatoes_per_kg=null;
        this.cotton_per_kg=null;
        this.sweet_potatoes_per_kg=null;
        this.sunflower_per_kg=null;
        this.ground_nuts_per_kg=null;
        this.coffee_per_kg=null;
        this.Banana_per_bunch=null;
        this.cassava_per_kg=null;
        this.seed_variety=[];
//More
      this.Did_you_apply_fertilizer=null;
      this.Specify_the_type=null;
      this.organic_specify=null;
      this.Specify_other_organic=null;
      this.inorganic_Specify=[];
      this.fertilizer_type=[];
      this.fertilizer_amount=[];

      this.use_pesticides_or_herbicides="";
      this.Please_specify_which_one="";
      this.crop_use="";
      this.crop_subsistence=[];
      this.crop_commercial=[];
      this.income_from_crops=[];

      this.employ_any_farm_labour="";
      this.Specify_their_task=[];
      this.Who_assisted_you=[];
      this.How_much_did_you_pay_them=null;
      this.Are_you_aware_of_climate_shock="";
      this.which_ones_you_are_aware_of="";
      this.training_on_addressing_climate="";
      this.Please_specify=[];
      this.Which_crops_for_rotation="";
      this._1st_choice="";
      this._2nd_choice="";
      this._3rd_choice="";

      this.knoledge_of_rain_date="";
      this.heard_of_agri_insurance="";
      this.access_to_agri_insurance="";
      this.Please_specify_the_agri_insurance_type=[];
      this.Specify_the_insurance_provider="";
      this.fair_charge_for_insurance="";
      this.prefer_ordinary_or_az_bunlde="";
      this.challenges_last_season=[];
      this.Specify="";
      this.What_type_of_pests="";
      this.type_of_weather_and_effect="";
      this.Do_you_have_a_bank_account="";
      this.financial_access="";
      this.transaction_monthly_costs="";
      this.Specify_other_monthly_transaction_costs="";
      this.travel_distance="";
      this.specify_other_travel_distance="";
      this.Have_you_ever_received_credit="";
      this.no_of_times_borrowed="";
      this.loanoutstanding="";
      this.How_much_repayment_was_made_per_month="";
      this.delay_time_for_repayment="";
      this.How_do_you_keep_your_money=[];
      this.financial_transaction_challeng=[];
      this.Specify_Other_financial_transaction_challeng="";
      this.action_access_to_financial_svc="";
      this.access_to_agric_ext_services="";
      this.How_do_you_access_Agric_ext_sv=[];
      this.extension_type_channel_receive=[];
      this.Do_you_receive_weather_data="";
      this.access_to_weather_data=[];
      this.How_accurate_is_the_info="";
      this.most_harmful_info="";
      this.biggest_prob_in_data_access="";
      this.spend_on_your_phone_monthly="";
      this.main_phone_use=[];
      this.subscribed_to_info_svces_on_ph="";
      this.services_suscribed_to=[];
      this.training_on_using_phone_servic="";
      this.training_on_weather_alerts="";
      this.Who_provided_the_training_on_weather_alerts="";
      this.Who_provided_the_training_on_insurance="";
      this.probs_of_using_cellphone=[];

      this.landsize_main_crop_enterprise=null;
      this.additional_land_main_enterprise=null;
      this.farmers_cooperation_responding="";
      this.how_well_agent_knows_beneficiary="";
      this.accuracy_of_info_collected="";
      this.data_quality="";
      this.other_income_sources=="";
      this.mainincome_since=="";
      this.sell_of_produce="";
      
      this.date_of_harvest="";
      this.specify_crops_for_new_season="";
      this.rabbit_number=null;
      this.farm_size_husbandry="";
      this.livestock_breed="";
      this.livestock_pdts="";
      this.livestock_record="";
      this.livestock_added="";
      this.livestock_sold="";
      this.livestock_sold_price="";
      this.livestock_milk_produced="";
      this.livestock_sales_income="";
      this.fooder_produce="";
      this.suppliment_livestock="";
      this.concentrates_feeding="";
      this.livestock_feeding_cost="";
      this.livestock_healthsvcs="";
      this.livestock_healthsvcs_arrival="";
      this.livestock_healthsvcs_types=[];
      this.livestock_death="";
      this.livestock_death_cause="";
      this.livestock_health_cost="";
      this.livestock_type="";
      this.preservation_mtds="";
      this.planting_season="";
      this.effective_sell_channel="";
      this.reason_for_channel="";
      this.need_loan="";
      this.loan_amount="";
      this.loan_security=[];
      this.loan_purpose=[];
      this.specify_loan_ammount=[];
      this.first_payment_date="";
      this.loan_period_xpctd="";
      this.la_security="";
      this.lo_security="";
      this.loan_failure_strategy="";
      this.agric_ext_provider=[];
      this.other_extension_channel_receive="";
      this.specify_training_mobilephones="";
      this.mostusedapp_mobilephones="";
      this.agribulker_belong="";
      this.group_belong="";
      //added more 10 columns for insurance
      this.no_of_child="";
      this.spouse_name="";
      this.DOB_spouse="";
      this.first_child_name="";
      this.dob_first_child="";
      this.second_child_name="";
      this.dob_second_child="";
      this.third_child_name="";
      this.dob_third_child="";
      this.forth_child_name="";
      this.dob_forth_child="";
      this.geoshape="";
      this.acreage="";

      this.Voice_calling_and_receiving="";
      this.SMS="";
      this.Internet="";
      this.Social_media="";
      this.term="";

      this.other_income_sources="";
      this.other_income_activity="";
      this.years_of_experince="";
      this.yield_expected_main_enterprise="";
      this.router.navigate(['/farmerprofile']);
      }
  }
  
  /*deleteDetails(id5: number) {
        this.db5.deleteDetails(id5)
          .then(data5 => this.details5 = data5);
          this.presentToast("You have deleted this activity");     
  }*/

  planting=[
    "Man only", "Woman only","Both"
  ];
  productions=[
    "Man only", "Woman only","Both"
  ];
  harvesting=[
    "Man only", "Woman only","Both"
  ];
  marketing=[
    "Man only", "Woman only","Both"
  ];
  incomes=[
    "Man only", "Woman only","Both"
  ];
  meals=[
  "once",
  "twice",
  "three times"
  ];

  vegetable=[
  "once",
  "twice",
  "three times"
  ];
  carbohydrate=[
    "once",
    "twice",
    "three times" 
  ];
  fruity=[
    "once",
    "twice",
    "three times"
  ];

  proteiny=[
    "once",
    "twice",
    "three times"
  ];


      //show or hide the div when the button is clicked
      hideShowMe=true;
      hideShow() {
        if(this.hideShowMe==false){
          this.hideShowMe = true;
        }
        else{
          this.hideShowMe = false;
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
    options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600,
      saveToPhotoAlbum: true,
      targetWidth: 50,
      targetHeight: 50,
      correctOrientation:true
    };


    //video capture
    captureVideo(){
      let options: CaptureVideoOptions = {
        limit: 1,
        duration: 20,
        quality:5
      }
      this.mediaCapture.captureVideo(options).then(
        (data: MediaFile[]) => {console.log(data);
          let filePath = data[0].fullPath;
          this.base64.encodeFile(filePath).then((base64File) => {
          this.currentVideoID = base64File;
          this.ivideo = base64File.split(';base64,').pop();
          }); 
        },
        (err) => console.error(err)
      );
    }

    // use geolocation to get user's device coordinates
    getCurrentCoordinates() {
      this.geolocation.getCurrentPosition({
        timeout:30000,
        maximumAge: 60000, 
        enableHighAccuracy: true
      }).then((resp) => {
        this.latitude1 = resp.coords.latitude;
        this.longitude1 = resp.coords.longitude;
        this.accuracy1 =resp.coords.accuracy;
      }).catch((error) => {
        console.log('Error getting location', error);
        this.presentToast('Error getting GPS location ' + error);
      });
    }
    getCurrentCoordinates1() {
      this.geolocation.getCurrentPosition({
        timeout:30000,
        maximumAge: 60000, 
        enableHighAccuracy: true
      }).then((resp) => {
        this.latitude2 = resp.coords.latitude;
        this.longitude2 = resp.coords.longitude;
        this.accuracy2 =resp.coords.accuracy;
      }).catch((error) => {
        console.log('Error getting location', error);
        this.presentToast('Error getting GPS location ' + error);
      });
    }
//Gps for the security
    getCurrentCoordinates3() {
      this.geolocation.getCurrentPosition({
        timeout:30000,
        maximumAge: 60000, 
        enableHighAccuracy: true
      }).then((resp) => {
        this.latitude3 = resp.coords.latitude;
        this.longitude3 = resp.coords.longitude;
        this.accuracy3 =resp.coords.accuracy;
      }).catch((error) => {
        console.log('Error getting location', error);
        this.presentToast('Error getting GPS location ' + error);
      });
    }

  //list of variety mainenterprise
  mainenterprise1=[
  "bush_beans",
  "Nambale",
  "Narobean1",
  "Narobean2",
  "Narobean3",
  "Narobean4c",
  "Narobean5c",
  "Narobean6",
  "Narobean7",
  "Narobean19",
  "k131",
  "k132",
  "Nabe2",
  "Nabe3",
  "Nabe4",
  "Nabe14",
  "Nabe15",
  "Nabe19",
  "local",
  "others" 
  ];
  //list of sesame variety
  mainenterprise2=[
  "Serra",
  "Sesim1", 
  "others"
  ];

  //
  currentcrop=[
  "others","maize","beans","sesame","soyabeans","rice","millet","sorghum","irish_potatoes","cotton","sweet_potatoes","sunflower","ground_nuts","coffee","banana","cassava"
  ];

  crops= [
    "Others","Maize","Beans","Sesame","Soyabeans","Rice","Millet","Sorghum","Irish_potatoes","Cotton","Sweet_potatoes","Sunflower","Ground nuts" ,"Coffee","Bananas","Cassava","None",
  ];

  formofdisabilitys=["Yes", "No"];

  benefits=[
  "Increased production","Increased income","Increased investiment", "Property ownership","Increased market access","Improved producequality","Enhanced leadership skills","Increased jont decision making"
  ];
  trainings=[
  "Access to inputs (seeds, fertilisers, pesticides)","Financial literacy (credit access, insurance, financial mgt)","Nutrition education","Climate smart practices (GAP,land management)","Farming as a business","Market access","Postharvest management (value addition)","Bulking & collective marketing", "Leadership skills","Gender mainstreaming"
  ];

  //list of levels of education
  educLevels=["none","Primary","Secondary","Tertiary"
  ];
  //List of mobile literacy
  mobileLiteracys=["Cannot use","Basic","Good","Very Good"
  ];
  //List of dependant age brackets.
  form = [
    'Males 0-14', 'Males 15-24','Males 25-34','Males 35-59','Males 60 and above.','Females 0-14', 'Females 15-24','Females 25-34','Females 35-59', 'Females 60 and above'
  ];
  cooperation=[
  "Excellent",
  "Very good",
  "Good", 
  "Poor",
  "Very poor"
  ];
  knows=[
    "Very well",
    "Well enough",
    "I dont know much", 
    "We are complete strangers"
  ];
  accuracy=[
  "very accurate",
  "Relatively accurate",
  "Inacurate",
  "Very inaccurate"
  ];
  quality=[
  "Very high",
  "High",
  "Low",
  "Very low"
  ];
  //list of land tenur
  tenures = ["Privately owned with title proof",
  "Privately owned with local agreement",
    "Inherited land with a will",
    "Leasehold with title",
    "Inherited land without a will",
    "Communually shared land",
    "Unregistered land",
    "Some owned and some leased",
    "others"
  ];

  tasks=[
  "Land preparation","Planting","Weeding","Harvesting","Threshing","Spraying", "Prunning","Transport","others"
  ];

  assistances=[
  "Children","Relative","Husband","Wife","Neighbour","other","no_body"
  ]
  purpose=[
    "Production","Labour","Post Harvest","others"
  ]

  adopted=[
  "Access_and_use_of_improved_seeds",
  "financial_literacy",
  "Nutrition_education",
  "Climate_smart_practices", 
  "farming_as_a_business",
  "market_access",
  "Postharvest_management",
  "Bulking_&_collective_marketing", 
  "leadership",
  "household_joint_decision_making"
  ];
  mostadopted=[
  "Access and use of improved seeds",
  "financial literacy (credit access, insurance, financial mgt)",
  "Nutrition_education",
  "Climate smart practices (GAP,land management)",
  "farming as a business",
  "market access",
  "Postharvest management (value addition)",
  "Bulking & collective marketing", 
  "Leadership skills",
  "household joint decision making"
  ];

  farmMachinery=[
  "Farm structure (storagefacility)" ,
  "Oxyplough ",
  "Knapsack sprayer",
  "other smaller implements (hoes, rakes)"
  ];


  last_season=[
  "Maize","Beans","Sesame","Soyabeans","Rice","Millet","Sorghum","Irish_potatoes","Cotton","Sweet potatoes","Sunflower","Groundnuts","Coffee","Banana","Cassava","Others"
  ];

  livestocks=[
    "none","Cattle","Goat","Sheep","Chicken","Pigs","others"
  ];

  yearofservice=[
  "Season A 2021",
  "Season B 2020",
  "Season A 2020  and ealier"
  ];

  seasons=[
  "Season one",
  "Season two",
  "Both"
  ];


    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration:5000,
      });
      toast.present();
    }

//function to hold the data in the form
holdData(){
  return this.storage.set('farmerData',[this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.Local_council1_name,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.belong_farmergp,this.name_farmergp,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.crops_for_new_season,this.other_crops_intended,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.crops_grown_last_season2,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_last_season2,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality,this.sell_of_produce,this.sell_of_produce,this.date_of_harvest,this.specify_crops_for_new_season,this.rabbit_number,this.farm_size_husbandry,this.livestock_breed,this.livestock_pdts,this.livestock_record,this.livestock_added,this.livestock_sold,this.livestock_sold_price,this.livestock_milk_produced,this.livestock_sales_income,this.fooder_produce,this.suppliment_livestock,this.concentrates_feeding,this.livestock_feeding_cost,this.livestock_healthsvcs,this.livestock_healthsvcs_arrival,this.livestock_healthsvcs_types,this.livestock_death,this.livestock_death_cause,this.livestock_health_cost,this.livestock_type,this.preservation_mtds,this.planting_season,this.effective_sell_channel,this.reason_for_channel,this.need_loan,this.loan_amount,this.loan_security,this.loan_purpose,this.specify_loan_ammount,this.first_payment_date,this.loan_period_xpctd,this.la_security,this.lo_security,this.loan_failure_strategy,this.agric_ext_provider,this.other_extension_channel_receive,this.specify_training_mobilephones,this.mostusedapp_mobilephones,this.agribulker_belong,this.group_belong]);
} 


//function to fetch the number of submissions a particular user has made
async SubmissionNumbers(){
  return new Promise(resolve => {
    let body = {
      aski:'checktotals',
      field_officer:this.fo
    }
    this.accsPrvds.postData(body, 'countprofiles.php').subscribe((res:any)=> {
      if(res.success==true){
          this.presentToast("You have "+ res.result + " submissions before validation");
          this.storage.set('numberOfProfiles', res.result);          
      }else{
          this.presentToast(res.result);              
      }
    },(err)=>{
      console.log('Error ', err);
    });

  });
  
}
// submit data to the end point when you have an active internet connection
async SubmitData(){
if(this.farmers_name==""){
    this.presentToast('Farmer name is required on question 1.');
}
else if(this.What_is_your_gender==""){
  this.presentToast('You have not specified the gender on question 2.');
}
else if(this.do_you_have_disability==""){
  this.presentToast('Specify whether you are disabled or not on question 3');
}
/**added some missing logic on disability*/
else if(this.do_you_have_disability=="Yes" && this.disability_type==""){
  this.presentToast('Specify your from of disability on question 4'); 
}
else if(this.do_you_have_disability=="No" && this.disability_type !=""){
this.disability_type="";
this.presentToast('Value: Disability type has been erased due to a change in selection');
} 

else if(this.own_a_mobile_phone==""){
  this.presentToast('Specify whether you own a mobile phone or not on question 5');
}
/**added some missing logic on mobile_phone*/
else if(this.own_a_mobile_phone=="Yes" && this.What_type_of_phone_do_you_own ==""){
    this.presentToast('Specify, What type of phone do you own? on question 6'); 
}
else if(this.own_a_mobile_phone=="No" && this.What_type_of_phone_do_you_own !=""){
  this.What_type_of_phone_do_you_own="";
  this.presentToast('Value : what type of phone do you own has been erased due to a change in selection');
}

/**added some missing logic on number of contacts*/
else if(this.No_of_contacts ==null && (this.What_type_of_phone_do_you_own || this.own_a_mobile_phone=="Yes")){
this.presentToast('Specify, How many telephone contacts do you use at question 7'); 
}
else if(this.No_of_contacts !=null && this.own_a_mobile_phone=="No"){
  this.No_of_contacts=null; //clears the number of contacts
  this.presentToast('Value : Number of contacts has been erased due to a change in selection');
}
// checking the primary and secondary contacts entries
else if(this.tel_no1=="" && (this.own_a_mobile_phone=="Yes" || this.No_of_contacts > 0)){
  this.presentToast('Specify, the primary telephone contact at question 8'); 
}
else if(this.tel_no1 !="" && (this.own_a_mobile_phone=="No" ||  this.No_of_contacts==null)){
  this.tel_no1=""; //clears the  primary telephone number
  this.presentToast('Value : Primary telephone number has been erased due to a change in selection');
}
//checking secondary telephone
else if(this.tel_No_2=="" && (this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 1)){
  this.presentToast('Specify, the secondary telephone contact at question 9'); 
}
else if(this.tel_No_2 !="" && (this.own_a_mobile_phone=="No" ||  this.No_of_contacts==null)){
  this.tel_No_2=""; //clears the  primary telephone number
  this.presentToast('Value : Secondary telephone number has been erased due to a change in selection');
}
//service_provider
else if(this.service_provider=="" && (this.tel_no1 !="" && this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 0 )){
  this.presentToast('Specify, the service provider of the primary telephone number at question 10.'); 
}
else if(this.service_provider !="" && (this.tel_no1 =="" || this.own_a_mobile_phone=="No" || this.No_of_contacts ==null )){
  this.service_provider=""; //clears the  service provider
  this.presentToast('Value : Service provider has been erased due to a change in selection');
}
// Other service provider
//"service_provider=='Others' && What_type_of_phone_do_you_own && own_a_mobile_phone=='Yes'"
else if(this.Specify_svc_provider=="" && (this.What_type_of_phone_do_you_own !="" && this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 0 && this.service_provider =="Others")){
  this.presentToast('Specify, Other service provider.at question question 11'); 
}
else if(this.Specify_svc_provider !="" && (this.What_type_of_phone_do_you_own =="" || this.own_a_mobile_phone=="No" || this.No_of_contacts ==null || this.service_provider !="Others")){
  this.Specify_svc_provider="" //clears the  service provider
  this.presentToast('Value :  Other Service provider has been erased due to a change in selection');
}
//mm_reg_status
else if(this.mm_reg_status=="" && (this.What_type_of_phone_do_you_own !="" && this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 0)){
  this.presentToast('Specify, Are you registered on Mobile Money ? at question 12'); 
}
else if(this.mm_reg_status !="" && (this.What_type_of_phone_do_you_own =="" || this.own_a_mobile_phone=="No" || this.No_of_contacts ==null )){
  this.mm_reg_status=""; //clears the  service provider
  this.presentToast('Value :  Are you registered on Mobile Money has been erased due to a change in selection');
}
//NIN 

else if(this.nin==""){
  this.presentToast('Please enter the NIN  at question 14');
}

//To continue further validation from here
/*else if(this.ID_photo_url==""){
  this.presentToast('Please capture the photo ID at question 15');
}
else if(this.Photo_url==""){
  this.presentToast('Please capture the farmers photo at question 16');
}*/

else if(this.occupation==""){
  this.presentToast('Please specify the occupation at question 17');
}
//condition for other occupation
else if(this.occupation=="Yes" && this.specify_other_occupation ==""){
  this.presentToast('Specify, other occupation at question 18'); 
}

else if(this.occupation=="No" && this.specify_other_occupation !=null){
  this.specify_other_occupation=null;
}

else if(this.Martial_status==""){
  this.presentToast('Please specify the Marital status at 19');
}
//conditions for marital status.
/*else if(this.Martial_status=="Married" && this.What_is_your_gender=="female"){
  this.presentToast('Please specify the name of the husband at question 20');
} */  
/*
else if(this.Martial_status !="Married" || this.What_is_your_gender!="female"){
  this.name_of_husband="";
}
else if(this.Martial_status =="Married" && this.number_of_wives_husbands ==""){
  this.presentToast('Please specify the number of wives or husbands');
}
/*else if(this.Martial_status !="Married" && this.number_of_wives_husbands !=""){
  this.number_of_wives_husbands ="";
}*/

//logic for first wife

/*else if(this.Martial_status =="Married" && this.What_is_your_gender !='female'){
 this.presentToast('Please specify the name of first wive ');
}*/
/*
else if(this.Martial_status !="Married" || this.What_is_your_gender =="female"){
  this.name_first_wife ="";
}
*/
//ENDED HERE ON

else if(this.next_of_kin==""){
  this.presentToast('Specify the next of kin. at question 25');
}
//some change added
else if(this.next_of_kin!="" && this.next_of_kin_has_contact==""){
  this.presentToast('You didnt specify whether the next of kin has a telephone contact or not,at question 26');
} 
else if(this.next_of_kin_has_contact=="Yes" && this.next_of_kin_phone_no=="" ){
  this.presentToast('You didnt specify What is {{next_of_kin}} phone number?,at question 27');
} 
else if(this.region==""){
  this.presentToast('Please specify the location (Region, District and subcounty), at question 28');
}

else if(this.parish==""){
  this.presentToast('Specify the Parish, at question 29');
}
else if(this.village==""){
  this.presentToast('Specify the Village at question 30');
}
else if(this.nearest_town==""){
  this.presentToast('Specify the nearest town from here, at question 31 i)');
}
else if(this.Local_council1_name==""){
  this.presentToast('Specify the LC 1 name, at question 31 ii)');
}
else if(this.resident_since==""){
  this.presentToast('Specify since when have you been a resident of this place at question 32');
}

else if(this.Description_of_location==""){
  this.presentToast('Specify the Description of location at question 33');
}
else if(this.DOB==""){
  this.presentToast('Specify the Date of Birth at question 34');
}
else if(this.level_of_education==""){
  this.presentToast('Specify your highest level of education at question 35');
}

else if(this.head_of_the_household==""){
  this.presentToast('Specify if your the head of household at question 36');
} 
else if(this.lo1==""){
  this.presentToast('Click the Get Location button to get the coordinatesat question 37');
}
else if(this.la1==""){
  this.presentToast('Click the Get Location button to get the coordinates at question 38');
}
else if(this.lo2==""){
  this.presentToast('Click the Get gps main crop enterprise button at question 40');
}
else if(this.la2==""){
  this.presentToast('Click the Get gps main crop enterprise button at question 41');
}
else if(this.Mobile_literacy==""){
  this.presentToast('Specify how well can you use a phone at question 43');
}
else if(this.any_dependants==""){
  this.presentToast('Specify whether you have the dependants or not at question 44');
}
else if(this.any_dependants=="Yes" && this.dependant_no==""){
  this.presentToast('Specify How many dependants do you have? at question 45');
}    

else if(this.any_dependants=="Yes" && this.dependants_age_bracket.length<1){
  this.presentToast('Specify What is their age brackets? at question 46');
}
else if(this.belong_farmergp==""){
  this.presentToast('Specify if you belong to any farmer group at question 47');
}

else if(this.belong_farmergp=="Yes" && this.name_farmergp==''){
  this.presentToast('Specify Name of farmer group at question 48');
}
else if(this.belong_farmergp=="Yes" && this.position_in_FO==""){
  this.presentToast('Specify What position do you hold in the farmer group? at question 49');
}
else if(this.position_in_FO=="Leader" && this.Your_position_in_the_fo==""){
  this.presentToast('Specify What is your position in the farmer organisation? 50');
}
else if(this.position_in_FO=="Leader" && this.male_members_in_FO==""){
  this.presentToast('Specify How many male members are in the organisation? at question 51');
}
else if(this.position_in_FO=="Leader" && this.female_members_in_FO==""){
  this.presentToast('Specify How many female members are in the organisation? at question 52');
}

else if(this.Affiliation==""){
  this.presentToast('Specify if the farmer group is connected to membership association at question 53');
} 
else if(this.main_income_source==""){
  this.presentToast('Specify the main source of income at question 54');
}

else if(this.main_income_source && this.mainincome_since==""){
  this.presentToast('Specify Since when have you been involved in the main source of income at question 55');
}

else if(this.sector==""){
  this.presentToast('Specify your main sector at question 56');
}
//To add condition for main crop enterprise
else if(this.sector=='Crop husbandry' && this.Main_crop_enterprise==''){
  this.presentToast('Specify your main crop enterprise at question 56 ii');

}

else if(this.main_income_relaibility==""){
  this.presentToast('Specify how reliable is your main income source at question 57');
}
else if(this.main_income_amount==""){
  this.presentToast('Please fill in, How much do you get from your main source of income at question 58');
}    
else if(this.annual_income==null){
  this.presentToast('Please fill in, Your total annual income? at question 59');
}
else if(this.other_income_sources==""){
  this.presentToast('Please fill in, Do you have any other sources of income at question 60');
}
//** */
else if(this.other_income_activity=="" && this.other_income_sources=='Yes'){
  this.presentToast('Please fill in, What are the other sources of income(e.g carpentry, mechanic) at question 61');
}    
/*else if(this.other_income_sources=='Yes'&& this.years_of_experince=="" && this.other_income_activity){
  this.presentToast('Please fill in, Since when have you been involved in {{other_income_activity}} at question 62');
}*/

/*else if(this.other_income_sources=='Yes' && this.other_income_activity && this.other_income_reliability==""){
  this.presentToast('Please fill in, reliability of other income in {{other_income_activity}} at question 63');
}*/
//amount
/*else if(this.other_income_sources=='Yes' && this.other_income_activity && this.amount==null){
  this.presentToast('Please fill in, amount earned in {{other_income_activity}} at question 64');
}*/
//
else if(this.income_trend==""){
  this.presentToast('Please fill in, How has your income been over the past 3 years at question 65');
}

else if(this.access_to_Health_services==""){
  this.presentToast('Please fill in, Do you have access to Health services ? at question 66');
}
//health_expense
else if(this.access_to_Health_services=='Yes' && this.health_expense==null){
  this.presentToast('Please fill in, How much on average do you spend on health in a year? at question 67');
}

else if(this.school_going_children==""){
  this.presentToast('Please fill in, Do you have any school going children? at question 68');
}
//no_of_school_going_children
else if(this.school_going_children=='Yes' && this.no_of_school_going_children==null){
  this.presentToast('Please fill in, How many school going children are in the household ? at question 69');
}
/*else if(Number(this.dependant_no) < this.no_of_school_going_children){
  this.presentToast('The number of dependants cannot be less than the number of school going children, check 68 and 45');
}*/
else if(this.school_fees_expense=='' && this.no_of_school_going_children !=null){
  this.presentToast('Please fill in, How much school fees on average do you spend in a term? at question 70');
}
else if(this.what_is_the_land_tenor==""){
  this.presentToast('Please fill in, Under what tenure do you access the land for your production at question 71');
}
else if(this.Specify_other=='' && this.what_is_the_land_tenor=='others'){
  this.presentToast('Please fill in, Specify other at question 72');
}

else if(this.value_of_land==""){
  this.presentToast('Please fill in, How much is land valued here at question 73');
}
else if(this.own_any_farm_machinery.length < 1){
  this.presentToast('Please fill in, Do you own any farm machinery at question 74');
}
else if(this.house_ownership==""){
  this.presentToast('Specify ownership of the house you live in, at question 75');
}
else if(this.house_structure==""){
  this.presentToast('Indicate the farmers housing structure, at question 76');
}

else if(this.Farm_size==null){
  this.presentToast('Specify,What is your Farm size under crop production this season? at question 77');
}
else if(this.total_land_size==null){
  this.presentToast('Fillout the total land size at question 78');
}
else if(this.Farm_size > this.total_land_size){
  this.presentToast('The farmer size under production cannot be greater than the total land size check question 77 and 78');
}
//To add condition for main crop enterprise


else if(this.landsize_main_crop_enterprise==null){
  this.presentToast('On what size of your land do you intend to carry out the main crop at question 79');
}
else if(this.additional_land_main_enterprise==null){
  this.presentToast('Will you hire or borrow any additional land for the enteprise(indicate acres) at question 80');
}
else if(this.yield_expected_main_enterprise==''){
  this.presentToast('What is the yield expected from your main crop enterprise in kgs per acre at question 81');
}
//missing 82-87
else if(this.date_of_harvest ==""){
  this.presentToast('Please respond to question, Possible date of harvesting at question 82');
}

else if(this.farm_at_residence ==""){
  this.presentToast('Please respond to question, Is the farm located in your area of residence at question 83');
}


else if(this.crops_for_new_season.length < 1){
  this.presentToast('What other crops do you intend to produce or  are under production this season at question 84.');
}

/*else if(this.crops_for_new_season=='others' && this.other_crops_intended){
  this.presentToast('Specify other crops you intend to grow or are under production this season at question 85.');
}*/



else if(this.number_of_employees==""){
  this.presentToast('since How many employees do you have on your farm at question 87');
}

else if(this.livestock ==""){
  this.presentToast('Please respond to question:Do you keep any livestock? at question 88');
} 
else if(this.livestock =="Yes" && this.livestock_type ==""){
  this.presentToast('Please respond to question:Which livestock production are you engaged in? at question 89');
}    
else if(this.livestock =="Yes" && this.livestock_type=='others' && this.specify_livestock==''){
  this.presentToast('Please respond to question:specify other livestock kept also indicate number, at question 90');
}   
else if(this.livestock =="Yes" && this.livestock_type =="Cattle" && this.cattle_number==null){
  this.presentToast('Please respond to question:heads of cattle, at question 91');
}  
else if(this.livestock =="Yes" && this.livestock_type =="Goats" && this.goat_number==null){
  this.presentToast('Please respond to question:number of goats, at question 92');
}  
else if(this.livestock =="Yes" && this.livestock_type =="Sheep" && this.sheep_number==null){
  this.presentToast('Please respond to question:number of sheep at question 93');
}  
else if(this.livestock =="Yes" && this.livestock_type =="Chicken" && this.chicken_number==null){
  this.presentToast('Please respond to question:number of birds(Poultry) at question 94');
}
else if(this.livestock =="Yes" && this.livestock_type =="Pigs" && this.pigs_number==null){
  this.presentToast('Please respond to question:number of pigs, at question 95');
}
else if(this.livestock =="Yes" && this.livestock_type =="Rabbits" && this.rabbit_number==null){
  this.presentToast('Please respond to question:number of rabbits, at question 96');
}
else if(this.livestock =="Yes" && this.farm_size_husbandry ==""){
  this.presentToast('Please respond to question:What is your farm size under crop husbandry, at question 97');
}
//To continue from where the validation is from 98-
else if(this.Did_you_plant_last_season ==""){
  this.presentToast('Please respond to question: Did you plant last season?, at question 98');
}

else if(this.Did_you_plant_last_season =="Yes" && this.crops_grown_last_season.length < 1 ){
  this.presentToast('Please respond to question: What crops did you grow last season ?, at question 99');
}
//Added on 27/08/2021 due to SB request
else if(this.Did_you_plant_last_season =="Yes" && this.crops_grown_last_season2.length < 1 ){
  this.presentToast('Please respond to question: What crops did you grow in the season before last season ?, at question 99 ii');
}

else if(this.crops_grown_last_season[0]=='Maize' && this.yield_of_maize_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Maize in a year with adequate rainfall per acre, at question 101');
}
else if(this.crops_grown_last_season[1]=='Beans' && this.yield_of_beans_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Beans in a year with adequate rainfall per acre, at question 102');
}
else if(this.crops_grown_last_season[2]=='Sesame' && this.yield_of_sesame_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Sesame in a year with adequate rainfall per acre, at question 103');
}
else if(this.crops_grown_last_season[3]=='Soyabeans' && this.yield_of_soyabean_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Soyabeans in a year with adequate rainfall per acre, at question 104');
}
else if(this.crops_grown_last_season[4]=='Rice' && this.yield_of_rice_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Rice in a year with adequate rainfall per acre, at question 105');
}
else if(this.crops_grown_last_season[5]=='Millet' && this.yield_of_millet_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Millet in a year with adequate rainfall per acre, at question 106');
}

else if(this.crops_grown_last_season[6]=='Sorghum' && this.yield_of_sorghum_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Sorghum in a year with adequate rainfall per acre, at question 107');
}
else if(this.crops_grown_last_season[7]=='Irish_potatoes' && this.yield_of_irish_potatoes_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Irish_potatoes in a year with adequate rainfall per acre, at question 108');
}
else if(this.crops_grown_last_season[8]=='Cotton' && this.yield_of_cotton_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Cotton in a year with adequate rainfall per acre, at question 109');
}
else if(this.crops_grown_last_season[9]=='Sweet_potatoes' && this.yield_of_sweet_potatoes_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Sweet_potatoes in a year with adequate rainfall per acre, at question 110');
}
else if(this.crops_grown_last_season[10]=='Sunflower' && this.yield_of_sunflower_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Sunflower in a year with adequate rainfall per acre, at question 111');
}
else if(this.crops_grown_last_season[11]=='Groundnuts' && this.yield_of_groundnuts_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Groundnuts in a year with adequate rainfall per acre, at question 112');
}
else if(this.crops_grown_last_season[12]=='Coffee' && this.yield_of_coffee_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Coffee in a year with adequate rainfall per acre, at question 113');
}
else if(this.crops_grown_last_season[13]=='Banana' && this.yield_of_banana_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Banana in a year with adequate rainfall per acre, at question 114');
}
else if(this.crops_grown_last_season[14]=='Cassava' && this.yield_of_cassava_with_adequate_rain_per_acre==null){
  this.presentToast('Please respond to question: What is the approximate yield of Cassava in a year with adequate rainfall per acre, at question 115');
}
//** */
else if(this.livestock =="Yes" && this.livestock_breed ==""){
  this.presentToast('Please respond to question:What breed of livestocks do you majorly have? at question 116');
}
else if(this.livestock =="Yes" && this.livestock_type!=='others' && this.livestock_pdts ==""){
  this.presentToast('Please respond to question:What type of livestock products does your farm majorly deal in? at question 117');
}
else if(this.livestock =="Yes" && this.livestock_record ==""){
  this.presentToast('Please respond to question:Do you register any livestock births or new additions through purchase? at question 118');
}
else if(this.livestock =="Yes" && this.livestock_record == "Yes" && this.livestock_added==""){                                                                                                                                                                    
  this.presentToast('Please respond to question:On average, On average, How many animals are born or added to the farm in a 12 month period? at question 119');
}
else if(this.livestock =="Yes" && this.livestock_sold ==""){
  this.presentToast('Please respond to question:How many livestock are sold in a year? at question 120');
}
else if(this.livestock =="Yes" && this.livestock_sold_price ==""){
  this.presentToast('Please respond to question:What is the price per animal sold? at question 121');
}
else if(this.livestock =="Yes" && this.livestock_milk_produced ==""){
  this.presentToast('Please respond to question:What is the total milk produced annually? at question 122');
}       
else if(this.livestock =="Yes" && this.livestock_sales_income ==""){
  this.presentToast('Please respond to question:How much income is generated annually from the sales? at question 123');
}
else if(this.livestock =="Yes" && this.fooder_produce ==""){
  this.presentToast('Please respond to question:Do you produce any fooder crops for livestock feeding? at question 124');
}
else if(this.livestock =="Yes" && this.suppliment_livestock ==""){
  this.presentToast('Please respond to question:Did you suppliment your livestock with agro industrial products such as contentrates? at question 125');
}
else if(this.livestock =="Yes" && this.suppliment_livestock =="Yes" && this.concentrates_feeding==""){
  this.presentToast('Please respond to question:How often do you feed your animals with concentrates? at question 126');
}
else if(this.livestock =="Yes" && this.livestock_feeding_cost==""){
  this.presentToast('Please respond to question:How much do you spend on feeding per month? at question 127');
}
else if(this.livestock =="Yes" && this.livestock_healthsvcs==""){
  this.presentToast('Please respond to question:Did you have access to animal health services? at question 128');
}
else if(this.livestock =="Yes" && this.livestock_healthsvcs=="Yes" && this.livestock_healthsvcs_arrival==""){
  this.presentToast('Please respond to question:How fast can animal health services reach you in terms of an emergency? at question 129');
}
else if(this.livestock =="Yes" && this.livestock_healthsvcs_types==[]){
  this.presentToast('Please respond to question:What type of animal health services do you receive or can have access to? at question 130');
}
else if(this.livestock =="Yes" && this.livestock_healthsvcs == 'Yes' && this.livestock_death==""){
  this.presentToast('Please respond to question:Have you ever experienced any animal Deaths? at question 131');
}
/*else if(this.livestock =="Yes" && this.livestock_death=="Yes" && this.livestock_death_cause ){
  this.presentToast('Please respond to question:What was the major cause of the death? at question 132');
}*/
else if(this.livestock =="Yes" && this.livestock_healthsvcs == 'Yes' && this.livestock_health_cost==""){
  this.presentToast('Please respond to question:On average, how much do you incur in animal health treatment? at question 133');
}
else if(this.crops_stored_from_last_season ==""){
  this.presentToast('Please respond to question, Of the crops grown last season,did you store any? at question 134');
}
else if(this.storage_time=='' && this.crops_stored_from_last_season =="Yes"){
  this.presentToast('Please respond to, How long were they stored for? at question 135');
}
//starting from 136--
else if(this.disturbances_in_storage=='' && this.crops_stored_from_last_season =="Yes"){
  this.presentToast('Please respond to, What were the the most disturbances during storage? at question 136');
}
else if(this.Specify_others=='' && this.disturbances_in_storage=='others'){
  this.presentToast('Please respond to, Specify others, at question 137');
}
else if(this.preservation_mtds =="" && this.crops_stored_from_last_season =="Yes"){
  this.presentToast('Please respond to question:What Methods do you use to preserve your crops during storage? at question 138');
}
//To be revised
else if(this.yield_last_season.length < this.crops_grown_last_season.length){
  this.presentToast('Please respond to question:Please indicate your yield for {{yield_last}} last season per acre, at question 139');
}
//
else if(this.yield_last_season2.length < this.crops_grown_last_season2.length){
  this.presentToast('Please respond to question:Please indicate your yield for {{yield_last}} in the Season before last season per acre, at question 139 ii)');
}
//140-142 to continue from here.
else if(this.yield_with_drought.length < this.crops_grown_last_season.length){
  this.presentToast('Please respond to question:What is your approximate yield of {{drought}} in a year with drought?, at question 140');
}
else if(this.year_of_severe_drought==""){
  this.presentToast('Please respond to question:Which year did you last experience severe drought? at question 141');
}

else if(this.planting_season==""){
  this.presentToast('Please respond to question:Which Season did you plant your crops, at question 142');
}

else if(this.how_much_seed.length < this.crops_grown_last_season.length){
  this.presentToast('Please respond to question:How much seed did you use in kgs for {{seed_much}} per acre, at question 143');
}
else if(this.maize_per_kg==null && this.crops_grown_last_season[0]=='Maize'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for maize per acre, at question 144');
}
else if(this.beans_per_kg==null && this.crops_grown_last_season[1]=='Beans'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for beans per acre, at question 145');
}
else if(this.rice_per_kg==null && this.crops_grown_last_season[2]=='Rice'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for rice per acre, at question 146');
}
else if(this.sesame_per_kg==null && this.crops_grown_last_season[3]=='Sesame'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for sesame per acre, at question 147');
}
else if(this.soyabean_per_kg==null && this.crops_grown_last_season[4]=='Soyabean'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for soyabean per acre, at question 148');
}
else if(this.millet_per_kg==null && this.crops_grown_last_season[5]=='Millet'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for millet per acre, at question 149');
}
else if(this.sorghum_per_kg==null && this.crops_grown_last_season[6]=='Sorghum'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for sorghum per acre, at question 150');
}
else if(this.irish_potatoes_per_kg==null && this.crops_grown_last_season[7]=='Irish_potatoes'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for irish_potatoes per acre, at question 151');
}
else if(this.cotton_per_kg==null && this.crops_grown_last_season[8]=='Cotton'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for cotton per acre, at question 152');
}
//
else if(this.sweet_potatoes_per_kg==null && this.crops_grown_last_season[9]=='Sweet_potatoes'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for sweet_potatoes per acre, at question 153');
}

else if(this.sunflower_per_kg==null && this.crops_grown_last_season[10]=='Sunflower'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for sunflower per acre, at question 154');
}

else if(this.ground_nuts_per_kg==null && this.crops_grown_last_season[11]=='Ground_nuts'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for ground_nuts per acre, at question 155');
}
else if(this.coffee_per_kg==null && this.crops_grown_last_season[12]=='Coffee'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for coffee per acre, at question 156');
}

else if(this.Banana_per_bunch==null && this.crops_grown_last_season[13]=='Banana'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for Banana per acre, at question 157');
}
else if(this.cassava_per_kg==null && this.crops_grown_last_season[13]=='Cassava'){
  this.presentToast('Please respond to question:How much seed did you use in kgs for cassava per acre, at question 158');
}
else if(this.seed_variety.length < this.crops_grown_last_season.length){
  this.presentToast('Please respond to question:Specify the variety used for {{seed}}, at question 159');
}
else if(this.Did_you_apply_fertilizer ==""){
  this.presentToast('Please respond to question, Did you apply fertilizer? at question 160');
}
else if(this.Specify_the_type=='' && this.Did_you_apply_fertilizer =="Yes"){
  this.presentToast('Please respond to question, Specify the type, at question 161');
}
else if(this.organic_specify=='' && this.Specify_the_type=='Organic'){
  this.presentToast('Please respond to, Please specify if organic, at question 162');
}
else if(this.Specify_other_organic=='' && this.organic_specify=='other'){
  this.presentToast('Please respond to, Specify other, at question 163');
}
else if(this.inorganic_Specify==null && this.Specify_the_type=='Inorganic'){
  this.presentToast('Please respond to, Please Specify mode of application, at question 164');
}
else if(this.fertilizer_type.length < this.crops_grown_last_season.length  && this.Did_you_apply_fertilizer=='Yes'){
  this.presentToast('Please respond to, Please specify the type and amount of fertilizer used for {{fertilize}}?, at question 165 and 166');
}
else if(this.fertilizer_amount.length < this.crops_grown_last_season.length && this.Did_you_apply_fertilizer=='Yes'){
  this.presentToast('Please respond to, Please specify the type and amount of fertilizer used for {{fertilize}}?, at question 165 and 166');
}
//Stopped here.
else if(this.use_pesticides_or_herbicides==''){
  this.presentToast('Please respond to, Did you use any pesticides and herbicides?, at question 167');
}
else if(this.Please_specify_which_one=='' && this.use_pesticides_or_herbicides=='Yes'){
  this.presentToast('Please respond to, Please specify which one?, at question 168');
}
else if(this.crop_use ==""){
  this.presentToast('Please respond to question, Is your crop for commercial or subsistance purposes? at question 169');
}

else if(this.crop_subsistence==null && this.crop_use =="subsistence"){
  this.presentToast('Please respond to question, Please specify the volume for subsistence for {{subsistence}} (kgs)? at question 170');
}
else if(this.crop_commercial==null && this.crop_use =="commercial"){
  this.presentToast('Please respond to question, Please specify the volume for commercial for {{commercial}} (kgs)? at question 171');
}
else if(this.income_from_crops.length < this.crops_grown_last_season.length){
  this.presentToast('Please respond to question, How much income (UGX) did you generate from the sale of {{income_crops}}? 172');
}
else if(this.sell_of_produce==""){
  this.presentToast('Please respond to question, Where do you mainly sell your produce? at question 173');
}
else if(this.effective_sell_channel ==""){
  this.presentToast('Please respond to question:From the above which channel do you find effective? Indicate reasons, at question 174');
}
else if(this.reason_for_channel ==""){
  this.presentToast('Please respond to question:Indicate reasons for your choice of marketing channel? at question 175');
}
else if(this.employ_any_farm_labour ==""){
  this.presentToast('Please respond to question:Did you employ any farm labour during the last season at question 176');
}
else if(this.Specify_their_task.length < 1 && this.employ_any_farm_labour=='Yes'){
  this.presentToast('Please respond to question:Specify their task at question 177');
}
//
else if(this.Who_assisted_you.length < 1){
  this.presentToast('Please respond to question, Who assisted you? at question 178');
}
else if(this.employ_any_farm_labour && this.How_much_did_you_pay_them ==null){
  this.presentToast('Please respond to question, How much did you pay  for all the labour combined? at question 179');
}

else if(this.Are_you_aware_of_climate_shock ==""){
  this.presentToast('Please respond to question, Are you aware of climate shocks, at question 180');
} 
//**** */

else if(this.Are_you_aware_of_climate_shock=='Yes' && this.which_ones_you_are_aware_of ==""){
  this.presentToast('Please respond to question, Are you aware of climate shocks, at question 181');
}

else if(this.training_on_addressing_climate ==""){
  this.presentToast('Please respond to question, Please indicate which ones you are familiar with, at question 182');
}
else if(this.Please_specify.length < 1 && this.training_on_addressing_climate=='Yes'){
  this.presentToast('Please respond to question, Please specify, at question 183');
}
else if(this.Which_crops_for_rotation ==""){
  this.presentToast('Please respond to question, Which crops do you consider for rotaton at question 184');
}
else if(this._1st_choice ==""){
  this.presentToast('Please respond to question, Rank 1 at question 185');
}
else if(this._2nd_choice ==""){
  this.presentToast('Please respond to question, Rank 2 at question 186');
}
else if(this._3rd_choice ==""){
  this.presentToast('Please respond to question, Rank 3 at question 187');
}

else if(this._1st_choice == this._2nd_choice ||this._1st_choice == this._3rd_choice || this._2nd_choice == this._3rd_choice){
  this.presentToast('Ensure that the Ranks are not the same on 185, 186, and 187');
}

else if(this.knoledge_of_rain_date ==""){
  this.presentToast('Please respond to question, How important is it to know when it will rain 3 days ahead of time? at question 188');
}

else if(this.heard_of_agri_insurance ==""){
  this.presentToast('Please respond to question, Have you ever heard of agri insurance? at question 189');
}

else if(this.access_to_agri_insurance =="" && this.heard_of_agri_insurance=='Yes'){
 this.presentToast('Please respond to question, Do you have access to agri insurance, at question 190');
}
//
 /*else if(this.Please_specify_the_agri_insurance_type.length < 1  && this.access_to_agri_insurance =="Yes"){
   this.presentToast('Please respond to question, Do you have access to agri insurance, at question 191');
 }*/ 
 //Specify_the_insurance_provider
 /*else if(this.Specify_the_insurance_provider ==""){
   this.presentToast('Please respond to question, Specify the insurance provider? at question 192');
 }*/
 else if(this.fair_charge_for_insurance ==""){
   this.presentToast('Please respond to question, How much do you think is fair (UGX) to protect your financial losses as a result of extreme weather? at question 193');
 }    
 else if(this.prefer_ordinary_or_az_bunlde ==""){
   this.presentToast('Please respond to question, Would you prefer az bundle to other ordinary insurance, at question 194');
 }
//
else if(this.challenges_last_season.length < 1){
  this.presentToast('Please respond to question, What are some of the challenges that you faced last season? at question 195');
}

//this.Specify=='' && this.challenges_last_season=='other'
  else if(this.What_type_of_pests ==""){
  this.presentToast('Please respond to question, What type of pests at question 197');
  }
  else if(this.type_of_weather_and_effect ==""){
  this.presentToast('Please respond to question, What type of weather and effect on the crop? at question 198');
  }
  else if(this.Do_you_have_a_bank_account ==""){
  this.presentToast('Please respond to question, Do you have a bank account? at question 199');
  }
  
  else if(this.financial_access ==""){
  this.presentToast('Please respond to question, Which type of financial services do you have access to? at question 200');
  }
  
  else if(this.transaction_monthly_costs ==""){
  this.presentToast('Please respond to question, What are your monthly costs for carrying out financial transactions? at question 201');
  }
  
  else if(this.travel_distance ==""){
  this.presentToast('Please respond to question, How far do you travel to make a financial transaction at question 203');
  }
  else if(this.specify_other_travel_distance=='' && this.travel_distance=='other'){
    this.presentToast('Please respond to question, Specify other at question 204');
  }
//
else if(this.Have_you_ever_received_credit ==""){
  this.presentToast('Please respond to question,Have you ever received loan from a bank? at question 205');
}

else if(this.no_of_times_borrowed=='' && this.Have_you_ever_received_credit=='Yes'){
  this.presentToast('Please respond to question,How many times have you borrowed from the bank at question 206');
}
else if(this.loanoutstanding=='' && this.Have_you_ever_received_credit=='Yes'){
  this.presentToast('Please respond to question, Do you have any outstading loan at question 207');
}
else if(this.How_much_repayment_was_made_per_month=='' && this.Have_you_ever_received_credit=='Yes'){
  this.presentToast('Please respond to question, How much repayment was made per month? at question 208');
}
else if(this.delay_time_for_repayment=='' && this.Have_you_ever_received_credit=='Yes'){
  this.presentToast('Please respond to question, How effective were you able to repay, at question 209');
}
else if(this.How_do_you_keep_your_money.length < 1){
this.presentToast('Please respond to question: How do you keep your money at question 210');
}
//

else if(this.financial_transaction_challeng.length < 1){
  this.presentToast('Please respond to question: What challenges have you faced when making financial transactions? at question 211');
}
else if(this.Specify_Other_financial_transaction_challeng=='' && this.financial_transaction_challeng[4]=='Other'){
  this.presentToast('Please respond to question:Specify Other, at question 212'); 
}
else if(this.action_access_to_financial_svc=='' && this.financial_transaction_challeng){
  this.presentToast('Please respond to question:Give a view on some of the solutions to your challenge, at question 213'); 
}
else if(this.access_to_agric_ext_services==''){
  this.presentToast('Please respond to question:Do you have access to agric extension services?, at question 214'); 
}
else if(this.How_do_you_access_Agric_ext_sv.length < 1){
  this.presentToast('Please respond to question:How do you access Agricultural extension services?, at question 215'); 
}

else if(this.extension_type_channel_receive.length < 1){
  this.presentToast('Please respond to question:What extension type do you receive?, at question 216'); 
}
//*****207--- */
else if(this.need_loan ==""){
  this.presentToast('Please respond to question: Do you need a loan, at question 217');
}
else if(this.need_loan =='Yes' && this.loan_amount==''){
  this.presentToast('Please respond to question:Amount needed at question 218');
}
else if(this.need_loan=='Yes' && this.loan_purpose.length < 1){
  this.presentToast('Please respond to question: Loan Purpose at question 219');
}

else if(this.need_loan=='Yes' && this.loan_security.length < 1){
  this.presentToast('Please respond to question: Loan Security at question 220');
}
else if(this.need_loan=='Yes' && this.specify_loan_ammount.length < this.loan_purpose.length){
  this.presentToast('Please respond to question: Please specify the amount for... at 221');
}
//Adding a constraint on the amount requested should be equal to the specifics selected.
else if((this.sum_array(this.specify_loan_ammount) > Number(this.loan_amount)) || (this.sum_array(this.specify_loan_ammount) < Number(this.loan_amount))){
  this.presentToast('Please ensure that the loan amount requested is equal to the sum of the individual loan purposes... at 218 and 221');
}

else if(this.need_loan=='Yes' && this.loan_period_xpctd ==''){
  this.presentToast('Please respond to question: How long do you expect your loan to run (Months)? at 222');
}

else if(this.need_loan=='Yes' && this.first_payment_date ==''){
  this.presentToast('Please respond to question: When do you expect to effect your first payment at 223');
}
else if(this.need_loan=='Yes' && this.lo_security =='' && this.la_security==''){
  this.presentToast('Please respond to question: Loan Security Location by pressing the button at 224 and 225');
}

else if(this.need_loan=='Yes' && this.loan_failure_strategy==''){
  this.presentToast('Please respond to question: How would you repay the loan if the project failed? 226');
}

else if(this.agric_ext_provider.length < 1){
  this.presentToast('Please respond to question: Who provides the extension services? 227');
}

else if(this.Do_you_receive_weather_data==''){
  this.presentToast('Please respond to question: Do you receive weather information? 228');
}
else if(this.access_to_weather_data.length < 1){
  this.presentToast('Please respond to question: How do you get access to weather information? 229');
}

else if(this.How_accurate_is_the_info==''){
  this.presentToast('Please respond to question: How accurate is the information? 230');
}

else if(this.most_harmful_info==''){
  this.presentToast('Please respond to question: Which information is most harmful to your farming decision? at 231');
}

else if(this.biggest_prob_in_data_access==''){
  this.presentToast('Please respond to question: What has been the biggest constraint in accessing information on weather data in the last 3 months? at 232');
}
else if(this.spend_on_your_phone_monthly==''){
  this.presentToast('Please respond to question: How much do you spend on your phone per month? at 233');
}
else if(this.main_phone_use.length < 1){
  this.presentToast('Please respond to question: What did you mainly use your phone for in the last 3 months at 234');
}
else if(this.Voice_calling_and_receiving==''){
  this.presentToast('Please respond to question: Voice calling and receiving  at 235');
}

else if(this.SMS==''){
  this.presentToast('Please respond to question: SMS  at 236');
}
else if(this.Internet==''){
  this.presentToast('Please respond to question: Internet  at 237');
}
else if(this.Social_media==''){
  this.presentToast('Please respond to question: Social Media  at 238');
}

else if(this.subscribed_to_info_svces_on_ph==''){
  this.presentToast('Please respond to question: Are you subscribed to information services through your mobile phone?  at 239');
}
else if(this.services_suscribed_to.length < 1 && this.subscribed_to_info_svces_on_ph=='Yes'){
  this.presentToast('Please respond to question: Which services are you suscribed to?  at 240');
}

else if(this.training_on_using_phone_servic==''){
  this.presentToast('Please respond to question: Have you received any training on using mobile products/services in the last 3 months  at 241');
}
else if(this.specify_training_mobilephones=='' && this.training_on_using_phone_servic=='Yes'){
  this.presentToast('Please respond to question: Specify the training? at 242');
}
else if(this.mostusedapp_mobilephones=='' ){
  this.presentToast('Please respond to question: Which application on your phone do you use the most? at 243');
}
else if(this.training_on_weather_alerts=='' ){
  this.presentToast('Please respond to question: Have you received any training on weather alerts. at 244');
}
else if(this.Who_provided_the_training_on_weather_alerts=='' && this.training_on_weather_alerts=='Yes' ){
  this.presentToast('Please respond to question: Who provided the training on weather alerts? at 245');
}

else if(this.Who_provided_the_training_on_insurance=='' && this.training_on_weather_alerts=='Yes'){
  this.presentToast('Please respond to question: Who provided the training on insurance? at 246');
}
else if(this.probs_of_using_cellphone.length < 1 ){
  this.presentToast('Please respond to question: What are some of the constraints faced in using your cellphone at 247');
}

else if(this.agribulker_belong==""){
  this.presentToast('Please respond to question: Which agribulker do you belong to at 248');
}
else if(this.group_belong==""){
  this.presentToast('Please respond to question: Which group do you belong to at 249');
}
else if(this.farmers_cooperation_responding==''){
  this.presentToast('Please respond to question: Rate the farmers coperation in responding the questions, at 250');
}
else if(this.how_well_agent_knows_beneficiary==''){
  this.presentToast('Please respond to question: On a personal level how well do you know the respondent(farmers), at 251');
}
else if(this.accuracy_of_info_collected==''){
  this.presentToast('Please respond to question: Rate the accuracy of the information that the farmer has provide according to you, at 252');
}
else if(this.data_quality==''){
  this.presentToast('Please respond to question: Rate the quality of data you have collected given time, langauage, repondents attitudee and other factors, at 253');
}
//for insurance
else if(this.spouse_name==''){
  this.presentToast('Please respond to question: Name of the Spouse, at 254');
}

else if(this.DOB_spouse==''){
  this.presentToast('Please respond to question: Date of birth of the spouse, at 255');
}

else if(this.geoshape==''){
  this.presentToast('Please open ODK to determine the geoshape and then copy the values and paste them, at 256');
}
else if(this.acreage==''){
  this.presentToast('Please open ODK to determine the geoshape and then copy the values of acreage and paste them, at 257');
}

//Making the siblings mandatory
else if(this.no_of_child==""){
  this.presentToast('Please respond to question: Choose the number of children to add to (Insurance), at 258');
}

else if((this.no_of_child=='1' ||this.no_of_child=='2' ||this.no_of_child=='3' ||this.no_of_child=='4') && this.first_child_name==''){
  this.presentToast('Please respond to question: First child name, at 259 i)');
}
else if((this.no_of_child=='1' ||this.no_of_child=='2' ||this.no_of_child=='3' ||this.no_of_child=='4') && this.dob_first_child==''){
  this.presentToast('Please respond to question: DOB First Child, at 259 ii)');
}

else if((this.no_of_child=='2' ||this.no_of_child=='3' ||this.no_of_child=='4') && this.second_child_name==''){
  this.presentToast('Please respond to question: Second child name, at 259 iii)');
}
else if((this.no_of_child=='2' ||this.no_of_child=='3' ||this.no_of_child=='4') && this.dob_second_child==''){
  this.presentToast('Please respond to question: DOB Second Child, at 259 iv)');
}

else if((this.no_of_child=='3' ||this.no_of_child=='4') && this.third_child_name==''){
  this.presentToast('Please respond to question: third child name, at 259 v)');
}
else if((this.no_of_child=='3' ||this.no_of_child=='4') && this.dob_third_child==''){
  this.presentToast('Please respond to question: DOB third Child, at 259 vi)');
}

else if((this.no_of_child=='4') && this.forth_child_name==''){
  this.presentToast('Please respond to question: forth child name, at 259 vii)');
}
else if((this.no_of_child=='4') && this.dob_forth_child==''){
  this.presentToast('Please respond to question: DOB forth Child, at 259 viii)');
}
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
            consent: this.consent,
            farmers_name:this.farmers_name,
            do_you_have_disability:this.do_you_have_disability,
            disability_type:this.disability_type,
            own_a_mobile_phone:this.own_a_mobile_phone,
            What_type_of_phone_do_you_own:this.What_type_of_phone_do_you_own,
            No_of_contacts: this.No_of_contacts,
            tel_no1:this.tel_no1,
            tel_No_2:this.tel_No_2,
            service_provider: this.service_provider,
            Specify_svc_provider:this.Specify_svc_provider,
            mm_reg_status:this.mm_reg_status,
            registered_mm_number: this.registered_mm_number,
            nin:this.nin,
            Photo_url:this.Photo_url,
            ID_photo_url:this.ID_photo_url,
            occupation:this.occupation,
            specify_other_occupation: this.specify_other_occupation,
            Martial_status:this.Martial_status,
            What_is_your_gender:this.What_is_your_gender,
            name_of_husband:this.name_of_husband,
            number_of_wives_husbands:this.number_of_wives_husbands,
            name_first_wife:this.name_first_wife,
            name_second_wife:this.name_second_wife,
            status_in_a_family:this.status_in_a_family,
            next_of_kin:this.next_of_kin,
            next_of_kin_has_contact:this.next_of_kin_has_contact,
            next_of_kin_phone_no: this.next_of_kin_phone_no,
            region:this.region,
            distr:this.distr,
            other_district:this.other_district,
            subcounty:this.subcounty,
            other_subcounty:this.other_subcounty,
            subcounty_other_district:this.subcounty_other_district,
            soiltype:this.soiltype,
            parish: this.parish,
            village:this.village,
            nearest_town:this.nearest_town,
            Local_council1_name:this.Local_council1_name,
            resident_since:this.resident_since,
            Description_of_location:this.Description_of_location,
            DOB:this.DOB,
            level_of_education:this.level_of_education,
            head_of_the_household:this.head_of_the_household,
  //Gps cordinates for the location
            la1:this.la1,
            lo1:this.lo1,
            acc1:this.acc1,
  //gps main enterprise
            la2:this.la2,
            lo2:this.lo2,
            acc2:this.acc2,

            Mobile_literacy:this.Mobile_literacy,
            any_dependants:this.any_dependants,
            dependant_no:this.dependant_no,
            dependants_age_bracket:this.dependants_age_bracket,
            //Casa Data 
            belong_farmergp:this.belong_farmergp,
            name_farmergp:this.belong_farmergp,
            position_in_FO:this.position_in_FO,
            Your_position_in_the_fo:this.Your_position_in_the_fo,
            male_members_in_FO:this.male_members_in_FO,
            female_members_in_FO:this.female_members_in_FO,
            Affiliation:this.Affiliation,
            Name_of_connected_ACE_or_DFA:this.Name_of_connected_ACE_or_DFA,
            main_income_source:this.main_income_source,
            mainincome_since:this.mainincome_since,
            sector:this.sector,
            main_income_relaibility:this.main_income_relaibility,
            main_income_amount:this.main_income_amount,
            annual_income:this.annual_income,
            other_income_sources:this.other_income_sources,
//Include the columns that are in a loop for other sources of income these are to be put in a separate table
            other_income_activity:this.other_income_activity,
            years_of_experince:this.years_of_experince,
            other_income_reliability:this.other_income_reliability,
            amount:this.amount,
//end columns for other income loop            
            income_trend:this.income_trend,
            access_to_Health_services:this.access_to_Health_services,
            health_expense:this.health_expense,
            school_going_children:this.school_going_children,
            no_of_school_going_children:this.no_of_school_going_children,
            school_fees_expense:this.school_fees_expense,
            what_is_the_land_tenor:this.what_is_the_land_tenor,
            Specify_other:this.Specify_other,
            value_of_land:this.value_of_land,
            own_any_farm_machinery:this.own_any_farm_machinery,
            house_ownership:this.house_ownership,
            house_structure:this.house_structure,
            Farm_size:this.Farm_size,
            total_land_size:this.total_land_size,
            Main_crop_enterprise:this.Main_crop_enterprise,
            landsize_main_crop_enterprise:this.landsize_main_crop_enterprise,
            additional_land_main_enterprise:this.additional_land_main_enterprise,
            yield_expected_main_enterprise:this.yield_expected_main_enterprise,
            farm_at_residence:this.farm_at_residence,
            //GPS_main_enterprise:this.GPS_main_enterprise,
            crops_for_new_season:this.crops_for_new_season,
            other_crops_intended:this.other_crops_intended,

            number_of_employees:this.number_of_employees,
            livestock:this.livestock,
            specify_livestock:this.specify_livestock,
            cattle_number:this.cattle_number,
            goat_number:this.goat_number,
            sheep_number:this.sheep_number,
            chicken_number:this.chicken_number,
            pigs_number:this.pigs_number,
            Did_you_plant_last_season:this.Did_you_plant_last_season,
            crops_grown_last_season:this.crops_grown_last_season,
            crops_grown_last_season2:this.crops_grown_last_season2,
            Specify_other_crops_grown:this.Specify_other_crops_grown,
            in_business_since:this.in_business_since,

            yield_with_drought:this.yield_with_drought,
            year_of_severe_drought:this.year_of_severe_drought,
            how_much_seed:this.how_much_seed,
            
            yield_of_maize_with_adequate_rain_per_acre:this.yield_of_maize_with_adequate_rain_per_acre,
            yield_of_beans_with_adequate_rain_per_acre:this.yield_of_beans_with_adequate_rain_per_acre,
            yield_of_sesame_with_adequate_rain_per_acre:this.yield_of_sesame_with_adequate_rain_per_acre,
            yield_of_soyabean_with_adequate_rain_per_acre:this.yield_of_soyabean_with_adequate_rain_per_acre,
            yield_of_rice_with_adequate_rain_per_acre:this.yield_of_rice_with_adequate_rain_per_acre,
            yield_of_millet_with_adequate_rain_per_acre:this.yield_of_millet_with_adequate_rain_per_acre,
            yield_of_sorghum_with_adequate_rain_per_acre:this.yield_of_sorghum_with_adequate_rain_per_acre,
            yield_of_irish_potatoes_with_adequate_rain_per_acre:this.yield_of_irish_potatoes_with_adequate_rain_per_acre,
            yield_of_cotton_with_adequate_rain_per_acre:this.yield_of_cotton_with_adequate_rain_per_acre,
            yield_of_sweet_potatoes_with_adequate_rain_per_acre:this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,
            yield_of_sunflower_with_adequate_rain_per_acre:this.yield_of_sunflower_with_adequate_rain_per_acre,
            yield_of_groundnuts_with_adequate_rain_per_acre:this.yield_of_groundnuts_with_adequate_rain_per_acre,
            yield_of_coffee_with_adequate_rain_per_acre:this.yield_of_coffee_with_adequate_rain_per_acre,
            yield_of_banana_with_adequate_rain_per_acre:this.yield_of_banana_with_adequate_rain_per_acre,
            yield_of_cassava_with_adequate_rain_per_acre:this.yield_of_cassava_with_adequate_rain_per_acre,
            crops_stored_from_last_season:this.crops_stored_from_last_season,
            disturbances_in_storage:this.disturbances_in_storage,
            storage_time:this.storage_time,
            Specify_others:this.Specify_others,
            yield_last_season:this.yield_last_season,
            yield_last_season2:this.yield_last_season2,


          maize_per_kg:this.maize_per_kg,
          beans_per_kg:this.beans_per_kg ,
          sesame_per_kg:this.sesame_per_kg,
          soyabean_per_kg:this.soyabean_per_kg,
          rice_per_kg:this.rice_per_kg,
          millet_per_kg:this.millet_per_kg,
          sorghum_per_kg:this.sorghum_per_kg,
          irish_potatoes_per_kg:this.irish_potatoes_per_kg,
          cotton_per_kg:this.cotton_per_kg,
          sweet_potatoes_per_kg:this.sweet_potatoes_per_kg,
          sunflower_per_kg:this.sunflower_per_kg,
          ground_nuts_per_kg:this.ground_nuts_per_kg,
          coffee_per_kg:this.coffee_per_kg,
          Banana_per_bunch:this.Banana_per_bunch,
          cassava_per_kg:this.cassava_per_kg,
          seed_variety:this.seed_variety,
          
  //More
          Did_you_apply_fertilizer:this.Did_you_apply_fertilizer,
          Specify_the_type:this.Specify_the_type,
          organic_specify:this.organic_specify,
          Specify_other_organic:this.Specify_other_organic,
          inorganic_Specify:this.inorganic_Specify,
          fertilizer_type:this.fertilizer_type,
          fertilizer_amount:this.fertilizer_amount,
          use_pesticides_or_herbicides:this.use_pesticides_or_herbicides,
          Please_specify_which_one:this.Please_specify_which_one,
          crop_use:this.crop_use,
          crop_subsistence:this.crop_subsistence,
          crop_commercial:this.crop_commercial,
          income_from_crops:this.income_from_crops,
          employ_any_farm_labour:this.employ_any_farm_labour,
          Specify_their_task:this.Specify_their_task,
          Who_assisted_you:this.Who_assisted_you,
          How_much_did_you_pay_them:this.How_much_did_you_pay_them,
          Are_you_aware_of_climate_shock:this.Are_you_aware_of_climate_shock,
          which_ones_you_are_aware_of:this.which_ones_you_are_aware_of,
          training_on_addressing_climate:this.training_on_addressing_climate,
          Please_specify:this.Please_specify,
          Which_crops_for_rotation:this.Which_crops_for_rotation,
          _1st_choice:this._1st_choice,
          _2nd_choice:this._1st_choice,
          _3rd_choice:this._3rd_choice,

          knoledge_of_rain_date:this.knoledge_of_rain_date,
          heard_of_agri_insurance:this.heard_of_agri_insurance,
          access_to_agri_insurance:this.access_to_agri_insurance,
          Please_specify_the_agri_insurance_type:this.Please_specify_the_agri_insurance_type,
          Specify_the_insurance_provider:this.Specify_the_insurance_provider,
          fair_charge_for_insurance:this.fair_charge_for_insurance,
          prefer_ordinary_or_az_bunlde:this.prefer_ordinary_or_az_bunlde,
          challenges_last_season:this.challenges_last_season,
          Specify:this.Specify,
          What_type_of_pests:this.What_type_of_pests,
          type_of_weather_and_effect:this.type_of_weather_and_effect,
          Do_you_have_a_bank_account:this.Do_you_have_a_bank_account,
          financial_access:this.financial_access,
          transaction_monthly_costs:this.transaction_monthly_costs,
          Specify_other_monthly_transaction_costs:this.Specify_other_monthly_transaction_costs,
          travel_distance:this.travel_distance,
          specify_other_travel_distance:this.specify_other_travel_distance,
          Have_you_ever_received_credit:this.Have_you_ever_received_credit,
          no_of_times_borrowed:this.no_of_times_borrowed,
          loanoutstanding:this.loanoutstanding,
          How_much_repayment_was_made_per_month:this.How_much_repayment_was_made_per_month,
          delay_time_for_repayment:this.delay_time_for_repayment,
          How_do_you_keep_your_money:this.How_do_you_keep_your_money,
          financial_transaction_challeng:this.financial_transaction_challeng,
          Specify_Other_financial_transaction_challeng:this.Specify_Other_financial_transaction_challeng,
          action_access_to_financial_svc:this.action_access_to_financial_svc,
          access_to_agric_ext_services:this.access_to_agric_ext_services,
          How_do_you_access_Agric_ext_sv:this.How_do_you_access_Agric_ext_sv,
          extension_type_channel_receive:this.extension_type_channel_receive,
          Do_you_receive_weather_data:this.Do_you_receive_weather_data,
          access_to_weather_data:this.access_to_weather_data,
          How_accurate_is_the_info:this.How_accurate_is_the_info,
          most_harmful_info:this.most_harmful_info,
          biggest_prob_in_data_access:this.biggest_prob_in_data_access,
          spend_on_your_phone_monthly:this.spend_on_your_phone_monthly,
          main_phone_use:this.main_phone_use,

          Voice_calling_and_receiving:this.Voice_calling_and_receiving,
          SMS:this.SMS,
          Internet:this.Internet,
          Social_media:this.Social_media,
          subscribed_to_info_svces_on_ph:this.subscribed_to_info_svces_on_ph,
          services_suscribed_to: this.services_suscribed_to,
          training_on_using_phone_servic:this.training_on_using_phone_servic,
          training_on_weather_alerts:this.training_on_weather_alerts,
          Who_provided_the_training_on_weather_alerts:this.Who_provided_the_training_on_weather_alerts,
          Who_provided_the_training_on_insurance:this.Who_provided_the_training_on_insurance,
          probs_of_using_cellphone:this.probs_of_using_cellphone,
          field_officer:this.fo,
          farmers_cooperation_responding:this.farmers_cooperation_responding,
          how_well_agent_knows_beneficiary:this.how_well_agent_knows_beneficiary,
          accuracy_of_info_collected:this.accuracy_of_info_collected,
          data_quality:this.data_quality,

           sell_of_produce:this.sell_of_produce,
                    date_of_harvest:this.date_of_harvest,
                    specify_crops_for_new_season:this.specify_crops_for_new_season,
                    rabbit_number:this.rabbit_number,
                    farm_size_husbandry:this.farm_size_husbandry,
                    livestock_breed:this.livestock_breed,
                    llivestock_pdts:this.livestock_pdts,
                    livestock_record:this.livestock_record,
                    livestock_added:this.livestock_added,
                    livestock_sold:this.livestock_sold,
                    livestock_sold_price:this.livestock_sold_price,
                    livestock_milk_produced:this.livestock_milk_produced,
                    livestock_sales_income:this.livestock_sales_income,
                    fooder_produce:this.fooder_produce,
                    suppliment_livestock:this.suppliment_livestock,
                    concentrates_feeding:this.concentrates_feeding,
                    livestock_feeding_cost:this.livestock_feeding_cost,
                    livestock_healthsvcs:this.livestock_healthsvcs,
                    livestock_healthsvcs_arrival:this.livestock_healthsvcs_arrival,
                    livestock_healthsvcs_types:this.livestock_healthsvcs_types,
                    livestock_death:this.livestock_death,
                    livestock_death_cause:this.livestock_death_cause,
                    livestock_health_cost:this.livestock_health_cost,
                    livestock_type:this.livestock_type,
                    preservation_mtds:this.preservation_mtds,
                    planting_season:this.planting_season,
                    effective_sell_channel:this.effective_sell_channel,
                    reason_for_channel:this.reason_for_channel,
                    need_loan:this.need_loan,
                    loan_amount:this.loan_amount,
                    loan_security:this.loan_security,
                    loan_purpose:this.loan_purpose,
                    specify_loan_ammount:this.specify_loan_ammount,
                    first_payment_date:this.first_payment_date,
                    loan_period_xpctd:this.loan_period_xpctd,
                    la_security:this.la_security,
                    lo_security:this.lo_security,
                    loan_failure_strategy:this.loan_failure_strategy,
                    agric_ext_provider:this.agric_ext_provider,
                    other_extension_channel_receive:this.other_extension_channel_receive,
                    specify_training_mobilephones:this.specify_training_mobilephones,
                    mostusedapp_mobilephones:this.mostusedapp_mobilephones,
                    agribulker_belong:this.agribulker_belong,
                    group_belong:this.group_belong,
                    fo:this.fo,
                    token:this.token,
                    //added more 10 columns for
                    spouse_name:this.spouse_name,
                    DOB_spouse:this.DOB_spouse,
                    first_child_name:this.first_child_name,
                    dob_first_child:this.dob_first_child,
                    second_child_name:this.second_child_name,
                    dob_second_child:this.dob_second_child,
                    third_child_name:this.third_child_name,
                    dob_third_child:this.dob_third_child,
                    forth_child_name:this.forth_child_name,
                    dob_forth_child:this.dob_forth_child,
                    geoshape:this.geoshape,
                    acreage:this.acreage
          }
            this.accsPrvds.postData(body, 'process21.php').subscribe((res:any)=> {
        if(res.success==true){
            this.addDetails_sent(this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,this.next_of_kin,this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.Local_council1_name,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.belong_farmergp,this.name_farmergp,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.crops_for_new_season,this.other_crops_intended,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.crops_grown_last_season2,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_last_season2,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality,this.sell_of_produce,this.date_of_harvest,this.specify_crops_for_new_season,this.rabbit_number,this.farm_size_husbandry,this.livestock_breed,this.livestock_pdts,this.livestock_record,this.livestock_added,this.livestock_sold,this.livestock_sold_price,this.livestock_milk_produced,this.livestock_sales_income,this.fooder_produce,this.suppliment_livestock,this.concentrates_feeding,this.livestock_feeding_cost,this.livestock_healthsvcs,this.livestock_healthsvcs_arrival,this.livestock_healthsvcs_types,this.livestock_death,this.livestock_death_cause,this.livestock_health_cost,this.livestock_type,this.preservation_mtds,this.planting_season,this.effective_sell_channel,this.reason_for_channel,this.need_loan,this.loan_amount,this.loan_security,this.loan_purpose,this.specify_loan_ammount,this.first_payment_date,this.loan_period_xpctd,this.la_security,this.lo_security,this.loan_failure_strategy,this.agric_ext_provider,this.other_extension_channel_receive,this.specify_training_mobilephones,this.mostusedapp_mobilephones,this.agribulker_belong,this.group_belong,this.fo,this.token,this.spouse_name,this.DOB_spouse,this.first_child_name,this.dob_first_child,this.second_child_name,this.dob_second_child,this.third_child_name,this.dob_third_child,this.forth_child_name,this.dob_forth_child,this.geoshape,this.acreage);
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/farmerprofile']);
            this.consent=false;
            this.farmers_name="";
            this.do_you_have_disability="";
            this.disability_type="";
            this.own_a_mobile_phone="";
            this.What_type_of_phone_do_you_own="";
            this.No_of_contacts=null;
            this.tel_no1="";
            this.tel_No_2="";
            this.service_provider="";
            this.Specify_svc_provider="";
            this.mm_reg_status="";
            this.registered_mm_number="";
            this.nin="";
            this.Photo_url="";
            this.ID_photo_url="";
            this.currentImage="";
            this.currentImageID="";
            this.occupation="";
            this.specify_other_occupation="";
            this.Martial_status="";
            this.What_is_your_gender="";
            this.name_of_husband="";
            this.number_of_wives_husbands="";
            this.name_first_wife="";
            this.name_second_wife="";
            this.status_in_a_family="";
            this.next_of_kin="";
            this.next_of_kin_has_contact="";
            this.next_of_kin_phone_no="";
            this.region="";
            this.distr="";
            this.other_district="";
            this.subcounty="";
            this.other_subcounty="";
            this.subcounty_other_district="";
            this.soiltype="";
            this.parish="";
            this.village="";
            this.nearest_town="";
            this.Local_council1_name="";
            this.resident_since="";
            this.Description_of_location="";
            this.DOB="";
            this.level_of_education="";
            this.head_of_the_household="";
            this.lo1="";
            this.la1="";
            this.acc1="";

            this.lo2="";
            this.la2="";
            this.acc2="";

            this.Mobile_literacy="";
            this.any_dependants="";
            this.dependant_no="";
            this.dependants_age_bracket=[];
            //Casa Data 

            this.belong_farmergp="";
            this.name_farmergp="";

            this.belong_farmergp="";
            this.position_in_FO="";
            this.Your_position_in_the_fo="";
            this.male_members_in_FO="";
            this.female_members_in_FO="";
            this.Affiliation="";
            this.Name_of_connected_ACE_or_DFA="";
            this.main_income_source="";
            //Here we include the values that are in aloop for other income source.
          
            this.mainincome_since="";
            this.sector="";
            this.main_income_relaibility="";
            this.main_income_amount="";
            this.annual_income=null;
            this.other_income_reliability="";
            this.amount=null;
            this.income_trend="";
            this.access_to_Health_services="";
            this.health_expense=null;
            this.school_going_children="";
            this.no_of_school_going_children=null;
            this.school_fees_expense="";
            //expenditure
            //disposable_income
            this.what_is_the_land_tenor="";
            this.Specify_other="";
            this.value_of_land="";
            this.own_any_farm_machinery=[];
            this.house_ownership="";
            this.house_structure="";
            this.Farm_size=null;
            this.total_land_size=null;
            this.Main_crop_enterprise="";
            this.yield_expected_main_enterprise;
            this.farm_at_residence="";
            //Gps

            this.crops_for_new_season=[];

            this.other_crops_intended="";
            
            this.number_of_employees="";

            this.livestock="";
            this.specify_livestock="";
            this.cattle_number=null;
            this.goat_number=null;
            this.sheep_number=null;
            this.chicken_number=null;
            this.pigs_number=null;
            this.Did_you_plant_last_season="";
            this.crops_grown_last_season=[];
            this.crops_grown_last_season2=[];
            this.Specify_other_crops_grown="";
            this.in_business_since=[];
            this.yield_with_drought=[];
            this.year_of_severe_drought="";
            this.how_much_seed=[];

            this.yield_of_maize_with_adequate_rain_per_acre=null;
            this.yield_of_beans_with_adequate_rain_per_acre=null;
            this.yield_of_sesame_with_adequate_rain_per_acre=null;
            this.yield_of_soyabean_with_adequate_rain_per_acre=null;
            this.yield_of_rice_with_adequate_rain_per_acre=null;
            this.yield_of_millet_with_adequate_rain_per_acre=null;
            this.yield_of_sorghum_with_adequate_rain_per_acre=null;
            this.yield_of_irish_potatoes_with_adequate_rain_per_acre=null;
            this.yield_of_cotton_with_adequate_rain_per_acre=null;
            this.yield_of_sweet_potatoes_with_adequate_rain_per_acre=null;
            this.yield_of_sunflower_with_adequate_rain_per_acre=null;
            this.yield_of_groundnuts_with_adequate_rain_per_acre=null;
            this.yield_of_coffee_with_adequate_rain_per_acre=null;
            this.yield_of_banana_with_adequate_rain_per_acre=null;
            this.yield_of_cassava_with_adequate_rain_per_acre=null;
            this.crops_stored_from_last_season="";
            this.disturbances_in_storage="";
            this.storage_time="";
            this.Specify_others="";

            this.yield_last_season=[];
            this.yield_last_season2=[];

            this.yield_with_drought=[];
            this.year_of_severe_drought="";

            this.maize_per_kg=null;
            this.beans_per_kg=null;
            this.sesame_per_kg=null;
            this.soyabean_per_kg=null;
            this.rice_per_kg=null;
            this.millet_per_kg=null;
            this.sorghum_per_kg=null;
            this.irish_potatoes_per_kg=null;
            this.cotton_per_kg=null;
            this.sweet_potatoes_per_kg=null;
            this.sunflower_per_kg=null;
            this.ground_nuts_per_kg=null;
            this.coffee_per_kg=null;
            this.Banana_per_bunch=null;
            this.cassava_per_kg=null;
            this.seed_variety=[];
  //More
          this.Did_you_apply_fertilizer=null;
          this.Specify_the_type=null;
          this.organic_specify=null;
          this.Specify_other_organic=null;
          this.inorganic_Specify=[];
          this.fertilizer_type=[];
          this.fertilizer_amount=[];

          this.use_pesticides_or_herbicides="";
          this.Please_specify_which_one="";
          this.crop_use="";
          this.crop_subsistence=[];
          this.crop_commercial=[];
          this.income_from_crops=[];

          this.employ_any_farm_labour="";
          this.Specify_their_task=[];
          this.Who_assisted_you=[];
          this.How_much_did_you_pay_them=null;
          this.Are_you_aware_of_climate_shock="";
          this.which_ones_you_are_aware_of="";
          this.training_on_addressing_climate="";
          this.Please_specify=[];
          this.Which_crops_for_rotation="";
          this._1st_choice="";
          this._2nd_choice="";
          this._3rd_choice="";

          this.knoledge_of_rain_date="";
          this.heard_of_agri_insurance="";
          this.access_to_agri_insurance="";
          this.Please_specify_the_agri_insurance_type=[];
          this.Specify_the_insurance_provider="";
          this.fair_charge_for_insurance="";
          this.prefer_ordinary_or_az_bunlde="";
          this.challenges_last_season=[];
          this.Specify="";
          this.What_type_of_pests="";
          this.type_of_weather_and_effect="";
          this.Do_you_have_a_bank_account="";
          this.financial_access="";
          this.transaction_monthly_costs="";
          this.Specify_other_monthly_transaction_costs="";
          this.travel_distance="";
          this.specify_other_travel_distance="";
          this.Have_you_ever_received_credit="";
          this.no_of_times_borrowed="";
          this.loanoutstanding="";
          this.How_much_repayment_was_made_per_month="";
          this.delay_time_for_repayment="";
          this.How_do_you_keep_your_money=[];
          this.financial_transaction_challeng=[];
          this.Specify_Other_financial_transaction_challeng="";
          this.action_access_to_financial_svc="";
          this.access_to_agric_ext_services="";
          this.How_do_you_access_Agric_ext_sv=[];
          this.extension_type_channel_receive=[];

          this.Do_you_receive_weather_data="";
          this.access_to_weather_data=[];
          this.How_accurate_is_the_info;
          this.most_harmful_info="";
          this.biggest_prob_in_data_access="";
          this.spend_on_your_phone_monthly="";
          this.main_phone_use=[];
          this.subscribed_to_info_svces_on_ph="";
          this.services_suscribed_to=[];
          this.training_on_using_phone_servic="";
          this.training_on_weather_alerts="";
          this.Who_provided_the_training_on_weather_alerts="";
          this.Who_provided_the_training_on_insurance="";
          this.probs_of_using_cellphone=[];
          this.landsize_main_crop_enterprise=null;
          this.additional_land_main_enterprise=null;
          this.farmers_cooperation_responding="";
          this.how_well_agent_knows_beneficiary="";
          this.accuracy_of_info_collected="";
          this.data_quality="";
          this.other_income_sources=="";
          this.mainincome_since=="";

          this.sell_of_produce="";
          this.date_of_harvest="";
          this.specify_crops_for_new_season="";
          this.rabbit_number=null;
          this.farm_size_husbandry="";
          this.livestock_breed="";
          this.livestock_pdts="";
          this.livestock_record="";
          this.livestock_added="";
          this.livestock_sold="";
          this.livestock_sold_price="";
          this.livestock_milk_produced="";
          this.livestock_sales_income="";
          this.fooder_produce="";
          this.suppliment_livestock="";
          this.concentrates_feeding="";
          this.livestock_feeding_cost="";
          this.livestock_healthsvcs="";
          this.livestock_healthsvcs_arrival="";
          this.livestock_healthsvcs_types=[];
          this.livestock_death="";
          this.livestock_death_cause="";
          this.livestock_health_cost="";
          this.livestock_type="";
          this.preservation_mtds=""; //similar to preservation
          this.planting_season="";
          this.effective_sell_channel="";
          this.reason_for_channel="";
          this.need_loan="";
          this.loan_amount="";
          this.loan_security=[];
          this.loan_purpose=[];
          this.specify_loan_ammount=[];
          this.first_payment_date="";
          this.loan_period_xpctd="";
          this.la_security="";
          this.lo_security="";
          this.loan_failure_strategy="";
          this.agric_ext_provider=[];
          this.other_extension_channel_receive="";
          this.specify_training_mobilephones="";
          this.mostusedapp_mobilephones="";
          this.agribulker_belong="";
          this.group_belong="";
//added more 10 columns for insurance
          this.no_of_child="";
          this.spouse_name="";
          this.DOB_spouse="";
          this.first_child_name="";
          this.dob_first_child="";
          this.second_child_name="";
          this.dob_second_child="";
          this.third_child_name="";
          this.dob_third_child="";
          this.forth_child_name="";
          this.dob_forth_child="";
          this.geoshape="";
          this.acreage="";

          this.Voice_calling_and_receiving="";
          this.SMS="";
          this.Internet="";
          this.Social_media="";
          this.term="";
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
              this.addDetails(this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,this.next_of_kin,this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.Local_council1_name,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.belong_farmergp,this.name_farmergp,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.crops_for_new_season,this.other_crops_intended,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.crops_grown_last_season2,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_last_season2,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality,this.sell_of_produce,this.date_of_harvest,this.specify_crops_for_new_season,this.rabbit_number,this.farm_size_husbandry,this.livestock_breed,this.livestock_pdts,this.livestock_record,this.livestock_added,this.livestock_sold,this.livestock_sold_price,this.livestock_milk_produced,this.livestock_sales_income,this.fooder_produce,this.suppliment_livestock,this.concentrates_feeding,this.livestock_feeding_cost,this.livestock_healthsvcs,this.livestock_healthsvcs_arrival,this.livestock_healthsvcs_types,this.livestock_death,this.livestock_death_cause,this.livestock_health_cost,this.livestock_type,this.preservation_mtds,this.planting_season,this.effective_sell_channel,this.reason_for_channel,this.need_loan,this.loan_amount,this.loan_security,this.loan_purpose,this.specify_loan_ammount,this.first_payment_date,this.loan_period_xpctd,this.la_security,this.lo_security,this.loan_failure_strategy,this.agric_ext_provider,this.other_extension_channel_receive,this.specify_training_mobilephones,this.mostusedapp_mobilephones,this.agribulker_belong,this.group_belong,this.fo,this.token,this.spouse_name,this.DOB_spouse,this.first_child_name,this.dob_first_child,this.second_child_name,this.dob_second_child,this.third_child_name,this.dob_third_child,this.forth_child_name,this.dob_forth_child,this.geoshape,this.acreage
);
            }
          },
          {
            text: 'Try Again',
            handler: () => {
              this.SubmitData();
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

    restoreData(){
      return this.storage.get('farm4').then((res)=>{
        console.log(res);
        //this.groups_submitted= this.myForm.value;
        [this.consent,this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.Local_council1_name,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.belong_farmergp,this.name_farmergp,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.crops_for_new_season,this.other_crops_intended,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.crops_grown_last_season2,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_last_season2,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality,this.sell_of_produce,this.date_of_harvest,this.specify_crops_for_new_season,this.rabbit_number,this.farm_size_husbandry,this.livestock_breed,this.livestock_pdts,this.livestock_record,this.livestock_added,this.livestock_sold,this.livestock_sold_price,this.livestock_milk_produced,this.livestock_sales_income,this.fooder_produce,this.suppliment_livestock,this.concentrates_feeding,this.livestock_feeding_cost,this.livestock_healthsvcs,this.livestock_healthsvcs_arrival,this.livestock_healthsvcs_types,this.livestock_death,this.livestock_death_cause,this.livestock_health_cost,this.livestock_type,this.preservation_mtds,this.planting_season,this.effective_sell_channel,this.reason_for_channel,this.need_loan,this.loan_amount,this.loan_security,this.loan_purpose,this.specify_loan_ammount,this.first_payment_date,this.loan_period_xpctd,this.la_security,this.lo_security,this.loan_failure_strategy,this.agric_ext_provider,this.other_extension_channel_receive,this.specify_training_mobilephones,this.mostusedapp_mobilephones,this.agribulker_belong,this.group_belong,this.spouse_name,this.DOB_spouse,this.first_child_name,this.dob_first_child,this.second_child_name,this.dob_second_child,this.third_child_name,this.dob_third_child,this.forth_child_name,this.dob_forth_child,this.geoshape,this.acreage] = res;
       
      });
    }
    async storeData(){
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: "Data is Saved",
        message:"Continue filling the form.",
        backdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
          }
        ]
      });
    
      await alert.present();
    
      return this.storage.set('farm4', [this.consent,this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.Local_council1_name,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.belong_farmergp,this.name_farmergp,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.crops_for_new_season,this.other_crops_intended,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.crops_grown_last_season2,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_last_season2,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality,this.sell_of_produce,this.date_of_harvest,this.specify_crops_for_new_season,this.rabbit_number,this.farm_size_husbandry,this.livestock_breed,this.livestock_pdts,this.livestock_record,this.livestock_added,this.livestock_sold,this.livestock_sold_price,this.livestock_milk_produced,this.livestock_sales_income,this.fooder_produce,this.suppliment_livestock,this.concentrates_feeding,this.livestock_feeding_cost,this.livestock_healthsvcs,this.livestock_healthsvcs_arrival,this.livestock_healthsvcs_types,this.livestock_death,this.livestock_death_cause,this.livestock_health_cost,this.livestock_type,this.preservation_mtds,this.planting_season,this.effective_sell_channel,this.reason_for_channel,this.need_loan,this.loan_amount,this.loan_security,this.loan_purpose,this.specify_loan_ammount,this.first_payment_date,this.loan_period_xpctd,this.la_security,this.lo_security,this.loan_failure_strategy,this.agric_ext_provider,this.other_extension_channel_receive,this.specify_training_mobilephones,this.mostusedapp_mobilephones,this.agribulker_belong,this.group_belong,this.spouse_name,this.DOB_spouse,this.first_child_name,this.dob_first_child,this.second_child_name,this.dob_second_child,this.third_child_name,this.dob_third_child,this.forth_child_name,this.dob_forth_child,this.geoshape, this.acreage]);
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
      //pop modal for modal of consent
      async presentAlertModal(a:string) {
        const alert = await this.alertCtrl.create({
          cssClass: 'fullscreen',
          header: a,
          backdropDismiss: false,
          message: 'AXIOM ZORN FARMER PROFILING ORAL CONSENT FORM. <br/>aXiom Zorn collects farmers data to support the visualization needs that attract several services that include but not limited the ones listed, (as elaborated by our agent) <br/>1.	Financial inclusion through their credit scoring models.<br/>Market access through clustering and publication. <br/>3.	Crop and soil health management services through ICTS.<br/> 4.	Insurance services. <br/>5.	Channeling projects suitable for your enterprises and type of production<br/>As a farmer;<br/>a)	You are therefore providing information voluntarily without coercion or intimidation and you are free to withdraw at any time you wish to do so.  <br> b)	You are also free to decline to provide any information and nothing can be held against your decision for the same.<br>c)	The data points collected including personal information, Production data, House hold economic data and other are to aid provision of highlighted services in previous section above.<br>d)	Your analyzed data points shall be shared collectively to our partners providing services mentioned above.<br>e)	Service providers with whom axiom Zorn establishes partnerships to provide the services shared can as well carry out background checks to tailor custom services to your benefit.<br>f)	Your data shall be kept for up-to 3 years with seasonal updates collected with your consent.<br>g)	 Your information shall be coded for safety purposes and stored on our cloud servers.<br>h)	Agents may avail access to you your online profiles during the Data collection and update exercises to allow for correction as may prefer.',

          buttons: [
             {
              text: 'CLOSE',
              handler: () => {
               // this.Submit();
              }
            }
            
          ]
        });
    
        await alert.present();
      }
}
