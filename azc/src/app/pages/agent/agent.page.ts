import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
  styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit {
  form: FormGroup;
  countries = ['Acholi', 'Karamoja', 'Kigezi'];
  statesByCountry = {
    Acholi: ['Lamwo', 'Gulu', 'Nwoya'],
    Karamoja: ['Kotido', 'Kaabong'],
    Kigezi: ['Kanungu', 'Kisoro', 'Rukungiri'],
  };
  
  subcountiesByStates = {
    Lamwo:['Agoro','Padibe east','Lokung','Palabek Kal','Paloga'],
    Gulu: ['Awach','Unyama','Patiko'],
    Nwoya: ['Anaka','Koch goma','Lil','Purongo'],
    Kotido: ['Rengen','Northern division','Nakapelimoru','Kacheri'],
    Kaabong: ['Sidok','Loyoro','Lolelia'],
    Kanungu: ['Kihiihi','Mpungu','Kirima','Katete','Nyanga'],
    Kisoro: ['Bukimbiri','Muramba','Murora','Busanza','Chahi'],
    Rukungiri: ['Bugangari','Bwambara','Nyakagyeme','Buhunga','Nyakishenyi'],
  };
  states = [];
  subcounties = [];


  constructor(fb: FormBuilder,
    private _cdr: ChangeDetectorRef) {
this.form = fb.group({
country: [''],
state: [''],
subcounty: [''],
name: [''],
phone: [''],
bsps: [''],
vslas: [''],
miycan: [''],
vhts: [''],
ddmcs: [''],
cstructures: [''],
champions: [''],
schools: [''],
radiostations: ['']

});
}

onCountryChange(): void {
let country = this.form.get('country').value;
this.states = this.statesByCountry[country];
this._cdr.detectChanges();
}

onStateChange(): void {
  let state = this.form.get('state').value;
  this.subcounties = this.subcountiesByStates[state];
  this._cdr.detectChanges();
  }

  ngOnInit() {
    imports: [
      BrowserModule /* or CommonModule */, 
      FormsModule, ReactiveFormsModule
  ]
  }

}
