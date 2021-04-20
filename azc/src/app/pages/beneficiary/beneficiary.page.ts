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

  selectedVie//region: string="";
  //district: string="";
  //subcounty: string="";
  fo: string="";
  
  disabledButton;
  currentImage: any;
  ib: any;
  latitude: any = 0;
  longitude: any = 0;
  name:string;
  datastorage:any;

details: DetailsInterface[];
id:number;


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
occupation:string="";
specify_other_occupation:string="";
Martial_status:string="";
What_is_your_gender:string="";
name_of_husband:string="";
number_of_wives_husbands:string="";
name_first_wife:string="";
name_second_wife:string="";
status_in_a_family:string="";
next_of_kin:string="";
next_of_kin_has_contact:string="";
next_of_kin_phone_no:string="";
region:string="";
district:string="";
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
farmer_org:string="";
name_farmergp:string="";
belong_farmergp:string="";
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
annual_income:string="";
other_income_sources:string="";
other_income_activity:string="";
years_of_experince:string="";
other_income_reliability:string="";
amount:number=null;
income_trend:string="";
access_to_Health_services:string="";
health_expense:string="";
school_going_children:string="";
no_of_school_going_children:number=0;
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

yield_expected_main_enterprise:string="";
farm_at_residence:string="";
//GPs
postharvest_mgt:string="";
produce_storage:string="";
preservation:string="";
crops_for_new_season:string="";
number_of_employees:string="";


landsize_cropselected:string="";
yield_per_acre:number=null;
in_business_since:string="";

livestock: any[]=[];
specify_livestock:string="";
cattle_number:number=null;
goat_number:number=null;
sheep_number:number=null;
chicken_number:number=null;
pigs_number:number=null;
donkey_number:number=null;
Did_you_plant_last_season:string="";
Specify_other_crops_grown:string="";

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
maize_per_kg: number=0;
  beans_per_kg:number=0;
  rice_per_kg: number=0;
  sesame_per_kg: number=0;
  soyabean_per_kg:number=0;
  millet_per_kg: number=0;
  sorghum_per_kg: number=0;
  irish_potatoes_per_kg:number=0;
  cotton_per_kg:number=0;
  sweet_potatoes_per_kg:number=0;
  sunflower_per_kg: number=0;
  ground_nuts_per_kg: number=0;
  coffee_per_kg: number=0;
  Banana_per_bunch:number=0;
  cassava_per_kg: number=0;

  Did_you_apply_fertilizer:string="";
  Specify_the_type:string="";
  organic_specify:string="";
  Specify_other_organic:string="";
  inorganic_Specify:any[]=[];
  use_pesticides_or_herbicides:string="";
  Please_specify_which_one:string="";
  pesticide_effectiveness:string="";
  crop_use: string="";

  involved_in_marketing: string="";
  sell_of_produce_Nyakyera: string="";
  sell_of_produce_green: string="";
  sell_of_produce_equator: string="";
  sell_of_produce_liraresort: string="";
  sell_of_produce_cedo: string="";
  sell_of_produce_orum: string="";
  Marketlink: string="";
  agent_name: string="";
  produce_transport: string="";
  employ_any_farm_labour: string="";
  Specify_their_task:any[]=[];
  Who_assisted_you: any[]=[];
  How_much_did_you_pay_them: number=null;
  Are_you_aware_of_climate_shock:string="";
  which_ones_you_are_aware_of: string="";
  training_on_addressing_climate: string="";
  Please_specify: any[]=[];
  Which_crops_for_rotation:string="";
  crops_grown_last_season:any[]=[];
  knoledge_of_rain_date: string="";
  heard_of_agri_insurance: string="";
  access_to_agri_insurance: string="";
  Please_specify_the_agri_insurance_type: string="";
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
  adopted_practices: any[]=[];
  most_mostadoptedpractice: string="";
  Rate_services_training: string="";
  frequently_access_ext_svcs: string="";
  is_information_provided_accurt: string="";
  trainingappropriate: string="";
  benefits_of_practices: string="";
  pay_anything_to_access_ext_svc: string="";
  training: any[]=[];
  pay_per_season: string="";
  pest_fertilizer_pesticide_info: any[]=[];
  Do_you_receive_weather_data: string="";
  access_to_weather_data: any[]=[];
  How_accurate_is_the_info: string="";
  most_harmful_info: string="";
  biggest_prob_in_data_access: string="";
  spend_on_your_phone_monthly: string="";
  main_phone_use: any[]=[];
  subscribed_to_info_svces_on_ph: string="";
  services_suscribed_to: any[]=[];
  training_on_using_phone_servic: string="";
  training_on_weather_alerts: string="";
  trainig_on_insurance: string="";
  Who_provided_the_training_on_insurance: string="";
  probs_of_using_cellphone: any[]=[];
  name_of_farmer_org: string="";
  Who_provided_the_training_on_weather_alerts: string="";
  field_officer:string=this.fo;
  
  //details: DetailsInterface[];


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
  
  addDetails(consent: boolean, farmers_name:string, do_you_have_disability:string,disability_type:string,
          own_a_mobile_phone:string,
          What_type_of_phone_do_you_own:string,
          No_of_contacts: number,
          tel_no1:string,
          tel_No_2:string,
          service_provider: string,
          Specify_svc_provider:string,
          mm_reg_status:string,
          registered_mm_number: string,
          nin:string,
          Photo_url:string,
          ID_photo_url:string,

          occupation:string,
          specify_other_occupation: string,
          Martial_status:string,
          What_is_your_gender:string,
          name_of_husband:string,
          number_of_wives_husbands:string,
          name_first_wife:string,
          name_second_wife:string,
          status_in_a_family:string,
          next_of_kin:string,
          next_of_kin_has_contact:string,
          next_of_kin_phone_no: string,
          region:string,
          distr:string,
          other_district:string,
          subcounty:string,
          other_subcounty:string,
          subcounty_other_district:string,
          soiltype:string,
          parish: string,
          village:string,
          nearest_town:string,
          Local_council1_name:string,
          resident_since:string,
          Description_of_location:string,
          DOB:string,
          level_of_education:string,
          head_of_the_household:string,
          lo:string,

          Mobile_literacy:string,
          any_dependants:string,
          dependant_no:string,
          dependants_age_bracket:any[],
          //Casa Data 
          farmer_org:string,
          name_of_farmer_org:string,
          name_farmergp:string,
          belong_farmergp:string,
          position_in_FO:string,
          Your_position_in_the_fo:string,
          male_members_in_FO:string,
          female_members_in_FO:string,
          Affiliation:string,
          Name_of_connected_ACE_or_DFA:string,
          main_income_source:string,

          mainincome_since:string,
          sector:string,
          main_income_relaibility:string,
          main_income_amount:string,
          annual_income:string,
          other_income_sources:string,
          other_income_activity:string,
          years_of_experince:string,
          other_income_reliability:string,
          amount:number,
          income_trend:string,
          access_to_Health_services:string,
          health_expense:string,
          school_going_children:string,
          no_of_school_going_children:number,
          school_fees_expense:string,
          //expenditure
          //disposable_income
          what_is_the_land_tenor:string,
          Specify_other:string,
          value_of_land:string,
          own_any_farm_machinery:any[],
          house_ownership:string,
          house_structure:string,
          Farm_size:number,
          total_land_size:number,
          Main_crop_enterprise:string,
          yield_expected_main_enterprise:string,
          farm_at_residence:string,
          //Gps
          postharvest_mgt:string,
          produce_storage:string,
          preservation:string,
          crops_for_new_season:string,
          
          number_of_employees:string,
          landsize_cropselected:string,

          livestock:any[],
          specify_livestock:string,
          cattle_number:number,
          goat_number:number,
          sheep_number:number,
          chicken_number:number,
          pigs_number:number,
          donkey_number:number,
          Did_you_plant_last_season:string,
          crops_grown_last_season:any[],
          Specify_other_crops_grown:string,

          in_business_since:string,
          yield_per_acre:number,

          yield_of_maize_with_adequate_rain_per_acre:number,
          yield_of_beans_with_adequate_rain_per_acre:number,
          yield_of_sesame_with_adequate_rain_per_acre:number,
          yield_of_soyabean_with_adequate_rain_per_acre:number,
          yield_of_rice_with_adequate_rain_per_acre:number,
          yield_of_millet_with_adequate_rain_per_acre:number,
          yield_of_sorghum_with_adequate_rain_per_acre:number,
          yield_of_irish_potatoes_with_adequate_rain_per_acre:number,
          yield_of_cotton_with_adequate_rain_per_acre:number,
          yield_of_sweet_potatoes_with_adequate_rain_per_acre:number,
          yield_of_sunflower_with_adequate_rain_per_acre:number,
          yield_of_groundnuts_with_adequate_rain_per_acre:number,
          yield_of_coffee_with_adequate_rain_per_acre:number,
          yield_of_banana_with_adequate_rain_per_acre:number,
          yield_of_cassava_with_adequate_rain_per_acre:number,
          crops_stored_from_last_season:string,
          disturbances_in_storage:string,
          storage_time:string,
          Specify_others:string,

         maize_per_kg:number,
         beans_per_kg:number,
         sesame_per_kg:number,
         soyabean_per_kg:number,
         rice_per_kg:number,
         millet_per_kg:number,
         sorghum_per_kg:number,
         irish_potatoes_per_kg:number,
         cotton_per_kg:number,
         sweet_potatoes_per_kg:number,
         sunflower_per_kg:number,
         ground_nuts_per_kg:number,
         coffee_per_kg:number,
         Banana_per_bunch:number,
         cassava_per_kg:number,
//More
         Did_you_apply_fertilizer:string,
         Specify_the_type:string,
         organic_specify:string,
         Specify_other_organic:string,
         inorganic_Specify:any[],

         use_pesticides_or_herbicides:string,
         Please_specify_which_one:string,
         pesticide_effectiveness:string,
         crop_use:string,

         involved_in_marketing:string,
sell_of_produce_Nyakyera:string,
sell_of_produce_green:string,
sell_of_produce_equator:string,
sell_of_produce_liraresort:string,
sell_of_produce_cedo:string,
sell_of_produce_orum:string,
Marketlink:string,
agent_name:string,
produce_transport:string,
employ_any_farm_labour:string,
Specify_their_task:any[],
Who_assisted_you:any[],
How_much_did_you_pay_them:number,
Are_you_aware_of_climate_shock:string,
which_ones_you_are_aware_of:string,
training_on_addressing_climate:string,
Please_specify:any[],
Which_crops_for_rotation:string,

knoledge_of_rain_date:string,
heard_of_agri_insurance:string,
access_to_agri_insurance:string,
Please_specify_the_agri_insurance_type:string,
Specify_the_insurance_provider:string,
fair_charge_for_insurance:string,
prefer_ordinary_or_az_bunlde:string,
challenges_last_season:any[],
Specify:string,
What_type_of_pests:string,
type_of_weather_and_effect:string,
Do_you_have_a_bank_account:string,
financial_access:string,
transaction_monthly_costs:string,
Specify_other_monthly_transaction_costs:string,
travel_distance:string,
specify_other_travel_distance:string,
Have_you_ever_received_credit:string,
no_of_times_borrowed:string,
loanoutstanding:string,
How_much_repayment_was_made_per_month:string,
delay_time_for_repayment:string,
How_do_you_keep_your_money:any[],
financial_transaction_challeng:any[],
Specify_Other_financial_transaction_challeng:string,
action_access_to_financial_svc:string,
access_to_agric_ext_services:string,
How_do_you_access_Agric_ext_sv:any[],
extension_type_channel_receive:any[],
adopted_practices:any[],
most_mostadoptedpractice:string,
Rate_services_training:string,
frequently_access_ext_svcs:string,
is_information_provided_accurt:string,
trainingappropriate:string,
benefits_of_practices:string,
pay_anything_to_access_ext_svc:string,
training:any[], 
pay_per_season:string,
pest_fertilizer_pesticide_info:any[],
Do_you_receive_weather_data:string,
access_to_weather_data:any[],
How_accurate_is_the_info:string,
most_harmful_info:string,
biggest_prob_in_data_access:string,
spend_on_your_phone_monthly:string,
main_phone_use:any[],
subscribed_to_info_svces_on_ph:string,
services_suscribed_to: any[],
training_on_using_phone_servic:string,
training_on_weather_alerts:string,
Who_provided_the_training_on_weather_alerts:string,
trainig_on_insurance:string,
Who_provided_the_training_on_insurance:string,
probs_of_using_cellphone:any[],
field_officer:string
    ) {  
  if(this.consent==false){
      this.presentToast('The consent is required');
  }else if(this.farmers_name==""){
    this.presentToast('The farmers_name is required');
  }else if(this.do_you_have_disability==""){
    this.presentToast('The do_you_have_disability is required');
  }/*else if(this.disability_type==""){
    this.presentToast('The disability_type is required');
  }*/else{
      this.db.addDetails(consent, farmers_name, do_you_have_disability,disability_type,own_a_mobile_phone,What_type_of_phone_do_you_own,No_of_contacts,tel_no1,tel_No_2,service_provider,Specify_svc_provider,mm_reg_status,registered_mm_number,nin,Photo_url,ID_photo_url,occupation, specify_other_occupation,Martial_status,What_is_your_gender,name_of_husband,number_of_wives_husbands,name_first_wife,name_second_wife,status_in_a_family,next_of_kin,next_of_kin_has_contact,next_of_kin_phone_no,region,distr,other_district,subcounty,other_subcounty,subcounty_other_district,soiltype,parish,village,nearest_town,Local_council1_name,resident_since,Description_of_location,DOB,level_of_education,head_of_the_household,lo,Mobile_literacy,any_dependants,dependant_no,dependants_age_bracket,farmer_org,name_of_farmer_org,name_farmergp,belong_farmergp,position_in_FO,Your_position_in_the_fo,male_members_in_FO,female_members_in_FO,Affiliation,Name_of_connected_ACE_or_DFA,main_income_source,mainincome_since,sector,main_income_relaibility,main_income_amount,annual_income,other_income_sources,other_income_activity,years_of_experince,other_income_reliability,amount,income_trend,access_to_Health_services,health_expense,school_going_children,no_of_school_going_children,school_fees_expense,what_is_the_land_tenor,Specify_other,value_of_land,own_any_farm_machinery,house_ownership,house_structure,Farm_size,total_land_size,Main_crop_enterprise,yield_expected_main_enterprise,farm_at_residence,postharvest_mgt,produce_storage,preservation,crops_for_new_season,number_of_employees,landsize_cropselected,livestock,specify_livestock,cattle_number,goat_number,sheep_number,chicken_number,pigs_number,donkey_number,Did_you_plant_last_season,crops_grown_last_season,Specify_other_crops_grown,in_business_since,yield_per_acre,yield_of_maize_with_adequate_rain_per_acre,yield_of_beans_with_adequate_rain_per_acre,yield_of_sesame_with_adequate_rain_per_acre,yield_of_soyabean_with_adequate_rain_per_acre,yield_of_rice_with_adequate_rain_per_acre,yield_of_millet_with_adequate_rain_per_acre,yield_of_sorghum_with_adequate_rain_per_acre,yield_of_irish_potatoes_with_adequate_rain_per_acre,yield_of_cotton_with_adequate_rain_per_acre,yield_of_sweet_potatoes_with_adequate_rain_per_acre,yield_of_sunflower_with_adequate_rain_per_acre,yield_of_groundnuts_with_adequate_rain_per_acre,yield_of_coffee_with_adequate_rain_per_acre,yield_of_banana_with_adequate_rain_per_acre,yield_of_cassava_with_adequate_rain_per_acre,crops_stored_from_last_season,disturbances_in_storage,storage_time,Specify_others,maize_per_kg,beans_per_kg ,sesame_per_kg,soyabean_per_kg,rice_per_kg,millet_per_kg,sorghum_per_kg,irish_potatoes_per_kg,cotton_per_kg,sweet_potatoes_per_kg,sunflower_per_kg,ground_nuts_per_kg,coffee_per_kg,Banana_per_bunch,cassava_per_kg,Did_you_apply_fertilizer,Specify_the_type,organic_specify,Specify_other_organic,inorganic_Specify,use_pesticides_or_herbicides,Please_specify_which_one,pesticide_effectiveness,crop_use,involved_in_marketing,sell_of_produce_Nyakyera, sell_of_produce_green,sell_of_produce_equator,sell_of_produce_liraresort, sell_of_produce_cedo,sell_of_produce_orum,Marketlink,agent_name,produce_transport,employ_any_farm_labour,Specify_their_task,Who_assisted_you,How_much_did_you_pay_them,Are_you_aware_of_climate_shock,which_ones_you_are_aware_of,training_on_addressing_climate,Please_specify,Which_crops_for_rotation,knoledge_of_rain_date,heard_of_agri_insurance,access_to_agri_insurance,Please_specify_the_agri_insurance_type,Specify_the_insurance_provider,fair_charge_for_insurance,prefer_ordinary_or_az_bunlde,challenges_last_season,Specify,What_type_of_pests,type_of_weather_and_effect,Do_you_have_a_bank_account,financial_access,transaction_monthly_costs,Specify_other_monthly_transaction_costs,travel_distance,specify_other_travel_distance,Have_you_ever_received_credit,no_of_times_borrowed,loanoutstanding,How_much_repayment_was_made_per_month,delay_time_for_repayment,How_do_you_keep_your_money,financial_transaction_challeng,Specify_Other_financial_transaction_challeng,action_access_to_financial_svc,access_to_agric_ext_services,How_do_you_access_Agric_ext_sv,extension_type_channel_receive, adopted_practices, most_mostadoptedpractice, Rate_services_training,frequently_access_ext_svcs,is_information_provided_accurt,trainingappropriate,benefits_of_practices,pay_anything_to_access_ext_svc,training, pay_per_season,pest_fertilizer_pesticide_info,Do_you_receive_weather_data,access_to_weather_data,How_accurate_is_the_info,most_harmful_info,biggest_prob_in_data_access,spend_on_your_phone_monthly,main_phone_use,subscribed_to_info_svces_on_ph,services_suscribed_to,training_on_using_phone_servic,training_on_weather_alerts,Who_provided_the_training_on_weather_alerts,trainig_on_insurance,Who_provided_the_training_on_insurance,probs_of_using_cellphone).then(data => {
        this.details = data;

      });
      this.presentToast("Your activity has been saved locally, you can submit it later");
      this.disabledButton = false;
      this.consent =false;
      this.farmers_name ="";
      this.do_you_have_disability ="";
      this.disability_type ="";
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
//List of all districts.
districts=["Buikwe","Bukomansimbi","Butambala","Buvuma","Gomba","Kalangala","Kalungu","Kampala","Kayunga","Kiboga","Kyankwanzi","Luweero","Lwengo","Lyantonde","Masaka","Mityana","Mpigi","Mubende","Mukono","Nakaseke","Nakasongola","Rakai","Sembabule","Wakiso","other","Abim","Amudat","Amuria","Budaka","Bududa","Bugiri","Bukedea","Bukwo","Bulambuli","Busia","Butaleja","Buyende","Iganga","Jinja","Kaberamaido","Kaliro","Kamuli","Kapchorwa","Katakwi","Kibuku","Kumi","Kween","Luuka","Manafwa","Mayuge","Mbale","Namayingo","Namisindwa", "Namutumba","Ngora","Pallisa","Serere","Sironko","Soroti","Tororo","other","Agago","Alebtong","Amolatar","Amuru","Apac","Dokolo","Gulu","Kaabong","Kitgum","Koboko","Kole","Kotido","Lamwo","Lira","Moroto","Moyo","Nakapiripirit","Napak","Nwoya","Otuke","Oyam","Pader","other","Buliisa","Bundibugyo","Bushenyi","Hoima", "Ibanda","Isingiro","Kabale","Kabarole","Kamwenge","Kanungu","Kasese","Kibaale","Kiruhura","Kiryandongo","Kisoro","Kyegegwa","Kyenjojo","Masindi","Mbarara","Mitooma","Ntotorko","Ntungamo","Rukungiri","Sheema","other","adjumani","Maracha","Arua","Maracha","Moyo","Nebbi","Yumbe", "Zombo","other"
];
//Listing all the subcounties
subcounties=["hhhh","yyyy"

];
//List of soil types
soiltypes=[
  "A","B"

];
formofdisabilitys=["Yes", "No"
];
benefits=[
"increased production","increased income","increased investiment", "property ownership","Increased market access","Imprved producequality","Enhanced leadership skills","increased jont decision making"
];
trainings=[
"access to inputs (seeds, fertilisers, pesticides)","financial literacy (credit access, insurance, financial mgt)","Nutrition_education","Climate smart practices (GAP,land management)","farming as a business","market access","Postharvest management (value addition)","Bulking & collective marketing", "Leadership skills","gender mainstreaming" 

];

//list of levels of education
educLevels=["none","primary","secondary","tertiary"
];
//List of mobile literacy
mobileLiteracys=["cannot_use","basic","good","very_good"
];
//List of dependant age brackets.
form = [
  'males 0-14', 'males 15-24','males 25-34','males 35-59','males 60 and above.','Females 0-14', 'Females 15-24','Females 25-34','Females 35-59', 'Females 60 and above'
];

//list of land tenure
tenures = ["Privately owned with title_proof","privately owned with local agreement",
  "Inherited land with a will",
  "leasehold with title",
  "inherited land without_a_will",
  "communually shared land",
  "unregistered land",
  "some owned and some leased",
  "others"
];
//list of agents
agents=[
"Lugaaju Achileo","Billy Kayemba","Kaganda Patrick","Nassolo Aidah","Nansubuga Betty","Bukenya Abdul","Lukwata Charles","Byamukama Jackson","Kakuru Wilber",
"Dinah Nalwadda",
"Ssenyondo Suudi",
"Mwanje Nasoni",
"Barugahare Mutwalidi","Addah Byaruhanga","Ssenyonga Abdu","Kanishane Steven","Sserufusa Andrew","Namuyanja Justine",
"Ssekajjugo Ronald",
"Kyabaggu Matovu Deo",
"Polly  Najjuko",
"Abibu Abdul Haman",
"Bukenya Charles", 
"Jjumba George",
"Musomesa Mayanja","Ziwa John","Kisseka Daniel" ,"Sseruwo  Charles","Kateregga Rose","Jjumba Vincent","Muggaga Joachim",
"Lugomala Deus",
"Nakalema Aidah", 
" Nambajjo maxy","Mutebi Zailu","Sseruwugge Muzafalu","Madivani Yeremayia","Kasozi Annatoli","Munyagwa Moses",
"Nanziri Mary",
"Emmanuel Mukasa","Sserwadda Ibrahim","Ssemuguzi Jude","Kayiwa Charles","Muyinda Angello","Namumpenje Resty",
"Nabuyondo Imelda",
"Jemma Nabajja",
"Ssengabire John",
"Agaba Edison",
"Sserunkuuma Mark",
"Nalwada Angella",
"Nalwanga Sarah/Kasendwa",
"Kirangwa Dominico",
"Namusoke Jane",
"Hajji Ssembatya aufi", 
"Nakaye Jennifer",
"Nsengeyuva",
"Kiyingi John",
"Kiweewa Swaibu",
"ANGOLI DAVID",
"AYO PATRICK",
"ONGADA CEASER",
"ADILO ROBERT",
"OPIO QUINTO",
"AKWI JENIFER",
"AMULE HELLEN",
"AKONO TOM",
"OPUA JOEL LEONARD",
"AKULLO PRICILLA",
"ONGURA AMBROSE",
"ACAN JULLIET",
"OLUM EDWARD",
"LIRA NELSON",
"OKELLO ROBERT CEASER",
"ALWOC ALICE",
"ODONGO ALTERO",
"ANYAI LAMECK",
"GIRA YUVENTINO",
"ALWOCH SEMMY",
"OBUA MOSES",
"ATONO PHILIPS",
"OTIM ISAAC" ,
"OGWANG JOHN BOSCO",
"ANGU ALICE",
"OKUTA MORIS",
"AYO PATRICK",
"ANYANGO ANNA",
"TINO SHARA",
"AGUTI AGNES",
"OKECH GODFREY",
"ADOKORACH JENNIFER",
"AKULLO JENNIFER",
"AKONO JOHN BOSCO",
"OGWANG SAMUEL",
"OBAA NELSON JOE",
"ATIM EUNICE",
"AMONGI JOAN",
"ALYEK SOFIA",
"OGEI OLWA ALFRED",
"OKELLO JIMMY",
"OKELLO MOSES",
"OTOA MAXWEL",
"AMOLO GILLIAN",
"APIO BETTY",
"ONYONG JOEL",
"ODONGO EMMANUEL",
"APIO CONCY",
"OMARA PATRICK",
"ACENG MARY",
"AKWAR MARKDONALD",
"ELEM JONATHAN",
"ORYEM TADEO GEORGE",
"ONGOM PATRICK","AWICI BOSCO",
"",
"OTIM FRANCIS","ONYANGA JIMMY","OLET DONALD","AMONI BENZ","EKOL JACOB","OGWANG DANIEL","OBUA SAM","OKELLO BENARD","OJOK SAM","OBOTE TOM","OBUA GODFREY",
"AKITE JENNET","AISU RUTH ANYAIT","OJOK TOM EDWARD","APIO LUCY ONYOLO","OKELLO OSCAR","ACEN AGNESS","ACAR YUVENTINO","OBIRA CHARLES",
"OMARA GODFREY",
"OKORI RICHARD",
"ENYEL THOMAS", 
"ACIO LILLY ROSE", 
"OKORI PATRICK",
"ANGOM BETTY",
"AKULLO CAROLINE",
"DENGO LAMECK",
"OOLA MICHEAL",
"ONAP RICHARD",
"ACENG MOLLY",
"OCEN JASPHER",
"EPILA JAMES",
"OKONYE BOSCO",
"OJUKA THOMAS",
"APIO JENET",
"OKWIR ANGELO",
"OUNI JAMES",
"OMACH GEOFFREY SAMUEL",
"OGWANG RICHARD",
"AKULLU BETTY",
"AKULLU MARY",
"OGWANG GEORGE",
"OYANGA RICHARD",
"AKELLO GRACE",
"OKULLO GEOFFREY",
"ACENG LUCY",
"AKULLO MARGRATE",
"APIO EVALINE",
"OMARA GEOFFREY",
"OKWENYE ANJILO",
"OMARA GEOFFREY",
"OKELLO JOEL",
"NYANG MOSES",
"OGWANG JAMES",
"OKWIR JAMES",
"OCEN PATRICK",
"ALANY SAMUEL",
"OPENE NELSON",
"ADINYA FRANCIS Y Y",
"OGONG MOSES",
"ABURA JOEL",
"OTIM THOMAS",
"AGOM MARTIN",
"APORO JASPER",
"ADINYA GEOFFRY",
"ABOR JIMMY",
"OTIM JIMMY",
"OGWANG BOSCO",
"OKELLO DENISH", 
"OPIDO JOHN BOSCO",
"ONGOM RICHARD",
"AJAL PETER",
"ALOL PETER",
"ODYENY BOSCO",
"OBUA ISSAC",
"OGWANG DENISH",
"ACOLA GRACE",
"OPIO MOSES",
"OKELLO BDENISH", 
"POLINA OGWANG",
"AJOK SANTA",
"EPILLA RICHARD",
"OKELLO TONNY",
"AWIO JIMMY",
"AKII RICHARD",
"OGWAL PETER",
"OTIM PETER",
"OWERA PATRICK",
"ODONGO FRANCIS",
"ABALO FLAVIA",
"OTIM RICHARD BUTTON",
"ACAR MOSES",
"OPIO JIMMY",
"ONYANGA JERIFANSIO",
"OUNI INNOCENT",
"AYUGI BRENDA",
"OGUMA TONNY",
"OKELLO RICHARD",
"ODONGO GEORGE",
"OKOL PETER", 
"ODONGO PETER",
"OWANI SAMUEL",
"OKELLO JOHN",
"OWUNI BOSCO",
"OKELLO TONNY",
"AKAN FRANCIS",
"ENYEL TOBBY",
"OPIO JAMES",
"OPIO PETER",
"OPIO JOSHUA",
"CURU PATRICT",
"ACEN ALICE",
"JONGA PAUL",
"OKECH BONIFACE",
"OMARA THOMAS" ,
"ALOL ALEX",
"ODONGO AMOS",
"AKULU GRACE",
"OJUKASOLOMON",
"ONGERA JOHN",
"EPONGU JOHN PAUL",
"OTIM ALBERT",
"AKON VASPUCA",
"AGETA DENISH",
"OJUKA SOLOMON",
"AKOPE LUCY",
"OKELLO BENEDICK",
"OCEN JOE ANTHONY",
"ANYUK GEORGE" ,
"ACOBI MOSES",
"ACOBI MOSES",
"ONGORA GEOFFREY",
"AKELLO GRACE",
"AYUGI JUSPHIN",
"OGWANG BONNY",
"AWICI DAVID",
"OKELLO JIMMY", 
"KERE GEOFFREY",
"AMONG GRACE",
"KICARWOT DENIS", 
"EMOL ALEX", 
"ODONGO AMBROSE",
"AKOPE LUCY",
"OMARA CALVIN DECON",
"OKELLO JOEL",
"OKULLO CEASEAR",
"Byensi Elias",
"Twinomukama Silveri",
"Bigombe Katuga",
"Mugisha Edson",
"Kwatamazima valentine",
"Tukahirwa Lehema",
"Annet Bejuura",
"Kyohairwe Rosw",
"Annet Bandihihi",
"Faibi Ndyarugayo",
"Jenifer Bamunoba",
"Mubaiha David",
"Nuriat Mutembeya",
"Kyarikunda Justine",
"Nkurunungu Asaph",
"Mugimbaho Elisa",
"Kangire Adrine",
"Asiimwe Edgar",
"Tugineyo Kellen",
"Byaruhanga Lodoviko",
"Namanya Nelson",
"Barigye Yosam",
"Asiimwe johnbosco",
"bamburiza Longino",
"Polina Elijah",
"Basingwire fred",
"Tinamasiko Jolly",
"Kamukama Patrick",
"Twesigye Sabastiano",
"Byakurama Donati",
"Bejuura Adams",
"Twemigye Benon",
"Rugabariho Elian",
"Kyogabirwe midred",
"Mucunguzi clear",
"Niwagaba pamela",
"Mwesigwa Herbert",
"Mugabirwe Marion",
"Niwagaba Kenneth",
"Atuheire vicent",
"Kwikiriza Mercy",
"Muhike  Good",
"Kagubwa Johnbosco",
"Twongirwe flavia",
"Mutabazi job",
"Kamuntu joel",
"Agaba Nicholas",
"Valentino Fastino Amule",
"Alex Pitia",
"Lino Yata",
"Aba Ruth",
"Kaliff",
"Dranzoa Agness",
"Abio Jackline",
"Nyadru William",
"Onzima Edward",
"Walea  Beatrice",
"Adriko Esborn",
"Asigaci Moses",
"Drabuga William",
"Ulego Albert Vuciri", 
"Amacha Gilbert",
"Denya Ronald",
"AFSA GIFT",
"Opon Francis",
"Florence Nazema",
"Yahia Wani", 
"Susan",
"Dralobu Akuti Pascal",
"Mawadri Thomas",
"Dalnga Alex",
"Robert okello",
"Olaa Vicent",
"Oloya Francis",
"Akello Nancy",
"Atim Sharon",
"Apio Anna Grace",
"Awira Ezekiel",
"Okori Willy",
"Awio Jasper",
"Aporo Denis",
"Ogaba Nasenori",
"Abura Innocent",
"Okello Baptist",
"Akedo Richard",
"Ocan Patrick",
"Abalo Monica",
"Okeny Samuel",
"Okidi Bazil",
"Odur Geoffrey",
"Acen Stella",
"Onach Andrew",
"Ochwa Patrick",
"Okal Geoffrey",
"Alum Eunice",
"Abade Edward",
"Okello Thomas",
"Apio Catherine",
"Alioni Patrick",
"Candia Christopher",
"Azama Walter",
"Aliku Alfred",
"Ayoma Fedrick",
"Amaguru Florence",
"Dranimva Patrick",
"Acema Pascal",
"Amule Grace",
"Akello Jennet",
"Onek David",
"Ongala James",
"Lokwiya Thomas",
"Onyam Sam",
"Okello Eric",
"Olum Fred",
"Ogwang Tonny",
"Opio Moses",
"Abitimo Samorati",
"Omony Ronald",
"Aciro Betty",
"Akango Pamela",
"Auma Mercy Winny",
"Joan",
"Opiyo Denis",
"Nockrach Kassim",
"Olanya Stephen",
"Okullo David" ,
"Andama Richard",
"Dramadri Richard",
"Ojok Charles"
];

tasks=[
"land_preparation","planting","weeding","harvesting","threshing","spraying", "prunning","transport","others"
];

assistances=[
"children","relative","husband","wife","neighbour","other","no_body"
]
crops= [
  "maize","beans","sesame","soyabeans","rice","millet","sorghum","irish_potatoes","cotton","sweet_potatoes","sunflower","ground_nuts" ,"coffee","banana","cassava","none","others"
];

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
]

farmMachinery=[
"Farm structure (storagefacility)" ,
"oxyplough ",
"knapsack sprayer",
"other smaller implements (hoes, rakes)"
];

last_season=[
"maize","beans","sesame","soyabeans","rice","millet","sorghum","irish_potatoes","cotton","sweet_potatoes","sunflower","ground_nuts","coffee","banana","cassava","others"
];

livestocks=[
  "none","cattle","goat","sheep","chicken","pigs","donkey","others"
  ]

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:5000,
    });
    toast.present();
  }


//adding sqlite offline data to the end point.
async SubmitOfflineData(id: number, consent:boolean, farmers_name:string, do_you_have_disability:string,disability_type:string){
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait as we upload your offline data',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'submit',
          id: id, 
          consent:consent, 
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
                          this.consent =false;
                          this.farmers_name ="";
                          this.do_you_have_disability ="";
                          this.disability_type ="";
                          //this.currentImage="";

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
async SubmitData(){
  /*
  if(this.farmers_name==""){
      this.presentToast('Farmer name is required');
  }else if(this.do_you_have_disability==""){
    this.presentToast('Specify whether you are disabled or not.');

  }else if(this.own_a_mobile_phone==""){
    this.presentToast('Specify whether you own a mobile phone or not');
  }
  else if(this.nin==""){
    this.presentToast('You need to enter you National ID number');
  }
  else if(this.ID_photo_url==""){
    this.presentToast('You are require to take a picture of the National ID');
  }
  else if(this.Photo_url==""){
    this.presentToast('Please capture the farmers photo');
  }
  else if(this.occupation==""){
    this.presentToast('Please specify the occupation');
  }
  
  else if(this.Martial_status==""){
    this.presentToast('Please specify the Marital status');
  }
  else if(this.What_is_your_gender==""){
    this.presentToast('You have not specified the gender');
  }
  
  else if(this.status_in_a_family==""){
    this.presentToast('Specify the status in the family');
  }
  
  else if(this.next_of_kin==""){
    this.presentToast('Specify the next of kin');
  }
  else if(this. next_of_kin_has_contact==""){
    this.presentToast('You didnt specify whether the next of kin has a telephone contact or not');
  } 
  else if(this.region==""){
    this.presentToast('Please specify the region');
  }
  else if(this.distr==""){
    this.presentToast('Please specify the district');
  }
  else if(this.subcounty==""){
    this.presentToast('Please specify the subcounty');
  }
  else if(this.soiltype==""){
    this.presentToast('Choose the soil type');
  }
  
  else if(this.parish==""){
    this.presentToast('Specify the Parish');
  }
  else if(this.village==""){
    this.presentToast('Specify the Village');
  }
  else if(this.nearest_town==""){
    this.presentToast('Specify the nearest town from here');
  }
  else if(this.Local_council1_name==""){
    this.presentToast('Specify the LC1 chairman');
  }
  
  else if(this.resident_since==""){
    this.presentToast('Specify since when have been a resident of this place');
  }
  
  else if(this.Description_of_location==""){
    this.presentToast('Specify the Description of location');
  }
  else if(this.DOB==""){
    this.presentToast('Specify the Date of Birth');
  }
  else if(this.level_of_education==""){
    this.presentToast('Specify your highest level of education');
  }
 
  else if(this.head_of_the_household==""){
    this.presentToast('Specify if your the head of household');
  }
  
  else if(this.lo==""){
    this.presentToast('Click the Get Location button to get the coordinates');
  }
  else if(this.la==""){
    this.presentToast('Click the Get Location button to get the coordinates');
  }
  
  else if(this.Mobile_literacy==""){
    this.presentToast('Specify how well can you use a phone');
  }
  else if(this.any_dependants==""){
    this.presentToast('Specify whether you have the dependants or not');
  }
  
  else if(this.farmer_org==""){
    this.presentToast('Specify if you are a member of CASA partners?');
  }
  else if(this.belong_farmergp==""){
    this.presentToast('Specify if you belong to any farmer group.');
  }
  
  else if(this.Your_position_in_the_fo==""){
    this.presentToast('Specify the position you hold in the farmer organization.');
  }
  else if(this.male_members_in_FO==""){
    this.presentToast('Specify the number of Male members in the Farmer Organization');
  }
  else if(this.female_members_in_FO==""){
    this.presentToast('Specify the number of Female members in the Farmer Organization');
  }
 
  else if(this.Affiliation==""){
    this.presentToast('Specify if the farmer group is connected to membership association');
  }
  
  else if(this.main_income_source==""){
    this.presentToast('Specify the main source of income');
  }
  
  else if(this.mainincome_since==""){
    this.presentToast('Specify Since when have you been involved in the main source of income');
  }
  
  else if(this.sector==""){
    this.presentToast('Specify your main sector');
  }
  
  else if(this.main_income_relaibility==""){
    this.presentToast('Specify how reliable is your main income source');
  }
  else if(this.main_income_amount==""){
    this.presentToast('Please fill in, How much do you get from your main source of income');
  }
  
  else if(this.annual_income==""){
    this.presentToast('Please fill in, What is your total annual income?');
  }
  
  else if(this.other_income_sources==""){
    this.presentToast('Please fill in, Do you have any other sources of income');
  }
  
  else if(this.income_trend==""){
    this.presentToast('Please fill in, How has your income been over the past 3 years');
  }
  
  else if(this.access_to_Health_services==""){
    this.presentToast('Please fill in, Do you have access to Health services ?');
  }
  
  else if(this.school_going_children==""){
    this.presentToast('Please fill in, Do you have any school going children?');
  }
  
  else if(this.postharvest_mgt==""){
    this.presentToast('Please fill in, Where do you mainly dry your {{Main_crop_enterprise}}');
  }
  else if(this.fo==""){
    this.presentToast('Please re-login again to continue');
  }
  
  else if(this.produce_storage==""){
    this.presentToast('Please fill in, Where do you mainly store your harvest ?');
  }
  else if(this.preservation==""){
    this.presentToast('Please fill in, How do you preserve your harvest');
  }
  
  else if(this.crops_for_new_season==""){
    this.presentToast('What other crops do you intend to produce or  are under production this season');
  }
  
  else if(this.number_of_employees==""){
    this.presentToast('since How many employees do you have on your  farm');
  }
  
  else if(this.livestock==[]){
    this.presentToast('Do you keep any livestock?');
  }
  
  else if(this.specify_livestock==""){
    this.presentToast('specify other livestock kept also indicate number');
  }

  else if(this.cattle_number==null){
    this.presentToast('Please respond to question,Number of Cattle');
  }
  else if(this.goat_number==null){
    this.presentToast('Please respond to question, Number of Goats');
  }
  else if(this.sheep_number==null){
    this.presentToast('Please respond to question,Number of Sheep');
  }
  
  else if(this.chicken_number==null){
    this.presentToast('Please respond to question, Number of Chicken');
  }
  else if(this.pigs_number==null){
    this.presentToast('Please respond to question, Number of Pigs');
  }
  else if(this.donkey_number==null){
    this.presentToast('Please respond to question, Number of Donkeys');
  }
  
  else if(this.Did_you_plant_last_season==""){
    this.presentToast('Please respond to question, Did you plant last season?');
  }
  else if(this.crops_grown_last_season==[]){
    this.presentToast('Please respond to question, What crops did you grow last season');
  }
 
  
  
  else if(this.crops_stored_from_last_season ==""){
    this.presentToast('Please respond to question, Of the crops grown last season,did you store any?');
  }
  else if(this.use_pesticides_or_herbicides ==""){
    this.presentToast('Please respond to question, Did you use any pesticides and herbicides?');
  }
  
  else if(this.Did_you_apply_fertilizer ==""){
    this.presentToast('Please respond to question, Did you apply fertilizer?');
  }
  else if(this.crop_use ==""){
    this.presentToast('Please respond to question, Is your crop for commercial or subsistance purposes?');
  }
  
  else if(this.involved_in_marketing ==""){
    this.presentToast('Please respond to question, Are you involved in bulking and collective marketing');
  }
  
  else if(this.Marketlink ==""){
    this.presentToast('Please respond to question, How does your produce reach'+ this.name_of_farmer_org);
  }
  
  else if(this.agent_name ==""){
    this.presentToast('Please respond to question, Provide the name of the agent that collects/buys produce from yo'+ this.name_of_farmer_org);
  }
  
  else if(this.produce_transport ==""){
    this.presentToast('Please respond to question, By what means do you mainly deliver you produce to the market');
  }
  
  else if(this.Who_assisted_you ==[]){
    this.presentToast('Please respond to question, Who assisted you?');
  }
  
    else if(this.Are_you_aware_of_climate_shock ==""){
    this.presentToast('Please respond to question, Are you aware of climate shocks.');
  }
  
   else if(this.training_on_addressing_climate ==""){
    this.presentToast('Please respond to question, Have you ever received any training on addressing climate shocks in your farming business?');
  }
  
  else if(this.Which_crops_for_rotation ==""){
    this.presentToast('Please respond to question, Which crops do you consider for rotaton');
  }
  
    else if(this.knoledge_of_rain_date ==""){
    this.presentToast('Please respond to question, How important is it to know when it will rain 3 days ahead of time?');
  }
  
  else if(this.heard_of_agri_insurance ==""){
    this.presentToast('Please respond to question, Have you ever heard of agri insurance?');
  }
  
  else if(this.access_to_agri_insurance ==""){
    this.presentToast('Please respond to question, Do you have access to agri insurance');
  }
  
  else if(this.fair_charge_for_insurance ==""){
    this.presentToast('Please respond to question, How much do you think is fair (UGX) to protect your financial losses as a result of extreme weather?');
  }
  
  else if(this.prefer_ordinary_or_az_bunlde ==""){
    this.presentToast('Please respond to question, Would you prefer az bundle to other ordinary insurance');
  }
  
  else if(this.challenges_last_season ==[]){
    this.presentToast('Please respond to question, What are some of the challenges that you faced last season?');
  }
  
    else if(this.What_type_of_pests ==""){
    this.presentToast('Please respond to question, What type of pests');
    }
    else if(this.type_of_weather_and_effect ==""){
    this.presentToast('Please respond to question, What type of weather and effect on the crop?');
    }
    
    else if(this.Do_you_have_a_bank_account ==""){
    this.presentToast('Please respond to question, Do you have a bank account?');
    }
    
    else if(this.financial_access ==""){
    this.presentToast('Please respond to question, Which type of financial services do you have access to?');
    }
    
    else if(this.transaction_monthly_costs ==""){
    this.presentToast('Please respond to question, What are your monthly costs for carrying out financial transactions?');
    }
    
     else if(this.travel_distance ==""){
    this.presentToast('Please respond to question, How far do you travel to make a financial transaction');
    }

    else if(this.Have_you_ever_received_credit ==""){
    this.presentToast('Please respond to question, Have you ever received loan from a bank?');
    }
    
    else if(this.How_do_you_keep_your_money ==[]){
    this.presentToast('Please respond to question: How do you keep your money');
    }
    
    else if(this.financial_transaction_challeng ==[]){
    this.presentToast('Please respond to question: What challenges have you faced when making financial transactions?');
    }
   
   else if(this.action_access_to_financial_svc ==""){
    this.presentToast('Please respond to question: Give a view on some of the solutions to your challenge');
    }
    
    else if(this.access_to_agric_ext_services ==""){
    this.presentToast('Please respond to question: Do you have access to training/ services from CASApartner?');
    }
    
    else if(this.How_do_you_access_Agric_ext_sv ==[]){
    this.presentToast('Please respond to question: How do you access Agricultural extension services?');
    }

    else if(this.extension_type_channel_receive ==[]){
    this.presentToast('Please respond to question: What training/services have you received from CASA parters');
    }

    else if(this.adopted_practices ==[]){
    this.presentToast('Please respond to question: Which practices have you adopted');

    }

    else if(this.Rate_services_training ==""){
    this.presentToast('Please respond to question: Rate the quality of services/training provided to you');
    }
    
    else if(this.frequently_access_ext_svcs ==""){
    this.presentToast('Please respond to question: Is the information provided accurate?');
    }
    
    else if(this.is_information_provided_accurt ==""){
    this.presentToast('Please respond to question: Rate the quality of services/training provided to you');
    }

    else if(this.trainingappropriate ==""){
    this.presentToast('Please respond to question: Was the training appropirate?');
    }
    
    else if(this.benefits_of_practices ==""){
    this.presentToast('Please respond to question: Of practices you have adopted from the training, whats the main benefit you have achieved');
    }
    
    else if(this.pay_anything_to_access_ext_svc ==""){
    this.presentToast('Please respond to question: Do you pay anything to access the extension services?');
    }
    
    else if(this.training ==[]){
      this.presentToast('Please respond to question: Which other training and services would you require');
      }
      
      else if(this.pay_per_season ==""){
        this.presentToast('Please respond to question: How much do you pay per season?');
      }
      else if(this.pest_fertilizer_pesticide_info ==[]){
        this.presentToast('Please respond to question: How did you access information for seed, fertilizer & pesticides in the last 3 months');
      }
      else if(this.Do_you_receive_weather_data ==""){
        this.presentToast('Please respond to question: Do you receive weather information?');
      }
      
      else if(this.access_to_weather_data ==[]){
        this.presentToast('Please respond to question: How accurate is the information?');
      }
      
      else if(this.most_harmful_info ==""){
        this.presentToast('Please respond to question:Which information is most harmful to your farming decision?');
      }
      
      else if(this.biggest_prob_in_data_access ==""){
        this.presentToast('Please respond to question:What has been the biggest constraint in accessing information on weather data in the last 3 months?');
      }
            
      else if(this.spend_on_your_phone_monthly ==""){
        this.presentToast('Please respond to question:How much do you spend on your phone per month?');
      }
      else if(this.main_phone_use ==[]){
        this.presentToast('Please respond to question:What did you mainly use your phone for in the last 3 months');
      }
      
      else if(this.subscribed_to_info_svces_on_ph ==""){
        this.presentToast('Please respond to question:Are you subscribed to information services through your mobile phone?');
      }
      
      else if(this.training_on_using_phone_servic ==""){
        this.presentToast('Please respond to question:Have you received any training on using mobile products/services in the last 3 months');
      }
      
      else if(this.training_on_weather_alerts ==""){
        this.presentToast('Please respond to question:Have you received any training on weather alerts.');
      }
      
      
      else if(this.How_accurate_is_the_info ==""){
        this.presentToast('Please respond to question:How accurate is the information?');
      }
      
      else if(this.trainig_on_insurance ==""){
        this.presentToast('Please respond to question:Have you received any training on insurance?');
      }
      
      else if(this.probs_of_using_cellphone ==[]){
        this.presentToast('Please respond to question:What are some of the constraints faced in using your cellphone');
      }

    else{
      */
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
          lo:this.lo,

          Mobile_literacy:this.Mobile_literacy,
          any_dependants:this.any_dependants,
          dependant_no:this.dependant_no,
          dependants_age_bracket:this.dependants_age_bracket,
          //Casa Data 
          farmer_org:this.farmer_org,
          name_of_farmer_org:this.name_of_farmer_org,
          name_farmergp:this.name_farmergp,
          belong_farmergp:this.belong_farmergp,
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
          other_income_activity:this.other_income_activity,
          years_of_experince:this.years_of_experince,
          other_income_reliability:this.other_income_reliability,
          amount:this.amount,
          income_trend:this.income_trend,
          access_to_Health_services:this.access_to_Health_services,
          health_expense:this.health_expense,
          school_going_children:this.school_going_children,
          no_of_school_going_children:this.no_of_school_going_children,
          school_fees_expense:this.school_fees_expense,
          //expenditure
          //disposable_income
          what_is_the_land_tenor:this.what_is_the_land_tenor,
          Specify_other:this.Specify_other,
          value_of_land:this.value_of_land,
          own_any_farm_machinery:this.own_any_farm_machinery,
          house_ownership:this.house_ownership,
          house_structure:this.house_structure,
          Farm_size:this.Farm_size,
          total_land_size:this.total_land_size,
          Main_crop_enterprise:this.Main_crop_enterprise,
          yield_expected_main_enterprise:this.yield_expected_main_enterprise,
          farm_at_residence:this.farm_at_residence,
          //Gps
          postharvest_mgt:this.postharvest_mgt,
          produce_storage:this.produce_storage,
          preservation:this.preservation,
          crops_for_new_season:this.crops_for_new_season,
          
          number_of_employees:this.number_of_employees,
          landsize_cropselected:this.landsize_cropselected,

          livestock:this.livestock,
          specify_livestock:this.specify_livestock,
          cattle_number:this.cattle_number,
          goat_number:this.goat_number,
          sheep_number:this.sheep_number,
          chicken_number:this.chicken_number,
          pigs_number:this.pigs_number,
          donkey_number:this.donkey_number,
          Did_you_plant_last_season:this.Did_you_plant_last_season,
          crops_grown_last_season:this.crops_grown_last_season,
          Specify_other_crops_grown:this.Specify_other_crops_grown,

          in_business_since:this.in_business_since,
          yield_per_acre:this.yield_per_acre,

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
//More
         Did_you_apply_fertilizer:this.Did_you_apply_fertilizer,
         Specify_the_type:this.Specify_the_type,
         organic_specify:this.organic_specify,
         Specify_other_organic:this.Specify_other_organic,
         inorganic_Specify:this.inorganic_Specify,

         use_pesticides_or_herbicides:this.use_pesticides_or_herbicides,
         Please_specify_which_one:this.Please_specify_which_one,
         pesticide_effectiveness:this.pesticide_effectiveness,
         crop_use:this.crop_use,

         involved_in_marketing:this.involved_in_marketing,
sell_of_produce_Nyakyera:this.sell_of_produce_Nyakyera,
sell_of_produce_green:this.sell_of_produce_green,
sell_of_produce_equator:this.sell_of_produce_equator,
sell_of_produce_liraresort:this.sell_of_produce_liraresort,
sell_of_produce_cedo:this.sell_of_produce_cedo,
sell_of_produce_orum:this.sell_of_produce_orum,
Marketlink:this.Marketlink,
agent_name:this.agent_name,
produce_transport:this.produce_transport,
employ_any_farm_labour:this.employ_any_farm_labour,
Specify_their_task:this.Specify_their_task,
Who_assisted_you:this.Who_assisted_you,
How_much_did_you_pay_them:this.How_much_did_you_pay_them,
Are_you_aware_of_climate_shock:this.Are_you_aware_of_climate_shock,
which_ones_you_are_aware_of:this.which_ones_you_are_aware_of,
training_on_addressing_climate:this.training_on_addressing_climate,
Please_specify:this.Please_specify,
Which_crops_for_rotation:this.Which_crops_for_rotation,

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
adopted_practices:this.adopted_practices,
most_mostadoptedpractice:this.most_mostadoptedpractice,
Rate_services_training:this.Rate_services_training,
frequently_access_ext_svcs:this.frequently_access_ext_svcs,
is_information_provided_accurt:this.is_information_provided_accurt,
trainingappropriate:this.trainingappropriate,
benefits_of_practices:this.benefits_of_practices,
pay_anything_to_access_ext_svc:this.pay_anything_to_access_ext_svc,
training:this.training, 
pay_per_season:this.pay_per_season,
pest_fertilizer_pesticide_info:this.pest_fertilizer_pesticide_info,
Do_you_receive_weather_data:this.Do_you_receive_weather_data,
access_to_weather_data:this.access_to_weather_data,
How_accurate_is_the_info:this.How_accurate_is_the_info,
most_harmful_info:this.most_harmful_info,
biggest_prob_in_data_access:this.biggest_prob_in_data_access,
spend_on_your_phone_monthly:this.spend_on_your_phone_monthly,
main_phone_use:this.main_phone_use,


subscribed_to_info_svces_on_ph:this.subscribed_to_info_svces_on_ph,
services_suscribed_to: this.services_suscribed_to,
training_on_using_phone_servic:this.training_on_using_phone_servic,
training_on_weather_alerts:this.training_on_weather_alerts,
Who_provided_the_training_on_weather_alerts:this.Who_provided_the_training_on_weather_alerts,
trainig_on_insurance:this.trainig_on_insurance,
Who_provided_the_training_on_insurance:this.Who_provided_the_training_on_insurance,
probs_of_using_cellphone:this.probs_of_using_cellphone,
field_officer:this.fo


        }
          this.accsPrvds.postData(body, 'process2.php').subscribe((res:any)=> {
                      if(res.success==true){
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                          this.router.navigate(['/beneficiary']);
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
          this.lo="";

          this.Mobile_literacy="";
          this.any_dependants="";
          this.dependant_no="";
          this.dependants_age_bracket=[];
          //Casa Data 
          this.farmer_org="";
          this.name_of_farmer_org="";
          this.name_farmergp="";
          this.belong_farmergp="";
          this.position_in_FO="";
          this.Your_position_in_the_fo="";
          this.male_members_in_FO="";
          this.female_members_in_FO="";
          this.Affiliation="";
          this.Name_of_connected_ACE_or_DFA="";
          this.main_income_source="";

          this.mainincome_since="";
          this.sector="";
          this.main_income_relaibility="";
          this.main_income_amount="";
          this.other_income_reliability="";
          this.amount=null;
          this.income_trend="";
          this.access_to_Health_services="";
          this.health_expense="";
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
          this.Main_crop_enterprise;
          this.yield_expected_main_enterprise,
          this.farm_at_residence="";
          //Gps
          this.postharvest_mgt="";
          this.produce_storage="";
          this.preservation="";
          this.crops_for_new_season="",
          
          this.number_of_employees="";
          this.landsize_cropselected="";

          this.livestock=[];
          this.specify_livestock="";
          this.cattle_number=null;
          this.goat_number=null;
          this.sheep_number=null;
          this.chicken_number=null;
          this.pigs_number=null;
          this.donkey_number=null;
          this.Did_you_plant_last_season="";
          this.crops_grown_last_season=[];
          this.Specify_other_crops_grown="";

          this.in_business_since="";
          this.yield_per_acre=null;

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
//More
         this.Did_you_apply_fertilizer=null;
         this.Specify_the_type=null;
         this.organic_specify=null;
         this.Specify_other_organic=null;
         this.inorganic_Specify=null;

         this.use_pesticides_or_herbicides="";
         this.Please_specify_which_one="";
         this.pesticide_effectiveness="";
         this.crop_use="";

         this.involved_in_marketing="";
this.sell_of_produce_Nyakyera="";
this.sell_of_produce_green="";
this.sell_of_produce_equator="";
this.sell_of_produce_liraresort="";
this.sell_of_produce_cedo="";
this.sell_of_produce_orum="";
this.Marketlink="";
this.agent_name="";
this.produce_transport="";
this.employ_any_farm_labour="";
this.Specify_their_task=[];
this.Who_assisted_you=[];
this.How_much_did_you_pay_them=null;
this.Are_you_aware_of_climate_shock="";
this.which_ones_you_are_aware_of="";
this.training_on_addressing_climate="";
this.Please_specify=[];
this.Which_crops_for_rotation="";

this.knoledge_of_rain_date="";
this.heard_of_agri_insurance="";
this.access_to_agri_insurance="";
this.Please_specify_the_agri_insurance_type="";
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
this.adopted_practices=[];
this.most_mostadoptedpractice="";
this.Rate_services_training="";
this.frequently_access_ext_svcs="";
this.is_information_provided_accurt="";
this.trainingappropriate="";
this.benefits_of_practices="";
this.pay_anything_to_access_ext_svc="";
this.training=[];
this.pay_per_season="";
this.pest_fertilizer_pesticide_info=[];
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
this.trainig_on_insurance="";
this.Who_provided_the_training_on_insurance="";
this.probs_of_using_cellphone=[];
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

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Save and submit when online',
          handler: () => {
            this.addDetails(this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,
              this.own_a_mobile_phone,
          this.What_type_of_phone_do_you_own,
          this.No_of_contacts,
          this.tel_no1,
          this.tel_No_2,
           this.service_provider,
          this.Specify_svc_provider,
          this.mm_reg_status,
           this.registered_mm_number,
          this.nin,
          this.Photo_url,
          this.ID_photo_url,

          this.occupation,
           this.specify_other_occupation,
          this.Martial_status,
          this.What_is_your_gender,
          this.name_of_husband,
          this.number_of_wives_husbands,
          this.name_first_wife,
          this.name_second_wife,
          this.status_in_a_family,
          this.next_of_kin,
          this.next_of_kin_has_contact,
          this.next_of_kin_phone_no,
          this.region,
          this.distr,
          this.other_district,
          this.subcounty,
          this.other_subcounty,
          this.subcounty_other_district,
          this.soiltype,
          this.parish,
          this.village,
          this.nearest_town,
          this.Local_council1_name,
          this.resident_since,
          this.Description_of_location,
          this.DOB,
          this.level_of_education,
          this.head_of_the_household,
          this.lo,

          this.Mobile_literacy,
          this.any_dependants,
          this.dependant_no,
          this.dependants_age_bracket,
          
          this.farmer_org,
          this.name_of_farmer_org,
          this.name_farmergp,
          this.belong_farmergp,
          this.position_in_FO,
          this.Your_position_in_the_fo,
          this.male_members_in_FO,
          this.female_members_in_FO,
          this.Affiliation,
          this.Name_of_connected_ACE_or_DFA,
          this.main_income_source,

          this.mainincome_since,
          this.sector,
          this.main_income_relaibility,
          this.main_income_amount,
          this.annual_income,
          this.other_income_sources,
          this.other_income_activity,
          this.years_of_experince,
          this.other_income_reliability,
          this.amount,
          this.income_trend,
          this.access_to_Health_services,
          this.health_expense,
          this.school_going_children,
          this.no_of_school_going_children,
          this.school_fees_expense,
          //expenditure
          //disposable_income
          this.what_is_the_land_tenor,
          this.Specify_other,
          this.value_of_land,
          this.own_any_farm_machinery,
          this.house_ownership,
          this.house_structure,
          this.Farm_size,
          this.total_land_size,
          this.Main_crop_enterprise,
          this.yield_expected_main_enterprise,
          this.farm_at_residence,
          
          this.postharvest_mgt,
          this.produce_storage,
          this.preservation,
          this.crops_for_new_season,
          
          this.number_of_employees,
          this.landsize_cropselected,

          this.livestock,
          this.specify_livestock,
          this.cattle_number,
          this.goat_number,
          this.sheep_number,
          this.chicken_number,
          this.pigs_number,
          this.donkey_number,
          this.Did_you_plant_last_season,
          this.crops_grown_last_season,
          this.Specify_other_crops_grown,

          this.in_business_since,
          this.yield_per_acre,

          this.yield_of_maize_with_adequate_rain_per_acre,
          this.yield_of_beans_with_adequate_rain_per_acre,
          this.yield_of_sesame_with_adequate_rain_per_acre,
          this.yield_of_soyabean_with_adequate_rain_per_acre,
          this.yield_of_rice_with_adequate_rain_per_acre,
          this.yield_of_millet_with_adequate_rain_per_acre,
          this.yield_of_sorghum_with_adequate_rain_per_acre,
          this.yield_of_irish_potatoes_with_adequate_rain_per_acre,
          this.yield_of_cotton_with_adequate_rain_per_acre,
          this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,
          this.yield_of_sunflower_with_adequate_rain_per_acre,
          this.yield_of_groundnuts_with_adequate_rain_per_acre,
          this.yield_of_coffee_with_adequate_rain_per_acre,
          this.yield_of_banana_with_adequate_rain_per_acre,
          this.yield_of_cassava_with_adequate_rain_per_acre,
          this.crops_stored_from_last_season,
          this.disturbances_in_storage,
          this.storage_time,
          this.Specify_others,

         this.maize_per_kg,
         this.beans_per_kg ,
         this.sesame_per_kg,
         this.soyabean_per_kg,
         this.rice_per_kg,
         this.millet_per_kg,
         this.sorghum_per_kg,
         this.irish_potatoes_per_kg,
         this.cotton_per_kg,
         this.sweet_potatoes_per_kg,
         this.sunflower_per_kg,
         this.ground_nuts_per_kg,
         this.coffee_per_kg,
         this.Banana_per_bunch,
         this.cassava_per_kg,
//More
         this.Did_you_apply_fertilizer,
         this.Specify_the_type,
         this.organic_specify,
         this.Specify_other_organic,
         this.inorganic_Specify,

         this.use_pesticides_or_herbicides,
         this.Please_specify_which_one,
         this.pesticide_effectiveness,
         this.crop_use,

         this.involved_in_marketing,
this.sell_of_produce_Nyakyera,
this.sell_of_produce_green,
this.sell_of_produce_equator,
this.sell_of_produce_liraresort,
this.sell_of_produce_cedo,
this.sell_of_produce_orum,
this.Marketlink,
this.agent_name,
this.produce_transport,
this.employ_any_farm_labour,
this.Specify_their_task,
this.Who_assisted_you,
this.How_much_did_you_pay_them,
this.Are_you_aware_of_climate_shock,
this.which_ones_you_are_aware_of,
this.training_on_addressing_climate,
this.Please_specify,
this.Which_crops_for_rotation,

this.knoledge_of_rain_date,
this.heard_of_agri_insurance,
this.access_to_agri_insurance,
this.Please_specify_the_agri_insurance_type,
this.Specify_the_insurance_provider,
this.fair_charge_for_insurance,
this.prefer_ordinary_or_az_bunlde,
this.challenges_last_season,
this.Specify,
this.What_type_of_pests,
this.type_of_weather_and_effect,
this.Do_you_have_a_bank_account,
this.financial_access,
this.transaction_monthly_costs,
this.Specify_other_monthly_transaction_costs,
this.travel_distance,
this.specify_other_travel_distance,
this.Have_you_ever_received_credit,
this.no_of_times_borrowed,
this.loanoutstanding,
this.How_much_repayment_was_made_per_month,
this.delay_time_for_repayment,
this.How_do_you_keep_your_money,
this.financial_transaction_challeng,
this.Specify_Other_financial_transaction_challeng,
this.action_access_to_financial_svc,
this.access_to_agric_ext_services,
this.How_do_you_access_Agric_ext_sv,
this.extension_type_channel_receive,
this.adopted_practices,
this.most_mostadoptedpractice,
this.Rate_services_training,
this.frequently_access_ext_svcs,
this.is_information_provided_accurt,
this.trainingappropriate,
this.benefits_of_practices,
this.pay_anything_to_access_ext_svc,
this.training, 
this.pay_per_season,
this.pest_fertilizer_pesticide_info,
this.Do_you_receive_weather_data,
this.access_to_weather_data,
this.How_accurate_is_the_info,
this.most_harmful_info,
this.biggest_prob_in_data_access,
this.spend_on_your_phone_monthly,
this.main_phone_use,
this.subscribed_to_info_svces_on_ph,
 this.services_suscribed_to,
this.training_on_using_phone_servic,
this.training_on_weather_alerts,
this.Who_provided_the_training_on_weather_alerts,
this.trainig_on_insurance,
this.Who_provided_the_training_on_insurance,
this.probs_of_using_cellphone,
this.fo);
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

  async AlertforOfflineSubmission(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
         {
          text: 'Try Again',
          handler: () => {
            this.SubmitOfflineData(this.id,this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type);
            
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
