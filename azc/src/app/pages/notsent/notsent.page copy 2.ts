import { DatabaseService, DetailsInterface } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { DatasetService } from '../../providers/dataset.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notsent',
  templateUrl: './notsent.page.html',
  styleUrls: ['./notsent.page.scss'],
})
export class NotsentPage implements OnInit {

  id: number;
  fo: string="";
  disabledButton;

  consent:boolean=false;
  farmers_name:string="";
  do_you_have_disability:string="";
  disability_type:string="";
  
//More columns to be added.
own_a_mobile_phone:string="";
What_type_of_phone_do_you_own:string="";
No_of_contacts:number=null;
tel_no1:string="";
tel_No_2:string="";
service_provider:string="";
Specify_svc_provider:string="";
mm_reg_status:string="";
registered_mm_number:string="";
nin:string="";
ID_photo_url:string="";
Photo_url:string="";
occupation:string="";
specify_other_occupation:string="";
Martial_status:string="";
What_is_your_gender:string="";
name_of_husband:string="";
number_of_wives_husbands:string="";
name_first_wife:string="";
name_second_wife:string="";
status_in_a_family:string="";
next_of_kin:string="";
next_of_kin_has_contact:string="";
next_of_kin_phone_no:string="";
region:string="";
district:string="";
distr:string="";

other_district:string="";
subcounty: string="";
other_subcounty:string="";
soiltype:string="";
subcounty_other_district:string="";
parish:string="";
village:string="";
nearest_town:string="";
Local_council1_name:string="";
resident_since:string="";
Description_of_location:string="";
DOB:string="";
level_of_education:string="";
head_of_the_household:string="";
lo:string="";
la:string="";

Mobile_literacy:string="";
any_dependants:string="";
dependant_no:string="";
dependants_age_bracket:any[]=[]; //The values are not being picked
farmer_org:string="";
name_farmergp:string="";
belong_farmergp:string="";
position_in_FO:string="";
Your_position_in_the_fo:string="";
male_members_in_FO:string="";
female_members_in_FO:string="";
Affiliation:string="";
Name_of_connected_ACE_or_DFA:string="";
main_income_source:string="";
mainincome_since:string="";
sector:string="";
main_income_relaibility:string="";
main_income_amount:string="";
annual_income:string="";
other_income_sources:string="";
other_income_activity:string="";
years_of_experince:string="";
other_income_reliability:string="";
amount:number=null;
income_trend:string="";
access_to_Health_services:string="";
health_expense:string="";
school_going_children:string="";
no_of_school_going_children:number=0;
school_fees_expense:string="";
//expenditure:number=0;
//disposable_income=0;
what_is_the_land_tenor:string="";
Specify_other:string="";
value_of_land:string="";
own_any_farm_machinery:any[]=[];
house_ownership:string="";
house_structure:string="";
Farm_size:number=null;
total_land_size:number=null;

Main_crop_enterprise:string="";

yield_expected_main_enterprise:string="";
farm_at_residence:string="";
//GPs 
GPS_main_enterprise:string="";
postharvest_mgt:string="";
produce_storage:string="";
preservation:string="";
crops_for_new_season:string="";
number_of_employees:string="";


landsize_cropselected:string="";
yield_per_acre:number=null;
in_business_since:string="";

livestock: any[]=[];
specify_livestock:string="";
cattle_number:number=null;
goat_number:number=null;
sheep_number:number=null;
chicken_number:number=null;
pigs_number:number=null;
donkey_number:number=null;
Did_you_plant_last_season:string="";
Specify_other_crops_grown:string="";

yield_of_maize_with_adequate_rain_per_acre:number=null;
yield_of_beans_with_adequate_rain_per_acre:number=null;
yield_of_sesame_with_adequate_rain_per_acre:number=null;
yield_of_soyabean_with_adequate_rain_per_acre:number=null;
yield_of_rice_with_adequate_rain_per_acre:number=null;
yield_of_millet_with_adequate_rain_per_acre:number=null;
yield_of_sorghum_with_adequate_rain_per_acre:number=null;
yield_of_irish_potatoes_with_adequate_rain_per_acre:number=null;
yield_of_cotton_with_adequate_rain_per_acre:number=null;
yield_of_sweet_potatoes_with_adequate_rain_per_acre:number=null;
yield_of_sunflower_with_adequate_rain_per_acre:number=null;
yield_of_groundnuts_with_adequate_rain_per_acre:number=null;
yield_of_coffee_with_adequate_rain_per_acre:number=null;
yield_of_banana_with_adequate_rain_per_acre:number=null;
yield_of_cassava_with_adequate_rain_per_acre:number=null;
crops_stored_from_last_season:string="";
storage_time:string="";
disturbances_in_storage:string="";
Specify_others:string="";
maize_per_kg: number=null;
  beans_per_kg:number=null;
  rice_per_kg: number=null;
  sesame_per_kg: number=null;
  soyabean_per_kg:number=null;
  millet_per_kg: number=null;
  sorghum_per_kg: number=null;
  irish_potatoes_per_kg:number=null;
  cotton_per_kg:number=null;
  sweet_potatoes_per_kg:number=null;
  sunflower_per_kg: number=null;
  ground_nuts_per_kg: number=null;
  coffee_per_kg: number=null;
  Banana_per_bunch:number=null;
  cassava_per_kg: number=null;

  Did_you_apply_fertilizer:string="";
  Specify_the_type:string="";
  organic_specify:string="";
  Specify_other_organic:string="";
  inorganic_Specify:any[]=[];
  use_pesticides_or_herbicides:string="";
  Please_specify_which_one:string="";
  pesticide_effectiveness:string="";
  crop_use: string="";

  involved_in_marketing: string="";
  sell_of_produce_Nyakyera: string="";
  sell_of_produce_green: string="";
  sell_of_produce_equator: string="";
  sell_of_produce_liraresort: string="";
  sell_of_produce_cedo: string="";
  sell_of_produce_orum: string="";
  Marketlink: string="";
  agent_name: string="";
  produce_transport: string="";
  employ_any_farm_labour: string="";
  Specify_their_task:any[]=[];
  Who_assisted_you: any[]=[];
  How_much_did_you_pay_them: number=null;
  Are_you_aware_of_climate_shock:string="";
  which_ones_you_are_aware_of: string="";
  training_on_addressing_climate: string="";
  Please_specify: any[]=[];
  Which_crops_for_rotation:string="";
  crops_grown_last_season:any[]=[];
  knoledge_of_rain_date: string="";
  heard_of_agri_insurance: string="";
  access_to_agri_insurance: string="";
  Please_specify_the_agri_insurance_type: string="";
  Specify_the_insurance_provider: string="";
  fair_charge_for_insurance: string="";
  prefer_ordinary_or_az_bunlde: string="";
  challenges_last_season: any[]=[];
  Specify: string="";
  What_type_of_pests: string="";
  type_of_weather_and_effect: string="";
  Do_you_have_a_bank_account: string="";
  financial_access: string="";
  transaction_monthly_costs: string="";
  Specify_other_monthly_transaction_costs: string="";
  travel_distance: string="";
  specify_other_travel_distance: string="";
  Have_you_ever_received_credit: string="";
  no_of_times_borrowed: string="";
  loanoutstanding: string="";
  How_much_repayment_was_made_per_month: string="";
  delay_time_for_repayment: string="";
  How_do_you_keep_your_money: any[]=[];
  financial_transaction_challeng: any[]=[];
  Specify_Other_financial_transaction_challeng: string="";
  action_access_to_financial_svc: string="";
  access_to_agric_ext_services: string="";
  How_do_you_access_Agric_ext_sv: any[]=[];
  extension_type_channel_receive: any[]=[];
  adopted_practices: any[]=[];
  most_mostadoptedpractice: string="";
  Rate_services_training: string="";
  frequently_access_ext_svcs: string="";
  is_information_provided_accurt: string="";
  trainingappropriate: string="";
  benefits_of_practices: string="";
  pay_anything_to_access_ext_svc: string="";
  training: any[]=[];
  pay_per_season: string="";
  pest_fertilizer_pesticide_info: any[]=[];
  Do_you_receive_weather_data: string="";
  access_to_weather_data: any[]=[];
  How_accurate_is_the_info: string="";
  most_harmful_info: string="";
  biggest_prob_in_data_access: string="";
  spend_on_your_phone_monthly: string="";
  main_phone_use: any[]=[];
  subscribed_to_info_svces_on_ph: string="";
  services_suscribed_to: any[]=[];
  training_on_using_phone_servic: string="";
  training_on_weather_alerts: string="";
  trainig_on_insurance: string="";
  Who_provided_the_training_on_insurance: string="";
  probs_of_using_cellphone: any[]=[];
  name_of_farmer_org: string="";
  Who_provided_the_training_on_weather_alerts: string="";
  field_officer:string=this.fo;

  details: DetailsInterface[];

  constructor(private db: DatabaseService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private accsPrvds : DatasetService,
    private loadingCtrl: LoadingController,
    private router:Router,
    ) { }

  ngOnInit() {
    //this.db.getAllDetails().then(data => this.details = data);
  }

  ionViewDidEnter() {
    this.db.getAllDetails().then(data => this.details = data);
    //Checking for the network connectivity every after some milliseconds
    setInterval(() => {
      //this.network.initializeNetworkEvents();
    }, 300);

  }

  concatenated_location= this.la +""+this.lo;
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:5000,
    });
    toast.present();
  }

  deleteDetails(id: number) {
    this.db.deleteDetails(id)
      .then(data => this.details = data);
      this.presentToast("You have deleted this activity");
  }

  dismissOnSubmit(id: number){
    this.db.deleteDetails(id)
      .then(data => this.details = data);
      this.presentToast("You activity has been submitted successfully");
  }
  //submitting data that is stored locally, more columns to be added. 
  async SubmitOfflineData(id: number, consent: boolean, farmers_name:string, do_you_have_disability:string,disability_type:string, own_a_mobile_phone:string,What_type_of_phone_do_you_own:string,No_of_contacts:number,tel_no1:string,tel_No_2:string,service_provider:string,Specify_svc_provider:string,mm_reg_status:string,registered_mm_number:string,nin:string,ID_photo_url:string,Photo_url:string,occupation:string,specify_other_occupation:string,Martial_status:string,What_is_your_gender:string,name_of_husband:string,number_of_wives_husbands:string,name_first_wife:string,name_second_wife:string,status_in_a_family:string,next_of_kin:string,next_of_kin_has_contact:string,	next_of_kin_phone_no:string,region:string){
    this.disabledButton = true;
    const loader = await this.loadingCtrl.create({
      message: 'please wait as we upload your offline data',
    });
    loader.present();

    return new Promise(resolve => {
        let body = {
          aski:'submit',
//More columns to be added below
          consent: consent,
          farmers_name:farmers_name,
          do_you_have_disability:do_you_have_disability,
          disability_type:disability_type,
          own_a_mobile_phone:own_a_mobile_phone,
          What_type_of_phone_do_you_own:What_type_of_phone_do_you_own,
          No_of_contacts: No_of_contacts,
          tel_no1:tel_no1,
          tel_No_2:tel_No_2,
          service_provider: service_provider,
          Specify_svc_provider:Specify_svc_provider,
          mm_reg_status:mm_reg_status,
          registered_mm_number: registered_mm_number,
          nin:nin,
          Photo_url:Photo_url,
          ID_photo_url:ID_photo_url,
          occupation:occupation,
          specify_other_occupation: specify_other_occupation,
          Martial_status:Martial_status,
          What_is_your_gender:What_is_your_gender,
          name_of_husband:name_of_husband,
          number_of_wives_husbands:number_of_wives_husbands,
          name_first_wife:name_first_wife,
          name_second_wife:name_second_wife,
          status_in_a_family:status_in_a_family,
          next_of_kin:next_of_kin,
          next_of_kin_has_contact:next_of_kin_has_contact,
          next_of_kin_phone_no:next_of_kin_phone_no,
          region:region
          }
          this.accsPrvds.postData(body, 'process2.php').subscribe((res:any)=> {
                      if(res.success==true){
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                          this.router.navigate(['/beneficiary']);
                          this.dismissOnSubmit(id);
                      }else{
                        loader.dismiss();
                        this.disabledButton = false;
                        this.presentToast(res.msg);
                      }
                },(err)=>{
                  loader.dismiss();
                  this.disabledButton = false;
                  this.AlertforOfflineSubmission('Check your internet');
                  console.log('Error ', err);
          });

    });

} 
//More column names to be added
async AlertforOfflineSubmission(a) {
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: a,
    backdropDismiss: false,
    buttons: [
       {
        text: 'Try Again',
        handler: () => {
          //More columns to be added
          this.SubmitOfflineData(this.id,this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region
            );
          
        }
      },
      {
        text: 'Cancel',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          
        }
      }
      
    ]
  });

  await alert.present();
}
async presentAlertforDelete(a:string, id:number) {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: a,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Delete Activity',
            handler: () => {
              this.deleteDetails(id);
            }
          },
           {
            text: 'Cancel',
            handler: () => {
             // this.Submit();
            }
          }
          
        ]
      });
  
      await alert.present();
    }

}
