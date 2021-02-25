import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.page.html',
  styleUrls: ['./agent.page.scss'],
})
export class AgentPage implements OnInit {
  isSubmitted = false;
  form: FormGroup;
  product:any;
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
  http: any;


  constructor(
    public fb: FormBuilder,
    private _cdr: ChangeDetectorRef
    ) {}

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
  this.form = this.fb.group({
  country: [''],
  state: [''],
  subcounty: [''],
  name: ['', [Validators.required, Validators.minLength(2)]],
  phone: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
  bsps: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  
  vslas: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  
  miycan: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  
  vhts: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  
  ddmcs: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  cstructures: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  champions: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  schools: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  radiostations: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  
});

  }
  get errorControl() {
    return this.form.controls;
  }

 
}
