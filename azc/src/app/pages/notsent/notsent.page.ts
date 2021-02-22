import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notsent',
  templateUrl: './notsent.page.html',
  styleUrls: ['./notsent.page.scss'],
})
export class NotsentPage implements OnInit {

  public form = [
    { val: 'dummy.....', isChecked: false },
  ];

  constructor() { }

  ngOnInit() {
  }

}
