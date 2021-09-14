import { Component, OnInit } from '@angular/core';
import { DatabaseSentService, Details6Interface  } from '../../services/databaseSent.service';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-editsentform',
  templateUrl: './editsentform.page.html',
  styleUrls: ['./editsentform.page.scss'],
})
export class EditsentformPage implements OnInit {
  id6: any;
  farmers_name:string = "";;
  do_you_have_disability:string = "";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private db6: DatabaseSentService
  ) { 
    this.id6 = this.activatedRoute.snapshot.paramMap.get('id6');
    //this.db5.getAllDetails().then(data5 => this.details5 = data5);
    this.db6.getAllDetails().then((res) => {
      this.id6=res['id6'];
      this.farmers_name = res['farmers_name'];
      this.do_you_have_disability = res['do_you_have_disability']; 
    })

  }

  //Function to perform an edit(update) on the sent form
  onUpdate() {
    this.db6.updateDetails(this.id6, this.farmers_name, this.do_you_have_disability).then(() => {
    this.router.navigate(['/sent']);
  })
  }

  ngOnInit() {
  }

}
