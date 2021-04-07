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
  id: number;
  region: string;
  district:string;
  subcounty:string;
  topic: string;
  activity: string;
  Photo_url: string;
  males: string;
  females: string;
  lo: string;
  la: string;
  fo: string;

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
    return this.sqlite.create({ name: 'dat28.db', location: 'default' }).then(
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
          + ' la VARCHAR(50),'
          + ' lo VARCHAR(50),'
          + ' fo VARCHAR(50))',
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

 
  async addDetails(region: string, district:string, subcounty:string, topic:string,activity:string,Photo_url:string,males:string,females:string,la:string,lo:string,fo:string) {
    let data = [region, district, subcounty,topic,activity,Photo_url,males,females,la,lo,fo];
    this.dbInstance.executeSql('insert into DETAILS(region, district, subcounty,topic,activity,Photo_url,males,females,la,lo,fo) VALUES(?,?,?,?,?,?,?,?,?,?,?)', data)
      .catch(e => console.log(e));
      this.router.navigate(['/beneficiary']);
    return this.getAllRecords();
  }
 
  /*async updateToDo(id: number) {
    this.dbInstance.executeSql('UPDATE TODO SET ISDONE=1 WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }*/
 
  async deleteDetails(id: number) {
    this.dbInstance.executeSql('DELETE FROM DETAILS WHERE ID=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
    
  }

}