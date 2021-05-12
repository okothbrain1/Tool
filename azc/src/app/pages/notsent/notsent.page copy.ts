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

  id: number;
  fo: string="";
  disabledButton;

  
  consent:boolean=false;
  farmers_name:string="";
  do_you_have_disability:string="";
  disability_type:string="";
//More columns to be added.
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
  async SubmitOfflineData(id: number, consent: boolean, farmers_name:string, do_you_have_disability:string,disability_type:string,
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
field_officer:string){
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
disability_type:disability_type,
own_a_mobile_phone:own_a_mobile_phone,
What_type_of_phone_do_you_own:What_type_of_phone_do_you_own,
No_of_contacts: No_of_contacts,
tel_no1:tel_no1,
tel_No_2:tel_No_2,
service_provider: service_provider,
Specify_svc_provider:Specify_svc_provider,
mm_reg_status:mm_reg_status,
registered_mm_number: registered_mm_number,
nin:nin,
Photo_url:Photo_url,
ID_photo_url:ID_photo_url,

occupation:occupation,
specify_other_occupation: specify_other_occupation,
Martial_status:Martial_status,
What_is_your_gender:What_is_your_gender,
name_of_husband:name_of_husband,
number_of_wives_husbands:number_of_wives_husbands,
name_first_wife:name_first_wife,
name_second_wife:name_second_wife,
status_in_a_family:status_in_a_family,
next_of_kin:next_of_kin,
next_of_kin_has_contact:next_of_kin_has_contact,
next_of_kin_phone_no: next_of_kin_phone_no,
region:region,
distr:distr,
other_district:other_district,
subcounty:subcounty,
other_subcounty:other_subcounty,
subcounty_other_district:subcounty_other_district,
soiltype:soiltype,
parish: parish,
village:village,
nearest_town:nearest_town,
Local_council1_name:Local_council1_name,
resident_since:resident_since,
Description_of_location:Description_of_location,
DOB:DOB,
level_of_education:level_of_education,
head_of_the_household:head_of_the_household,
lo:lo,

Mobile_literacy:Mobile_literacy,
any_dependants:any_dependants,
dependant_no:dependant_no,
dependants_age_bracket:dependants_age_bracket,
//Casa Data 
farmer_org:farmer_org,
name_of_farmer_org:name_of_farmer_org,
name_farmergp:name_farmergp,
belong_farmergp:belong_farmergp,
position_in_FO:position_in_FO,
Your_position_in_the_fo:Your_position_in_the_fo,
male_members_in_FO:male_members_in_FO,
female_members_in_FO:female_members_in_FO,
Affiliation:Affiliation,
Name_of_connected_ACE_or_DFA:Name_of_connected_ACE_or_DFA,
main_income_source:main_income_source,

mainincome_since:mainincome_since,
sector:sector,
main_income_relaibility:main_income_relaibility,
main_income_amount:main_income_amount,
annual_income:annual_income,
other_income_sources:other_income_sources,
other_income_activity:other_income_activity,
years_of_experince:years_of_experince,
other_income_reliability:other_income_reliability,
amount:amount,
income_trend:income_trend,
access_to_Health_services:access_to_Health_services,
health_expense:health_expense,
school_going_children:school_going_children,
no_of_school_going_children:no_of_school_going_children,
school_fees_expense:school_fees_expense,
//expenditure
//disposable_income
what_is_the_land_tenor:what_is_the_land_tenor,
Specify_other:Specify_other,
value_of_land:value_of_land,
own_any_farm_machinery:own_any_farm_machinery,
house_ownership:house_ownership,
house_structure:house_structure,
Farm_size:Farm_size,
total_land_size:total_land_size,
Main_crop_enterprise:Main_crop_enterprise,
yield_expected_main_enterprise:yield_expected_main_enterprise,
farm_at_residence:farm_at_residence,
//Gps
postharvest_mgt:postharvest_mgt,
produce_storage:produce_storage,
preservation:preservation,
crops_for_new_season:crops_for_new_season,

number_of_employees:number_of_employees,
landsize_cropselected:landsize_cropselected,

livestock:livestock,
specify_livestock:specify_livestock,
cattle_number:cattle_number,
goat_number:goat_number,
sheep_number:sheep_number,
chicken_number:chicken_number,
pigs_number:pigs_number,
donkey_number:donkey_number,
Did_you_plant_last_season:Did_you_plant_last_season,
crops_grown_last_season:crops_grown_last_season,
Specify_other_crops_grown:Specify_other_crops_grown,

in_business_since:in_business_since,
yield_per_acre:yield_per_acre,

yield_of_maize_with_adequate_rain_per_acre:yield_of_maize_with_adequate_rain_per_acre,
yield_of_beans_with_adequate_rain_per_acre:yield_of_beans_with_adequate_rain_per_acre,
yield_of_sesame_with_adequate_rain_per_acre:yield_of_sesame_with_adequate_rain_per_acre,
yield_of_soyabean_with_adequate_rain_per_acre:yield_of_soyabean_with_adequate_rain_per_acre,
yield_of_rice_with_adequate_rain_per_acre:yield_of_rice_with_adequate_rain_per_acre,
yield_of_millet_with_adequate_rain_per_acre:yield_of_millet_with_adequate_rain_per_acre,
yield_of_sorghum_with_adequate_rain_per_acre:yield_of_sorghum_with_adequate_rain_per_acre,
yield_of_irish_potatoes_with_adequate_rain_per_acre:yield_of_irish_potatoes_with_adequate_rain_per_acre,
yield_of_cotton_with_adequate_rain_per_acre:yield_of_cotton_with_adequate_rain_per_acre,
yield_of_sweet_potatoes_with_adequate_rain_per_acre:yield_of_sweet_potatoes_with_adequate_rain_per_acre,
yield_of_sunflower_with_adequate_rain_per_acre:yield_of_sunflower_with_adequate_rain_per_acre,
yield_of_groundnuts_with_adequate_rain_per_acre:yield_of_groundnuts_with_adequate_rain_per_acre,
yield_of_coffee_with_adequate_rain_per_acre:yield_of_coffee_with_adequate_rain_per_acre,
yield_of_banana_with_adequate_rain_per_acre:yield_of_banana_with_adequate_rain_per_acre,
yield_of_cassava_with_adequate_rain_per_acre:yield_of_cassava_with_adequate_rain_per_acre,
crops_stored_from_last_season:crops_stored_from_last_season,
disturbances_in_storage:disturbances_in_storage,
storage_time:storage_time,
Specify_others:Specify_others,

maize_per_kg:maize_per_kg,
beans_per_kg:beans_per_kg ,
sesame_per_kg:sesame_per_kg,
soyabean_per_kg:soyabean_per_kg,
rice_per_kg:rice_per_kg,
millet_per_kg:millet_per_kg,
sorghum_per_kg:sorghum_per_kg,
irish_potatoes_per_kg:irish_potatoes_per_kg,
cotton_per_kg:cotton_per_kg,
sweet_potatoes_per_kg:sweet_potatoes_per_kg,
sunflower_per_kg:sunflower_per_kg,
ground_nuts_per_kg:ground_nuts_per_kg,
coffee_per_kg:coffee_per_kg,
Banana_per_bunch:Banana_per_bunch,
cassava_per_kg:cassava_per_kg,
//More
Did_you_apply_fertilizer:Did_you_apply_fertilizer,
Specify_the_type:Specify_the_type,
organic_specify:organic_specify,
Specify_other_organic:Specify_other_organic,
inorganic_Specify:inorganic_Specify,

use_pesticides_or_herbicides:use_pesticides_or_herbicides,
Please_specify_which_one:Please_specify_which_one,
pesticide_effectiveness:pesticide_effectiveness,
crop_use:crop_use,

involved_in_marketing:involved_in_marketing,
sell_of_produce_Nyakyera:sell_of_produce_Nyakyera,
sell_of_produce_green:sell_of_produce_green,
sell_of_produce_equator:sell_of_produce_equator,
sell_of_produce_liraresort:sell_of_produce_liraresort,
sell_of_produce_cedo:sell_of_produce_cedo,
sell_of_produce_orum:sell_of_produce_orum,
Marketlink:Marketlink,
agent_name:agent_name,
produce_transport:produce_transport,
employ_any_farm_labour:employ_any_farm_labour,
Specify_their_task:Specify_their_task,
Who_assisted_you:Who_assisted_you,
How_much_did_you_pay_them:How_much_did_you_pay_them,
Are_you_aware_of_climate_shock:Are_you_aware_of_climate_shock,
which_ones_you_are_aware_of:which_ones_you_are_aware_of,
training_on_addressing_climate:training_on_addressing_climate,
Please_specify:Please_specify,
Which_crops_for_rotation:Which_crops_for_rotation,

knoledge_of_rain_date:knoledge_of_rain_date,
heard_of_agri_insurance:heard_of_agri_insurance,
access_to_agri_insurance:access_to_agri_insurance,
Please_specify_the_agri_insurance_type:Please_specify_the_agri_insurance_type,
Specify_the_insurance_provider:Specify_the_insurance_provider,
fair_charge_for_insurance:fair_charge_for_insurance,
prefer_ordinary_or_az_bunlde:prefer_ordinary_or_az_bunlde,
challenges_last_season:challenges_last_season,
Specify:Specify,
What_type_of_pests:What_type_of_pests,
type_of_weather_and_effect:type_of_weather_and_effect,
Do_you_have_a_bank_account:Do_you_have_a_bank_account,
financial_access:financial_access,
transaction_monthly_costs:transaction_monthly_costs,
Specify_other_monthly_transaction_costs:Specify_other_monthly_transaction_costs,
travel_distance:travel_distance,
specify_other_travel_distance:specify_other_travel_distance,
Have_you_ever_received_credit:Have_you_ever_received_credit,
no_of_times_borrowed:no_of_times_borrowed,
loanoutstanding:loanoutstanding,
How_much_repayment_was_made_per_month:How_much_repayment_was_made_per_month,
delay_time_for_repayment:delay_time_for_repayment,
How_do_you_keep_your_money:How_do_you_keep_your_money,
financial_transaction_challeng:financial_transaction_challeng,
Specify_Other_financial_transaction_challeng:Specify_Other_financial_transaction_challeng,
action_access_to_financial_svc:action_access_to_financial_svc,
access_to_agric_ext_services:access_to_agric_ext_services,
How_do_you_access_Agric_ext_sv:How_do_you_access_Agric_ext_sv,
extension_type_channel_receive:extension_type_channel_receive,
adopted_practices:adopted_practices,
most_mostadoptedpractice:most_mostadoptedpractice,
Rate_services_training:Rate_services_training,
frequently_access_ext_svcs:frequently_access_ext_svcs,
is_information_provided_accurt:is_information_provided_accurt,
trainingappropriate:trainingappropriate,
benefits_of_practices:benefits_of_practices,
pay_anything_to_access_ext_svc:pay_anything_to_access_ext_svc,
training:training, 
pay_per_season:pay_per_season,
pest_fertilizer_pesticide_info:pest_fertilizer_pesticide_info,
Do_you_receive_weather_data:Do_you_receive_weather_data,
access_to_weather_data:access_to_weather_data,
How_accurate_is_the_info:How_accurate_is_the_info,
most_harmful_info:most_harmful_info,
biggest_prob_in_data_access:biggest_prob_in_data_access,
spend_on_your_phone_monthly:spend_on_your_phone_monthly,
main_phone_use:main_phone_use,


subscribed_to_info_svces_on_ph:subscribed_to_info_svces_on_ph,
services_suscribed_to: services_suscribed_to,
training_on_using_phone_servic:training_on_using_phone_servic,
training_on_weather_alerts:training_on_weather_alerts,
Who_provided_the_training_on_weather_alerts:Who_provided_the_training_on_weather_alerts,
trainig_on_insurance:trainig_on_insurance,
Who_provided_the_training_on_insurance:Who_provided_the_training_on_insurance,
probs_of_using_cellphone:probs_of_using_cellphone,
field_officer:field_officer
          //start of more columns
          
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
          this.SubmitOfflineData(this.id,this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,
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
