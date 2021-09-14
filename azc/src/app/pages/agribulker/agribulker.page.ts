import { Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit,  NgZone, ViewChild } from '@angular/core';
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

import { Database3Service, Details3Interface } from './../../services/database3.service';


import { MultiFileUploadComponent } from '../../components/multi-file-upload/multi-file-upload.component';
import { FileLikeObject } from 'ng2-file-upload';
@Component({
  selector: 'app-agribulker',
  templateUrl: './agribulker.page.html',
  styleUrls: ['./agribulker.page.scss'],
})
export class AgribulkerPage implements OnInit {
  id3: number;
  //Agribulker data
name_of_agribulker:string="";
registered_as:string="";
registered_as_others:string="";
longitude_agri:string="";
latitude_agri:string="";
agri_street_address:string="";
agri_website:string="";
email_address:string="";
business_telephone:string="";
name_contact_person:string="";
proprietor_the_contact_person:string="";
name_of_proprietor:string="";
contact_photo_url:string="";
gender_of_proprietor:string="";
title_of_proprietor:string="";
contact_person_mobile:string="";
education_level:string="";
available_docs:any[]=[];
business_reg_status:string="";
reg_number:string="";
institute_organogram:any[]=[];
annual_meetings:string="";
management_committee_meetings:string="";
management_meetings:string="";
mgt_from_board:string="";
regular_elections:string="";
guiding_policy_doc:any[]=[];
no_of_tech_team:string="";
size_of_land:string="";
land_ownership:string="";
office_ownership:string="";
bulking_unit:string="";
org_charged_over:any[]=[];
business_type:string="";
business_type_others:string="";
existing_db:string="";
average_acreage:string="";
farmer_groups_no:string="";
//adding more  groups
groups_submitted:any[]=[];
number_of_members:string="";
know_no_of:any[]=[];
members_in_previous_years_2018:string="";
members_in_previous_years_2019:string="";
members_in_previous_years_2020:string="";
members_in_previous_years_2021:string="";
//adding membership fee
have_membership_fee:string="";

members_paid_uptodate:string="";
provision_for_inclusion:string="";
conduct_membership_satisfaction:string="";
source_of_revenue:string="";
major_funding_source:string="";
total_investment:string="";
total_cost_operation:string="";
total_annual_sales:string="";
total_asset:string="";
mode_of_remittances:string="";
record_of_sales:string="";
financial_mgt:string="";
internal_audit:string="";
are_audits_done:string="";
agency_audit:string="";
when_was_audit:string="";
other_sources_of_income:string="";
minute_book:string="";
bank_book:string="";
bank_account:string="";
ME_system:string="";
credit_facility:string="";
credit_facility_due_date:string="";
financial_statement_photo:string="";
main_business_sector:string="";
main_customers:string="";
crops_bulked:any[]=[];
Quantity_bulked_2017:any[]=[];
Quantity_bulked_2018:any[]=[];
Quantity_bulked_2019:any[]=[];
Quantity_bulked_2020:any[]=[];
total_sales_bulked_2017: any[]=[];
total_sales_bulked_2018: any[]=[];
total_sales_bulked_2019:any[]=[];
total_sales_bulked_2020:any[]=[];
calculated_cost_per_kg: any[]=[];
sales_in_inputs:string="";
storage_facility:string="";
value_addition_facility:string="";
value_addition_levels:any[]=[];
collect_products:string="";
facilitate_access_credit:string="";
extend_credit_services:string="";
no_of_loans_2017:string="";
no_of_loans_2018:string="";
no_of_loans_2019:string="";
no_of_loans_2020:string="";
loan_interest_rate:string="";
year_of_establishment:string="";
main_challenges:string="";
major_impact_on_people:string="";
public_partnership:string="";
services_you_access:any[]=[];
services_you_access_specify:string="";
partnerships_with_donors:string="";
access_information:string="";
technology_uptake:any[]=[];
technology_uptake_others:string="";
training:any[]=[];
access_to_electricity:string="";
other_forms_of_energy:any[]=[];
access_to_water:string="";
location_name:string="";
village_agri:string="";
fo: string; //name of the submitter
  
  disabledButton;
  name:string;
    currentImage: any;
    currentImage_fs:any;
    ib: any;
    fs: any;
  
    latitude: any = 0;
    longitude: any = 0;
    accuracy: any =0;
    datastorage:any;
    //added token
    token:string;
    //this holds all the documents to be uploaded
    documents:FileLikeObject[]=[];
    
    details3: Details3Interface[];
    public myForm: FormGroup;
    private fieldspaceCount: number = 1;
    @ViewChild(MultiFileUploadComponent) fileField: MultiFileUploadComponent;
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
      private db3: Database3Service,

      public FilePath:FilePath,
      public FileChooser:FileChooser
    ) { 
      this.myForm = formBuilder.group({
        fieldspace1: ['',[Validators.required, Validators.minLength(15)]]
      });
    }
    term = '';
    district_data: any;
    agribulker_Details:any;
    ngOnInit() {
      fetch('../assets/district_subcounties.json').then(res => res.json())
      .then(json => {
        this.district_data = json;
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
      this.db3.getAllDetails().then(data3 => this.details3 = data3);

  }
restoreData(){
  return this.storage.get('agribulkerdata').then((res)=>{
    console.log(res);
    //this.groups_submitted= this.myForm.value;
    [this.name_of_agribulker,this.registered_as,this.registered_as_others,this.longitude_agri,this.latitude_agri,this.agri_street_address,this.agri_website,this.email_address,this.business_telephone,this.name_contact_person,this.proprietor_the_contact_person,this.name_of_proprietor,this.contact_photo_url,this.gender_of_proprietor,this.title_of_proprietor,this.contact_person_mobile,this.education_level,this.available_docs,this.business_reg_status,this.reg_number,this.institute_organogram,this.annual_meetings,this.management_committee_meetings,this.management_meetings,this.mgt_from_board,this.regular_elections,this.guiding_policy_doc,this.no_of_tech_team,this.size_of_land,this.land_ownership,this.office_ownership,this.bulking_unit,this.org_charged_over,this.business_type,this.business_type_others,this.existing_db,this.average_acreage,this.farmer_groups_no,this.groups_submitted,this.number_of_members,this.know_no_of,this.members_in_previous_years_2018,this.members_in_previous_years_2019,this.members_in_previous_years_2020,this.members_in_previous_years_2021,this.members_in_previous_years_2019,this.have_membership_fee,this.members_paid_uptodate,this.provision_for_inclusion,this.conduct_membership_satisfaction,this.source_of_revenue,this.major_funding_source,this.total_investment,this.total_cost_operation,this.total_annual_sales,this.total_asset,this.mode_of_remittances,this.record_of_sales,this.financial_mgt,this.internal_audit,this.are_audits_done,this.agency_audit,this.when_was_audit,this.other_sources_of_income,this.minute_book,this.bank_book,this.bank_account,this.ME_system,this.credit_facility,this.credit_facility_due_date,this.financial_statement_photo,this.main_business_sector,this.main_customers,this.crops_bulked,this.Quantity_bulked_2017,this.Quantity_bulked_2018,this.Quantity_bulked_2019,this.Quantity_bulked_2020,this.total_sales_bulked_2017,this.total_sales_bulked_2018,this.total_sales_bulked_2019,this.total_sales_bulked_2020,this.calculated_cost_per_kg,this.sales_in_inputs,this.storage_facility,this.value_addition_facility,this.value_addition_levels,this.collect_products,this.facilitate_access_credit,this.extend_credit_services,this.no_of_loans_2017,this.no_of_loans_2018,this.no_of_loans_2019,this.no_of_loans_2020,this.loan_interest_rate,this.year_of_establishment,this.main_challenges,this.major_impact_on_people,this.public_partnership,this.services_you_access,this.services_you_access_specify,this.partnerships_with_donors,this.access_information,this.technology_uptake,this.technology_uptake_others,this.training,this.access_to_electricity,this.other_forms_of_energy,this.access_to_water,this.location_name,this.village_agri] = res;
   
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

  return this.storage.set('agribulkerdata', [this.name_of_agribulker,this.registered_as,this.registered_as_others,this.longitude_agri,this.latitude_agri,this.agri_street_address,this.agri_website,this.email_address,this.business_telephone,this.name_contact_person,this.proprietor_the_contact_person,this.name_of_proprietor,this.contact_photo_url,this.gender_of_proprietor,this.title_of_proprietor,this.contact_person_mobile,this.education_level,this.available_docs,this.business_reg_status,this.reg_number,this.institute_organogram,this.annual_meetings,this.management_committee_meetings,this.management_meetings,this.mgt_from_board,this.regular_elections,this.guiding_policy_doc,this.no_of_tech_team,this.size_of_land,this.land_ownership,this.office_ownership,this.bulking_unit,this.org_charged_over,this.business_type,this.business_type_others,this.existing_db,this.average_acreage,this.farmer_groups_no,this.get_list_of_groups(),this.number_of_members,this.know_no_of,this.members_in_previous_years_2018,this.members_in_previous_years_2019,this.members_in_previous_years_2020,this.members_in_previous_years_2021,this.members_in_previous_years_2019,this.have_membership_fee,this.members_paid_uptodate,this.provision_for_inclusion,this.conduct_membership_satisfaction,this.source_of_revenue,this.major_funding_source,this.total_investment,this.total_cost_operation,this.total_annual_sales,this.total_asset,this.mode_of_remittances,this.record_of_sales,this.financial_mgt,this.internal_audit,this.are_audits_done,this.agency_audit,this.when_was_audit,this.other_sources_of_income,this.minute_book,this.bank_book,this.bank_account,this.ME_system,this.credit_facility,this.credit_facility_due_date,this.financial_statement_photo,this.main_business_sector,this.main_customers,this.crops_bulked,this.Quantity_bulked_2017,this.Quantity_bulked_2018,this.Quantity_bulked_2019,this.Quantity_bulked_2020,this.total_sales_bulked_2017,this.total_sales_bulked_2018,this.total_sales_bulked_2019,this.total_sales_bulked_2020,this.calculated_cost_per_kg,this.sales_in_inputs,this.storage_facility,this.value_addition_facility,this.value_addition_levels,this.collect_products,this.facilitate_access_credit,this.extend_credit_services,this.no_of_loans_2017,this.no_of_loans_2018,this.no_of_loans_2019,this.no_of_loans_2020,this.loan_interest_rate,this.year_of_establishment,this.main_challenges,this.major_impact_on_people,this.public_partnership,this.services_you_access,this.services_you_access_specify,this.partnerships_with_donors,this.access_information,this.technology_uptake,this.technology_uptake_others,this.training,this.access_to_electricity,this.other_forms_of_energy,this.access_to_water,this.location_name,this.village_agri]);
}

addControl(){
  this.fieldspaceCount++;
  this.myForm.addControl('fieldspace' +this.fieldspaceCount, new FormControl('', Validators.required));
} 
  
removeControl(control){
  this.myForm.removeControl(control.key);
}
    
    get_list_of_groups() {
      var list_of_groups:any[]=[];
      list_of_groups= this.myForm.value;
      return list_of_groups;
    }
    //Restricting numbers
    numberOnlyValidation(event: any) {
      const pattern = /[0-9.,]/;
      let inputChar = String.fromCharCode(event.charCode);
  
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
    }
//Function to upload the file to the server
upload(){

  let files = this.fileField.getFiles();
  console.log(files);

  let formData = new FormData();
  //formData.append('somekey', 'some value') // Add any other data you want to send
  files.forEach((file) => {
    formData.append('files[]', file.rawFile, file.name);
  });
  return files;
}



    //Level of Education
    level_of_educ =[
  "University","Tertiary","Secondary (UACE)","UCE certificate ","Primary","None"
    ]
    reg_as=[
"Area Cooperative enterprise","Rural Produce organization (RPO)",
"Limited liability Company","Agro dealer shop","SACCO","Others"
    ]
  
  necessary_docs=[
  "Certificate of incorporation",
  "Memorandum and articles – certified by registrar",
  "Annual return – certified by registrar Available",
  "TIN certificate in the name of the company",
  "Trading License Availability",
  "Availability of Company letter head",
  "Identification detail (National ID, any other)",
  "Copy of approved plan by city Valuer (Commercial building)",
  "Availability of projected cash flows (commercial building)",
  "Registered contractor (commercial building)"
    ]
  
    registration_status=[ 
      "URSB","District","Registration","Not registered"
    ]
  
    institute_organo =[
      "Board of directors", "Executive director", "finance office", "mid-level managers", "ICT technician"
  
    ]
    mgt_meeting=[
      "Weekly","Fortnightly","Monthly","When it’s necessary","Other(can’t tell…. Etc)"
    ]
  
  policy_docs=[
  "Constitution","Human resource policy",	 
  "Procurement policy","Risk management","finance policy","data protection policy"  
  
  ]
  
  ownership_land=[
  "as group/Individual with title","rented by the member","	Leasehold with tittle proof","Leasehold without title" 
  ]
  ownership_office=[
  "Privately owned with title","Rented","Collectively owned by members"  
  ]
  charge_over=[
    "none","corruption","Bribery","Terrorism","illegal trafficking","violation of laws or regulation" 
  ]
  type_of_business=[
    "sole propriated","Faith Based", "Membership based","Partner based","company","family business","individual business","Private limited Liability","Others specify"  
  ]
  people_type=[
    "Women","Men","Youth"
  ]
  
  revenue_source=[
  "Membership subscriptions",
  "Sales of Products and services (Trade credit)",
  "Financial support from other agencies ",
  "Credit facilities ",
  "Family and friends" 	
  ]
  source_funding=[
  "Membership subscriptions",
  "Sales of Products and services (Trade credit)",
  "Financial support from other agencies",
  "Credit facilities",
  "Family and friends" 
  ]
  
  remit_modes=[
  "Cash","Cheque","both" 
  ]
  
  are_audits=[
  "Never","quarterly","half yearly","Annually"
  ]
  business_sectors=[
    "Agro produce bulking and marketing","Agri-inputs sales",
    "Value addition and Agri-processing","financial access services",
    "Cooperative","SACCOs","NGO/CBO"
  ]
  
  addition_levels=[
  "Drying","Product processing","Extraction ","Packaging","Product differentiation","None" 
  
  ]
  products_collection=[
  "Members find their way to center",
  "The cooperative has a vehicle",
  "We hire transport to the products ",
  "Use agents to collect on our behalf",
  "Not applicable "
  ]
  major_impact=[
  "Has done nothing in this area","Has it operations taking shape in the area",
  "Has evolved considerably but still needs improvement","Has Evolved well and needs no improvement"  
  ]
  
  services_access=[
  "Research","Certification","Value addition support","Market",
  "Advisory","Business development","National programs for the sector",
  "Others specify"
  ]
  information=[
  "Internet and media","Professional service providers",
  "Through other public sector providers/ Government",
  "Family and friends","Through business incubators" 	
  ]
  technology=[
  "None","Email use","Facebook ","Whatsapp","Others"
  ]
  trainings=[
  "Do you conduct any training internally for the staff",
  "Do you extend any training services to the members",
  "Do you conduct any training needs assessment?",
  "Do you have on farm/field trainings for members"
  ]
  energy_resources=[
  "Generator","Gas","Solar"
  ]
  crops=[
    "Beans","Coffee","Maize","Cassava","Soybean","Sesame","Banana",
    "Millet","Rice","G.nuts","Vegetables","Sorghum","others"
  ]
  challenges=[
    "Lack of Funding",
    "Transport and communication",
    "Licensing costs",
    "Human Resource",
    "Market access",
    "Competition",
    "Resource access",
    "Transportation and communication" 
  ];
  //Saving the data locally in sqlite
    addDetails(name_of_agribulker:string,registered_as:string,registered_as_others:string,longitude_agri:string,latitude_agri:string,agri_street_address:string,agri_website:string,email_address:string,business_telephone:string,name_contact_person:string,proprietor_the_contact_person:string,name_of_proprietor:string,contact_photo_url:string,gender_of_proprietor:string,title_of_proprietor:string,contact_person_mobile:string,education_level:string,available_docs:any[],business_reg_status:string,reg_number:string,institute_organogram:any[],annual_meetings:string,management_committee_meetings:string,management_meetings:string,mgt_from_board:string,regular_elections:string,guiding_policy_doc:any[],no_of_tech_team:string,size_of_land:string,land_ownership:string,office_ownership:string,bulking_unit:string,org_charged_over:any[],business_type:string,business_type_others:string,existing_db:string,average_acreage:string,farmer_groups_no:string,groups_submitted:any[],number_of_members:string,know_no_of:any[],members_in_previous_years_2018:string,members_in_previous_years_2019:string,members_in_previous_years_2020:string,members_in_previous_years_2021:string,have_membership_fee:string,members_paid_uptodate:string,provision_for_inclusion:string,conduct_membership_satisfaction:string,source_of_revenue:string,major_funding_source:string,total_investment:string,total_cost_operation:string,total_annual_sales:string,total_asset:string,mode_of_remittances:string,record_of_sales:string,financial_mgt:string,internal_audit:string,are_audits_done:string,agency_audit:string,when_was_audit:string,other_sources_of_income:string,minute_book:string,bank_book:string,bank_account:string,ME_system:string,credit_facility:string,credit_facility_due_date:string,financial_statement_photo:string,main_business_sector:string,main_customers:string,crops_bulked:any[],Quantity_bulked_2017:any[],Quantity_bulked_2018:any[],Quantity_bulked_2019:any[],Quantity_bulked_2020:any[],total_sales_bulked_2017: any[],total_sales_bulked_2018:any[],total_sales_bulked_2019:any[],total_sales_bulked_2020:any[],calculated_cost_per_kg:any[],sales_in_inputs:string,storage_facility:string,value_addition_facility:string,value_addition_levels:any[],collect_products:string,facilitate_access_credit:string,extend_credit_services:string,no_of_loans_2017:string,no_of_loans_2018:string,no_of_loans_2019:string,no_of_loans_2020:string,loan_interest_rate:string,year_of_establishment:string,main_challenges:string,major_impact_on_people:string,public_partnership:string,services_you_access:any[],services_you_access_specify:string,partnerships_with_donors:string,access_information:string,technology_uptake:any[],technology_uptake_others:string,training:any[],access_to_electricity:string,other_forms_of_energy:any[],access_to_water:string,location_name:string,village_agri:string,fo: string,token: string) {
        this.db3.addDetails(name_of_agribulker,registered_as,registered_as_others,longitude_agri,latitude_agri,agri_street_address,agri_website,email_address,business_telephone,name_contact_person,proprietor_the_contact_person,name_of_proprietor,contact_photo_url,gender_of_proprietor,title_of_proprietor,contact_person_mobile,education_level,available_docs,business_reg_status,reg_number,institute_organogram,annual_meetings,management_committee_meetings, management_meetings, mgt_from_board,regular_elections, guiding_policy_doc, no_of_tech_team,size_of_land,land_ownership,office_ownership,bulking_unit, org_charged_over,business_type,business_type_others, existing_db, average_acreage,farmer_groups_no,groups_submitted,number_of_members,know_no_of, members_in_previous_years_2018,members_in_previous_years_2019,members_in_previous_years_2020,members_in_previous_years_2021,have_membership_fee,members_paid_uptodate,provision_for_inclusion, conduct_membership_satisfaction,source_of_revenue, major_funding_source,total_investment, total_cost_operation,total_annual_sales,total_asset, mode_of_remittances,record_of_sales, financial_mgt,internal_audit,are_audits_done,agency_audit, when_was_audit,other_sources_of_income, minute_book,bank_book,bank_account,ME_system,credit_facility,credit_facility_due_date,financial_statement_photo, main_business_sector, main_customers,crops_bulked,Quantity_bulked_2017,Quantity_bulked_2018,Quantity_bulked_2019,Quantity_bulked_2020,total_sales_bulked_2017,total_sales_bulked_2018,total_sales_bulked_2019,total_sales_bulked_2020, calculated_cost_per_kg,sales_in_inputs,storage_facility,value_addition_facility, value_addition_levels,collect_products,facilitate_access_credit,extend_credit_services,no_of_loans_2017,no_of_loans_2018,no_of_loans_2019,no_of_loans_2020,loan_interest_rate,year_of_establishment,main_challenges,major_impact_on_people,public_partnership,services_you_access,services_you_access_specify,partnerships_with_donors,access_information,technology_uptake,technology_uptake_others,training,access_to_electricity,other_forms_of_energy,access_to_water,location_name,village_agri,fo,token).then(data3 => {
          this.details3 = data3;
        });
        this.presentToast("Your activity has been saved locally, you can submit it later");
        this.disabledButton = false;
        this.name_of_agribulker="";
        this.registered_as="";
        this.registered_as_others="";
        this.longitude_agri="";
        this.latitude_agri="";
        this.agri_street_address="";
        this.agri_website="";
        this.email_address="";
        this.business_telephone="";
        this.name_contact_person="";
        this.proprietor_the_contact_person="";
        this.name_of_proprietor="";
        this.contact_photo_url="";
        this.gender_of_proprietor="";
        this.title_of_proprietor="";
        this.contact_person_mobile="";
        this.education_level="";
        this.available_docs=[];
        this.business_reg_status="";
        this.reg_number="";
        this.institute_organogram=[];
        this.annual_meetings="";
        this.management_committee_meetings="";
        this.management_meetings="";
        this.mgt_from_board="";
        this.regular_elections="";
        this.guiding_policy_doc=[];
        this.no_of_tech_team="";
        this.size_of_land="";
        this.land_ownership="";
        this.office_ownership="";
        this.bulking_unit="";
        this.org_charged_over=[];
        this.business_type="";
        this.business_type_others="";
        this.existing_db="";
        this.average_acreage="";
        this.farmer_groups_no="";
        this.groups_submitted=[];
        this.number_of_members="";
        this.know_no_of=[];
        this.members_in_previous_years_2018="";
        this.members_in_previous_years_2019="";
        this.members_in_previous_years_2020="";
        this.members_in_previous_years_2021="";
        this.have_membership_fee="";
        this.members_paid_uptodate="";
        this.provision_for_inclusion="";
        this.conduct_membership_satisfaction="";
        this.source_of_revenue="";
        this.major_funding_source="";
        this.total_investment="";
        this.total_cost_operation="";
        this.total_annual_sales="";
        this.total_asset="";
        this.mode_of_remittances="";
        this.record_of_sales="";
        this.financial_mgt="";
        this.internal_audit="";
        this.are_audits_done="";
        this.agency_audit="";
        this.when_was_audit="";
        this.other_sources_of_income="";
        this.minute_book="";
        this.bank_book="";
        this.bank_account="";
        this.ME_system="";
        this.credit_facility="";
        this.credit_facility_due_date="";
        this.financial_statement_photo="";
        this.main_business_sector="";
        this.main_customers="";
        this.crops_bulked=[];
        this.Quantity_bulked_2017=[];
        this.Quantity_bulked_2018=[];
        this.Quantity_bulked_2019=[];
        this.Quantity_bulked_2020=[];
        this.total_sales_bulked_2017=[];
        this.total_sales_bulked_2018=[];
        this.total_sales_bulked_2019=[];
        this.total_sales_bulked_2020=[];
        this.calculated_cost_per_kg=[];
        this.sales_in_inputs="";
        this.storage_facility="";
        this.value_addition_facility="";
        this.value_addition_levels=[];
        this.collect_products="";
        this.facilitate_access_credit="";
        this.extend_credit_services="";
        this.no_of_loans_2017="";
        this.no_of_loans_2018="";
        this.no_of_loans_2019="";
        this.no_of_loans_2020="";
        this.loan_interest_rate="";
        this.year_of_establishment="";
        this.main_challenges="";
        this.major_impact_on_people="";
        this.public_partnership="";
        this.services_you_access=[];
        this.services_you_access_specify="";
        this.partnerships_with_donors="";
        this.access_information="";
        this.technology_uptake=[];
        this.technology_uptake_others="";
        this.training=[];
        this.access_to_electricity="";
        this.other_forms_of_energy=[];
        this.access_to_water="";
        this.location_name="";  
        this.village_agri="";   
        this.currentImage="";
        this.currentImage_fs="";
        this.router.navigate(['/agribulker']);
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

    takePicture_fs() {
      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true,
      };
  
      this.camera.getPicture(options).then((imageData) => {
        this.currentImage_fs = 'data:image/jpeg;base64,' + imageData;
        this.fs = imageData;
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
      if(this.name_of_agribulker==""){
          this.presentToast('The Agribulker name is required @ ( 1.a ).');
      }
      else if(this.registered_as==""){
        this.presentToast('Registration status – is required ?');
      }
      else if(this.registered_as=="Others" && this.registered_as_others==""){
        this.presentToast('Specify your other Registration status – is required');
      }
      
      else if(this.longitude_agri=="" && this.latitude_agri==""){
        this.presentToast('The longitude and latitude is required. Press the button to get the location');
      }
      
      else if(this.agri_street_address==""){
        this.presentToast('The street address is required');
      }

      else if(this.business_telephone==""){
        this.presentToast('The Business telephone is required ');
      }
      else if(this.name_contact_person==""){
        this.presentToast('Name of contact person is required');
      }
      else if(this.proprietor_the_contact_person==""){
        this.presentToast('Is the proprietor the contact person needs to be attempted');
      }
      else if(this.proprietor_the_contact_person=="No" && this.name_of_proprietor==""){
        this.presentToast('Name of proprietor is empty, please fill it to proceed');
      }
      else if(this.contact_photo_url==""){
        this.presentToast('You need to take a photo of the contact person, to proceed');
      }
      else if(this.gender_of_proprietor==""){
        this.presentToast('Specify the gender of the proprietor to proceed');
      }      
      else if(this.title_of_proprietor==""){
        this.presentToast('Specify the title of the proprietor to proceed');
      }
      else if(this.contact_person_mobile==""){
        this.presentToast('Specify the contact person mobile to proceed');
      }
      else if(this.education_level==""){
        this.presentToast('Specify highest level of education of proprietor or contact person to proceed');
      }
      else if(this.available_docs.length == 0){
        this.presentToast('Fillout Availability of...,  to proceed');
      }
      //SECOND SECTION
      else if(this.business_reg_status==''){
        this.presentToast('Business/Company registration status is required to proceed');
      }
      else if(this.reg_number==''){
        this.presentToast('Business/Company registration number is required to proceed');
      }
      else if(this.institute_organogram.length == 0){
        this.presentToast('Institution organogram available is required to proceed');
      }
      else if(this.annual_meetings==""){
        this.presentToast('Do you hold annual General meetings is required to proceed');
      }
      else if(this.management_committee_meetings==""){
        this.presentToast('Do you conduct any management/committee meetings is required to proceed');
    }
    
    else if(this.management_meetings==""){
        this.presentToast('How often do you conduct internal management meeting is required to proceed');
    }
    
    else if(this.mgt_from_board==""){
        this.presentToast('Do you separate the management form board is required to proceed');
    }
    
    else if(this.regular_elections==""){
        this.presentToast('Do you hold regular elections is required to proceed');
    }
    
    else if(this.guiding_policy_doc.length == 0){
        this.presentToast('Which of the internal guiding policy documents exists and are applied to this organization... is required to proceed');
    }
    else if(this.no_of_tech_team==""){
        this.presentToast('Do you have technical team of employees please indicate the number is required to proceed');
    }
    else if(this.size_of_land==""){
        this.presentToast('Size of land on which the business premises stand is required to proceed');
    }
    else if(this.land_ownership==""){
        this.presentToast('Ownership of land on which the offices are privately owned is required to proceed');
    }
    else if(this.office_ownership==""){
        this.presentToast('Ownership of offices building is required to proceed');
    }
    
    else if(this.bulking_unit==""){
        this.presentToast('Availability of producing bulking unit is required to proceed');
    }
    
    else if(this.org_charged_over.length == 0){
        this.presentToast('Has the organization ever been implicated, investigated or charged over... is required to proceed');
    }
    
    else if(this.business_type==""){
        this.presentToast('Business type is required to proceed');
    }
    
    else if(this.business_type=="Others specify" && this.business_type_others==""){
      this.presentToast('Other Business type is required to proceed');
  }
    else if(this.existing_db==""){
        this.presentToast('Does the organization have an existing database of members/subscribers is required to proceed');
    }
    else if(this.farmer_groups_no==""){
      this.presentToast('How many farmer groups does the organization serve is required to proceed');
    }
    else if (this.myForm.invalid){
      this.presentToast('List of farmers captured is required or you supplied less than 15 digits');
    }
    
    //average_acreage:average_acreage,
    else if(this.average_acreage==""){
        this.presentToast('What is the average acreage of members is required to proceed');
    }

    else if(this.number_of_members==""){
        this.presentToast('What is the total number of members served is required to proceed');
    }
    
    else if(this.know_no_of.length == 0){
        this.presentToast('Do you know the number of; is required to proceed');
    }
    
    else if(this.members_in_previous_years_2018==""){
        this.presentToast('How many members did you have in the previous years (2018) is required to proceed');
    }
    else if(this.members_in_previous_years_2019==""){
        this.presentToast('How many members did you have in the previous years (2019) is required to proceed');
    }
    else if(this.members_in_previous_years_2020==""){
        this.presentToast('How many members did you have in the previous years (2020) is required to proceed');
    }
    else if(this.members_in_previous_years_2021==""){
        this.presentToast('How many members did you have in the previous years (2021) is required to proceed');
    }
    
    else if(this.members_in_previous_years_2019==""){
        this.presentToast('How many members did you have in the previous years (2019) is required to proceed');
    }
    else if(this.have_membership_fee==""){
        this.presentToast('Do you have membership fee for the group is required to proceed');
    }
    else if(this.members_paid_uptodate==""){
        this.presentToast('How many members are paid update is required to proceed');
    }
    else if(this.provision_for_inclusion==""){
        this.presentToast('Do you have a provision for the inclusion special interest groups including the youth,... is required to proceed');
    }
    
    else if(this.conduct_membership_satisfaction==""){
        this.presentToast('If you have members, Do you conduct membership satisfaction assessments is required to proceed');
    }
    
    else if(this.source_of_revenue==""){
        this.presentToast('What is your major source of funding(Main source of revenue) is required to proceed');
    }
    
    else if(this.major_funding_source==""){
        this.presentToast('What was your major source of funding in the past 12 months is required to proceed');
    }
    
    
    else if(this.total_investment==""){
        this.presentToast('What is the total investment is required to proceed');
    }
    else if(this.total_cost_operation==""){
        this.presentToast('What is the total cost of operation of business... is required to proceed');
    }
    else if(this.total_annual_sales==""){
        this.presentToast('What is the total cost of operation of business... is required to proceed');
    }
    
    else if(this.total_annual_sales==""){
        this.presentToast('Total annual sale  is required to proceed');
    }
    else if(this.total_asset==""){
        this.presentToast('Total asset value is required to proceed');
    }
    
    else if(this.mode_of_remittances==""){
        this.presentToast('Mode of remittances is required to proceed');
    }
    
    else if(this.record_of_sales==""){
        this.presentToast('Do you have record of sales is required to proceed');
    }
    else if(this.financial_mgt==""){
        this.presentToast('Is financial management computerized is required to proceed');
    }
    
    else if(this.internal_audit==""){
        this.presentToast('Do you have internal audit solutions package/Enterprise is required to proceed');
    }
    else if(this.internal_audit=="Yes" && this.are_audits_done==""){
        this.presentToast('How often are audits done in the organization is required to proceed');
    }
    else if(this.internal_audit=="Yes" && this.agency_audit==""){
        this.presentToast('Is your annual audit provided by an outside agency is required to proceed');
    }
    else if(this.internal_audit=="Yes" && this.when_was_audit==""){
        this.presentToast('When was the most recent audit done is required to proceed');
    }
    
    else if(this.other_sources_of_income==""){
        this.presentToast('Do you have any other sources of income is required to proceed');
    }
    else if(this.minute_book==""){
        this.presentToast('Do you have a minute book register is required to proceed');
    }
    else if(this.bank_book==""){
        this.presentToast('Do you have a bank book register is required to proceed');
    }
    
    else if(this.bank_account==""){
        this.presentToast('Is the bank account you hold in the names of business is required to proceed');
    }
    else if(this.ME_system==""){
        this.presentToast('Do you have an M&E system is required to proceed');
    }
    
    else if(this.credit_facility==""){
        this.presentToast('Do you have any performing credit facility is required to proceed');
    }
    
    else if(this.credit_facility=="Yes" && this.credit_facility_due_date==""){
      this.presentToast('If yes when is it due is required to proceed');
    }
    else if(this.financial_statement_photo==""){
       this.presentToast('Your 6 month most recent financial statement photo  is required to proceed');
    }
    else if(this.main_business_sector==""){
        this.presentToast('Main business sector  is required to proceed');
    }
    else if(this.main_customers==""){
        this.presentToast('Main customers  is required to proceed');
    }
    else if(this.crops_bulked.length == 0){
        this.presentToast('Crops bulked  is required to proceed');
    }
     //Quantity_bulked_2017:Quantity_bulked_2017,
    else if(this.crops_bulked.length > this.Quantity_bulked_2017.length){
      this.presentToast('Quantity bulked in 2017  is required to proceed');
    }
    else if(this.crops_bulked.length > this.Quantity_bulked_2018.length){
      this.presentToast('Quantity bulked in 2018  is required to proceed');
    }
    else if(this.crops_bulked.length > this.Quantity_bulked_2019.length){
      this.presentToast('Quantity bulked in 2019  is required to proceed');
    }
    else if(this.crops_bulked.length > this.Quantity_bulked_2020.length){
      this.presentToast('Quantity bulked in 2020  is required to proceed');
    }

    else if(this.crops_bulked.length > this.total_sales_bulked_2017.length){
      this.presentToast('Total sales from crops bulked (for each value chain selected) in 2017 is required to proceed');
    }
    else if(this.crops_bulked.length > this.total_sales_bulked_2018.length){
      this.presentToast('Total sales from crops bulked (for each value chain selected) in 2018 is required to proceed');
    }
    else if(this.crops_bulked.length > this.total_sales_bulked_2019.length){
      this.presentToast('Total sales from crops bulked (for each value chain selected) in 2019 is required to proceed');
    }
    else if(this.crops_bulked.length > this.total_sales_bulked_2020.length){
      this.presentToast('Total sales from crops bulked (for each value chain selected) in 2020 is required to proceed');
    }
    else if(this.crops_bulked.length > this.calculated_cost_per_kg.length){
      this.presentToast('Calculated cost per kg of a selected value chain is required to proceed');
    }
    
    else if(this.sales_in_inputs==""){
        this.presentToast('Total annual sales in inputs or equipment is required to proceed');
    }
    
    else if(this.storage_facility==""){
        this.presentToast('Availability of storage facility is required to proceed');
    }
    
    else if(this.value_addition_facility==""){
        this.presentToast('Value addition facility is required to proceed');
    }
    //value_addition_levels:value_addition_levels,
    
    else if(this.value_addition_facility=='Yes'&& this.value_addition_levels.length==0){
      this.presentToast('Value addition level is required to proceed');
    }
    else if(this.collect_products==""){
        this.presentToast('How do you collect products from your members  is required to proceed');
    }
    else if(this.facilitate_access_credit==""){
        this.presentToast('Do you facilitate access to credit/insurance services to your members  is required to proceed');
    }
    
    else if(this.extend_credit_services==""){
        this.presentToast('Do you extend credit services to the members is required to proceed');
    }
    else if(this.extend_credit_services=='Yes' && this.no_of_loans_2017==""){
      this.presentToast('What’s Number of Loans provided in the 2017 is required');
    }
    else if(this.extend_credit_services=='Yes' && this.no_of_loans_2018==""){
      this.presentToast('What’s Number of Loans provided in the 2018 is required');
    }
    else if(this.extend_credit_services=='Yes' && this.no_of_loans_2019==""){
      this.presentToast('What’s Number of Loans provided in the 2019 is required');
    }
    else if(this.extend_credit_services=='Yes' && this.no_of_loans_2020==""){
      this.presentToast('What’s Number of Loans provided in the 2020 is required');
    }
    else if(this.extend_credit_services=='Yes' && this.loan_interest_rate==""){
      this.presentToast('Loan interest rate is required');
    }

    //no_of_loans_2017:no_of_loans_2017,
    //loan_interest_rate:loan_interest_rate,
    
    else if(this.year_of_establishment==""){
        this.presentToast('Year of establishment is required to proceed');
    }
    else if(this.main_challenges==""){
        this.presentToast('Main challenges faced by the business is required to proceed');
    }
    
    else if(this.major_impact_on_people==""){
        this.presentToast('What major impact has this business... is required to proceed');
    }
    
    else if(this.public_partnership==""){
        this.presentToast('Do you have any partnership with public sector  is required to proceed');
    }
    else if(this.public_partnership=="Yes" && this.services_you_access.length<1){
      this.presentToast('If Yes what Services do you access  is required to proceed');
    }

    //services_you_access:services_you_access,
    //services_you_access_specify
    
    else if(this.partnerships_with_donors==""){
        this.presentToast('Do you have any partnership with Donors/NGOs/others is required to proceed');
    }
    else if(this.access_information==""){
        this.presentToast('By what means do you mainly access information is required to proceed');
    }
    else if(this.technology_uptake.length<1){
        this.presentToast('Do you have any form of technology uptake... is required to proceed');
    }
    else if(this.training.length < 1 ){
        this.presentToast('Training is required to proceed');
    }
    else if(this.access_to_electricity==""){
        this.presentToast('Do  you have access to electricity is required to proceed');
    }
    //other_forms_of_energy:other_forms_of_energy,
    
    else if(this.access_to_water==""){
        this.presentToast('Do  you have access to water is required to proceed');
    }
    else if(this.location_name==""){
        this.presentToast('Please specify region, district and subcounty by searching');
    }
    else if(this.village_agri==""){
        this.presentToast('Village is required');
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
              name_of_agribulker:this.name_of_agribulker,
              registered_as:this.registered_as,
              registered_as_others:this.registered_as_others,
              longitude_agri:this.longitude_agri ,
              latitude_agri:this.latitude_agri ,
              agri_street_address:this.agri_street_address ,
              agri_website:this.agri_website ,
              email_address:this.email_address ,
              business_telephone:this.business_telephone ,
              name_contact_person:this.name_contact_person ,
              proprietor_the_contact_person:this.proprietor_the_contact_person ,
              name_of_proprietor:this.name_of_proprietor ,
              contact_photo_url:this.contact_photo_url ,
              gender_of_proprietor:this.gender_of_proprietor ,
              title_of_proprietor:this.title_of_proprietor ,
              contact_person_mobile:this.contact_person_mobile ,
              education_level:this.education_level ,
              available_docs:this.available_docs ,
              business_reg_status:this.business_reg_status ,
              reg_number:this.reg_number ,
              institute_organogram:this.institute_organogram ,
              annual_meetings:this.annual_meetings ,
              management_committee_meetings:this.management_committee_meetings ,
              management_meetings:this.management_meetings ,
              mgt_from_board:this.mgt_from_board ,
              regular_elections:this.regular_elections ,
              guiding_policy_doc:this.guiding_policy_doc ,
              no_of_tech_team:this.no_of_tech_team ,
              size_of_land:this.size_of_land ,
              land_ownership:this.land_ownership ,
              office_ownership:this.office_ownership ,
              bulking_unit:this.bulking_unit ,
              org_charged_over:this.org_charged_over ,
              business_type:this.business_type ,
              business_type_others:this.business_type_others,
              existing_db:this.existing_db,
              average_acreage:this.average_acreage ,
              farmer_groups_no:this.farmer_groups_no ,
              groups_submitted:this.get_list_of_groups(),
              number_of_members:this.number_of_members,
              know_no_of:this.know_no_of,
              members_in_previous_years_2018:this.members_in_previous_years_2018,
              members_in_previous_years_2019:this.members_in_previous_years_2019,
              members_in_previous_years_2020:this.members_in_previous_years_2020,
              members_in_previous_years_2021:this.members_in_previous_years_2021,
              have_membership_fee:this.have_membership_fee,
              members_paid_uptodate:this.members_paid_uptodate ,
              provision_for_inclusion:this.provision_for_inclusion ,
              conduct_membership_satisfaction:this.conduct_membership_satisfaction ,
              source_of_revenue:this.source_of_revenue ,
              major_funding_source:this.major_funding_source ,
              total_investment:this.total_investment ,
              total_cost_operation:this.total_cost_operation ,
              total_annual_sales:this.total_annual_sales ,
              total_asset:this.total_asset ,
              mode_of_remittances:this.mode_of_remittances ,
              record_of_sales:this.record_of_sales ,
              financial_mgt:this.financial_mgt ,
              internal_audit:this.internal_audit ,
              are_audits_done:this.are_audits_done ,
              agency_audit:this.agency_audit ,
              when_was_audit:this.when_was_audit ,
              other_sources_of_income:this.other_sources_of_income ,
              minute_book:this.minute_book ,
              bank_book:this.bank_book ,
              bank_account:this.bank_account ,
              ME_system:this.ME_system ,
              credit_facility:this.credit_facility ,
              credit_facility_due_date:this.credit_facility_due_date ,
              financial_statement_photo:this.financial_statement_photo ,
              main_business_sector:this.main_business_sector ,
              main_customers:this.main_customers ,
              crops_bulked:this.crops_bulked ,
              Quantity_bulked_2017:this.Quantity_bulked_2017 ,
              Quantity_bulked_2018:this.Quantity_bulked_2018,
              Quantity_bulked_2019:this.Quantity_bulked_2019 ,
              Quantity_bulked_2020:this.Quantity_bulked_2020,
              total_sales_bulked_2017: this.total_sales_bulked_2017 ,
              total_sales_bulked_2018:this.total_sales_bulked_2018,
              total_sales_bulked_2019:this.total_sales_bulked_2019,
              total_sales_bulked_2020:this.total_sales_bulked_2020,
              calculated_cost_per_kg:this.calculated_cost_per_kg ,
              sales_in_inputs:this.sales_in_inputs ,
              storage_facility:this.storage_facility ,
              value_addition_facility:this.value_addition_facility ,
              value_addition_levels:this.value_addition_levels ,
              collect_products:this.collect_products ,
              facilitate_access_credit:this.facilitate_access_credit ,
              extend_credit_services:this.extend_credit_services ,
              no_of_loans_2017:this.no_of_loans_2017 ,
              no_of_loans_2018:this.no_of_loans_2018,
              no_of_loans_2019:this.no_of_loans_2019,
              no_of_loans_2020:this.no_of_loans_2020,
              loan_interest_rate:this.loan_interest_rate ,
              year_of_establishment:this.year_of_establishment ,
              main_challenges:this.main_challenges ,
              major_impact_on_people:this.major_impact_on_people ,
              public_partnership:this.public_partnership ,
              services_you_access:this.services_you_access ,
              services_you_access_specify:this.services_you_access_specify,
              partnerships_with_donors:this.partnerships_with_donors ,
              access_information:this.access_information ,
              technology_uptake:this.technology_uptake ,
              technology_uptake_others:this.technology_uptake_others,
              training:this.training ,
              access_to_electricity:this.access_to_electricity ,
              other_forms_of_energy:this.other_forms_of_energy ,
              access_to_water:this.access_to_water,
              location_name:this.location_name,
              village_agri:this.village_agri,
              //Adding the other documents
              //documents:this.upload(),
              fo:this.fo,
              token:this.token
              }
              this.accsPrvds.postData(body, 'agribulker.php').subscribe((res:any)=> {
                          if(res.success==true){
                              loader.dismiss();
                              this.disabledButton = false;
                              this.presentToast(res.msg);
                              this.router.navigate(['/agribulker']);
                              this.name_of_agribulker="";
                              this.registered_as="";
                              this.registered_as_others="";
                              this.longitude_agri="";
                              this.latitude_agri="";
                              this.agri_street_address="";
                              this.agri_website="";
                              this.email_address="";
                              this.business_telephone="";
                              this.name_contact_person="";
                              this.proprietor_the_contact_person="";
                              this.name_of_proprietor="";
                              this.contact_photo_url="";
                              this.gender_of_proprietor="";
                              this.title_of_proprietor="";
                              this.contact_person_mobile="";
                              this.education_level="";
                              this.available_docs=[];
                              this.business_reg_status="";
                              this.reg_number="";
                              this.institute_organogram=[];
                              this.annual_meetings="";
                              this.management_committee_meetings="";
                              this.management_meetings="";
                              this.mgt_from_board="";
                              this.regular_elections="";
                              this.guiding_policy_doc=[];
                              this.no_of_tech_team="";
                              this.size_of_land="";
                              this.land_ownership="";
                              this.office_ownership="";
                              this.bulking_unit="";
                              this.org_charged_over=[];
                              this.business_type="";
                              this.business_type_others="";
                              this.existing_db="";
                              this.average_acreage="";
                              this.farmer_groups_no="";
                              this.groups_submitted=[];
                              this.number_of_members="";
                              this.know_no_of=[];
                              this.members_in_previous_years_2018="";
                              this.members_in_previous_years_2019="";
                              this.members_in_previous_years_2020="";
                              this.members_in_previous_years_2021="";
                              this.have_membership_fee="",
                              this.members_paid_uptodate="";
                              this.provision_for_inclusion="";
                              this.conduct_membership_satisfaction="";
                              this.source_of_revenue="";
                              this.major_funding_source="";
                              this.total_investment="";
                              this.total_cost_operation="";
                              this.total_annual_sales="";
                              this.total_asset="";
                              this.mode_of_remittances="";
                              this.record_of_sales="";
                              this.financial_mgt="";
                              this.internal_audit="";
                              this.are_audits_done="";
                              this.agency_audit="";
                              this.when_was_audit="";
                              this.other_sources_of_income="";
                              this.minute_book="";
                              this.bank_book="";
                              this.bank_account="";
                              this.ME_system="";
                              this.credit_facility="";
                              this.credit_facility_due_date="";
                              this.financial_statement_photo="";
                              this.main_business_sector="";
                              this.main_customers="";
                              this.crops_bulked=[];
                              this.Quantity_bulked_2017=[];
                              this.Quantity_bulked_2018=[];
                              this.Quantity_bulked_2019=[];
                              this.Quantity_bulked_2020=[];
                              this.total_sales_bulked_2017=[];
                              this.total_sales_bulked_2018=[];
                              this.total_sales_bulked_2019=[];
                              this.total_sales_bulked_2020=[];
                              this.calculated_cost_per_kg=[];
                              this.sales_in_inputs="";
                              this.storage_facility="";
                              this.value_addition_facility="";
                              this.value_addition_levels=[];
                              this.collect_products="";
                              this.facilitate_access_credit="";
                              this.extend_credit_services="";
                              this.no_of_loans_2017="";
                              this.no_of_loans_2018="";
                              this.no_of_loans_2019="";
                              this.no_of_loans_2020="";
                              this.loan_interest_rate="";
                              this.year_of_establishment="";
                              this.main_challenges="";
                              this.major_impact_on_people="";
                              this.public_partnership="";
                              this.services_you_access=[];
                              this.services_you_access_specify="";
                              this.partnerships_with_donors="";
                              this.access_information="";
                              this.technology_uptake=[];
                              this.technology_uptake_others="";
                              this.training=[];
                              this.access_to_electricity="";
                              this.other_forms_of_energy=[];
                              this.access_to_water="";   
                              this.location_name="";  
                              this.village_agri="";
                              //clearing the form data
                              this.myForm.reset()
                              this.currentImage="";
                              this.currentImage_fs="";
                              
                              
                              
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
              this.addDetails(this.name_of_agribulker,this.registered_as,this.registered_as_others,this.longitude_agri,this.latitude_agri,this.agri_street_address,this.agri_website,this.email_address,this.business_telephone,this.name_contact_person,this.proprietor_the_contact_person,this.name_of_proprietor,this.contact_photo_url,this.gender_of_proprietor,this.title_of_proprietor,this.contact_person_mobile,this.education_level,this.available_docs,this.business_reg_status,this.reg_number,this.institute_organogram,this.annual_meetings,this.management_committee_meetings, this.management_meetings, this.mgt_from_board,this.regular_elections, this.guiding_policy_doc, this.no_of_tech_team,this.size_of_land,this.land_ownership,this.office_ownership,this.bulking_unit, this.org_charged_over,this.business_type,this.business_type_others, this.existing_db, this.average_acreage,this.farmer_groups_no,this.get_list_of_groups(),this.number_of_members,this.know_no_of, this.members_in_previous_years_2018,this.members_in_previous_years_2019,this.members_in_previous_years_2020,this.members_in_previous_years_2021,this.have_membership_fee,this.members_paid_uptodate,this.provision_for_inclusion, this.conduct_membership_satisfaction,this.source_of_revenue, this.major_funding_source,this.total_investment, this.total_cost_operation,this.total_annual_sales,this.total_asset, this.mode_of_remittances,this.record_of_sales, this.financial_mgt,this.internal_audit,this.are_audits_done,this.agency_audit, this.when_was_audit,this.other_sources_of_income, this.minute_book,this.bank_book,this.bank_account,this.ME_system,this.credit_facility,this.credit_facility_due_date,this.financial_statement_photo, this.main_business_sector, this.main_customers,this.crops_bulked,this.Quantity_bulked_2017,this.Quantity_bulked_2018,this.Quantity_bulked_2019,this.Quantity_bulked_2020,this.total_sales_bulked_2017,this.total_sales_bulked_2018,this.total_sales_bulked_2019, this.total_sales_bulked_2020, this.calculated_cost_per_kg,this.sales_in_inputs,this.storage_facility,this.value_addition_facility, this.value_addition_levels,this.collect_products,this.facilitate_access_credit,this.extend_credit_services,this.no_of_loans_2017,this.no_of_loans_2018,this.no_of_loans_2019,this.no_of_loans_2020,this.loan_interest_rate,this.year_of_establishment,this.main_challenges,this.major_impact_on_people,this.public_partnership,this.services_you_access,this.services_you_access_specify,this.partnerships_with_donors,this.access_information,this.technology_uptake,this.technology_uptake_others,this.training,this.access_to_electricity,this.other_forms_of_energy,this.access_to_water,this.location_name,this.village_agri,this.fo,this.token);
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
