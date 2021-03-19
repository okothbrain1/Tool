import { DatabaseService, Dev } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notsent',
  templateUrl: './notsent.page.html',
  styleUrls: ['./notsent.page.scss'],
})
export class NotsentPage implements OnInit {


  developers: Dev[] = [];

  products: Observable<any[]>;

  developer = {};
  product = {};

  selectedView = 'devs';

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.products = this.db.getProducts();
      }
    });
  }

  
  addDeveloper() {
    this.db.addDeveloper(this.developer['region'], this.developer['district'], this.developer['subcounty'], this.developer['topic'], this.developer['activity'], this.developer['Photo_url'], this.developer['males'], this.developer['females'], this.developer['total'], this.developer['la'], this.developer['lo'], this.developer['fo'])
    .then(_ => {
      this.developer = {};
    });
  }

  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
    .then(_ => {
      this.product = {};
    });
  }

}
