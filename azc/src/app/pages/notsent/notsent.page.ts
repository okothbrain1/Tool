import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dev } from './../../services/database.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notsent',
  templateUrl: './notsent.page.html',
  styleUrls: ['./notsent.page.scss'],
})
export class NotsentPage implements OnInit {


  constructor(private db: DatabaseService) { }

  ngOnInit() {
   
  }

 

}
