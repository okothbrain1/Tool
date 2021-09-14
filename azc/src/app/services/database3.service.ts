import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { Router } from '@angular/router';
export interface Details3Interface {
  id3: number;
  name_of_agribulker:string;
  registered_as:string;
  registered_as_others:string;
  longitude_agri:string;
  latitude_agri:string;
  agri_street_address:string;
  agri_website:string;
  email_address:string;
  business_telephone:string;
  name_contact_person:string;
  proprietor_the_contact_person:string;
  name_of_proprietor:string;
  contact_photo_url:string;
  gender_of_proprietor:string;
  title_of_proprietor:string;
  contact_person_mobile:string;
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
  business_type:string;
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
  total_investment:string;
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
  Quantity_bulked:any[];
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
  fo: string; //name of the submitter
  token: string;
  }
@Injectable({
  providedIn: 'root'
})
export class Database3Service {
  private dbInstance: SQLiteObject;

  constructor( private sqlite: SQLite, private router:Router) {
  }

  async getAllDetails() {
    let details3: Details3Interface[] = [];
    return this.sqlite.create({ name: 'agribulker11.db', location: 'default' }).then(
      (db3) => {
        this.dbInstance = db3;
        db3.executeSql('CREATE TABLE IF NOT EXISTS '
          +'agribulker(id3 INTEGER PRIMARY KEY AUTOINCREMENT,'
          +'name_of_agribulker TEXT,'
          +'registered_as TEXT,' 
          +'registered_as_others TEXT,'                   
          +'longitude_agri TEXT,'
          +'latitude_agri TEXT,'
          +'agri_street_address TEXT,'
          +'agri_website TEXT,'
          +'email_address TEXT,'
          +'business_telephone TEXT,'
          +'name_contact_person TEXT,'
          +'proprietor_the_contact_person TEXT,'
          +'name_of_proprietor TEXT,'
          +'contact_photo_url TEXT,'
          +'gender_of_proprietor TEXT,'
          +'title_of_proprietor TEXT,'
          +'contact_person_mobile TEXT,'
          +'education_level TEXT,'
          +'available_docs TEXT,'
          +'business_reg_status TEXT,'
          +'reg_number TEXT,'
          +'institute_organogram TEXT,'
          +'annual_meetings TEXT,'
          +'management_committee_meetings TEXT,'
          +'management_meetings TEXT,'
          +'mgt_from_board TEXT,'
          +'regular_elections TEXT,'
          +'guiding_policy_doc TEXT,'
          +'no_of_tech_team TEXT,'
          +'size_of_land TEXT,'
          +'land_ownership TEXT,'
          +'office_ownership TEXT,'
          +'bulking_unit TEXT,'
          +'org_charged_over TEXT,'
          +'business_type TEXT,'
          +'business_type_others TEXT,'        
          +'existing_db TEXT,'
          +'average_acreage TEXT,'
          +'farmer_groups_no TEXT,'
          +'groups_submitted TEXT,'
          +'number_of_members TEXT,'
          +'know_no_of TEXT,'
          +'members_in_previous_years_2018 TEXT,'

          +'members_in_previous_years_2019 TEXT,'
          +'members_in_previous_years_2020 TEXT,'
          +'members_in_previous_years_2021 TEXT,'
          +'have_membership_fee TEXT,'        
          +'members_paid_uptodate TEXT,'
          +'provision_for_inclusion TEXT,'
          +'conduct_membership_satisfaction TEXT,'
          +'source_of_revenue TEXT,'
          +'major_funding_source TEXT,'
          +'total_investment TEXT,'
          +'total_cost_operation TEXT,'
          +'total_annual_sales TEXT,'
          +'total_asset TEXT,'
          +'mode_of_remittances TEXT,'
          +'record_of_sales TEXT,'
          +'financial_mgt TEXT,'
          +'internal_audit TEXT,'
          +'are_audits_done TEXT,'
          +'agency_audit TEXT,'
          +'when_was_audit TEXT,'
          +'other_sources_of_income TEXT,'
          +'minute_book TEXT,'
          +'bank_book TEXT,'
          +'bank_account TEXT,'
          +'ME_system TEXT,'
          +'credit_facility TEXT,'
          +'credit_facility_due_date TEXT,'
          +'financial_statement_photo TEXT,'
          +'main_business_sector TEXT,'
          +'main_customers TEXT,'
          +'crops_bulked TEXT,'
          +'Quantity_bulked TEXT,'
          +'Quantity_bulked_2018 TEXT,' 
          +'Quantity_bulked_2019 TEXT,'
          +'Quantity_bulked_2020 TEXT,'                  
          +'total_sales_bulked_2017 TEXT,'         
          +'total_sales_bulked_2018 TEXT,'
          +'total_sales_bulked_2019 TEXT,'
          +'total_sales_bulked_2020 TEXT,'
          +'calculated_cost_per_kg TEXT,'
          +'sales_in_inputs TEXT,'
          +'storage_facility TEXT,'
          +'value_addition_facility TEXT,'
          +'value_addition_levels TEXT,'
          +'collect_products TEXT,'
          +'facilitate_access_credit TEXT,'
          +'extend_credit_services TEXT,'
          +'no_of_loans_2017 TEXT,'         
          +'no_of_loans_2018 TEXT,'
          +'no_of_loans_2019 TEXT,'
          +'no_of_loans_2020 TEXT,'
          +'loan_interest_rate TEXT,'
          +'year_of_establishment TEXT,'
          +'main_challenges TEXT,'
          +'major_impact_on_people TEXT,'
          +'public_partnership TEXT,'
          +'services_you_access TEXT,'
          +'services_you_access_specify TEXT,'         
          +'partnerships_with_donors TEXT,'
          +'access_information TEXT,'
          +'technology_uptake TEXT,'
          +'technology_uptake_others TEXT,'         
          +'training TEXT,'
          +'access_to_electricity TEXT,'
          +'other_forms_of_energy TEXT,'
          +'access_to_water TEXT,'
          +'location_name TEXT,'
          +'village_agri TEXT,'         
          +'fo TEXT,'
          +'token)',
          [])
          .catch(e => console.log(e));
        details3 = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return details3;
    });
  }

  private getAllRecords(): Details3Interface[] {
    let details3: Details3Interface[] = [];
    this.dbInstance.executeSql('select * from agribulker', []).then(
      (res) => {
        for(var x=0; x<res.rows.length; x++)
          details3.push(res.rows.item(x));
      }
    ).catch(e => {
      console.log(e);
    });
    return details3;
  }

  async addDetails(name_of_agribulker:string,registered_as:string,registered_as_others:string,longitude_agri:string,latitude_agri:string,agri_street_address:string,agri_website:string,email_address:string,business_telephone:string,name_contact_person:string,proprietor_the_contact_person:string,name_of_proprietor:string,contact_photo_url:string,gender_of_proprietor:string,title_of_proprietor:string,contact_person_mobile:string,education_level:string,available_docs:any[],business_reg_status:string,reg_number:string,institute_organogram:any[],annual_meetings:string,management_committee_meetings:string,management_meetings:string,mgt_from_board:string,regular_elections:string,guiding_policy_doc:any[],no_of_tech_team:string,size_of_land:string,land_ownership:string,office_ownership:string,bulking_unit:string,org_charged_over:any[],business_type:string,business_type_others:string,existing_db:string,average_acreage:string,farmer_groups_no:string,groups_submitted:any[],number_of_members:string,know_no_of:any[],members_in_previous_years_2018:string,members_in_previous_years_2019:string,members_in_previous_years_2020:string,members_in_previous_years_2021:string,have_membership_fee:string,members_paid_uptodate:string,provision_for_inclusion:string,conduct_membership_satisfaction:string,source_of_revenue:string,major_funding_source:string,total_investment:string,total_cost_operation:string,total_annual_sales:string,total_asset:string,mode_of_remittances:string,record_of_sales:string,financial_mgt:string,internal_audit:string,are_audits_done:string,agency_audit:string,when_was_audit:string,other_sources_of_income:string,minute_book:string,bank_book:string,bank_account:string,ME_system:string,credit_facility:string,credit_facility_due_date:string,financial_statement_photo:string,main_business_sector:string,main_customers:string,crops_bulked:any[],Quantity_bulked:any[],Quantity_bulked_2018:any[],Quantity_bulked_2019:any[],Quantity_bulked_2020:any[],total_sales_bulked_2017: any[],total_sales_bulked_2018:any[],total_sales_bulked_2019:any[],total_sales_bulked_2020:any[],calculated_cost_per_kg:any[],sales_in_inputs:string,storage_facility:string,value_addition_facility:string,value_addition_levels:any[],collect_products:string,facilitate_access_credit:string,extend_credit_services:string,no_of_loans_2017:string,no_of_loans_2018:string,no_of_loans_2019:string,no_of_loans_2020:string,loan_interest_rate:string,year_of_establishment:string,main_challenges:string,major_impact_on_people:string,public_partnership:string,services_you_access:any[],services_you_access_specify:string,partnerships_with_donors:string,access_information:string,technology_uptake:any[],technology_uptake_others:string,training:any[],access_to_electricity:string,other_forms_of_energy:any[],access_to_water:string,location_name:string,village_agri:string,fo: string,token: string) {
    let data3 = [name_of_agribulker,registered_as,registered_as_others,longitude_agri,latitude_agri,agri_street_address,agri_website,email_address,business_telephone,name_contact_person,proprietor_the_contact_person,name_of_proprietor,contact_photo_url,gender_of_proprietor,title_of_proprietor,contact_person_mobile,education_level,available_docs,business_reg_status,reg_number,institute_organogram,annual_meetings,management_committee_meetings, management_meetings, mgt_from_board,regular_elections, guiding_policy_doc, no_of_tech_team,size_of_land,land_ownership,office_ownership,bulking_unit, org_charged_over,business_type,business_type_others, existing_db, average_acreage,farmer_groups_no,groups_submitted,number_of_members,know_no_of, members_in_previous_years_2018,members_in_previous_years_2019,members_in_previous_years_2020,members_in_previous_years_2021,have_membership_fee,members_paid_uptodate,provision_for_inclusion, conduct_membership_satisfaction,source_of_revenue, major_funding_source,total_investment, total_cost_operation,total_annual_sales,total_asset, mode_of_remittances,record_of_sales, financial_mgt,internal_audit,are_audits_done,agency_audit, when_was_audit,other_sources_of_income, minute_book,bank_book,bank_account,ME_system,credit_facility,credit_facility_due_date,financial_statement_photo, main_business_sector, main_customers,crops_bulked,Quantity_bulked,Quantity_bulked_2018,Quantity_bulked_2019,Quantity_bulked_2020,total_sales_bulked_2017,total_sales_bulked_2018,total_sales_bulked_2019,total_sales_bulked_2020, calculated_cost_per_kg,sales_in_inputs,storage_facility,value_addition_facility, value_addition_levels,collect_products,facilitate_access_credit,extend_credit_services,no_of_loans_2017,no_of_loans_2018,no_of_loans_2019,no_of_loans_2020,loan_interest_rate,year_of_establishment,main_challenges,major_impact_on_people,public_partnership,services_you_access,services_you_access_specify,partnerships_with_donors,access_information,technology_uptake,technology_uptake_others,training,access_to_electricity,other_forms_of_energy,access_to_water,location_name,village_agri,fo,token];
    this.dbInstance.executeSql('insert into agribulker(name_of_agribulker,registered_as,registered_as_others,longitude_agri,latitude_agri,agri_street_address,agri_website,email_address,business_telephone,name_contact_person,proprietor_the_contact_person,name_of_proprietor,contact_photo_url,gender_of_proprietor,title_of_proprietor,contact_person_mobile,education_level,available_docs,business_reg_status,reg_number,institute_organogram,annual_meetings,management_committee_meetings, management_meetings, mgt_from_board,regular_elections, guiding_policy_doc, no_of_tech_team,size_of_land,land_ownership,office_ownership,bulking_unit, org_charged_over,business_type,business_type_others, existing_db, average_acreage,farmer_groups_no,groups_submitted,number_of_members,know_no_of, members_in_previous_years_2018,members_in_previous_years_2019,members_in_previous_years_2020,members_in_previous_years_2021,have_membership_fee,members_paid_uptodate,provision_for_inclusion, conduct_membership_satisfaction,source_of_revenue, major_funding_source,total_investment, total_cost_operation,total_annual_sales,total_asset, mode_of_remittances,record_of_sales, financial_mgt,internal_audit,are_audits_done,agency_audit, when_was_audit,other_sources_of_income, minute_book,bank_book,bank_account,ME_system,credit_facility,credit_facility_due_date,financial_statement_photo, main_business_sector, main_customers,crops_bulked,Quantity_bulked,Quantity_bulked_2018,Quantity_bulked_2019,Quantity_bulked_2020,total_sales_bulked_2017,total_sales_bulked_2018,total_sales_bulked_2019,total_sales_bulked_2020, calculated_cost_per_kg,sales_in_inputs,storage_facility,value_addition_facility, value_addition_levels,collect_products,facilitate_access_credit,extend_credit_services,no_of_loans_2017,no_of_loans_2018,no_of_loans_2019,no_of_loans_2020,loan_interest_rate,year_of_establishment,main_challenges,major_impact_on_people,public_partnership,services_you_access,services_you_access_specify,partnerships_with_donors,access_information,technology_uptake,technology_uptake_others,training,access_to_electricity,other_forms_of_energy,access_to_water,location_name,village_agri,fo,token) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data3)
      .catch(e => console.log(e));
      this.router.navigate(['/agent']);
    return this.getAllRecords();
  }

  async deleteDetails(id3: number) {
    this.dbInstance.executeSql('DELETE FROM agribulker WHERE id3=?', [id3])
      .catch(e => console.log(e));
    return this.getAllRecords();    
  }

}
