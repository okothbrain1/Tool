import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';


export interface Dev {
  id: number,
  region: string,
  district: string,
  subcounty: string,
  topic: string,
  activity: string,
  Photo_url: string,
  males: string,
  females: string,
  total: string,
  la: string,
  lo: string,
  fo: string
  //sbcounty: any[],
  //img: string
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'ican.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
          this.database.executeSql('CREATE TABLE IF NOT EXISTS developer (id INTEGER PRIMARY KEY AUTOINCREMENT, region TEXT, district TEXT, subcounty TEXT, topic TEXT, activity TEXT, Photo_url LONGTEXT, males TEXT, females TEXT, total TEXT, la TEXT, lo TEXT, fo TEXT)');
      });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadDevelopers();
          this.loadProducts();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getDevs(): Observable<Dev[]> {
    return this.developers.asObservable();
  }

  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }

  loadDevelopers() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let developers: Dev[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          developers.push({ 
            id: data.rows.item(i).id,
            region: data.rows.item(i).region, 
            district: data.rows.item(i).district,
            subcounty: data.rows.item(i).subcounty,
            topic: data.rows.item(i).topic,
            activity: data.rows.item(i).activity,
            Photo_url: data.rows.item(i).Photo_url,
            males: data.rows.item(i).males,
            females: data.rows.item(i).females,
            total: data.rows.item(i).total,
            la: data.rows.item(i).la,
            lo: data.rows.item(i).lo,
            fo: data.rows.item(i).fo
               });
        }
      }
      this.developers.next(developers);
    });
  }

  addDeveloper(region, district, subcounty, topic, activity, Photo_url, males, females, total, la, lo, fo) {
    let data = [region, district, subcounty, topic, activity, Photo_url, males, females, total, la, lo, fo];
    return this.database.executeSql('INSERT INTO developer (region, district, subcounty, topic, activity, Photo_url, males, females, total, la, lo, fo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadDevelopers();
      let toast = this.toastController.create({
        message: `Your data is stored locally because you seem to be offline.`,
        duration: 4000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
      console.log('Data stored successfully');
    }).catch((error) => {
       console.log('Error saving into table ', error);
     });
  }

  getDeveloper(id): Promise<Dev> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {

      return {
            id: data.rows.item(0).id,
            region: data.rows.item(0).region, 
            district: data.rows.item(0).district,
            subcounty: data.rows.item(0).subcounty,
            topic: data.rows.item(0).topic,
            activity: data.rows.item(0).activity,
            Photo_url: data.rows.item(0).Photo_url,
            males: data.rows.item(0).males,
            females: data.rows.item(0).females,
            total: data.rows.item(0).total,
            la: data.rows.item(0).la,
            lo: data.rows.item(0).lo,
            fo: data.rows.item(0).fo
      }
    });
  }

  deleteDeveloper(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadDevelopers();
      this.loadProducts();
    });
  }

  updateDeveloper(dev: Dev) {
    let data = [dev.region, dev.district, dev.subcounty, dev.topic, dev.activity, dev.Photo_url, dev.males, dev.females, dev.total, dev.la, dev.lo, dev.fo ];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDevelopers();
    })
  }

  loadProducts() {
    let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    return this.database.executeSql(query, []).then(data => {
      let products = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          products.push({ 
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator,
           });
        }
      }
      this.products.next(products);
    });
  }

  addProduct(name, creator) {
    let data = [name, creator];
    return this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data).then(data => {
      this.loadProducts();
    });
  }


}