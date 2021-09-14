import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { Router } from '@angular/router';
export interface Details4Interface {
  id4: number;
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
  
  fo: string; //name of the submitter
  token: string;
  }
@Injectable({
  providedIn: 'root'
})
export class Database4Service {
  private dbInstance: SQLiteObject;

  constructor( private sqlite: SQLite, private router:Router) {
  }

  async getAllDetails() {
    let details4: Details4Interface[] = [];
    return this.sqlite.create({ name: 'farmergroup10.db', location: 'default' }).then(
      (db4) => {
        this.dbInstance = db4;
        db4.executeSql('CREATE TABLE IF NOT EXISTS '
          +'farmergroup(id4 INTEGER PRIMARY KEY AUTOINCREMENT,'
          +'farmer_group_name TEXT,'          
          +'district_subcounty_fg TEXT,'
          +'parish_fg TEXT,'
          +'village_fg TEXT,'
          +'meeting_venue TEXT,'
          +'longitude_group TEXT,'
          +'latitude_group TEXT,'
          +'group_chairperson TEXT,'
          +'chairperson_contact TEXT,'
          +'secretary TEXT,'
          +'secretary_contact TEXT,'
          +'have_farmer_db TEXT,'
          +'number_of_farmers TEXT,'
          +'females TEXT,'
          +'males TEXT,'
          +'list_of_farmers TEXT,'
          +'members_in_group TEXT,'
          +'main_enterprise TEXT,'
          +'type_of_group_records TEXT,'
          +'group_obtain_VSLA TEXT,'
          +'people_took_loan TEXT,'
          +'payback_percentage TEXT,'
          +'mode_of_payment TEXT,'
          +'group_total_loan TEXT,'
          +' fo TEXT,'
          +' token)',
          [])
          .catch(e => console.log(e));
        details4 = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return details4;
    });
  }

  private getAllRecords(): Details4Interface[] {
    let details4: Details4Interface[] = [];
    this.dbInstance.executeSql('select * from farmergroup', []).then(
      (res) => {
        for(var x=0; x<res.rows.length; x++)
          details4.push(res.rows.item(x));
      }
    ).catch(e => {
      console.log(e);
    });
    return details4;
  }

  async addDetails(  farmer_group_name:string,district_subcounty_fg:string,parish_fg:string,village_fg:string,meeting_venue:string,longitude_group:string,latitude_group:string,group_chairperson:string,chairperson_contact:string,secretary:string,secretary_contact:string,have_farmer_db:string,number_of_farmers:string,females:string,males:string,list_of_farmers:any[],members_in_group:string,main_enterprise:string,type_of_group_records:string,group_obtain_VSLA:string,people_took_loan:string,payback_percentage:string,mode_of_payment:string,group_total_loan:string,fo: string,token: string) {
    let data4 = [farmer_group_name,district_subcounty_fg,parish_fg,village_fg,meeting_venue,longitude_group,latitude_group,group_chairperson,chairperson_contact,secretary,secretary_contact,have_farmer_db,number_of_farmers,females,males,list_of_farmers,members_in_group,main_enterprise,type_of_group_records,group_obtain_VSLA,people_took_loan,payback_percentage,mode_of_payment,group_total_loan,fo,token];
    this.dbInstance.executeSql('insert into farmergroup(farmer_group_name,district_subcounty_fg,parish_fg,village_fg,meeting_venue,longitude_group,latitude_group,group_chairperson,chairperson_contact,secretary,secretary_contact,have_farmer_db,number_of_farmers,females,males,list_of_farmers,members_in_group,main_enterprise,type_of_group_records,group_obtain_VSLA,people_took_loan,payback_percentage,mode_of_payment,group_total_loan,fo,token) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data4)
      .catch(e => console.log(e));
      this.router.navigate(['/farmergroup']);
    return this.getAllRecords();
  }
  async deleteDetails(id4: number) {
    this.dbInstance.executeSql('DELETE FROM farmergroup WHERE id4=?', [id4])
      .catch(e => console.log(e));
    return this.getAllRecords();    
  }

}
