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
  /*id: number;
  region,
  district:string;
  subcounty:string;
  topic,
  activity,
  Photo_url,
  males,
  females,
  total,
  lo,
  la,
  fo,
  */
 //iNTERFACE FOR CASA DATA
  consent:boolean;	//same as check agree.
  farmers_name:string;
  do_you_have_disability:string;
  disability_type:string;
  own_a_mobile_phone:string;
  What_type_of_phone_do_you_own:string;
  No_of_contacts:string;
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
  status_in_a_family:string;
  next_of_kin:string;
  next_of_kin_has_contact:string;
  next_of_kin_phone_no:string;
  region:string;
  district:string;
  distr:string;
  
  other_district:string;
  subcounty,
  other_subcounty:string;
  soiltype:string;
  subcounty_other_district:string;
  parish:string;
  village:string;
  nearest_town:string;
  Local_council1_name:string;
  resident_since:string;
  Description_of_location:string;
  DOB:string;
  level_of_education:string;
  head_of_the_household:string;
  lo:string;
  la:string;
  Mobile_literacy:string;
  any_dependants:string;
  dependant_no:string;
  dependants_age_bracket:any[]; //The values are not being picked
  farmer_org:string;
  name_farmergp:string;
  belong_farmergp:string;
  position_in_FO:string;
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
  annual_income:string;
  other_income_sources:string;
  other_income_activity:string;
  years_of_experince:string;
  other_income_reliability:string;
  amount:string;
  income_trend:string;
  access_to_Health_services:string;
  health_expense:string;
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
  Farm_size:string;
  total_land_size:string;
  
  Main_crop_enterprise:string;
  
  yield_expected_main_enterprise:string;
  farm_at_residence:string;
  //GPs
  postharvest_mgt:string;
  produce_storage:string;
  preservation:string;
  crops_for_new_season:string;
  number_of_employees:string;
  
  
  landsize_cropselected:string;
  yield_per_acre:string;
  in_business_since:string;
  
  livestock:string;
  specify_livestock:string;
  cattle_number:number;
  goat_number:number;
  sheep_number:number;
  chicken_number:number;
  pigs_number:number;
  donkey_number:number;
  Did_you_plant_last_season:string;
  Specify_other_crops_grown:string;
  
  yield_of_maize_with_adequate_rain_per_acre:string;
  yield_of_beans_with_adequate_rain_per_acre:string;
  yield_of_sesame_with_adequate_rain_per_acre:string;
  yield_of_soyabean_with_adequate_rain_per_acre:string;
  yield_of_rice_with_adequate_rain_per_acre:string;
  yield_of_millet_with_adequate_rain_per_acre:string;
  yield_of_sorghum_with_adequate_rain_per_acre:string;
  yield_of_irish_potatoes_with_adequate_rain_per_acre:string;
  yield_of_cotton_with_adequate_rain_per_acre:string;
  yield_of_sweet_potatoes_with_adequate_rain_per_acre:string;
  yield_of_sunflower_with_adequate_rain_per_acre:string;
  yield_of_groundnuts_with_adequate_rain_per_acre:string;
  yield_of_coffee_with_adequate_rain_per_acre:string;
  yield_of_banana_with_adequate_rain_per_acre:string;
  yield_of_cassava_with_adequate_rain_per_acre:string;
  crops_stored_from_last_season:string;
  storage_time:string;
  disturbances_in_storage:string;
  Specify_others:string;
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
  
    Did_you_apply_fertilizer:string;
    Specify_the_type:string;
    organic_specify:string;
    Specify_other_organic:string;
    inorganic_Specify:any[];
    use_pesticides_or_herbicides:string;
    Please_specify_which_one:string;
    pesticide_effectiveness:string;
    crop_use,
  
    involved_in_marketing,
    sell_of_produce_Nyakyera,
    sell_of_produce_green,
    sell_of_produce_equator,
    sell_of_produce_liraresort,
    sell_of_produce_cedo,
    sell_of_produce_orum,
    Marketlink,
    agent_name,
    produce_transport,
    employ_any_farm_labour,
    Specify_their_task:any[];
    Who_assisted_you: any[];
    How_much_did_you_pay_them,
    Are_you_aware_of_climate_shock:string;
    which_ones_you_are_aware_of,
    training_on_addressing_climate,
    Please_specify: any[];
    Which_crops_for_rotation:string;
    crops_grown_last_season:any[];
    knoledge_of_rain_date,
    heard_of_agri_insurance,
    access_to_agri_insurance,
    Please_specify_the_agri_insurance_type,
    Specify_the_insurance_provider,
    fair_charge_for_insurance,
    prefer_ordinary_or_az_bunlde,
    challenges_last_season: any[];
    Specify,
    What_type_of_pests,
    type_of_weather_and_effect,
    Do_you_have_a_bank_account,
    financial_access,
    transaction_monthly_costs,
    Specify_other_monthly_transaction_costs,
    travel_distance,
    specify_other_travel_distance,
    Have_you_ever_received_credit,
    no_of_times_borrowed,
    loanoutstanding,
    How_much_repayment_was_made_per_month,
    delay_time_for_repayment,
    How_do_you_keep_your_money: any[];
    financial_transaction_challeng: any[];
    Specify_Other_financial_transaction_challeng,
    action_access_to_financial_svc,
    access_to_agric_ext_services,
    How_do_you_access_Agric_ext_sv: any[];
    extension_type_channel_receive: any[];
    adopted_practices: any[];
    most_mostadoptedpractice,
    Rate_services_training,
    frequently_access_ext_svcs,
    is_information_provided_accurt,
    trainingappropriate,
    benefits_of_practices,
    pay_anything_to_access_ext_svc,
    training: any[];
    pay_per_season,
    pest_fertilizer_pesticide_info: any[];
    Do_you_receive_weather_data,
    access_to_weather_data: any[];
    How_accurate_is_the_info,
    most_harmful_info,
    biggest_prob_in_data_access,
    spend_on_your_phone_monthly,
    main_phone_use: any[];
    subscribed_to_info_svces_on_ph,
    services_suscribed_to: any[];
    training_on_using_phone_servic,
    training_on_weather_alerts,
    trainig_on_insurance,
    Who_provided_the_training_on_insurance,
    probs_of_using_cellphone: any[];



}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject;

  constructor( private sqlite: SQLite, private router:Router) {
  }

  async getAllDetails() {
    let details: DetailsInterface[] = [];
    return this.sqlite.create({ name: 'dat20.db', location: 'default' }).then(
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
 
  async getAllDetails1() {
    let details: DetailsInterface[] = [];
    return this.sqlite.create({ name: 'casa.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'DETAILS(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' region VARCHAR(50),'
          + ' district VARCHAR(50),'
          + ' subcounty VARCHAR(50),'
          + ' topic VARCHAR(50),' 
          + ' activity VARCHAR(50),'
          + ' Photo_url VARCHAR(50),'
          + ' males VARCHAR(50),'
          + ' females VARCHAR(50),'
          + ' total VARCHAR(50),'
          + ' la VARCHAR(50),'
          + ' lo VARCHAR(50),'
         


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
          +'district TEXT,'
          
          +'other_district TEXT,'
          +'subcounty TEXT,'
          +'other_subcounty TEXT,'
          +'soiltype TEXT,'
          +'subcounty_other_district TEXT,'
          +'parish TEXT,'
          +'village TEXT,'
          +'nearest_town TEXT,'
          +'Local_council1_name TEXT,'
          +'resident_since TEXT,'
          +'Description_of_location TEXT,'
          +'DOB Date,'
          +'level_of_education TEXT,'
          +'head_of_the_household TEXT,'
          +'lo TEXT,'
          +'la TEXT,'
          +'Mobile_literacy TEXT,'
          +'any_dependants TEXT,'
          +'dependant_no TEXT,'
          +'dependants_age_bracket TEXT,' //The values are not being picked
          +'farmer_org TEXT,'
          +'name_farmergp TEXT,'
          +'belong_farmergp TEXT,'
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
          //expenditure:number=0;
          //disposable_income=0;
          +'what_is_the_land_tenor TEXT,'
          +'Specify_other TEXT,'
          +'value_of_land TEXT,'
          +'own_any_farm_machinery TEXT,'
          +'house_ownership TEXT,'
          +'house_structure TEXT,'
          +'Farm_size TEXT,'
          +'total_land_size TEXT,'
          
          +'Main_crop_enterprise TEXT,'
          
          +'yield_expected_main_enterprise TEXT,'
          +'farm_at_residence TEXT,'
          //GPs
          +'postharvest_mgt TEXT,'
          +'produce_storage TEXT,'
          +'preservation TEXT,'
          +'crops_for_new_season TEXT,'
          +'number_of_employees TEXT,'
          
          
          +'landsize_cropselected TEXT,'
          +'yield_per_acre TEXT,'
          +'in_business_since TEXT,'
          
          +'livestock TEXT,'
          +'specify_livestock TEXT,'
          +'cattle_number TEXT,'
          +'goat_number TEXT,'
          +'sheep_number TEXT,'
          +'chicken_number TEXT,'
          +'pigs_number TEXT,'
          +'donkey_number TEXT,'
          +'Did_you_plant_last_season TEXT,'
          +'Specify_other_crops_grown TEXT,'
          
          +'yield_of_maize_with_adequate_rain_per_acre TEXT,'
          +'yield_of_beans_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sesame_with_adequate_rain_per_acre TEXT,'
          +'yield_of_soyabean_with_adequate_rain_per_acre TEXT,'
          +'yield_of_rice_with_adequate_rain_per_acre TEXT,'
          +'yield_of_millet_with_adequate_rain_per_acreg TEXT,'
          +'yield_of_sorghum_with_adequate_rain_per_acre TEXT,'
          +'yield_of_irish_potatoes_with_adequate_rain_per_acre TEXT,'
          +'yield_of_cotton_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sweet_potatoes_with_adequate_rain_per_acre TEXT,'
          +'yield_of_sunflower_with_adequate_rain_per_acre TEXT,'
          +'yield_of_groundnuts_with_adequate_rain_per_acre TEXT,'
          +'yield_of_coffee_with_adequate_rain_per_acre TEXT,'
          +'yield_of_banana_with_adequate_rain_per_acre TEXT,'
          +'yield_of_cassava_with_adequate_rain_per_acre TEXT,'
          +'crops_stored_from_last_season TEXT,'
          +'storage_time TEXT,'
          +'disturbances_in_storage TEXT,'
          +'Specify_others TEXT,'
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
          
          +'Did_you_apply_fertilizer TEXT,'
          +'Specify_the_type TEXT,'
          +'organic_specify TEXT,'
          +'Specify_other_organic TEXT,'
          +'inorganic_Specify TEXT,'
          +'use_pesticides_or_herbicides TEXT,'
          +'Please_specify_which_one TEXT,'
          +'pesticide_effectiveness TEXT,'
          +'crop_use TEXT,'
          
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
          +'crops_grown_last_season TEXT,'  
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
          +'subscribed_to_info_svces_on_ph TEXT,'  
          +'services_suscribed_to TEXT,'  
          +'training_on_using_phone_servic TEXT,'  
          +'training_on_weather_alerts TEXT,'  
          +'trainig_on_insurance TEXT,'  
          +'Who_provided_the_training_on_insurance TEXT,'  
          
          +'probs_of_using_cellphone TEXT)', 
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

  async addDetails(consent: boolean, farmers_name:string, do_you_have_disability:string, disability_type:string) {
    let data = [consent, farmers_name, do_you_have_disability,disability_type];
    this.dbInstance.executeSql('insert into DETAILS(consent, farmers_name, do_you_have_disability,disability_type) VALUES(?,?,?,?)', data)
      .catch(e => console.log(e));
      this.router.navigate(['/beneficiary']);
    return this.getAllRecords();
  }

 
  async deleteDetails(id: number) {
    this.dbInstance.executeSql('DELETE FROM DETAILS WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
    
  }

}