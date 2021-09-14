import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { Router } from '@angular/router';

export interface Details2Interface {
id2: number;// for sqlite db
Name:string;
gender:string;
age:string;
phone:string;
email:string;
live: string;
nearest_township: string;
select_qualification: string;
specify_qualification: string;
institution: string;
qualification: string;
year_of_q: string;
work_experience: string;
specify_areas_of_experience: string;
position: string;
employers: string;
interest: string;
specify_interest: string;
skills: string;
other_skills: string;
recommend: string; 
fo: string; 
token: string;
}


@Injectable({
  providedIn: 'root'
})
export class Database2Service {
  private dbInstance: SQLiteObject;

  constructor( private sqlite: SQLite, private router:Router) {
  }

  async getAllDetails() {
    let details2: Details2Interface[] = [];
    return this.sqlite.create({ name: 'yapp15.db', location: 'default' }).then(
      (db2) => {
        this.dbInstance = db2;
        db2.executeSql('CREATE TABLE IF NOT EXISTS '
          + 'yapptb(id2 INTEGER PRIMARY KEY AUTOINCREMENT,'
          + ' Name TEXT,'
          + ' gender TEXT,'
          + ' age TEXT,'
          + ' phone TEXT,'
          + ' email TEXT,' 
          + ' live TEXT,'
          + ' nearest_township TEXT,'
          + ' select_qualification TEXT,'
          + ' specify_qualification TEXT,'
          + ' institution TEXT,'
          + ' qualification TEXT,'
          + ' year_of_q TEXT,'
          + ' work_experience TEXT,'
          + ' specify_areas_of_experience TEXT,'
          + ' position TEXT,'
          + ' employers TEXT,'
          + ' interest TEXT,'
          + ' specify_interest TEXT,'
          + ' skills TEXT,'
          + ' other_skills TEXT,'
          + ' recommend TEXT,'
          + ' fo TEXT,'
          + ' token)',
          [])
          .catch(e => console.log(e));
        details2 = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return details2;
    });
  }
 
  private getAllRecords(): Details2Interface[] {
    let details2: Details2Interface[] = [];
    this.dbInstance.executeSql('select * from yapptb', []).then(
      (res) => {
        for(var x=0; x<res.rows.length; x++)
          details2.push(res.rows.item(x));
      }
    ).catch(e => {
      console.log(e);
    });
    return details2;
  }
  
  async addDetails(Name:string,gender:string,age:string,phone:string,email:string,live:string,nearest_township:string,select_qualification:string,specify_qualification:string,institution:string,qualification:string,year_of_q:string,work_experience:string,specify_areas_of_experience:string,position:string,employers:string,interest:string,specify_interest:string,skills:string,other_skills:string,recommend:string,fo:string,token:string) {
    let data2 = [Name,gender,age,phone,email,live,nearest_township,select_qualification,specify_qualification,institution,qualification,year_of_q,work_experience,specify_areas_of_experience,position,employers,interest,specify_interest,skills,other_skills,recommend,fo, token];
    this.dbInstance.executeSql('insert into yapptb(Name,gender,age,phone,email,live,nearest_township,select_qualification,specify_qualification,institution,qualification,year_of_q,work_experience,specify_areas_of_experience,position,employers,interest,specify_interest,skills,other_skills,recommend,fo,token) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data2)
      .catch(e => console.log(e));
      this.router.navigate(['/agent']);
    return this.getAllRecords();
  }
  async deleteDetails(id2: number) {
    this.dbInstance.executeSql('DELETE FROM yapptb WHERE id2=?', [id2])
      .catch(e => console.log(e));
    return this.getAllRecords();    
  }
}