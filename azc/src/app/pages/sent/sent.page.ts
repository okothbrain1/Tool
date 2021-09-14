import { DatabaseService, DetailsInterface } from './../../services/database.service';
import { Database2Service, Details2Interface  } from './../../services/database2.service';
import { Database3Service, Details3Interface  } from './../../services/database3.service';
import { Database4Service, Details4Interface  } from './../../services/database4.service';
import { Database5Service, Details5Interface  } from './../../services/database5.service';
import { DatabaseSentService, Details6Interface  } from '../../services/databaseSent.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { DatasetService } from '../../providers/dataset.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sent',
  templateUrl: './sent.page.html',
  styleUrls: ['./sent.page.scss'],
})
export class SentPage implements OnInit {

  selectedView = 'devs';
id: number;
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
phone_:string="";
do_export:string="";
fo: string=""; //name of then submitter

disabledButton;

 // developers: Dev[] = [];

  details: DetailsInterface[];
  //  Yapp interface
  id2: number;
  Name: string="";
  gender: string="";
  age: string="";
  phone: string="";
  live: string="";
  nearest_township: string="";
  select_qualification: string="";
  specify_qualification: string="";
  institution: string="";
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
  details2: Details2Interface[];
  datastorage: any;
  name: string;
  token: string;
 
  //Agribulker attributes
  details3: Details3Interface[];
  id3:number;
  name_of_agribulker:string;
  registered_as:string;
  registered_as_others:string;
  longitude_agri:string;
  latitude_agri:string;
  agri_street_address:string;
  agri_website:string;
  email_address:string;
  //business_telephone:string;
  //name_contact_person:string;
  proprietor_the_contact_person:string;
  name_of_proprietor:string;
  contact_photo_url:string;
  gender_of_proprietor:string;
  title_of_proprietor:string;
  //contact_person_mobile:string;
  education_level:string;
  available_docs:any[];
  business_reg_status:string;
  reg_number:string;
  institute_organogram:any[];
  annual_meetings:string;
  management_committee_meetings:string;
  management_meetings:string;
  mgt_from_board:string;
  regular_elections:string;
  guiding_policy_doc:any[];
  no_of_tech_team:string;
  size_of_land:string;
  land_ownership:string;
  office_ownership:string;
  bulking_unit:string;
  org_charged_over:any[];
  //business_type:string;
  business_type_others:string;
  existing_db:string;
  average_acreage:string;
  farmer_groups_no:string;
  groups_submitted:any[];
  number_of_members:string;
  know_no_of:any[];
  members_in_previous_years_2018:string;

  members_in_previous_years_2019:string;
  members_in_previous_years_2020:string;
  members_in_previous_years_2021:string;
  have_membership_fee:string;
  members_paid_uptodate:string;
  provision_for_inclusion:string;
  conduct_membership_satisfaction:string;
  source_of_revenue:string;
  major_funding_source:string;
  //total_investment:string;
  total_cost_operation:string;
  total_annual_sales:string;
  total_asset:string;
  mode_of_remittances:string;
  record_of_sales:string;
  financial_mgt:string;
  internal_audit:string;
  are_audits_done:string;
  agency_audit:string;
  when_was_audit:string;
  other_sources_of_income:string;
  minute_book:string;
  bank_book:string;
  bank_account:string;
  ME_system:string;
  credit_facility:string;
  credit_facility_due_date:string;
  financial_statement_photo:string;
  main_business_sector:string;
  main_customers:string;
  crops_bulked:any[];
  Quantity_bulked_2017:any[];
  Quantity_bulked_2018:any[];
  Quantity_bulked_2019:any[];
  Quantity_bulked_2020:any[];
  total_sales_bulked_2017: any[];
  total_sales_bulked_2018:any[];
  total_sales_bulked_2019:any[];
  total_sales_bulked_2020:any[];
  calculated_cost_per_kg:any[];
  sales_in_inputs:string;
  storage_facility:string;
  value_addition_facility:string;
  value_addition_levels:any[];
  collect_products:string;
  facilitate_access_credit:string;
  extend_credit_services:string;
  no_of_loans_2017:string;
  no_of_loans_2018:string;
  no_of_loans_2019:string;
  no_of_loans_2020:string;
  
  loan_interest_rate:string;
  year_of_establishment:string;
  main_challenges:string;
  major_impact_on_people:string;
  public_partnership:string;
  services_you_access:any[];
  services_you_access_specify:string;
  partnerships_with_donors:string;
  access_information:string;
  technology_uptake:any[];
  technology_uptake_others:string;
  training:any[];
  access_to_electricity:string;
  other_forms_of_energy:any[];
  access_to_water:string;
  location_name:string;
  village_agri:string;

  //Farmer group attributes
  details4: Details4Interface[];
  id4:number;
  farmer_group_name:string;
  district_subcounty_fg:string;
  parish_fg:string;
  village_fg:string;
  meeting_venue:string;
  longitude_group:string;
  latitude_group:string;
  group_chairperson:string;
  chairperson_contact:string;
  secretary:string;
  secretary_contact:string;
  have_farmer_db:string;
  number_of_farmers:string;
  females:string;
  males:string;
  list_of_farmers:any[];
  members_in_group:string;
  main_enterprise:string;
  type_of_group_records:string;
  group_obtain_VSLA:string;
  people_took_loan:string;
  payback_percentage:string;
  mode_of_payment:string;
  group_total_loan:string;

  details6:Details6Interface[];
   //iNTERFACE FOR CASA DATA
   id6:number; //added
   consent:boolean;	//same as check agree.
   farmers_name:string;
   do_you_have_disability:string;
   disability_type:string;
   la1:string;
   lo1:string;
   acc1:string;
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
 //region:string;
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
 dependants_age_bracket:any[];
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
 //number_of_employees:string;
 livestock:string;
 specify_livestock:string;
 cattle_number:number;
 goat_number:number;
 sheep_number:number;
 chicken_number:number;
 pigs_number:number;
 donkey_number:number;
 Did_you_plant_last_season:string;
 crops_grown_last_season:any[];
 crops_grown_last_season2:any[];
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
 yield_last_season2:any[];
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
 //training: any[];
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
 
 //newly added fields
 sell_of_produce: string;
 date_of_harvest:string;
 specify_crops_for_new_season:string;
 rabbit_number:number;
 farm_size_husbandry:string;
 livestock_breed:string;
 livestock_pdts:string
 livestock_record:string;
 livestock_added:string;
 livestock_sold:string;
 livestock_sold_price:string;
 livestock_milk_produced:string;
 livestock_sales_income:string;
 fooder_produce:string;
 suppliment_livestock:string;
 concentrates_feeding:string;
 livestock_feeding_cost:string;
 livestock_healthsvcs:string;
 livestock_healthsvcs_arrival:string;
 livestock_healthsvcs_types: any[];
 livestock_death:string;
 livestock_death_cause:string;
 livestock_health_cost:string;
 livestock_type:string;
 preservation_mtds:string; //similar to preservation
 planting_season:string;
 effective_sell_channel:string;
 reason_for_channel:string;
 need_loan:string;
 loan_amount:string;
 loan_security: any[];
 loan_purpose: any[];
 specify_loan_ammount:any[];
 first_payment_date:string;
 loan_period_xpctd:string;
 la_security:string;
 lo_security:string;
 loan_failure_strategy:string;
 agric_ext_provider: any[]; //changed to provider
 other_extension_channel_receive:string;
 specify_training_mobilephones:string;
 mostusedapp_mobilephones:string;
 agribulker_belong:string;
 group_belong:string;
 //more 10 records
spouse_name:string;
DOB_spouse:string;
first_child_name:string;
dob_first_child:string;
second_child_name:string;
dob_second_child:string;
third_child_name:string;
dob_third_child:string;
forth_child_name:string;
dob_forth_child:string;
geoshape:string;
acreage:string;
  constructor(
    private storage: Storage,
    private db: DatabaseService,
    private db2: Database2Service,
    private db3: Database3Service,
    private db4: Database4Service,
    private db6: DatabaseSentService,
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
      //this.network.initializeNetworkEvents();
    }, 300);
    this.db2.getAllDetails().then(data2 => this.details2 = data2);

    this.db3.getAllDetails().then(data3 => this.details3 = data3);
    this.db4.getAllDetails().then(data4 => this.details4 = data4);
    this.db6.getAllDetails().then(data6 => this.details6 = data6);
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

  deleteDetails2(id2: number) {
    this.db2.deleteDetails(id2)
      .then(data2 => this.details2 = data2);
      this.presentToast("You have deleted the Yap activity");     
  }

  deleteDetails3(id3: number) {
    this.db3.deleteDetails(id3)
      .then(data3 => this.details3 = data3);
      this.presentToast("You have deleted the Yap activity");     
  }
  deleteDetails4(id4: number) {
    this.db4.deleteDetails(id4)
      .then(data4 => this.details4 = data4);
      this.presentToast("You have deleted the Yap activity");     
  }
  deleteDetails6(id6: number) {
    this.db6.deleteDetails(id6)
      .then(data6 => this.details6 = data6);
      this.presentToast("You have deleted the farmer data");     
  }

  dismissOnSubmit(id: number){
    this.db.deleteDetails(id)
      .then(data => this.details = data);
    this.presentToast("Your activity has been submitted successfully");
  }
  dismissOnSubmit2(id2: number){
    this.db2.deleteDetails(id2)
      .then(data2 => this.details2 = data2);
    this.presentToast("Your activity has been submitted successfully");
  }
  dismissOnSubmit3(id3: number){
    this.db3.deleteDetails(id3)
      .then(data3 => this.details3 = data3);
    this.presentToast("Your activity has been submitted successfully");
  }
  dismissOnSubmit4(id4: number){
    this.db4.deleteDetails(id4)
      .then(data4 => this.details4 = data4);
    this.presentToast("Your activity has been submitted successfully");
  }
  dismissOnSubmit6(id6: number){
    this.db6.deleteDetails(id6)
      .then(data6 => this.details6 = data6);
    this.presentToast("Your activity has been submitted successfully");
  }

async SubmitOfflineData(id: number, Name_of_enterprise: string,region:string,district:string,specify_other_districts:string,street_address:string,lo:string,la:string,acc:string,business_telephone:string,website:string,email:string,year_established:string,number_of_employees:string,business_sector:string,business_activity:string,list_of_pdts_svcs:string,name_contact_person:string,contact_person_mobile:string,title_of_contact_person:string,references_main_customers:string,total_investment:string,total_assets_value:string,gross_annual_sales:string,annual_export_turnover:string,needs_or_challenges:string,business_type:string,company_reg_status:string,company_registration_number_allocated:string,submittername:string,title:string,fo:string,phone_:string,do_export:string, token:string){
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait as we upload your offline data',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'submit',
          Name_of_enterprise:Name_of_enterprise,
          region:region,
          district:district,
          specify_other_districts:specify_other_districts,
          street_address:street_address,
          lo: lo,
          la: la,
          acc:acc,
          business_telephone:business_telephone,
          website: website,
          email:email ,
          year_established:year_established ,
          number_of_employees:number_of_employees ,
          business_sector:business_sector ,
          business_activity:business_activity,
          list_of_pdts_svcs:list_of_pdts_svcs,
          name_contact_person:name_contact_person ,
          contact_person_mobile:contact_person_mobile ,
          title_of_contact_person:title_of_contact_person,
          references_main_customers:references_main_customers ,
          total_investment: total_investment, 
          total_assets_value: total_assets_value,
          gross_annual_sales:gross_annual_sales,
          annual_export_turnover:annual_export_turnover,
          needs_or_challenges:needs_or_challenges ,
          business_type:business_type ,
          company_reg_status:company_reg_status ,
          company_registration_number_allocated:company_registration_number_allocated,
          submittername:submittername,
          title:title,
          fo:fo,
          phone_:phone_,
          do_export:do_export,
          token:token
          }
          this.accsPrvds.postData(body, 'reg.php').subscribe((res:any)=> {
                      if(res.success==true){
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                          this.router.navigate(['/sent']);
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

async SubmitOfflineData_yapp(id2: number, Name:string,gender:string,age:string,phone:string,email:string,live:string,nearest_township:string,select_qualification:string,specify_qualification:string,institution:string,qualification:string,year_of_q:string,work_experience:string,specify_areas_of_experience:string,position:string,employers:string,interest:string,specify_interest:string,skills:string,other_skills:string,recommend:string,fo:string,token:string){
  this.disabledButton = true;
  const loader = await this.loadingCtrl.create({
    message: 'please wait as we upload your yapp offline data',
  });
  loader.present();

  return new Promise(resolve => {
      let body = {
        aski:'submit',
        Name:Name,
        gender:gender,
        age:age,
        phone:phone,
        email:email,
        live:live,
        nearest_township: nearest_township,
        select_qualification: select_qualification,
        specify_qualification:specify_qualification,
        institution:institution,
        qualification:qualification,
        year_of_q:year_of_q,
        work_experience:work_experience,
        specify_areas_of_experience:specify_areas_of_experience ,
        position:position,
        employers:employers,
        interest:interest,
        specify_interest: specify_interest,
        skills:skills,
        other_skills:other_skills,
        recommend:recommend,
        fo:fo,
        token:token                
        }
        this.accsPrvds.postData(body, 'yapp.php').subscribe((res:any)=> {
                    if(res.success==true){
                        loader.dismiss();
                        this.disabledButton = false;
                        this.presentToast(res.msg);
                        this.router.navigate(['/sent']);
                        this.dismissOnSubmit2(id2);

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

//for the agribulker
async SubmitOfflineData_agri(id3: number, name_of_agribulker:string,registered_as:string,registered_as_others:string,longitude_agri:string,latitude_agri:string,agri_street_address:string,agri_website:string,email_address:string,business_telephone:string,name_contact_person:string,proprietor_the_contact_person:string,name_of_proprietor:string,contact_photo_url:string,gender_of_proprietor:string,title_of_proprietor:string,contact_person_mobile:string,education_level:string,available_docs:any[],business_reg_status:string,reg_number:string,institute_organogram:any[],annual_meetings:string,management_committee_meetings:string,management_meetings:string,mgt_from_board:string,regular_elections:string,guiding_policy_doc:any[],no_of_tech_team:string,size_of_land:string,land_ownership:string,office_ownership:string,bulking_unit:string,org_charged_over:any[],business_type:string,business_type_others:string,existing_db:string,average_acreage:string,farmer_groups_no:string,groups_submitted:any[],number_of_members:string,know_no_of:any[],members_in_previous_years_2018:string,members_in_previous_years_2019:string,members_in_previous_years_2020:string,members_in_previous_years_2021:string,have_membership_fee:string,members_paid_uptodate:string,provision_for_inclusion:string,conduct_membership_satisfaction:string,source_of_revenue:string,major_funding_source:string,total_investment:string,total_cost_operation:string,total_annual_sales:string,total_asset:string,mode_of_remittances:string,record_of_sales:string,financial_mgt:string,internal_audit:string,are_audits_done:string,agency_audit:string,when_was_audit:string,other_sources_of_income:string,minute_book:string,bank_book:string,bank_account:string,ME_system:string,credit_facility:string,credit_facility_due_date:string,financial_statement_photo:string,main_business_sector:string,main_customers:string,crops_bulked:any[],Quantity_bulked_2017:any[],Quantity_bulked_2018:any[],Quantity_bulked_2019:any[],Quantity_bulked_2020:any[],total_sales_bulked_2017: any[],total_sales_bulked_2018:any[],total_sales_bulked_2019:any[],total_sales_bulked_2020:any[],calculated_cost_per_kg:any[],sales_in_inputs:string,storage_facility:string,value_addition_facility:string,value_addition_levels:any[],collect_products:string,facilitate_access_credit:string,extend_credit_services:string,no_of_loans_2017:string, no_of_loans_2018:string, no_of_loans_2019:string, no_of_loans_2020:string,loan_interest_rate:string,year_of_establishment:string,main_challenges:string,major_impact_on_people:string,public_partnership:string,services_you_access:any[],services_you_access_specify:string,partnerships_with_donors:string,access_information:string,technology_uptake:any[],technology_uptake_others:string,training:any[],access_to_electricity:string,other_forms_of_energy:any[],access_to_water:string,location_name:string,village_agri:string,fo: string,token: string){
  this.disabledButton = true;
  const loader = await this.loadingCtrl.create({
    message: 'please wait as we upload your agribulker offline data',
  });
  loader.present();

  return new Promise(resolve => {
      let body = {
        aski:'submit',
        name_of_agribulker:name_of_agribulker,
        registered_as:registered_as,
        registered_as_others:registered_as_others,
        longitude_agri:longitude_agri,
        latitude_agri:latitude_agri,
        agri_street_address:agri_street_address,
        agri_website:agri_website,
        email_address:email_address,
        business_telephone:business_telephone,
        name_contact_person:name_contact_person,
        proprietor_the_contact_person:proprietor_the_contact_person,
        name_of_proprietor:name_of_proprietor,
        contact_photo_url:contact_photo_url,
        gender_of_proprietor:gender_of_proprietor,
        title_of_proprietor:title_of_proprietor,
        contact_person_mobile:contact_person_mobile,
        education_level:education_level,
        available_docs:available_docs,
        business_reg_status:business_reg_status,
        reg_number:reg_number,
        institute_organogram:institute_organogram,
        annual_meetings:annual_meetings,
        management_committee_meetings:management_committee_meetings,
        management_meetings:management_meetings,
        mgt_from_board:mgt_from_board,
        regular_elections:regular_elections,
        guiding_policy_doc:guiding_policy_doc,
        no_of_tech_team:no_of_tech_team,
        size_of_land:size_of_land,
        land_ownership:land_ownership,
        office_ownership:office_ownership,
        bulking_unit:bulking_unit,
        org_charged_over:org_charged_over,
        business_type:business_type,
        business_type_others:business_type_others,
        existing_db:existing_db,
        average_acreage:average_acreage,
        farmer_groups_no:farmer_groups_no,
        groups_submitted:groups_submitted,
        number_of_members:number_of_members,
        know_no_of:know_no_of,
        members_in_previous_years_2018:members_in_previous_years_2018,
        members_in_previous_years_2019:members_in_previous_years_2019,
        members_in_previous_years_2020:members_in_previous_years_2020,
        members_in_previous_years_2021:members_in_previous_years_2021,
        have_membership_fee:have_membership_fee,
        members_paid_uptodate:members_paid_uptodate,
        provision_for_inclusion:provision_for_inclusion,
        conduct_membership_satisfaction:conduct_membership_satisfaction,
        source_of_revenue:source_of_revenue,
        major_funding_source:major_funding_source,
        total_investment:total_investment,
        total_cost_operation:total_cost_operation,
        total_annual_sales:total_annual_sales,
        total_asset:total_asset,
        mode_of_remittances:mode_of_remittances,
        record_of_sales:record_of_sales,
        financial_mgt:financial_mgt,
        internal_audit:internal_audit,
        are_audits_done:are_audits_done,
        agency_audit:agency_audit,
        when_was_audit:when_was_audit,
        other_sources_of_income:other_sources_of_income,
        minute_book:minute_book,
        bank_book:bank_book,
        bank_account:bank_account,
        ME_system:ME_system,
        credit_facility:credit_facility,
        credit_facility_due_date:credit_facility_due_date,
        financial_statement_photo:financial_statement_photo,
        main_business_sector:main_business_sector,
        main_customers:main_customers,
        crops_bulked:crops_bulked,
        Quantity_bulked__2017:Quantity_bulked_2017,
        Quantity_bulked_2018:Quantity_bulked_2018,
        Quantity_bulked_2019:Quantity_bulked_2019,
        Quantity_bulked_2020:Quantity_bulked_2020,
        total_sales_bulked_2017: total_sales_bulked_2017,
        total_sales_bulked_2018:total_sales_bulked_2018,
        total_sales_bulked_2019:total_sales_bulked_2019,
        total_sales_bulked_2020:total_sales_bulked_2020,
        calculated_cost_per_kg:calculated_cost_per_kg,
        sales_in_inputs:sales_in_inputs,
        storage_facility:storage_facility,
        value_addition_facility:value_addition_facility,
        value_addition_levels:value_addition_levels,
        collect_products:collect_products,
        facilitate_access_credit:facilitate_access_credit,
        extend_credit_services:extend_credit_services,
        no_of_loans_2017:no_of_loans_2017,
        no_of_loans_2018:no_of_loans_2018,
        no_of_loans_2019:no_of_loans_2019,
        no_of_loans_2020:no_of_loans_2020,
        loan_interest_rate:loan_interest_rate,
        year_of_establishment:year_of_establishment,
        main_challenges:main_challenges,
        major_impact_on_people:major_impact_on_people,
        public_partnership:public_partnership,
        services_you_access:services_you_access,
        services_you_access_specify:services_you_access_specify,
        partnerships_with_donors:partnerships_with_donors,
        access_information:access_information,
        technology_uptake:technology_uptake,
        technology_uptake_others:technology_uptake_others,
        training:training,
        access_to_electricity:access_to_electricity,
        other_forms_of_energy:other_forms_of_energy,
        access_to_water:access_to_water,
        location_name:location_name,
        village_agri:village_agri,
        fo: fo,
        token: token,
        //More 10 columns

        }
        this.accsPrvds.postData(body, 'agribulker.php').subscribe((res:any)=> {
                    if(res.success==true){
                        loader.dismiss();
                        this.disabledButton = false;
                        this.presentToast(res.msg);
                        this.router.navigate(['/sent']);
                        this.dismissOnSubmit3(id3);

                    }else{
                      loader.dismiss();
                      this.disabledButton = false;
                      this.presentToast(res.msg);
                    }
              },(err)=>{
                loader.dismiss();
                this.disabledButton = false;
                this.AlertforOfflineSubmission_agri('Check your internet');
                console.log('Error ', err);
        });
  });

}

//for the farmer profiling
async SubmitOfflineData_farmer_gp(id4: number, farmer_group_name:string,district_subcounty_fg:string,parish_fg:string,village_fg:string,meeting_venue:string,longitude_group:string,latitude_group:string,group_chairperson:string,chairperson_contact:string,secretary:string,secretary_contact:string,have_farmer_db:string,number_of_farmers:string,females:string,males:string,list_of_farmers:any[],members_in_group:string,main_enterprise:string,type_of_group_records:string,group_obtain_VSLA:string,people_took_loan:string,payback_percentage:string,mode_of_payment:string,group_total_loan:string,fo: string,token: string){
  this.disabledButton = true;
  const loader = await this.loadingCtrl.create({
    message: 'please wait as we upload your agribulker offline data',
  });
  loader.present();

  return new Promise(resolve => {
      let body = {
        aski:'submit',
        farmer_group_name:farmer_group_name,
        district_subcounty_fg:district_subcounty_fg,
        parish_fg:parish_fg,
        village_fg:village_fg,
        meeting_venue:meeting_venue,
        longitude_group:longitude_group,
        latitude_group:latitude_group,
        group_chairperson:group_chairperson,
        chairperson_contact:chairperson_contact,
        secretary:secretary,
        secretary_contact:secretary_contact,
        have_farmer_db:have_farmer_db,
        number_of_farmers:number_of_farmers,
        females:females,
        males:males,
        list_of_farmers:list_of_farmers,
        members_in_group:members_in_group,
        main_enterprise:main_enterprise,
        type_of_group_records:type_of_group_records,
        group_obtain_VSLA:group_obtain_VSLA,
        people_took_loan:people_took_loan,
        payback_percentage:payback_percentage,
        mode_of_payment:mode_of_payment,
        group_total_loan:group_total_loan,
        fo: fo,
        token: token
        }
        this.accsPrvds.postData(body, 'farmergroup.php').subscribe((res:any)=> {
                    if(res.success==true){
                        loader.dismiss();
                        this.disabledButton = false;
                        this.presentToast(res.msg);
                        this.router.navigate(['/sent']);
                        this.dismissOnSubmit4(id4);

                    }else{
                      loader.dismiss();
                      this.disabledButton = false;
                      this.presentToast(res.msg);
                    }
              },(err)=>{
                loader.dismiss();
                this.disabledButton = false;
                this.AlertforOfflineSubmission_farmer_gp('Check your internet');
                console.log('Error ', err);
        });
  });

}


async SubmitOfflineData_farmer_pt_sent(id6: number, consent: boolean, farmers_name:string, do_you_have_disability:string, disability_type:string,own_a_mobile_phone:string,What_type_of_phone_do_you_own:string,No_of_contacts:number,tel_no1:string,tel_No_2:string,service_provider:string,Specify_svc_provider:string,mm_reg_status:string,registered_mm_number:string,nin:string,ID_photo_url:string,Photo_url:string,occupation:string,specify_other_occupation:string,Martial_status:string,What_is_your_gender:string,name_of_husband:string,number_of_wives_husbands:string,name_first_wife:string,name_second_wife:string,status_in_a_family:string,next_of_kin:string,next_of_kin_has_contact:string,next_of_kin_phone_no:string,region:string,distr:string,other_district:string,subcounty:string,other_subcounty:string,subcounty_other_district:string,soiltype:string,parish: string,village:string,nearest_town:string,Local_council1_name:string,resident_since:string,Description_of_location:string,DOB:string,level_of_education:string,head_of_the_household:string,la1:string,lo1:string,acc1:string,Mobile_literacy:string,any_dependants:string,dependant_no:string,dependants_age_bracket:any[],belong_farmergp:string,name_farmergp:string,position_in_FO:string,Your_position_in_the_fo:string,male_members_in_FO:string,female_members_in_FO:string,Affiliation:string,Name_of_connected_ACE_or_DFA:string,main_income_source:string,mainincome_since:string,sector:string,main_income_relaibility:string,main_income_amount:string,annual_income:number,other_income_sources:string,other_income_activity:string,years_of_experince:string,other_income_reliability:string,amount:number,income_trend:string,access_to_Health_services:string,health_expense:number,school_going_children:string,no_of_school_going_children:number,school_fees_expense:string,what_is_the_land_tenor:string,Specify_other:string,value_of_land:string,own_any_farm_machinery:any[],house_ownership:string,house_structure:string,Farm_size:number,total_land_size:number,Main_crop_enterprise:string,landsize_main_crop_enterprise:number,additional_land_main_enterprise:number,yield_expected_main_enterprise:string,farm_at_residence:string,la2:string,lo2:string,acc2:string,crops_for_new_season:any[],other_crops_intended:string,in_business_since:any[],number_of_employees:string,livestock:string,specify_livestock:string,cattle_number:number,goat_number:number,sheep_number:number,chicken_number:number,pigs_number:number,Did_you_plant_last_season:string,crops_grown_last_season:any[],crops_grown_last_season2:any[],Specify_other_crops_grown:string,yield_of_maize_with_adequate_rain_per_acre:number,yield_of_beans_with_adequate_rain_per_acre:number,yield_of_sesame_with_adequate_rain_per_acre:number,yield_of_soyabean_with_adequate_rain_per_acre:number,yield_of_rice_with_adequate_rain_per_acre:number,yield_of_millet_with_adequate_rain_per_acre:number,yield_of_sorghum_with_adequate_rain_per_acre:number,yield_of_irish_potatoes_with_adequate_rain_per_acre:number,yield_of_cotton_with_adequate_rain_per_acre:number,yield_of_sweet_potatoes_with_adequate_rain_per_acre:number,yield_of_sunflower_with_adequate_rain_per_acre:number,yield_of_groundnuts_with_adequate_rain_per_acre:number,yield_of_coffee_with_adequate_rain_per_acre:number,yield_of_banana_with_adequate_rain_per_acre:number,yield_of_cassava_with_adequate_rain_per_acre:number,crops_stored_from_last_season:string,storage_time:string,disturbances_in_storage:string,Specify_others:string,yield_last_season:any[],yield_last_season2:any[],yield_with_drought:any[],year_of_severe_drought:string,how_much_seed:any[],maize_per_kg: number,beans_per_kg:number,rice_per_kg: number,sesame_per_kg: number,soyabean_per_kg:number,millet_per_kg: number,sorghum_per_kg: number,irish_potatoes_per_kg:number,cotton_per_kg:number,sweet_potatoes_per_kg:number,sunflower_per_kg: number,ground_nuts_per_kg: number,coffee_per_kg: number,Banana_per_bunch:number,cassava_per_kg: number,seed_variety:any[],Did_you_apply_fertilizer:string,Specify_the_type:string,organic_specify:string,Specify_other_organic:string,inorganic_Specify:any[],fertilizer_type:any[],fertilizer_amount:any[],use_pesticides_or_herbicides:string,Please_specify_which_one:string,crop_use:string,crop_subsistence:any[],crop_commercial:any[],income_from_crops:any[],employ_any_farm_labour:string,Specify_their_task:any[],Who_assisted_you:any[],How_much_did_you_pay_them,Are_you_aware_of_climate_shock:string,which_ones_you_are_aware_of:string,training_on_addressing_climate:string,Please_specify:any[],Which_crops_for_rotation:string,_1st_choice:string,_2nd_choice:string,_3rd_choice:string,knoledge_of_rain_date:string,heard_of_agri_insurance:string,access_to_agri_insurance:string,Please_specify_the_agri_insurance_type:any[],Specify_the_insurance_provider: string,fair_charge_for_insurance: string,prefer_ordinary_or_az_bunlde: string,challenges_last_season: any[],Specify: string,What_type_of_pests: string,type_of_weather_and_effect: string,Do_you_have_a_bank_account: string,financial_access: string,transaction_monthly_costs: string,Specify_other_monthly_transaction_costs: string,travel_distance:string,specify_other_travel_distance:string,Have_you_ever_received_credit: string,no_of_times_borrowed: string,loanoutstanding: string,How_much_repayment_was_made_per_month: string,delay_time_for_repayment: string,How_do_you_keep_your_money: any[],financial_transaction_challeng: any[],Specify_Other_financial_transaction_challeng: string,action_access_to_financial_svc: string,access_to_agric_ext_services: string,How_do_you_access_Agric_ext_sv: any[],extension_type_channel_receive: any[],Do_you_receive_weather_data: string,access_to_weather_data:any[],How_accurate_is_the_info: string,most_harmful_info: string,biggest_prob_in_data_access: string,spend_on_your_phone_monthly: string,main_phone_use: any[],Voice_calling_and_receiving:string,SMS:string,Internet:string,Social_media:string,subscribed_to_info_svces_on_ph: string,services_suscribed_to:any[],training_on_using_phone_servic:string,training_on_weather_alerts: string,Who_provided_the_training_on_weather_alerts: string,Who_provided_the_training_on_insurance: string,probs_of_using_cellphone: any[],farmers_cooperation_responding:string,how_well_agent_knows_beneficiary:string,accuracy_of_info_collected:string,data_quality:string,sell_of_produce:string,date_of_harvest:string,specify_crops_for_new_season:string,rabbit_number:number,farm_size_husbandry:string,livestock_breed:string,livestock_pdts:string,livestock_record:string,livestock_added:string,livestock_sold:string,livestock_sold_price:string,livestock_milk_produced:string,livestock_sales_income:string,fooder_produce:string,suppliment_livestock:string,concentrates_feeding:string,livestock_feeding_cost:string,livestock_healthsvcs:string,livestock_healthsvcs_arrival:string,livestock_healthsvcs_types:any[],livestock_death:string,livestock_death_cause:string,livestock_health_cost:string,livestock_type:string,preservation_mtds:string,planting_season:string,effective_sell_channel:string,reason_for_channel:string,need_loan:string,loan_amount:string,loan_security:any[],loan_purpose:any[],specify_loan_ammount:any[],first_payment_date:string,loan_period_xpctd:string,la_security:string,lo_security:string,loan_failure_strategy:string,agric_ext_provider:any[],other_extension_channel_receive:string,specify_training_mobilephones:string,mostusedapp_mobilephones:string,agribulker_belong:string,group_belong:string,fo:string,token:string,spouse_name:string,DOB_spouse:string,first_child_name:string,dob_first_child:string,second_child_name:string,dob_second_child:string,third_child_name:string,dob_third_child:string,forth_child_name:string,dob_forth_child:string,geoshape:string,acreage:string){
  this.disabledButton = true;
  const loader = await this.loadingCtrl.create({
    message: 'please wait as we upload the farmer offline data',
  });
  loader.present();

  return new Promise(resolve => {
      let body = {
        aski:'submit',
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
        //Gps cordinates for the location
        la1:la1,
        lo1:lo1,
        acc1:acc1,
        //gps main enterprise
        la2:la2,
        lo2:lo2,
        acc2:acc2,

        Mobile_literacy:Mobile_literacy,
        any_dependants:any_dependants,
        dependant_no:dependant_no,
        dependants_age_bracket:dependants_age_bracket,
        //Casa Data 
        belong_farmergp:belong_farmergp,
        name_farmergp:belong_farmergp,
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
        //Include the columns that are in a loop for other sources of income these are to be put in a separate table
        other_income_activity:other_income_activity,
        years_of_experince:years_of_experince,
        other_income_reliability:other_income_reliability,
        amount:amount,
        //end columns for other income loop            
        income_trend:income_trend,
        access_to_Health_services:access_to_Health_services,
        health_expense:health_expense,
        school_going_children:school_going_children,
        no_of_school_going_children:no_of_school_going_children,
        school_fees_expense:school_fees_expense,
        what_is_the_land_tenor:what_is_the_land_tenor,
        Specify_other:Specify_other,
        value_of_land:value_of_land,
        own_any_farm_machinery:own_any_farm_machinery,
        house_ownership:house_ownership,
        house_structure:house_structure,
        Farm_size:Farm_size,
        total_land_size:total_land_size,
        Main_crop_enterprise:Main_crop_enterprise,
        landsize_main_crop_enterprise:landsize_main_crop_enterprise,
        additional_land_main_enterprise:additional_land_main_enterprise,
        yield_expected_main_enterprise:yield_expected_main_enterprise,
        farm_at_residence:farm_at_residence,
        //GPS_main_enterprise:GPS_main_enterprise,
        crops_for_new_season:crops_for_new_season,
        other_crops_intended:other_crops_intended,

        number_of_employees:number_of_employees,
        livestock:livestock,
        specify_livestock:specify_livestock,
        cattle_number:cattle_number,
        goat_number:goat_number,
        sheep_number:sheep_number,
        chicken_number:chicken_number,
        pigs_number:pigs_number,
        Did_you_plant_last_season:Did_you_plant_last_season,
        crops_grown_last_season:crops_grown_last_season,
        crops_grown_last_season2:crops_grown_last_season2,
        Specify_other_crops_grown:Specify_other_crops_grown,
        in_business_since:in_business_since,

        yield_with_drought:yield_with_drought,
        year_of_severe_drought:year_of_severe_drought,
        how_much_seed:how_much_seed,

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
        yield_last_season:yield_last_season,
        yield_last_season2:yield_last_season2,
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
        seed_variety:seed_variety,

        //More
        Did_you_apply_fertilizer:Did_you_apply_fertilizer,
        Specify_the_type:Specify_the_type,
        organic_specify:organic_specify,
        Specify_other_organic:Specify_other_organic,
        inorganic_Specify:inorganic_Specify,
        fertilizer_type:fertilizer_type,
        fertilizer_amount:fertilizer_amount,

        use_pesticides_or_herbicides:use_pesticides_or_herbicides,
        Please_specify_which_one:Please_specify_which_one,
        crop_use:crop_use,
        crop_subsistence:crop_subsistence,
        crop_commercial:crop_commercial,
        income_from_crops:income_from_crops,
        employ_any_farm_labour:employ_any_farm_labour,
        Specify_their_task:Specify_their_task,
        Who_assisted_you:Who_assisted_you,
        How_much_did_you_pay_them:How_much_did_you_pay_them,
        Are_you_aware_of_climate_shock:Are_you_aware_of_climate_shock,
        which_ones_you_are_aware_of:which_ones_you_are_aware_of,
        training_on_addressing_climate:training_on_addressing_climate,
        Please_specify:Please_specify,
        Which_crops_for_rotation:Which_crops_for_rotation,
        _1st_choice:_1st_choice,
        _2nd_choice:_1st_choice,
        _3rd_choice:_3rd_choice,

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
        Do_you_receive_weather_data:Do_you_receive_weather_data,
        access_to_weather_data:access_to_weather_data,
        How_accurate_is_the_info:How_accurate_is_the_info,
        most_harmful_info:most_harmful_info,
        biggest_prob_in_data_access:biggest_prob_in_data_access,
        spend_on_your_phone_monthly:spend_on_your_phone_monthly,
        main_phone_use:main_phone_use,

        Voice_calling_and_receiving:Voice_calling_and_receiving,
        SMS:SMS,
        Internet:Internet,
        Social_media:Social_media,
        subscribed_to_info_svces_on_ph:subscribed_to_info_svces_on_ph,
        services_suscribed_to: services_suscribed_to,
        training_on_using_phone_servic:training_on_using_phone_servic,
        training_on_weather_alerts:training_on_weather_alerts,
        Who_provided_the_training_on_weather_alerts:Who_provided_the_training_on_weather_alerts,
        Who_provided_the_training_on_insurance:Who_provided_the_training_on_insurance,
        probs_of_using_cellphone:probs_of_using_cellphone,
        field_officer:fo,
        farmers_cooperation_responding:farmers_cooperation_responding,
        how_well_agent_knows_beneficiary:how_well_agent_knows_beneficiary,
        accuracy_of_info_collected:accuracy_of_info_collected,
        data_quality:data_quality,

        sell_of_produce:sell_of_produce,
        date_of_harvest:date_of_harvest,
        specify_crops_for_new_season:specify_crops_for_new_season,
        rabbit_number:rabbit_number,
        farm_size_husbandry:farm_size_husbandry,
        livestock_breed:livestock_breed,
        llivestock_pdts:livestock_pdts,
        livestock_record:livestock_record,
        livestock_added:livestock_added,
        livestock_sold:livestock_sold,
        livestock_sold_price:livestock_sold_price,
        livestock_milk_produced:livestock_milk_produced,
        livestock_sales_income:livestock_sales_income,
        fooder_produce:fooder_produce,
        suppliment_livestock:suppliment_livestock,
        concentrates_feeding:concentrates_feeding,
        livestock_feeding_cost:livestock_feeding_cost,
        livestock_healthsvcs:livestock_healthsvcs,
        livestock_healthsvcs_arrival:livestock_healthsvcs_arrival,
        livestock_healthsvcs_types:livestock_healthsvcs_types,
        livestock_death:livestock_death,
        livestock_death_cause:livestock_death_cause,
        livestock_health_cost:livestock_health_cost,
        livestock_type:livestock_type,
        preservation_mtds:preservation_mtds,
        planting_season:planting_season,
        effective_sell_channel:effective_sell_channel,
        reason_for_channel:reason_for_channel,
        need_loan:need_loan,
        loan_amount:loan_amount,
        loan_security:loan_security,
        loan_purpose:loan_purpose,
        specify_loan_ammount:specify_loan_ammount,
        first_payment_date:first_payment_date,
        loan_period_xpctd:loan_period_xpctd,
        la_security:la_security,
        lo_security:lo_security,
        loan_failure_strategy:loan_failure_strategy,
        agric_ext_provider:agric_ext_provider,
        other_extension_channel_receive:other_extension_channel_receive,
        specify_training_mobilephones:specify_training_mobilephones,
        mostusedapp_mobilephones:mostusedapp_mobilephones,
        agribulker_belong:agribulker_belong,
        group_belong:group_belong,
        fo:fo,
        token:token,
        spouse_name:spouse_name,
DOB_spouse:DOB_spouse,
first_child_name:first_child_name,
dob_first_child:dob_first_child,
second_child_name:second_child_name,
dob_second_child:dob_second_child,
third_child_name:third_child_name,
dob_third_child:dob_third_child,
forth_child_name:forth_child_name,
dob_forth_child:dob_forth_child,
geoshape:geoshape,
acreage:acreage
        }
        this.accsPrvds.postData(body, 'process21.php').subscribe((res:any)=> {
                    if(res.success==true){
                        loader.dismiss();
                        this.disabledButton = false;
                        this.presentToast(res.msg);
                        this.router.navigate(['/sent']);
                        //this.dismissOnSubmit6(id6);
                    }else{
                      loader.dismiss();
                      this.disabledButton = false;
                      this.presentToast(res.msg);
                    }
              },(err)=>{
                loader.dismiss();
                this.disabledButton = false;
                this.AlertforOfflineSubmission_farmer_pt_sent('Check your internet');
                console.log('Error ', err);
        });
  });

}

/*async AlertforDuplicate(){

}*/

async AlertforOfflineSubmission(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          this.SubmitOfflineData(this.id,this.Name_of_enterprise,this.region,this.district,this.specify_other_districts,this.street_address,this.lo,this.la,this.acc,this.business_telephone,this.website,this.email,this.year_established,this.number_of_employees,this.business_sector,this.business_activity,this.list_of_pdts_svcs,this.name_contact_person,this.contact_person_mobile,this.title_of_contact_person,this.references_main_customers,this.total_investment,this.total_assets_value,this.gross_annual_sales,this.annual_export_turnover,this.needs_or_challenges,this.business_type,this.company_reg_status,this.company_registration_number_allocated,this.submittername,this.title,this.fo,this.phone_,this.do_export, this.token);          
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

async AlertforOfflineSubmission_yapp(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          this.SubmitOfflineData_yapp(this.id2,this.Name,this.gender,this.age,this.phone,this.email,this.live,this.nearest_township,this.select_qualification,this.specify_qualification,this.institution,this.qualification,this.year_of_q,this.work_experience,this.specify_areas_of_experience,this.position,this.employers,this.interest,this.specify_interest,this.skills,this.other_skills,this.recommend,this.fo, this.token);
          
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

async AlertforOfflineSubmission_agri(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          this.SubmitOfflineData_agri(this.id3,this.name_of_agribulker,this.registered_as,this.registered_as_others,this.longitude_agri,this.latitude_agri,this.agri_street_address,this.agri_website,this.email_address,this.business_telephone,this.name_contact_person,this.proprietor_the_contact_person,this.name_of_proprietor,this.contact_photo_url,this.gender_of_proprietor,this.title_of_proprietor,this.contact_person_mobile,this.education_level,this.available_docs,this.business_reg_status,this.reg_number,this.institute_organogram,this.annual_meetings,this.management_committee_meetings, this.management_meetings, this.mgt_from_board,this.regular_elections, this.guiding_policy_doc, this.no_of_tech_team,this.size_of_land,this.land_ownership,this.office_ownership,this.bulking_unit, this.org_charged_over,this.business_type,this.business_type_others, this.existing_db, this.average_acreage,this.farmer_groups_no,this.groups_submitted,this.number_of_members,this.know_no_of, this.members_in_previous_years_2018,this.members_in_previous_years_2019,this.members_in_previous_years_2020,this.members_in_previous_years_2021,this.have_membership_fee,this.members_paid_uptodate,this.provision_for_inclusion, this.conduct_membership_satisfaction,this.source_of_revenue, this.major_funding_source,this.total_investment, this.total_cost_operation,this.total_annual_sales,this.total_asset, this.mode_of_remittances,this.record_of_sales, this.financial_mgt,this.internal_audit,this.are_audits_done,this.agency_audit, this.when_was_audit,this.other_sources_of_income, this.minute_book,this.bank_book,this.bank_account,this.ME_system,this.credit_facility,this.credit_facility_due_date,this.financial_statement_photo, this.main_business_sector, this.main_customers,this.crops_bulked,this.Quantity_bulked_2017,this.Quantity_bulked_2018,this.Quantity_bulked_2019,this.Quantity_bulked_2020,this.total_sales_bulked_2017,this.total_sales_bulked_2018,this.total_sales_bulked_2019,this.total_sales_bulked_2020, this.calculated_cost_per_kg,this.sales_in_inputs,this.storage_facility,this.value_addition_facility, this.value_addition_levels,this.collect_products,this.facilitate_access_credit,this.extend_credit_services,this.no_of_loans_2017,this.no_of_loans_2018,this.no_of_loans_2019,this.no_of_loans_2020,this.loan_interest_rate,this.year_of_establishment,this.main_challenges,this.major_impact_on_people,this.public_partnership,this.services_you_access,this.services_you_access_specify,this.partnerships_with_donors,this.access_information,this.technology_uptake,this.technology_uptake_others,this.training,this.access_to_electricity,this.other_forms_of_energy,this.access_to_water,this.location_name,this.village_agri,this.fo,this.token);
          
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

async AlertforOfflineSubmission_farmer_gp(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          this.SubmitOfflineData_farmer_gp(this.id4,this.farmer_group_name,this.district_subcounty_fg,this.parish_fg,this.village_fg,this.meeting_venue,this.longitude_group,this.latitude_group,this.group_chairperson,this.chairperson_contact,this.secretary,this.secretary_contact,this.have_farmer_db,this.number_of_farmers,this.females,this.males,this.list_of_farmers,this.members_in_group,this.main_enterprise,this.type_of_group_records,this.group_obtain_VSLA,this.people_took_loan,this.payback_percentage,this.mode_of_payment,this.group_total_loan,this.fo,this.token);
          
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

async AlertforOfflineSubmission_farmer_pt_sent(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          this.SubmitOfflineData_farmer_pt_sent(this.id6,this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,this.next_of_kin,this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.Local_council1_name,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.belong_farmergp,this.name_farmergp,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.crops_for_new_season,this.other_crops_intended,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.crops_grown_last_season2,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_last_season2,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality,this.sell_of_produce,this.date_of_harvest,this.specify_crops_for_new_season,this.rabbit_number,this.farm_size_husbandry,this.livestock_breed,this.livestock_pdts,this.livestock_record,this.livestock_added,this.livestock_sold,this.livestock_sold_price,this.livestock_milk_produced,this.livestock_sales_income,this.fooder_produce,this.suppliment_livestock,this.concentrates_feeding,this.livestock_feeding_cost,this.livestock_healthsvcs,this.livestock_healthsvcs_arrival,this.livestock_healthsvcs_types,this.livestock_death,this.livestock_death_cause,this.livestock_health_cost,this.livestock_type,this.preservation_mtds,this.planting_season,this.effective_sell_channel,this.reason_for_channel,this.need_loan,this.loan_amount,this.loan_security,this.loan_purpose,this.specify_loan_ammount,this.first_payment_date,this.loan_period_xpctd,this.la_security,this.lo_security,this.loan_failure_strategy,this.agric_ext_provider,this.other_extension_channel_receive,this.specify_training_mobilephones,this.mostusedapp_mobilephones,this.agribulker_belong,this.group_belong,this.fo,this.token,this.spouse_name,this.DOB_spouse,this.first_child_name,this.dob_first_child,this.second_child_name,this.dob_second_child,this.third_child_name,this.dob_third_child,this.forth_child_name,this.dob_forth_child,this.geoshape,this.acreage);
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

  async presentAlertforDelete2(a:string, id2:number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete Activity',
          handler: () => {
            this.deleteDetails2(id2);
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

  async presentAlertforDelete3(a:string, id3:number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete Activity',
          handler: () => {
            this.deleteDetails3(id3);
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

  async presentAlertforDelete4(a:string, id4:number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete Activity',
          handler: () => {
            this.deleteDetails4(id4);
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

  async presentAlertforDelete6(a:string, id6:number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Delete Activity',
          handler: () => {
            this.deleteDetails6(id6);
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

    show:string="";
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
}
