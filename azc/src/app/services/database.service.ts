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
id: number;// for sqlite db

Name_of_enterprise:string;
region:string;
district:string;
specify_other_districts:string;
street_address:string;
lo: string;
la: string;
acc:string;
business_telephone: string;
website: string;
email: string;
year_established: string;
number_of_employees: string;
business_sector: string;
business_activity: string;
list_of_pdts_svcs: string;
name_contact_person: string;
contact_person_mobile: string;
title_of_contact_person: string;
references_main_customers: string;
total_investment: string; 
total_assets_value: string;
gross_annual_sales: string;
annual_export_turnover: string;
needs_or_challenges: string;
business_type: string;
company_reg_status: string;
company_registration_number_allocated: string;
submittername: string;
title: string;
fo: string;
phone_:string;
do_export:string;
token:string;
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
    return this.sqlite.create({ name: 'uia56.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'DETAILS(id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' Name_of_enterprise TEXT,'
          + ' region TEXT,'
          + ' district TEXT,'
          + ' specify_other_districts TEXT,' 
          + ' street_address TEXT,'
          + ' lo TEXT,'
          + ' la TEXT,'
          + ' acc TEXT,' 
          + ' business_telephone TEXT,'
          + ' website TEXT,'
          + ' email TEXT,'
          + ' year_established TEXT,'
          + ' number_of_employees TEXT,'
          + ' business_sector TEXT,'
          + ' business_activity TEXT,'
          + ' list_of_pdts_svcs TEXT,'
          + ' name_contact_person TEXT,'
          + ' contact_person_mobile TEXT,'
          + ' title_of_contact_person TEXT,'
          + ' references_main_customers TEXT,'
          + ' total_investment TEXT,'
          + ' total_assets_value TEXT,'
          + ' gross_annual_sales TEXT,'
          + ' annual_export_turnover TEXT,'
          + ' needs_or_challenges TEXT,'
          + ' business_type TEXT,'
          + ' company_reg_status TEXT,'
          + ' company_registration_number_allocated TEXT,'
          + ' submittername TEXT,'
          + ' title TEXT,'
          + ' fo TEXT,'
          + ' phone_ TEXT,'
          + ' do_export TEXT,'
          + ' token TEXT)',
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
  
  async addDetails(Name_of_enterprise:string,region:string,district:string,specify_other_districts:string,street_address:string,lo:string,la:string,acc:string,business_telephone:string,website:string,email:string,year_established:string,number_of_employees:string,business_sector:string,business_activity:string,list_of_pdts_svcs:string,name_contact_person:string,contact_person_mobile:string,title_of_contact_person:string,references_main_customers:string,total_investment:string,total_assets_value:string,gross_annual_sales:string,annual_export_turnover:string,needs_or_challenges:string,business_type:string,company_reg_status:string,company_registration_number_allocated:string,submittername:string,title:string,fo:string,phone_:string,do_export:string,token:string) {
    let data = [Name_of_enterprise,region,district,specify_other_districts,street_address,lo,la,acc,business_telephone,website,email,year_established,number_of_employees,business_sector,business_activity,list_of_pdts_svcs,name_contact_person,contact_person_mobile,title_of_contact_person,references_main_customers,total_investment,total_assets_value,gross_annual_sales,annual_export_turnover,needs_or_challenges,business_type,company_reg_status,company_registration_number_allocated,submittername,title,fo,phone_,do_export,token];
    this.dbInstance.executeSql('insert into DETAILS(Name_of_enterprise,region,district,specify_other_districts,street_address,lo,la,acc,business_telephone,website,email,year_established,number_of_employees,business_sector,business_activity,list_of_pdts_svcs,name_contact_person,contact_person_mobile,title_of_contact_person,references_main_customers,total_investment,total_assets_value,gross_annual_sales,annual_export_turnover,needs_or_challenges,business_type,company_reg_status,company_registration_number_allocated,submittername,title,fo,phone_,do_export,token) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data)
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