import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { Router } from '@angular/router';

export interface DetailsInterface {
 //iNTERFACE FOR CASA DATA
  consent:boolean;	//same as check agree.
  farmers_name:string;
  do_you_have_disability:string;
  disability_type:string;
  //More data has been added
  own_a_mobile_phone:string;
  What_type_of_phone_do_you_own:string;
  No_of_contacts:number;
  tel_no1:string;
  tel_No_2:string;
  service_provider:string;
  Specify_svc_provider:string;
  mm_reg_status:string;
  registered_mm_number:string;
  nin:string;
  ID_photo_url:string;
  Photo_url:string;
  occupation:string;
  specify_other_occupation:string;
  Martial_status:string;
  What_is_your_gender:string;
  name_of_husband:string;
  number_of_wives_husbands:string;
  name_first_wife:string;
  name_second_wife:string;
//added in another 30 columns
status_in_a_family:string;
next_of_kin:string;
next_of_kin_has_contact:string;
next_of_kin_phone_no:string;
region:string;
distr:string;
other_district:string;
subcounty:string;
other_subcounty:string;
subcounty_other_district:string;
soiltype:string;
parish:string;
village:string;
nearest_town:string;
Local_council1_name:string;
resident_since:string;
Description_of_location:string;
DOB:string;
level_of_education:string;
head_of_the_household:string;

Mobile_literacy:string;
any_dependants:string;
dependant_no:string;
dependants_age_bracket:string;
farmer_org:string;
name_of_farmer_org:string;

belong_farmergp:string;
name_farmergp:string;
position_in_FO:string;
year_services:string;
Your_position_in_the_fo:string;
male_members_in_FO:string;
female_members_in_FO:string;
Affiliation:string;
Name_of_connected_ACE_or_DFA:string;
main_income_source:string;
mainincome_since:string;
sector:string;
main_income_relaibility:string;
main_income_amount:string;
annual_income:number;
other_income_sources:string;
other_income_activity:string;
years_of_experince:string;
other_income_reliability:string;
amount:number;
income_trend:string;
access_to_Health_services:string;
health_expense:number;
school_going_children:string;
no_of_school_going_children:number;
school_fees_expense:string;
//expenditure:number=0;
//disposable_income=0;
what_is_the_land_tenor:string;
Specify_other:string;

value_of_land:string;
own_any_farm_machinery:any[];
house_ownership:string;
house_structure:string;
Farm_size:number;
total_land_size:number;
Main_crop_enterprise:string;
Variety_of_mainenterprise:string;
Variety2_of_mainenterprise:string;
landsize_main_crop_enterprise:number;
additional_land_main_enterprise:number;
season_of_planting:string;
yield_expected_main_enterprise:string;
farm_at_residence:string;
la2:string;
lo2:string;
acc2:string;

postharvest_mgt:string;
produce_storage:string;
preservation:string;
crops_for_new_season:any[];

other_crops_intended:string;
landsize_cropselected:any[];
yield_per_acre:any[];
in_business_since:any[];
number_of_employees:string;
livestock:any[];
specify_livestock:string;
cattle_number:number;
goat_number:number;
sheep_number:number;
chicken_number:number;
pigs_number:number;
donkey_number:number;
Did_you_plant_last_season:string;
crops_grown_last_season:any[];
Specify_other_crops_grown:string;

yield_of_maize_with_adequate_rain_per_acre:number;
yield_of_beans_with_adequate_rain_per_acre:number;
yield_of_sesame_with_adequate_rain_per_acre:number;
yield_of_soyabean_with_adequate_rain_per_acre:number;
yield_of_rice_with_adequate_rain_per_acre:number;
yield_of_millet_with_adequate_rain_per_acre:number;
yield_of_sorghum_with_adequate_rain_per_acre:number;
yield_of_irish_potatoes_with_adequate_rain_per_acre:number;
yield_of_cotton_with_adequate_rain_per_acre:number;
yield_of_sweet_potatoes_with_adequate_rain_per_acre:number;
yield_of_sunflower_with_adequate_rain_per_acre:number;
yield_of_groundnuts_with_adequate_rain_per_acre:number;
yield_of_coffee_with_adequate_rain_per_acre:number;
yield_of_banana_with_adequate_rain_per_acre:number;
yield_of_cassava_with_adequate_rain_per_acre:number;
//addition
crops_stored_from_last_season:string;
storage_time:string;
disturbances_in_storage:string;
Specify_others:string;
yield_last_season:any[];
yield_with_drought:any[];
year_of_severe_drought:string;
how_much_seed:any[];

maize_per_kg: number;
beans_per_kg:number;
rice_per_kg: number;
sesame_per_kg: number;
soyabean_per_kg:number;
millet_per_kg: number;
sorghum_per_kg: number;
irish_potatoes_per_kg:number;
cotton_per_kg:number;
sweet_potatoes_per_kg:number;
sunflower_per_kg: number;
ground_nuts_per_kg: number;
coffee_per_kg: number;
Banana_per_bunch:number;
cassava_per_kg: number;

seed_variety:any[];
Did_you_apply_fertilizer:string;
Specify_the_type:string;
organic_specify:string;
Specify_other_organic:string;
inorganic_Specify:any[];
fertilizer_type:any[];
fertilizer_amount:any[];
use_pesticides_or_herbicides:string;
Please_specify_which_one:string;
pesticide_effectiveness:string;
crop_use:string
crop_subsistence:any[];
crop_commercial:any[];
income_from_crops:any[];
involved_in_marketing:string;
sell_of_produce_Nyakyera:string;
sell_of_produce_green:string;
sell_of_produce_equator:string;
sell_of_produce_liraresort:string;
sell_of_produce_cedo:string;
sell_of_produce_orum:string;
Marketlink:string;
agent_name:string;
produce_transport:string;
employ_any_farm_labour:string;
Specify_their_task:any[];
Who_assisted_you:any[];
How_much_did_you_pay_them:number;
Are_you_aware_of_climate_shock:string;
which_ones_you_are_aware_of:string;
training_on_addressing_climate:string;
Please_specify:any[];
Which_crops_for_rotation:string;
_1st_choice:string;
_2nd_choice:string;
_3rd_choice:string;
knoledge_of_rain_date:string;
heard_of_agri_insurance:string;
access_to_agri_insurance:string;
Please_specify_the_agri_insurance_type:any[];
Specify_the_insurance_provider: string;
fair_charge_for_insurance: string;
prefer_ordinary_or_az_bunlde: string;
challenges_last_season: any[];
Specify: string;
What_type_of_pests: string;
type_of_weather_and_effect: string;
Do_you_have_a_bank_account: string;
financial_access: string;
transaction_monthly_costs: string;
Specify_other_monthly_transaction_costs: string;
travel_distance:string;
specify_other_travel_distance:string;
Have_you_ever_received_credit: string;
no_of_times_borrowed: string;
loanoutstanding: string;
How_much_repayment_was_made_per_month: string;
delay_time_for_repayment: string;
How_do_you_keep_your_money: any[];
financial_transaction_challeng: any[];
Specify_Other_financial_transaction_challeng: string;
action_access_to_financial_svc: string;
access_to_agric_ext_services: string;
How_do_you_access_Agric_ext_sv: any[];
extension_type_channel_receive: any[];
adopted_practices: any[];
most_mostadoptedpractice: string;
Rate_services_training: string;
frequently_access_ext_svcs: string;
is_information_provided_accurt: string;
trainingappropriate: string;
benefits_of_practices: string;
pay_anything_to_access_ext_svc: string;
training: any[];
pay_per_season: string;
pest_fertilizer_pesticide_info: any[];
Do_you_receive_weather_data: string;
access_to_weather_data:any[]
How_accurate_is_the_info: string;
most_harmful_info: string;
biggest_prob_in_data_access: string;
spend_on_your_phone_monthly: string;
main_phone_use: any[];
Voice_calling_and_receiving:string;
SMS:string;
Internet:string;
Social_media:string;
subscribed_to_info_svces_on_ph: string;
services_suscribed_to: any[];
training_on_using_phone_servic: string;
training_on_weather_alerts: string;
Who_provided_the_training_on_weather_alerts: string;
trainig_on_insurance: string;
Who_provided_the_training_on_insurance: string;
probs_of_using_cellphone: any[];
hhplanting_decision:string;
hhproductionphase_decision:string; 
hhpostharvet_decision:string;
hhmarketing_decision:string;
hhincome_decision:string;
meals_a_day:string;
Vegetables:string; 
Carbohydrates:string;
fruits:string;
proteins:string;
farmers_cooperation_responding:string;
how_well_agent_knows_beneficiary:string;
accuracy_of_info_collected:string;
data_quality:string;



}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject;

  constructor( private sqlite: SQLite, private router:Router) {
  }

  async getAllDetails1() {
    let details: DetailsInterface[] = [];
    return this.sqlite.create({ name: 'cas.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db; 
        db.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'DETAILS(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          +'consent TEXT,'
          +'farmers_name TEXT,'
          +'do_you_have_disability TEXT,'
          +'disability_type TEXT)',
          //More columns
          [])
          .catch(e => console.log(e));
        details = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return details;
    });
  }
 
  async getAllDetails() {
    let details: DetailsInterface[] = [];
    return this.sqlite.create({ name: 'casaa3.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'DETAILS(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          +'consent TEXT,'
          +'farmers_name TEXT,'
          +'do_you_have_disability TEXT,'
          +'disability_type TEXT,'
          +'own_a_mobile_phone TEXT,'
          +'What_type_of_phone_do_you_own TEXT,'
          +'No_of_contacts TEXT,'
          +'tel_no1 TEXT,'
          +'tel_No_2 TEXT,'
          +'service_provider TEXT,'
          +'Specify_svc_provider TEXT,'
          +'mm_reg_status TEXT,'
          +'registered_mm_number TEXT,'
          +'nin TEXT,'
          +'ID_photo_url TEXT,'
          +'Photo_url TEXT,'
          +'occupation TEXT,'
          +'specify_other_occupation TEXT,'
          +'Martial_status TEXT,'
          +'What_is_your_gender TEXT,'
          +'name_of_husband TEXT,'
          +'number_of_wives_husbands TEXT,'
          +'name_first_wife TEXT,'
          +'name_second_wife TEXT,'
          +'status_in_a_family TEXT,'
          +'next_of_kin TEXT,'
          +'next_of_kin_has_contact TEXT,'
          +'next_of_kin_phone_no TEXT,'
          +'region TEXT,'
/***start */
          +'distr TEXT,'
          +'other_district TEXT,'
          +'subcounty TEXT,'
          +'other_subcounty TEXT,'
          +'soiltype TEXT,'
          +'subcounty_other_district TEXT,'
          +'parish TEXT,'
          +'village TEXT,'
          +'nearest_town TEXT,'
          +'resident_since TEXT,'
          +'Description_of_location TEXT,'
          +'DOB Date,'
          +'level_of_education TEXT,'
          +'head_of_the_household TEXT,'
          
          +'la1 TEXT,'
          +'lo1 TEXT,'
          +'acc1 TEXT,'
          +'Mobile_literacy TEXT,'
          +'any_dependants TEXT,'
          +'dependant_no TEXT,'
          +'dependants_age_bracket TEXT,'
          +'farmer_org TEXT,'
          +'name_of_farmer_org TEXT,'
  /**end */
          +'belong_farmergp,'
          +'name_farmergp TEXT,' 
          +'year_services TEXT,'   
          +'position_in_FO TEXT,'
          +'Your_position_in_the_fo TEXT,'
          +'male_members_in_FO TEXT,'
          +'female_members_in_FO TEXT,'
          +'Affiliation TEXT,'
          +'Name_of_connected_ACE_or_DFA TEXT,'
          +'main_income_source TEXT,'
          +'mainincome_since TEXT,'
          +'sector TEXT,'
          +'main_income_relaibility TEXT,'
          +'main_income_amount TEXT,'
          +'annual_income TEXT,'
          +'other_income_sources TEXT,'
          +'other_income_activity TEXT,'
          +'years_of_experince TEXT,'
          +'other_income_reliability TEXT,'
          +'amount TEXT,'
          +'income_trend TEXT,'
          +'access_to_Health_services TEXT,'
          +'health_expense TEXT,'
          +'school_going_children TEXT,'
          +'no_of_school_going_children TEXT,'
          +'school_fees_expense TEXT,'
          +'what_is_the_land_tenor TEXT,'
          +'Specify_other TEXT,'

          +'value_of_land TEXT,'
          +'own_any_farm_machinery TEXT,'
          +'house_ownership TEXT,'
          +'house_structure TEXT,'
          +'Farm_size TEXT,'
          +'total_land_size TEXT,'
          +'Main_crop_enterprise TEXT,' 
          +'Variety_of_mainenterprise TEXT,' 
          +'Variety2_of_mainenterprise TEXT,' 
          +'landsize_main_crop_enterprise TEXT,'
          +'additional_land_main_enterprise TEXT,'
          +'season_of_planting TEXT,'
          +'yield_expected_main_enterprise TEXT,'
          +'farm_at_residence TEXT,'
          +'la2 TEXT,'
          +'lo2 TEXT,'
          +'acc2 TEXT,'
/**end here */
          +'postharvest_mgt TEXT,'
          +'produce_storage TEXT,'
          +'preservation TEXT,'
          +'crops_for_new_season TEXT,'
/**end here */
          +'other_crops_intended,'
          +'landsize_cropselected TEXT,'
          +'yield_per_acre TEXT,'
          +'in_business_since TEXT,'
/**end here */
          +'number_of_employees TEXT,'
          +'livestock TEXT,'
          +'specify_livestock TEXT,'
          +'cattle_number TEXT,'
          +'goat_number TEXT,'
          +'sheep_number TEXT,'
          +'chicken_number TEXT,'
          +'pigs_number TEXT,'
          +'donkey_number TEXT,'
          +'Did_you_plant_last_season TEXT,'
          +'crops_grown_last_season TEXT,'           
          +'Specify_other_crops_grown TEXT,'    
/**ended here*/                
          +'yield_of_maize_with_adequate_rain_per_acre TEXT,'
          +'yield_of_beans_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sesame_with_adequate_rain_per_acre TEXT,'
          +'yield_of_soyabean_with_adequate_rain_per_acre TEXT,'
          +'yield_of_rice_with_adequate_rain_per_acre TEXT,'
          +'yield_of_millet_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sorghum_with_adequate_rain_per_acre TEXT,'
          +'yield_of_irish_potatoes_with_adequate_rain_per_acre TEXT,'
          +'yield_of_cotton_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sweet_potatoes_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sunflower_with_adequate_rain_per_acre TEXT,'
          +'yield_of_groundnuts_with_adequate_rain_per_acre TEXT,'
          +'yield_of_coffee_with_adequate_rain_per_acre TEXT,'
          +'yield_of_banana_with_adequate_rain_per_acre TEXT,'
          +'yield_of_cassava_with_adequate_rain_per_acre TEXT,'
/**ended here*/          
          +'crops_stored_from_last_season TEXT,'
          +'storage_time TEXT,'
          +'disturbances_in_storage TEXT,'
          +'Specify_others TEXT,'
          +'yield_last_season TEXT,' 
/**added recently */
          +'yield_with_drought TEXT,' 
          +'year_of_severe_drought TEXT,' 
          +'how_much_seed TEXT,'
                            
/**added recently */
          +'maize_per_kg TEXT,'
          +'beans_per_kg TEXT,'
          +'rice_per_kg TEXT,'
          +'sesame_per_kg TEXT,'
          +'soyabean_per_kg TEXT,'
          +'millet_per_kg TEXT,'
          +'sorghum_per_kg TEXT,'
          +'irish_potatoes_per_kg TEXT,'
          +'cotton_per_kg TEXT,'
          +'sweet_potatoes_per_kg TEXT,'
          +'sunflower_per_kg TEXT,'
          +'ground_nuts_per_kg TEXT,'
          +'coffee_per_kg TEXT,'
          +'Banana_per_bunch TEXT,'
          +'cassava_per_kg TEXT,'
/**end here */  
/**start */   
          +'seed_variety TEXT,'      
          +'Did_you_apply_fertilizer TEXT,'
          +'Specify_the_type TEXT,'
          +'organic_specify TEXT,'
          +'Specify_other_organic TEXT,'
          +'inorganic_Specify TEXT,'
          /**added 2 below*/
          +'fertilizer_type TEXT,'
          +'fertilizer_amount TEXT,'

          +'use_pesticides_or_herbicides TEXT,'
          +'Please_specify_which_one TEXT,'
          +'pesticide_effectiveness TEXT,'
          +'crop_use TEXT,'
          /**added 3 below */
          +'crop_volume TEXT,'
          +'crop_volumec TEXT,'
          +'income_from_crops TEXT,'

          +'involved_in_marketing TEXT,' 
          +'sell_of_produce_Nyakyera TEXT,' 
          +'sell_of_produce_green TEXT,' 
          +'sell_of_produce_equator TEXT,' 
          +'sell_of_produce_liraresort TEXT,' 
          +'sell_of_produce_cedo TEXT,'   
          +'sell_of_produce_orum TEXT,' 
          +'Marketlink TEXT,'   
          +'agent_name TEXT,'   
          +'produce_transport TEXT,'  
          +'employ_any_farm_labour TEXT,' 
          +'Specify_their_task TEXT,'
          +'Who_assisted_you TEXT,'
          +'How_much_did_you_pay_them TEXT,'
          +'Are_you_aware_of_climate_shock TEXT,'
          +'which_ones_you_are_aware_of TEXT,'
          +'training_on_addressing_climate TEXT,'
          +'Please_specify TEXT,'  
          +'Which_crops_for_rotation TEXT,'
          /**added 3 columns below */
          +'_1st_choice TEXT,'
          +'_2nd_choice TEXT,' 
          +'_3rd_choice TEXT,'
        /**end*/  
          +'knoledge_of_rain_date TEXT,'  
          +'heard_of_agri_insurance TEXT,' 
          +'access_to_agri_insurance TEXT,' 
          +'Please_specify_the_agri_insurance_type TEXT,' 
          +'Specify_the_insurance_provider TEXT,'  
          +'fair_charge_for_insurance TEXT,'  
          +'prefer_ordinary_or_az_bunlde TEXT,'  
          +'challenges_last_season TEXT,'  
          +'Specify TEXT,'  
          +'What_type_of_pests TEXT,'  
          +'type_of_weather_and_effect TEXT,'  
          +'Do_you_have_a_bank_account TEXT,'  
          +'financial_access TEXT,'  
          +'transaction_monthly_costs TEXT,'
          +'Specify_other_monthly_transaction_costs TEXT,'  
          +'travel_distance TEXT,'  
          +'specify_other_travel_distance TEXT,'  
          +'Have_you_ever_received_credit TEXT,'  
          +'no_of_times_borrowed TEXT,'  
          +'loanoutstanding TEXT,'  
          +'How_much_repayment_was_made_per_month TEXT,' 
          +'delay_time_for_repayment TEXT,' 

          +'How_do_you_keep_your_money TEXT,'  
          +'financial_transaction_challeng TEXT,'  
          +'Specify_Other_financial_transaction_challeng TEXT,'  
          +'action_access_to_financial_svc TEXT,'  
          +'access_to_agric_ext_services TEXT,'  
          +'How_do_you_access_Agric_ext_sv TEXT,'  
          +'extension_type_channel_receive TEXT,'  
          +'adopted_practices TEXT,'  
          +'most_mostadoptedpractice TEXT,'  
          +'Rate_services_training TEXT,'  
          +'frequently_access_ext_svcs TEXT,'  
          +'is_information_provided_accurt TEXT,'  
          +'trainingappropriate TEXT,'  
          +'benefits_of_practices TEXT,'  
          +'pay_anything_to_access_ext_svc TEXT,'  
          +'training TEXT,'  
          +'pay_per_season TEXT,'  
          +'pest_fertilizer_pesticide_info TEXT,'  
          +'Do_you_receive_weather_data TEXT,'  
          +'access_to_weather_data TEXT,'  
          +'How_accurate_is_the_info TEXT,'  
          +'most_harmful_info TEXT,'  
          +'biggest_prob_in_data_access TEXT,'  
          +'spend_on_your_phone_monthly TEXT,'  
          +'main_phone_use TEXT,'
          /** added 4 columns  */          
          +'Voice_calling_and_receiving TEXT,'
          +'SMS TEXT,'
          +'Internet TEXT,'
          +'Social_media TEXT,'
                           
          +'subscribed_to_info_svces_on_ph TEXT,'  
          +'services_suscribed_to TEXT,'  
          +'training_on_using_phone_servic TEXT,'  
          +'training_on_weather_alerts TEXT,'
          /**added 1 column below */
          +'Who_provided_the_training_on_weather_alerts TEXT,'            
          +'trainig_on_insurance TEXT,'  
          +'Who_provided_the_training_on_insurance TEXT,'
          +'probs_of_using_cellphone TEXT,'
          /**added 5 columns below*/
          +'hhplanting_decision TEXT,'
          +'hhproductionphase_decision TEXT,'
          +'hhpostharvet_decision TEXT,'
          +'hhmarketing_decision TEXT,'
          +'hhincome_decision TEXT,'
    /**added 5 columns below */
          +'meals_a_day TEXT,'
          +'Vegetables TEXT,'
          +'Carbohydrates TEXT,'
          +'fruits TEXT,'
          +'proteins TEXT,'
          /**added  */ 
          +'farmers_cooperation_responding TEXT,'
          +'how_well_agent_knows_beneficiary TEXT,'
          +'accuracy_of_info_collected TEXT,'
          +'data_quality TEXT,'  
          
          +'field_officer TEXT)', 
          [])
          .catch(e => console.log(e));
        details = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return details;
    });
  }
  private getAllRecords(): DetailsInterface[] {
    let details: DetailsInterface[] = [];
    this.dbInstance.executeSql('select * from DETAILS', []).then(
      (res) => {
        for(var x=0; x<res.rows.length; x++)
          details.push(res.rows.item(x));
      }
    ).catch(e => {
      console.log(e);
    });
    return details;
  }

async addDetails(consent: boolean, farmers_name:string, do_you_have_disability:string, disability_type:string,own_a_mobile_phone:string,What_type_of_phone_do_you_own:string,No_of_contacts:number,tel_no1:string,tel_No_2:string,service_provider:string,Specify_svc_provider:string,mm_reg_status:string,registered_mm_number:string,nin:string,ID_photo_url:string,Photo_url:string,occupation:string,specify_other_occupation:string,Martial_status:string,What_is_your_gender:string,name_of_husband:string,number_of_wives_husbands:string,name_first_wife:string,name_second_wife:string,status_in_a_family:string,next_of_kin:string,next_of_kin_has_contact:string,next_of_kin_phone_no:string,region:string,distr:string,other_district:string,subcounty:string,other_subcounty:string,subcounty_other_district:string,soiltype:string,parish: string,village:string,nearest_town:string,resident_since:string,Description_of_location:string,DOB:string,level_of_education:string,head_of_the_household:string,la1:string,lo1:string,acc1:string,Mobile_literacy:string,any_dependants:string,dependant_no:string,dependants_age_bracket:any[],farmer_org:string,name_of_farmer_org:string,belong_farmergp:string,name_farmergp:string, year_services:string,position_in_FO:string,Your_position_in_the_fo:string,male_members_in_FO:string,female_members_in_FO:string,Affiliation:string,Name_of_connected_ACE_or_DFA:string,main_income_source:string,mainincome_since:string,sector:string,main_income_relaibility:string,main_income_amount:string,annual_income:number,other_income_sources:string,other_income_activity:string,years_of_experince:string,other_income_reliability:string,amount:number,income_trend:string,access_to_Health_services:string,health_expense:number,school_going_children:string,no_of_school_going_children:number,school_fees_expense:string,what_is_the_land_tenor:string,Specify_other:string,value_of_land:string,own_any_farm_machinery:any[],house_ownership:string,house_structure:string,Farm_size:number,total_land_size:number,Main_crop_enterprise:string,Variety_of_mainenterprise:string,Variety2_of_mainenterprise:string,landsize_main_crop_enterprise:number,additional_land_main_enterprise:number,season_of_planting:string,yield_expected_main_enterprise:string,farm_at_residence:string,la2:string,lo2:string,acc2:string,postharvest_mgt:string,produce_storage:string,preservation:string,crops_for_new_season:any[],other_crops_intended:string,landsize_cropselected:any[],yield_per_acre:any[],in_business_since:any[],number_of_employees:string,livestock:any[],specify_livestock:string,cattle_number:number,goat_number:number,sheep_number:number,chicken_number:number,pigs_number:number,donkey_number:number,Did_you_plant_last_season:string,crops_grown_last_season:any[],Specify_other_crops_grown:string,yield_of_maize_with_adequate_rain_per_acre:number,yield_of_beans_with_adequate_rain_per_acre:number,yield_of_sesame_with_adequate_rain_per_acre:number,yield_of_soyabean_with_adequate_rain_per_acre:number,yield_of_rice_with_adequate_rain_per_acre:number,yield_of_millet_with_adequate_rain_per_acre:number,yield_of_sorghum_with_adequate_rain_per_acre:number,yield_of_irish_potatoes_with_adequate_rain_per_acre:number,yield_of_cotton_with_adequate_rain_per_acre:number,yield_of_sweet_potatoes_with_adequate_rain_per_acre:number,yield_of_sunflower_with_adequate_rain_per_acre:number,yield_of_groundnuts_with_adequate_rain_per_acre:number,yield_of_coffee_with_adequate_rain_per_acre:number,yield_of_banana_with_adequate_rain_per_acre:number,yield_of_cassava_with_adequate_rain_per_acre:number,crops_stored_from_last_season:string,storage_time:string,disturbances_in_storage:string,Specify_others:string,yield_last_season:any[],yield_with_drought:any[],year_of_severe_drought:string,how_much_seed:any[],maize_per_kg: number,beans_per_kg:number,rice_per_kg: number,sesame_per_kg: number,soyabean_per_kg:number,millet_per_kg: number,sorghum_per_kg: number,irish_potatoes_per_kg:number,cotton_per_kg:number,sweet_potatoes_per_kg:number,sunflower_per_kg: number,ground_nuts_per_kg: number,coffee_per_kg: number,Banana_per_bunch:number,cassava_per_kg: number,seed_variety:any[],Did_you_apply_fertilizer:string,Specify_the_type:string,organic_specify:string,Specify_other_organic:string,inorganic_Specify:any[],fertilizer_type:any[],fertilizer_amount:any[],use_pesticides_or_herbicides:string,Please_specify_which_one:string,pesticide_effectiveness:string,crop_use:string,crop_subsistence:any[],crop_commercial:any[],income_from_crops:any[],involved_in_marketing:string,sell_of_produce_Nyakyera:string,sell_of_produce_green:string,sell_of_produce_equator:string,sell_of_produce_liraresort:string,sell_of_produce_cedo:string,sell_of_produce_orum:string,Marketlink:string,agent_name:string,produce_transport:string,employ_any_farm_labour:string,Specify_their_task:any[],Who_assisted_you:any[],How_much_did_you_pay_them,Are_you_aware_of_climate_shock:string,which_ones_you_are_aware_of:string,training_on_addressing_climate:string,Please_specify:any[],Which_crops_for_rotation:string,_1st_choice:string,_2nd_choice:string,_3rd_choice:string,knoledge_of_rain_date:string,heard_of_agri_insurance:string,access_to_agri_insurance:string,Please_specify_the_agri_insurance_type:any[],Specify_the_insurance_provider: string,fair_charge_for_insurance: string,prefer_ordinary_or_az_bunlde: string,challenges_last_season: any[],Specify: string,What_type_of_pests: string,type_of_weather_and_effect: string,Do_you_have_a_bank_account: string,financial_access: string,transaction_monthly_costs: string,Specify_other_monthly_transaction_costs: string,travel_distance:string,specify_other_travel_distance:string,Have_you_ever_received_credit: string,no_of_times_borrowed: string,loanoutstanding: string,How_much_repayment_was_made_per_month: string,delay_time_for_repayment: string,How_do_you_keep_your_money: any[],financial_transaction_challeng: any[],Specify_Other_financial_transaction_challeng: string,action_access_to_financial_svc: string,access_to_agric_ext_services: string,How_do_you_access_Agric_ext_sv: any[],extension_type_channel_receive: any[],adopted_practices: any[],most_mostadoptedpractice: string,Rate_services_training: string,frequently_access_ext_svcs: string,is_information_provided_accurt: string,trainingappropriate: string,benefits_of_practices: string,pay_anything_to_access_ext_svc: string,training: any[],pay_per_season: string,pest_fertilizer_pesticide_info: any[],Do_you_receive_weather_data: string,access_to_weather_data:any[],How_accurate_is_the_info: string,most_harmful_info: string,biggest_prob_in_data_access: string,spend_on_your_phone_monthly: string,main_phone_use: any[],Voice_calling_and_receiving:string,SMS:string,Internet:string,Social_media:string,subscribed_to_info_svces_on_ph: string,services_suscribed_to:any[],training_on_using_phone_servic:string,training_on_weather_alerts: string,Who_provided_the_training_on_weather_alerts: string,trainig_on_insurance: string,Who_provided_the_training_on_insurance: string,probs_of_using_cellphone: any[],hhplanting_decision:string,hhproductionphase_decision:string,hhpostharvet_decision:string,hhmarketing_decision:string,hhincome_decision:string,meals_a_day:string,Vegetables:string,Carbohydrates:string,fruits:string,proteins:string,farmers_cooperation_responding:string,how_well_agent_knows_beneficiary:string,accuracy_of_info_collected:string,data_quality:string
//seed_variety:any[],Did_you_apply_fertilizer:string,Specify_the_type:string,organic_specify:string,Specify_other_organic:string,inorganic_Specify:any[],fertilizer_type:any[],fertilizer_amount:any[],use_pesticides_or_herbicides:string,Please_specify_which_one:string,pesticide_effectiveness:string,crop_use:string,crop_subsistence:any[],crop_commercial:any[],income_from_crops:any[],involved_in_marketing:string,sell_of_produce_Nyakyera:string,sell_of_produce_green:string,sell_of_produce_equator:string,sell_of_produce_liraresort:string,sell_of_produce_cedo:string,sell_of_produce_orum:string,Marketlink:string,agent_name:string,produce_transport:string,employ_any_farm_labour:string,Specify_their_task:string,Who_assisted_you:string,How_much_did_you_pay_them:number,Are_you_aware_of_climate_shock:string,which_ones_you_are_aware_of:string,training_on_addressing_climate:string,Please_specify:string,Which_crops_for_rotation:string,_1st_choice:string,_2nd_choice:string,_3rd_choice:string,knoledge_of_rain_date:string,heard_of_agri_insurance:string,access_to_agri_insurance:string,Please_specify_the_agri_insurance_type:any[],Specify_the_insurance_provider: string,fair_charge_for_insurance: string,prefer_ordinary_or_az_bunlde: string,challenges_last_season: any[],Specify: string,What_type_of_pests: string,type_of_weather_and_effect: string,Do_you_have_a_bank_account: string,financial_access: string,transaction_monthly_costs: string,Specify_other_monthly_transaction_costs: string,travel_distance:string,specify_other_travel_distance:string,Have_you_ever_received_credit: string,no_of_times_borrowed: string,loanoutstanding: string,How_much_repayment_was_made_per_month: string,delay_time_for_repayment: string,How_do_you_keep_your_money: any[],financial_transaction_challeng: any[],Specify_Other_financial_transaction_challeng: string,action_access_to_financial_svc: string,access_to_agric_ext_services: string,How_do_you_access_Agric_ext_sv: any[],extension_type_channel_receive: any[],adopted_practices: any[],most_mostadoptedpractice: string,Rate_services_training: string,frequently_access_ext_svcs: string,is_information_provided_accurt: string,trainingappropriate: string,benefits_of_practices: string,pay_anything_to_access_ext_svc: string,training: any[],pay_per_season: string,pest_fertilizer_pesticide_info: any[],Do_you_receive_weather_data: string,access_to_weather_data:any[],How_accurate_is_the_info: string,most_harmful_info: string,biggest_prob_in_data_access: string,spend_on_your_phone_monthly: string,main_phone_use: any[],Voice_calling_and_receiving:string,SMS:string,Internet:string,Social_media:string,subscribed_to_info_svces_on_ph: string,services_suscribed_to:any[],training_on_using_phone_servic:string,training_on_weather_alerts: string,Who_provided_the_training_on_weather_alerts: string,trainig_on_insurance: string,Who_provided_the_training_on_insurance: string,probs_of_using_cellphone: any[],hhplanting_decision:string,hhproductionphase_decision:string,hhpostharvet_decision:string,hhmarketing_decision:string,hhincome_decision:string,meals_a_day:string,Vegetables:string,Carbohydrates:string,fruits:string,proteins:string,farmers_cooperation_responding:string,how_well_agent_knows_beneficiary:string,accuracy_of_info_collected:string,data_quality:string
 
  ) {
    let data = [consent, farmers_name, do_you_have_disability,disability_type,own_a_mobile_phone,What_type_of_phone_do_you_own,No_of_contacts,tel_no1,tel_No_2,service_provider,Specify_svc_provider,mm_reg_status,registered_mm_number,nin,ID_photo_url,Photo_url,occupation,specify_other_occupation,Martial_status,What_is_your_gender,name_of_husband,number_of_wives_husbands,name_first_wife,name_second_wife,status_in_a_family,next_of_kin,next_of_kin_has_contact,next_of_kin_phone_no,region,distr,other_district,subcounty,other_subcounty,subcounty_other_district,soiltype,parish,village,nearest_town,resident_since,Description_of_location,DOB,level_of_education,head_of_the_household,la1,lo1,acc1,Mobile_literacy,any_dependants,dependant_no,dependants_age_bracket,farmer_org,name_of_farmer_org,belong_farmergp,name_farmergp,year_services,position_in_FO,Your_position_in_the_fo,male_members_in_FO,female_members_in_FO,Affiliation,Name_of_connected_ACE_or_DFA,main_income_source,mainincome_since,sector,main_income_relaibility,main_income_amount,annual_income,other_income_sources,other_income_activity,years_of_experince,other_income_reliability,amount,income_trend,access_to_Health_services,health_expense,school_going_children,no_of_school_going_children,school_fees_expense,what_is_the_land_tenor,Specify_other,value_of_land,own_any_farm_machinery,house_ownership,house_structure,Farm_size,total_land_size,Main_crop_enterprise,Variety_of_mainenterprise,Variety2_of_mainenterprise,landsize_main_crop_enterprise,additional_land_main_enterprise,season_of_planting,yield_expected_main_enterprise,farm_at_residence,la2,lo2,acc2,postharvest_mgt,produce_storage,preservation,crops_for_new_season,other_crops_intended,landsize_cropselected,yield_per_acre,in_business_since,number_of_employees,livestock,specify_livestock,cattle_number,goat_number,sheep_number,chicken_number,pigs_number,donkey_number,Did_you_plant_last_season,crops_grown_last_season,Specify_other_crops_grown,yield_of_maize_with_adequate_rain_per_acre,yield_of_beans_with_adequate_rain_per_acre,yield_of_sesame_with_adequate_rain_per_acre,yield_of_soyabean_with_adequate_rain_per_acre,yield_of_rice_with_adequate_rain_per_acre,yield_of_millet_with_adequate_rain_per_acre,yield_of_sorghum_with_adequate_rain_per_acre,yield_of_irish_potatoes_with_adequate_rain_per_acre,yield_of_cotton_with_adequate_rain_per_acre,yield_of_sweet_potatoes_with_adequate_rain_per_acre,yield_of_sunflower_with_adequate_rain_per_acre,yield_of_groundnuts_with_adequate_rain_per_acre,yield_of_coffee_with_adequate_rain_per_acre,yield_of_banana_with_adequate_rain_per_acre,yield_of_cassava_with_adequate_rain_per_acre,crops_stored_from_last_season,storage_time,disturbances_in_storage,Specify_others,yield_last_season,yield_with_drought,year_of_severe_drought,how_much_seed,maize_per_kg,beans_per_kg,rice_per_kg,sesame_per_kg,soyabean_per_kg,millet_per_kg,sorghum_per_kg,irish_potatoes_per_kg,cotton_per_kg,sweet_potatoes_per_kg,sunflower_per_kg,ground_nuts_per_kg,coffee_per_kg,Banana_per_bunch,cassava_per_kg,seed_variety,Did_you_apply_fertilizer,Specify_the_type,organic_specify,Specify_other_organic,inorganic_Specify,fertilizer_type,fertilizer_amount,use_pesticides_or_herbicides,Please_specify_which_one,pesticide_effectiveness,crop_use,crop_subsistence,crop_commercial,income_from_crops,involved_in_marketing,sell_of_produce_Nyakyera,sell_of_produce_green,sell_of_produce_equator,sell_of_produce_liraresort,sell_of_produce_cedo,sell_of_produce_orum,Marketlink,agent_name,produce_transport,employ_any_farm_labour,Specify_their_task,Who_assisted_you,How_much_did_you_pay_them,Are_you_aware_of_climate_shock,which_ones_you_are_aware_of,training_on_addressing_climate,Please_specify,Which_crops_for_rotation,_1st_choice,_2nd_choice,_3rd_choice,knoledge_of_rain_date,heard_of_agri_insurance,access_to_agri_insurance,Please_specify_the_agri_insurance_type,Specify_the_insurance_provider,fair_charge_for_insurance,prefer_ordinary_or_az_bunlde,challenges_last_season,Specify,What_type_of_pests,type_of_weather_and_effect,Do_you_have_a_bank_account,financial_access,transaction_monthly_costs,Specify_other_monthly_transaction_costs,travel_distance,specify_other_travel_distance,Have_you_ever_received_credit,no_of_times_borrowed,loanoutstanding,How_much_repayment_was_made_per_month,delay_time_for_repayment,How_do_you_keep_your_money,financial_transaction_challeng,Specify_Other_financial_transaction_challeng,action_access_to_financial_svc,access_to_agric_ext_services,How_do_you_access_Agric_ext_sv,extension_type_channel_receive,adopted_practices,most_mostadoptedpractice,Rate_services_training,frequently_access_ext_svcs,is_information_provided_accurt,trainingappropriate,benefits_of_practices,pay_anything_to_access_ext_svc,training,pay_per_season,pest_fertilizer_pesticide_info,Do_you_receive_weather_data,access_to_weather_data,How_accurate_is_the_info,most_harmful_info,biggest_prob_in_data_access,spend_on_your_phone_monthly,main_phone_use,Voice_calling_and_receiving,SMS,Internet,Social_media,subscribed_to_info_svces_on_ph,services_suscribed_to,training_on_using_phone_servic,training_on_weather_alerts,Who_provided_the_training_on_weather_alerts,trainig_on_insurance,Who_provided_the_training_on_insurance,probs_of_using_cellphone,hhplanting_decision,hhproductionphase_decision,hhpostharvet_decision,hhmarketing_decision,hhincome_decision,meals_a_day,Vegetables,Carbohydrates,fruits,proteins,farmers_cooperation_responding,how_well_agent_knows_beneficiary,accuracy_of_info_collected,data_quality

    ];
    this.dbInstance.executeSql('insert into DETAILS(consent, farmers_name, do_you_have_disability,disability_type,own_a_mobile_phone,What_type_of_phone_do_you_own,No_of_contacts,tel_no1,tel_No_2,service_provider,Specify_svc_provider,mm_reg_status,registered_mm_number,nin,ID_photo_url,Photo_url,occupation,specify_other_occupation,Martial_status,What_is_your_gender,name_of_husband,number_of_wives_husbands,name_first_wife,name_second_wife,status_in_a_family,next_of_kin,next_of_kin_has_contact,next_of_kin_phone_no,region,distr,other_district,subcounty,other_subcounty,subcounty_other_district,soiltype,parish,village,nearest_town,resident_since,Description_of_location,DOB,level_of_education,head_of_the_household,la1,lo1,acc1,Mobile_literacy,any_dependants,dependant_no,dependants_age_bracket,farmer_org,name_of_farmer_org,belong_farmergp,name_farmergp,year_services,position_in_FO,Your_position_in_the_fo,male_members_in_FO,female_members_in_FO,Affiliation,Name_of_connected_ACE_or_DFA,main_income_source,mainincome_since,sector,main_income_relaibility,main_income_amount,annual_income,other_income_sources,other_income_activity,years_of_experince,other_income_reliability,amount,income_trend,access_to_Health_services,health_expense,school_going_children,no_of_school_going_children,school_fees_expense,what_is_the_land_tenor,Specify_other,value_of_land,own_any_farm_machinery,house_ownership,house_structure,Farm_size,total_land_size,Main_crop_enterprise,Variety_of_mainenterprise,Variety2_of_mainenterprise,landsize_main_crop_enterprise,additional_land_main_enterprise,season_of_planting,yield_expected_main_enterprise,farm_at_residence,la2,lo2,acc2,postharvest_mgt,produce_storage,preservation,crops_for_new_season,other_crops_intended,landsize_cropselected,yield_per_acre,in_business_since,number_of_employees,livestock,specify_livestock,cattle_number,goat_number,sheep_number,chicken_number,pigs_number,donkey_number,Did_you_plant_last_season,crops_grown_last_season,Specify_other_crops_grown,yield_of_maize_with_adequate_rain_per_acre,yield_of_beans_with_adequate_rain_per_acre,yield_of_sesame_with_adequate_rain_per_acre,yield_of_soyabean_with_adequate_rain_per_acre,yield_of_rice_with_adequate_rain_per_acre,yield_of_millet_with_adequate_rain_per_acre,yield_of_sorghum_with_adequate_rain_per_acre,yield_of_irish_potatoes_with_adequate_rain_per_acre,yield_of_cotton_with_adequate_rain_per_acre,yield_of_sweet_potatoes_with_adequate_rain_per_acre,yield_of_sunflower_with_adequate_rain_per_acre,yield_of_groundnuts_with_adequate_rain_per_acre,yield_of_coffee_with_adequate_rain_per_acre,yield_of_banana_with_adequate_rain_per_acre,yield_of_cassava_with_adequate_rain_per_acre,crops_stored_from_last_season,storage_time,disturbances_in_storage,Specify_others,yield_last_season,yield_with_drought,year_of_severe_drought,how_much_seed,maize_per_kg,beans_per_kg,rice_per_kg,sesame_per_kg,soyabean_per_kg,millet_per_kg,sorghum_per_kg,irish_potatoes_per_kg,cotton_per_kg,sweet_potatoes_per_kg,sunflower_per_kg,ground_nuts_per_kg,coffee_per_kg,Banana_per_bunch,cassava_per_kg,seed_variety,Did_you_apply_fertilizer,Specify_the_type,organic_specify,Specify_other_organic,inorganic_Specify,fertilizer_type,fertilizer_amount,use_pesticides_or_herbicides,Please_specify_which_one,pesticide_effectiveness,crop_use,crop_volume,crop_volumec,income_from_crops,involved_in_marketing,sell_of_produce_Nyakyera,sell_of_produce_green,sell_of_produce_equator,sell_of_produce_liraresort,sell_of_produce_cedo,sell_of_produce_orum,Marketlink,agent_name,produce_transport,employ_any_farm_labour,Specify_their_task,Who_assisted_you,How_much_did_you_pay_them,Are_you_aware_of_climate_shock,which_ones_you_are_aware_of,training_on_addressing_climate,Please_specify,Which_crops_for_rotation,_1st_choice,_2nd_choice,_3rd_choice,knoledge_of_rain_date,heard_of_agri_insurance,access_to_agri_insurance,Please_specify_the_agri_insurance_type,Specify_the_insurance_provider,fair_charge_for_insurance,prefer_ordinary_or_az_bunlde,challenges_last_season,Specify,What_type_of_pests,type_of_weather_and_effect,Do_you_have_a_bank_account,financial_access,transaction_monthly_costs,Specify_other_monthly_transaction_costs,travel_distance,specify_other_travel_distance,Have_you_ever_received_credit,no_of_times_borrowed,loanoutstanding,How_much_repayment_was_made_per_month,delay_time_for_repayment,How_do_you_keep_your_money,financial_transaction_challeng,Specify_Other_financial_transaction_challeng,action_access_to_financial_svc,access_to_agric_ext_services,How_do_you_access_Agric_ext_sv,extension_type_channel_receive,adopted_practices,most_mostadoptedpractice,Rate_services_training,frequently_access_ext_svcs,is_information_provided_accurt,trainingappropriate,benefits_of_practices,pay_anything_to_access_ext_svc,training,pay_per_season,pest_fertilizer_pesticide_info,Do_you_receive_weather_data,access_to_weather_data,How_accurate_is_the_info,most_harmful_info,biggest_prob_in_data_access,spend_on_your_phone_monthly,main_phone_use,Voice_calling_and_receiving,SMS,Internet,Social_media,subscribed_to_info_svces_on_ph,services_suscribed_to,training_on_using_phone_servic,training_on_weather_alerts,Who_provided_the_training_on_weather_alerts,trainig_on_insurance,Who_provided_the_training_on_insurance,probs_of_using_cellphone,hhplanting_decision,hhproductionphase_decision,hhpostharvet_decision,hhmarketing_decision,hhincome_decision,meals_a_day,Vegetables,Carbohydrates,fruits,proteins,farmers_cooperation_responding,how_well_agent_knows_beneficiary,accuracy_of_info_collected,data_quality) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data).catch(e => console.log(e));
      this.router.navigate(['/beneficiary']);
    return this.getAllRecords();
}

async deleteDetails(id: number) {
    this.dbInstance.executeSql('DELETE FROM DETAILS WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
    
}

}