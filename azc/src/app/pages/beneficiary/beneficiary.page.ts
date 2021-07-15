  import { Platform } from '@ionic/angular';

  import { Component, OnInit,  NgZone,ViewChild, ElementRef, ErrorHandler} from '@angular/core';
  import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  import { DatasetService } from '../../providers/dataset.service';
  import { ApiService } from '../../services/api.service';
  import { NetworkService } from '../../services/network.service';

  import { Storage } from '@ionic/storage';

  import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
  import { Router } from '@angular/router';

  import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
  import { FileChooser } from '@ionic-native/file-chooser/ngx';
  import { FilePath } from '@ionic-native/file-path/ngx';
  import { File, FileEntry } from '@ionic-native/file/ngx';

  import { HttpClient } from '@angular/common/http';
  import { WebView } from '@ionic-native/ionic-webview/ngx';


  import { Observable } from 'rxjs/Observable';

  import { DatabaseService, DetailsInterface } from './../../services/database.service';

  import { Subscription } from 'rxjs/Subscription';
  import { filter } from 'rxjs/operators';

  import { NativeStorage } from '@ionic-native/native-storage/ngx';

  declare var google;
  @Component({
    selector: 'app-beneficiary',
    templateUrl: './beneficiary.page.html',
    styleUrls: ['./beneficiary.page.scss'],
  })
  export class BeneficiaryPage implements OnInit {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    currentMapTrack = null;
   
    isTracking = false;
    trackedRoute = [];
    previousTracks = [];
   
    positionSubscription: Subscription;
    selectedVie//region: string="";
    //district: string="";
    //subcounty: string="";
    fo: string="";
    
    disabledButton;
    currentImage: any;
    currentImageID:any;
    ib: any;
    im:any;
    //for get location
    latitude1: any = 0;
    longitude1: any = 0;
    accuracy1: any = 0;
    lo1:string="";
    la1:string="";
    acc1:string="";
    //for the gps of main crop enterprise
    latitude2:any=0;
    longitude2:any=0;
    accuracy2:any=0;

    name:string;
    datastorage:any;

  details: DetailsInterface[];
  id:number;
  //GPS_main_enterprise_long:any=null;
  //GPS_main_enterprise_lat:any=null;

  //Data for centenary
  consent:boolean=false;	//same as check agree.
  farmers_name:string="";
  do_you_have_disability:string="";
  disability_type:string="";
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
  status_in_a_family:string=""; //This has been removed from the DB
  next_of_kin:string="";
  next_of_kin_has_contact:string="";
  next_of_kin_phone_no:string="";
  region:string="";
  //district:string="";
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
  name_of_farmer_org: string="";
  belong_farmergp:string="";
  name_farmergp:string="";
  year_services:string="";
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
  annual_income:number=null;
  other_income_sources:string="";
  other_income_activity:string="";
  years_of_experince:string="";
  other_income_reliability:string="";
  amount:number=null;
  income_trend:string="";
  access_to_Health_services:string="";
  health_expense:number=null;
  school_going_children:string="";
  no_of_school_going_children:number=null;
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
  Variety_of_mainenterprise:string=""; //it should be after main crop enterprise
  Variety2_of_mainenterprise:string="";
  landsize_main_crop_enterprise:number=null;//follows Variety
  additional_land_main_enterprise:number=null;
  season_of_planting:string="";
  yield_expected_main_enterprise:string="";
  farm_at_residence:string="";
  lo2:string="";
  la2:string="";
  acc2:string="";

  postharvest_mgt:string="";
  produce_storage:string="";
  preservation:string="";
  crops_for_new_season:any[]=[];

  other_crops_intended:string="";
  //landsize_cropselected:string="";
  landsize_cropselected:any[]=[];
  //yield_per_acre:number=null;
  yield_per_acre:any[]=[];
  in_business_since:any[]=[];  
 /**these are in aloop */ 
  number_of_employees:string="";
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

  yield_with_drought:any[]=[];
  year_of_severe_drought:string="";
  how_much_seed:any[]=[];

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
  yield_last_season:any[]=[];
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
  seed_variety:any[]=[];

  Did_you_apply_fertilizer:string="";
  Specify_the_type:string="";
  organic_specify:string="";
  Specify_other_organic:string="";
  inorganic_Specify:any[]=[];
  fertilizer_type:any[]=[];
  fertilizer_amount:any[]=[];

  use_pesticides_or_herbicides:string="";
  Please_specify_which_one:string="";
  pesticide_effectiveness:string="";
  crop_use: string="";
  crop_subsistence:any[]=[];
  crop_commercial:any[]=[];
  income_from_crops:any[]=[];

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
//Ranking info


    Which_crops_for_rotation:string="";
    //Rank details
    _1st_choice:string="";
    _2nd_choice:string="";
    _3rd_choice:string="";
    crops_grown_last_season:any[]=[];
    knoledge_of_rain_date: string="";
    heard_of_agri_insurance: string="";F
    access_to_agri_insurance: string="";
    Please_specify_the_agri_insurance_type: any[]=[];
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
    Voice_calling_and_receiving:string="";
    SMS:string="";
    Internet:string="";
    Social_media:string="";


    subscribed_to_info_svces_on_ph: string="";
    services_suscribed_to: any[]=[];
    training_on_using_phone_servic: string="";
    training_on_weather_alerts: string="";
    trainig_on_insurance: string="";
    Who_provided_the_training_on_insurance: string="";
    probs_of_using_cellphone: any[]=[];
    
    Who_provided_the_training_on_weather_alerts: string="";
    field_officer:string=this.fo;
    //Recently added


  hhplanting_decision:string="";
  hhproductionphase_decision:string=""; 
  hhpostharvet_decision:string="";
  hhmarketing_decision:string="";
  hhincome_decision:string="";

  meals_a_day:string="";
  Vegetables:string=""; 
  Carbohydrates:string="";
  fruits:string="";
  proteins:string=""; 

  farmers_cooperation_responding:string="";
  how_well_agent_knows_beneficiary:string="";
  accuracy_of_info_collected:string="";
  data_quality:string="";
  //farmers1_name: any="";

    
    //details: DetailsInterface[];


    constructor(
      private router:Router,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private accsPrvds : DatasetService,
      private camera: Camera,
      private nativeStorage: NativeStorage,
      private geolocation: Geolocation,
      private apiService: ApiService, 
      private plt: Platform,
      private storage : Storage,
      private toastCtrl: ToastController,
      private transfer : FileTransfer,
      private filePath: FilePath,
      private FileChooser: FileChooser,
      private webview: WebView,
      private file: File,

      private network: NetworkService,

      private http: HttpClient,
      private db: DatabaseService
    ) { 

    }

    term = '';
    district_data: any;
    ngOnInit() {
      fetch('../assets/district_subcounties.json').then(res => res.json())
      .then(json => {
        this.district_data = json;
      });
    }

    

  ionViewWillLeave(){
    
  }
  //Variable for the number of profiles 
  profiles:number;

  ionViewDidEnter() { 
//Saving the number of profile value to ionic storage
    this.storage.get('numberOfProfiles').then((res)=>{
        console.log(res);
        this.profiles = res;
    });
 
    this.storage.get('storage_xxx').then((res)=>{
        console.log(res);
        this.datastorage = res;
        this.name = this.datastorage.name;
        this.disabledButton = false;
    });

      this.db.getAllDetails().then(data => this.details = data);
      //generating the table for persistent storage
      //Checking for the network connectivity every after some milliseconds
      setInterval(() => {
        this.network.initializeNetworkEvents();
        this.SubmissionNumbers();
//Function to hold data in the form
        //this.holdData();
       this.storage.set('farmerData', [this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.farmer_org,this.name_of_farmer_org,this.belong_farmergp,this.name_farmergp,this.year_services,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.Variety_of_mainenterprise,this.Variety2_of_mainenterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.season_of_planting,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.postharvest_mgt,this.produce_storage,this.preservation,this.crops_for_new_season,this.other_crops_intended,this.landsize_cropselected,this.yield_per_acre,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.donkey_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.pesticide_effectiveness,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.involved_in_marketing,this.sell_of_produce_Nyakyera,this.sell_of_produce_green,this.sell_of_produce_equator,this.sell_of_produce_liraresort,this.sell_of_produce_cedo,this.sell_of_produce_orum,this.Marketlink,this.agent_name,this.produce_transport,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.adopted_practices,this.most_mostadoptedpractice,this.Rate_services_training,this.frequently_access_ext_svcs,this.is_information_provided_accurt,this.trainingappropriate,this.benefits_of_practices,this.pay_anything_to_access_ext_svc,this.training,this.pay_per_season,this.pest_fertilizer_pesticide_info,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.trainig_on_insurance,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.hhplanting_decision,this.hhproductionphase_decision,this.hhpostharvet_decision,this.hhmarketing_decision,this.hhincome_decision,this.meals_a_day,this.Vegetables,this.Carbohydrates,this.fruits,this.proteins,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality]);
      //this.RetrieveData();
      }, 3000);
       
      //Saving the form data to ionic storage
   this.storage.get('farmerData').then((res)=>{
    console.log(res);
    [this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.farmer_org,this.name_of_farmer_org,this.belong_farmergp,this.name_farmergp,this.year_services,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.Variety_of_mainenterprise,this.Variety2_of_mainenterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.season_of_planting,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.postharvest_mgt,this.produce_storage,this.preservation,this.crops_for_new_season,this.other_crops_intended,this.landsize_cropselected,this.yield_per_acre,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.donkey_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.pesticide_effectiveness,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.involved_in_marketing,this.sell_of_produce_Nyakyera,this.sell_of_produce_green,this.sell_of_produce_equator,this.sell_of_produce_liraresort,this.sell_of_produce_cedo,this.sell_of_produce_orum,this.Marketlink,this.agent_name,this.produce_transport,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.adopted_practices,this.most_mostadoptedpractice,this.Rate_services_training,this.frequently_access_ext_svcs,this.is_information_provided_accurt,this.trainingappropriate,this.benefits_of_practices,this.pay_anything_to_access_ext_svc,this.training,this.pay_per_season,this.pest_fertilizer_pesticide_info,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.trainig_on_insurance,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.hhplanting_decision,this.hhproductionphase_decision,this.hhpostharvet_decision,this.hhmarketing_decision,this.hhincome_decision,this.meals_a_day,this.Vegetables,this.Carbohydrates,this.fruits,this.proteins,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality] = res;
   });

    }


addDetails(consent: boolean, farmers_name:string, do_you_have_disability:string, disability_type:string,own_a_mobile_phone:string,What_type_of_phone_do_you_own:string,No_of_contacts:number,tel_no1:string,tel_No_2:string,service_provider:string,Specify_svc_provider:string,mm_reg_status:string,registered_mm_number:string,nin:string,ID_photo_url:string,Photo_url:string,occupation:string,specify_other_occupation:string,Martial_status:string,What_is_your_gender:string,name_of_husband:string,number_of_wives_husbands:string,name_first_wife:string,name_second_wife:string,status_in_a_family:string,next_of_kin:string,next_of_kin_has_contact:string,next_of_kin_phone_no:string,region:string,distr:string,other_district:string,subcounty:string,other_subcounty:string,subcounty_other_district:string,soiltype:string,parish: string,village:string,nearest_town:string,resident_since:string,Description_of_location:string,DOB:string,level_of_education:string,head_of_the_household:string,la1:string,lo1:string,acc1:string,Mobile_literacy:string,any_dependants:string,dependant_no:string,dependants_age_bracket:any[],farmer_org:string,name_of_farmer_org:string,belong_farmergp:string,name_farmergp:string, year_services:string,position_in_FO:string,Your_position_in_the_fo:string,male_members_in_FO:string,female_members_in_FO:string,Affiliation:string,Name_of_connected_ACE_or_DFA:string,main_income_source:string,mainincome_since:string,sector:string,main_income_relaibility:string,main_income_amount:string,annual_income:number,other_income_sources:string,other_income_activity:string,years_of_experince:string,other_income_reliability:string,amount:number,income_trend:string,access_to_Health_services:string,health_expense:number,school_going_children:string,no_of_school_going_children:number,school_fees_expense:string,what_is_the_land_tenor:string,Specify_other:string,value_of_land:string,own_any_farm_machinery:any[],house_ownership:string,house_structure:string,Farm_size:number,total_land_size:number,Main_crop_enterprise:string,Variety_of_mainenterprise:string,Variety2_of_mainenterprise:string,landsize_main_crop_enterprise:number,additional_land_main_enterprise:number,season_of_planting:string,yield_expected_main_enterprise:string,farm_at_residence:string,la2:string,lo2:string,acc2:string,postharvest_mgt:string,produce_storage:string,preservation:string,crops_for_new_season:any[],other_crops_intended:string,landsize_cropselected:any[],yield_per_acre:any[],in_business_since:any[],number_of_employees:string,livestock:any[],specify_livestock:string,cattle_number:number,goat_number:number,sheep_number:number,chicken_number:number,pigs_number:number,donkey_number:number,Did_you_plant_last_season:string,crops_grown_last_season:any[],Specify_other_crops_grown:string,yield_of_maize_with_adequate_rain_per_acre:number,yield_of_beans_with_adequate_rain_per_acre:number,yield_of_sesame_with_adequate_rain_per_acre:number,yield_of_soyabean_with_adequate_rain_per_acre:number,yield_of_rice_with_adequate_rain_per_acre:number,yield_of_millet_with_adequate_rain_per_acre:number,yield_of_sorghum_with_adequate_rain_per_acre:number,yield_of_irish_potatoes_with_adequate_rain_per_acre:number,yield_of_cotton_with_adequate_rain_per_acre:number,yield_of_sweet_potatoes_with_adequate_rain_per_acre:number,yield_of_sunflower_with_adequate_rain_per_acre:number,yield_of_groundnuts_with_adequate_rain_per_acre:number,yield_of_coffee_with_adequate_rain_per_acre:number,yield_of_banana_with_adequate_rain_per_acre:number,yield_of_cassava_with_adequate_rain_per_acre:number,crops_stored_from_last_season:string,storage_time:string,disturbances_in_storage:string,Specify_others:string,yield_last_season:any[],yield_with_drought:any[],year_of_severe_drought:string,how_much_seed:any[],maize_per_kg: number,beans_per_kg:number,rice_per_kg: number,sesame_per_kg: number,soyabean_per_kg:number,millet_per_kg: number,sorghum_per_kg: number,irish_potatoes_per_kg:number,cotton_per_kg:number,sweet_potatoes_per_kg:number,sunflower_per_kg: number,ground_nuts_per_kg: number,coffee_per_kg: number,Banana_per_bunch:number,cassava_per_kg: number,seed_variety:any[],Did_you_apply_fertilizer:string,Specify_the_type:string,organic_specify:string,Specify_other_organic:string,inorganic_Specify:any[],fertilizer_type:any[],fertilizer_amount:any[],use_pesticides_or_herbicides:string,Please_specify_which_one:string,pesticide_effectiveness:string,crop_use:string,crop_subsistence:any[],crop_commercial:any[],income_from_crops:any[],involved_in_marketing:string,sell_of_produce_Nyakyera:string,sell_of_produce_green:string,sell_of_produce_equator:string,sell_of_produce_liraresort:string,sell_of_produce_cedo:string,sell_of_produce_orum:string,Marketlink:string,agent_name:string,produce_transport:string,employ_any_farm_labour:string,Specify_their_task:any[],Who_assisted_you:any[],How_much_did_you_pay_them,Are_you_aware_of_climate_shock:string,which_ones_you_are_aware_of:string,training_on_addressing_climate:string,Please_specify:any[],Which_crops_for_rotation:string,_1st_choice:string,_2nd_choice:string,_3rd_choice:string,knoledge_of_rain_date:string,heard_of_agri_insurance:string,access_to_agri_insurance:string,Please_specify_the_agri_insurance_type:any[],Specify_the_insurance_provider: string,fair_charge_for_insurance: string,prefer_ordinary_or_az_bunlde: string,challenges_last_season: any[],Specify: string,What_type_of_pests: string,type_of_weather_and_effect: string,Do_you_have_a_bank_account: string,financial_access: string,transaction_monthly_costs: string,Specify_other_monthly_transaction_costs: string,travel_distance:string,specify_other_travel_distance:string,Have_you_ever_received_credit: string,no_of_times_borrowed: string,loanoutstanding: string,How_much_repayment_was_made_per_month: string,delay_time_for_repayment: string,How_do_you_keep_your_money: any[],financial_transaction_challeng: any[],Specify_Other_financial_transaction_challeng: string,action_access_to_financial_svc: string,access_to_agric_ext_services: string,How_do_you_access_Agric_ext_sv: any[],extension_type_channel_receive: any[],adopted_practices: any[],most_mostadoptedpractice: string,Rate_services_training: string,frequently_access_ext_svcs: string,is_information_provided_accurt: string,trainingappropriate: string,benefits_of_practices: string,pay_anything_to_access_ext_svc: string,training: any[],pay_per_season: string,pest_fertilizer_pesticide_info: any[],Do_you_receive_weather_data: string,access_to_weather_data:any[],How_accurate_is_the_info: string,most_harmful_info: string,biggest_prob_in_data_access: string,spend_on_your_phone_monthly: string,main_phone_use: any[],Voice_calling_and_receiving:string,SMS:string,Internet:string,Social_media:string,subscribed_to_info_svces_on_ph: string,services_suscribed_to:any[],training_on_using_phone_servic:string,training_on_weather_alerts: string,Who_provided_the_training_on_weather_alerts: string,trainig_on_insurance: string,Who_provided_the_training_on_insurance: string,probs_of_using_cellphone: any[],hhplanting_decision:string,hhproductionphase_decision:string,hhpostharvet_decision:string,hhmarketing_decision:string,hhincome_decision:string,meals_a_day:string,Vegetables:string,Carbohydrates:string,fruits:string,proteins:string,farmers_cooperation_responding:string,how_well_agent_knows_beneficiary:string,accuracy_of_info_collected:string,data_quality:string
) {  
    if(this.consent==false){
        this.presentToast('The consent is required');
    }/*else if(this.farmers_name==""){
      this.presentToast('The farmers_name is required');
    }else if(this.do_you_have_disability==""){
      this.presentToast('The do_you_have_disability is required');
    }/*else if(this.disability_type==""){
      this.presentToast('The disability_type is required');
    }*/else{
        this.db.addDetails(consent, farmers_name, do_you_have_disability,disability_type,own_a_mobile_phone,What_type_of_phone_do_you_own,No_of_contacts,tel_no1,tel_No_2,service_provider,Specify_svc_provider,mm_reg_status,registered_mm_number,nin,ID_photo_url,Photo_url,occupation,specify_other_occupation,Martial_status,What_is_your_gender,name_of_husband,number_of_wives_husbands,name_first_wife,name_second_wife,status_in_a_family,next_of_kin,next_of_kin_has_contact,next_of_kin_phone_no,region,distr,other_district,subcounty,other_subcounty,subcounty_other_district,soiltype,parish,village,nearest_town,resident_since,Description_of_location,DOB,level_of_education,head_of_the_household,la1,lo1,acc1,Mobile_literacy,any_dependants,dependant_no,dependants_age_bracket,farmer_org,name_of_farmer_org,belong_farmergp,year_services,name_farmergp,position_in_FO,Your_position_in_the_fo,male_members_in_FO,female_members_in_FO,Affiliation,Name_of_connected_ACE_or_DFA,main_income_source,mainincome_since,sector,main_income_relaibility,main_income_amount,annual_income,other_income_sources,other_income_activity,years_of_experince,other_income_reliability,amount,income_trend,access_to_Health_services,health_expense,school_going_children,no_of_school_going_children,school_fees_expense,what_is_the_land_tenor,Specify_other,value_of_land,own_any_farm_machinery,house_ownership,house_structure,Farm_size,total_land_size,Main_crop_enterprise,Variety_of_mainenterprise,Variety2_of_mainenterprise,landsize_main_crop_enterprise,additional_land_main_enterprise,season_of_planting,yield_expected_main_enterprise,farm_at_residence,la2,lo2,acc2,postharvest_mgt,produce_storage,preservation,crops_for_new_season,other_crops_intended,landsize_cropselected,yield_per_acre,in_business_since,number_of_employees,livestock,specify_livestock,cattle_number,goat_number,sheep_number,chicken_number,pigs_number,donkey_number,Did_you_plant_last_season,crops_grown_last_season,Specify_other_crops_grown,yield_of_maize_with_adequate_rain_per_acre,yield_of_beans_with_adequate_rain_per_acre,yield_of_sesame_with_adequate_rain_per_acre,yield_of_soyabean_with_adequate_rain_per_acre,yield_of_rice_with_adequate_rain_per_acre,yield_of_millet_with_adequate_rain_per_acre,yield_of_sorghum_with_adequate_rain_per_acre,yield_of_irish_potatoes_with_adequate_rain_per_acre,yield_of_cotton_with_adequate_rain_per_acre,yield_of_sweet_potatoes_with_adequate_rain_per_acre,yield_of_sunflower_with_adequate_rain_per_acre,yield_of_groundnuts_with_adequate_rain_per_acre,yield_of_coffee_with_adequate_rain_per_acre,yield_of_banana_with_adequate_rain_per_acre,yield_of_cassava_with_adequate_rain_per_acre,crops_stored_from_last_season,storage_time,disturbances_in_storage,Specify_others,yield_last_season,yield_with_drought,year_of_severe_drought,how_much_seed,maize_per_kg,beans_per_kg,rice_per_kg,sesame_per_kg,soyabean_per_kg,millet_per_kg,sorghum_per_kg,irish_potatoes_per_kg,cotton_per_kg,sweet_potatoes_per_kg,sunflower_per_kg,ground_nuts_per_kg,coffee_per_kg,Banana_per_bunch,cassava_per_kg,seed_variety,Did_you_apply_fertilizer,Specify_the_type,organic_specify,Specify_other_organic,inorganic_Specify,fertilizer_type,fertilizer_amount,use_pesticides_or_herbicides,Please_specify_which_one,pesticide_effectiveness,crop_use,crop_subsistence,crop_commercial,income_from_crops,involved_in_marketing,sell_of_produce_Nyakyera,sell_of_produce_green,sell_of_produce_equator,sell_of_produce_liraresort,sell_of_produce_cedo,sell_of_produce_orum,Marketlink,agent_name,produce_transport,employ_any_farm_labour,Specify_their_task,Who_assisted_you,How_much_did_you_pay_them,Are_you_aware_of_climate_shock,which_ones_you_are_aware_of,training_on_addressing_climate,Please_specify,Which_crops_for_rotation,_1st_choice,_2nd_choice,_3rd_choice,knoledge_of_rain_date,heard_of_agri_insurance,access_to_agri_insurance,Please_specify_the_agri_insurance_type,Specify_the_insurance_provider,fair_charge_for_insurance,prefer_ordinary_or_az_bunlde,challenges_last_season,Specify,What_type_of_pests,type_of_weather_and_effect,Do_you_have_a_bank_account,financial_access,transaction_monthly_costs,Specify_other_monthly_transaction_costs,travel_distance,specify_other_travel_distance,Have_you_ever_received_credit,no_of_times_borrowed,loanoutstanding,How_much_repayment_was_made_per_month,delay_time_for_repayment,How_do_you_keep_your_money,financial_transaction_challeng,Specify_Other_financial_transaction_challeng,action_access_to_financial_svc,access_to_agric_ext_services,How_do_you_access_Agric_ext_sv,extension_type_channel_receive,adopted_practices,most_mostadoptedpractice,Rate_services_training,frequently_access_ext_svcs,is_information_provided_accurt,trainingappropriate,benefits_of_practices,pay_anything_to_access_ext_svc,training,pay_per_season,pest_fertilizer_pesticide_info,Do_you_receive_weather_data,access_to_weather_data,How_accurate_is_the_info,most_harmful_info,biggest_prob_in_data_access,spend_on_your_phone_monthly,main_phone_use,Voice_calling_and_receiving,SMS,Internet,Social_media,subscribed_to_info_svces_on_ph,services_suscribed_to,training_on_using_phone_servic,training_on_weather_alerts,Who_provided_the_training_on_weather_alerts,trainig_on_insurance,Who_provided_the_training_on_insurance,probs_of_using_cellphone,hhplanting_decision,hhproductionphase_decision,hhpostharvet_decision,hhmarketing_decision,hhincome_decision,meals_a_day,Vegetables,Carbohydrates,fruits,proteins,farmers_cooperation_responding,how_well_agent_knows_beneficiary,accuracy_of_info_collected,data_quality

          ).then(data => {
          this.details = data;
        });
        this.presentToast("Profile saved locally, you can submit it later");
        this.disabledButton = false;
        this.consent=false;
        this.farmers_name="";
        this.do_you_have_disability="";
        this.disability_type="";
        this.own_a_mobile_phone="";
        this.What_type_of_phone_do_you_own="";
        this.No_of_contacts=null;
        this.tel_no1="";
        this.tel_No_2="";
        this.service_provider="";
        this.Specify_svc_provider="";
        this.mm_reg_status="";
        this.registered_mm_number="";
        this.nin="";
        this.Photo_url="";
        this.ID_photo_url="";
        this.currentImage="";
        this.currentImageID="";
        this.occupation="";
        this.specify_other_occupation="";
        this.Martial_status="";
        this.What_is_your_gender="";
        this.name_of_husband="";
        this.number_of_wives_husbands="";
        this.name_first_wife="";
        this.name_second_wife="";
        this.status_in_a_family="";
        this.next_of_kin="";
        this.next_of_kin_has_contact="";
        this.next_of_kin_phone_no="";
        this.region="";
        this.distr="";
        this.other_district="";
        this.subcounty="";
        this.other_subcounty="";
        this.subcounty_other_district="";
        this.soiltype="";
        this.parish="";
        this.village="";
        this.nearest_town="";
        this.Local_council1_name="";
        this.resident_since="";
        this.Description_of_location="";
        this.DOB="";
        this.level_of_education="";
        this.head_of_the_household="";
        this.lo1="";
        this.la1="";
        this.acc1="";

        this.lo2="";
        this.la2="";
        this.acc2="";

        this.Mobile_literacy="";
        this.any_dependants="";
        this.dependant_no="";
        this.dependants_age_bracket=[];
        //Casa Data 
        this.farmer_org="";
        this.name_of_farmer_org="";
        this.belong_farmergp="";
        this.name_farmergp="";

        this.year_services="";
        this.belong_farmergp="";
        this.position_in_FO="";
        this.Your_position_in_the_fo="";
        this.male_members_in_FO="";
        this.female_members_in_FO="";
        this.Affiliation="";
        this.Name_of_connected_ACE_or_DFA="";
        this.main_income_source="";
        //Here we include the values that are in aloop for other income source.
        

        this.mainincome_since="";
        this.sector="";
        this.main_income_relaibility="";
        this.main_income_amount="";
        this.other_income_reliability="";
        this.amount=null;
        this.income_trend="";
        this.access_to_Health_services="";
        this.health_expense=null;
        this.school_going_children="";
        this.no_of_school_going_children=null;
        this.school_fees_expense="";
        //expenditure
        //disposable_income
        this.what_is_the_land_tenor="";
        this.Specify_other="";
        this.value_of_land="";
        this.own_any_farm_machinery=[];
        this.house_ownership="";
        this.house_structure="";
        this.Farm_size=null;
        this.total_land_size=null;
        this.Main_crop_enterprise;
        this.yield_expected_main_enterprise;
        this.farm_at_residence="";
        //Gps
        this.postharvest_mgt="";
        this.produce_storage="";
        this.preservation="";
        this.crops_for_new_season=[];

        this.Main_crop_enterprise="";
        this.other_crops_intended="";
        
        this.number_of_employees="";
        this.landsize_cropselected=[];

        this.livestock=[];
        this.specify_livestock="";
        this.cattle_number=null;
        this.goat_number=null;
        this.sheep_number=null;
        this.chicken_number=null;
        this.pigs_number=null;
        this.donkey_number=null;
        this.Did_you_plant_last_season="";
        this.crops_grown_last_season=[];
        this.Specify_other_crops_grown="";
        this.in_business_since=[];
        this.yield_with_drought=[];
        this.year_of_severe_drought="";
        this.how_much_seed=[];

        this.yield_per_acre=[];
        this.yield_of_maize_with_adequate_rain_per_acre=null;
        this.yield_of_beans_with_adequate_rain_per_acre=null;
        this.yield_of_sesame_with_adequate_rain_per_acre=null;
        this.yield_of_soyabean_with_adequate_rain_per_acre=null;
        this.yield_of_rice_with_adequate_rain_per_acre=null;
        this.yield_of_millet_with_adequate_rain_per_acre=null;
        this.yield_of_sorghum_with_adequate_rain_per_acre=null;
        this.yield_of_irish_potatoes_with_adequate_rain_per_acre=null;
        this.yield_of_cotton_with_adequate_rain_per_acre=null;
        this.yield_of_sweet_potatoes_with_adequate_rain_per_acre=null;
        this.yield_of_sunflower_with_adequate_rain_per_acre=null;
        this.yield_of_groundnuts_with_adequate_rain_per_acre=null;
        this.yield_of_coffee_with_adequate_rain_per_acre=null;
        this.yield_of_banana_with_adequate_rain_per_acre=null;
        this.yield_of_cassava_with_adequate_rain_per_acre=null;
        this.crops_stored_from_last_season="";
        this.disturbances_in_storage="";
        this.storage_time="";
        this.Specify_others="";

        this.yield_last_season=[];

        this.yield_with_drought=[];
        this.year_of_severe_drought="";

        this.maize_per_kg=null;
        this.beans_per_kg=null;
        this.sesame_per_kg=null;
        this.soyabean_per_kg=null;
        this.rice_per_kg=null;
        this.millet_per_kg=null;
        this.sorghum_per_kg=null;
        this.irish_potatoes_per_kg=null;
        this.cotton_per_kg=null;
        this.sweet_potatoes_per_kg=null;
        this.sunflower_per_kg=null;
        this.ground_nuts_per_kg=null;
        this.coffee_per_kg=null;
        this.Banana_per_bunch=null;
        this.cassava_per_kg=null;
        this.seed_variety=[];
//More
      this.Did_you_apply_fertilizer=null;
      this.Specify_the_type=null;
      this.organic_specify=null;
      this.Specify_other_organic=null;
      this.inorganic_Specify=[];
      this.fertilizer_type=[];
      this.fertilizer_amount=[];

      this.use_pesticides_or_herbicides="";
      this.Please_specify_which_one="";
      this.pesticide_effectiveness="";
      this.crop_use="";
      this.crop_subsistence=[];
      this.crop_commercial=[];
      this.income_from_crops=[];

      this.involved_in_marketing="";
      this.sell_of_produce_Nyakyera="";
      this.sell_of_produce_green="";
      this.sell_of_produce_equator="";
      this.sell_of_produce_liraresort="";
      this.sell_of_produce_cedo="";
      this.sell_of_produce_orum="";
      this.Marketlink="";
      this.agent_name="";
      this.produce_transport="";
      this.employ_any_farm_labour="";
      this.Specify_their_task=[];
      this.Who_assisted_you=[];
      this.How_much_did_you_pay_them=null;
      this.Are_you_aware_of_climate_shock="";
      this.which_ones_you_are_aware_of="";
      this.training_on_addressing_climate="";
      this.Please_specify=[];
      this.Which_crops_for_rotation="";
      this._1st_choice="";
      this._2nd_choice="";
      this._3rd_choice="";

      this.knoledge_of_rain_date="";
      this.heard_of_agri_insurance="";
      this.access_to_agri_insurance="";
      this.Please_specify_the_agri_insurance_type=[];
      this.Specify_the_insurance_provider="";
      this.fair_charge_for_insurance="";
      this.prefer_ordinary_or_az_bunlde="";
      this.challenges_last_season=[];
      this.Specify="";
      this.What_type_of_pests="";
      this.type_of_weather_and_effect="";
      this.Do_you_have_a_bank_account="";
      this.financial_access="";
      this.transaction_monthly_costs="";
      this.Specify_other_monthly_transaction_costs="";
      this.travel_distance="";
      this.specify_other_travel_distance="";
      this.Have_you_ever_received_credit="";
      this.no_of_times_borrowed="";
      this.loanoutstanding="";
      this.How_much_repayment_was_made_per_month="";
      this.delay_time_for_repayment="";
      this.How_do_you_keep_your_money=[];
      this.financial_transaction_challeng=[];
      this.Specify_Other_financial_transaction_challeng="";
      this.action_access_to_financial_svc="";
      this.access_to_agric_ext_services="";
      this.How_do_you_access_Agric_ext_sv=[];
      this.extension_type_channel_receive=[];
      this.adopted_practices=[];
      this.most_mostadoptedpractice="";
      this.Rate_services_training="";
      this.frequently_access_ext_svcs="";
      this.is_information_provided_accurt="";
      this.trainingappropriate="";
      this.benefits_of_practices="";
      this.pay_anything_to_access_ext_svc="";
      this.training=[];
      this.pay_per_season="";
      this.pest_fertilizer_pesticide_info=[];
      this.Do_you_receive_weather_data="";
      this.access_to_weather_data=[];
      this.How_accurate_is_the_info="";
      this.most_harmful_info="";
      this.biggest_prob_in_data_access="";
      this.spend_on_your_phone_monthly="";
      this.main_phone_use=[];
      this.subscribed_to_info_svces_on_ph="";
      this.services_suscribed_to=[];
      this.training_on_using_phone_servic="";
      this.training_on_weather_alerts="";
      this.Who_provided_the_training_on_weather_alerts="";
      this.trainig_on_insurance="";
      this.Who_provided_the_training_on_insurance="";
      this.probs_of_using_cellphone=[];
      this.Variety_of_mainenterprise=""; //it should be after main crop enterprisehhplanting_decision;
      this.Variety2_of_mainenterprise="";
      this.landsize_main_crop_enterprise=null;
      this.additional_land_main_enterprise=null;

      this.season_of_planting="",
      this.hhproductionphase_decision=""; 
      this.hhpostharvet_decision="";
      this.hhmarketing_decision="";
      this.hhincome_decision="";
      this.meals_a_day="";
      this.Vegetables=""; 
      this.Carbohydrates="";
      this.fruits="";
      this.proteins=""; 
      this.farmers_cooperation_responding="";
      this.how_well_agent_knows_beneficiary="";
      this.accuracy_of_info_collected="";
      this.data_quality="";

      this.other_income_sources=="";
      this.mainincome_since=="";
      this.annual_income=null;
      this.router.navigate(['/beneficiary']);
      }
  }
  
  deleteDetails(id: number) {
        this.db.deleteDetails(id)
          .then(data => this.details = data);
          this.presentToast("You have deleted this activity");     
  }

  planting=[
    "Man only", "Woman only","Both"
  ];
  productions=[
    "Man only", "Woman only","Both"
  ];
  harvesting=[
    "Man only", "Woman only","Both"
  ];
  marketing=[
    "Man only", "Woman only","Both"
  ];
  incomes=[
    "Man only", "Woman only","Both"
  ];
  meals=[
  "once",
  "twice",
  "three times"
  ];

  vegetable=[
  "once",
  "twice",
  "three times"
  ];
  carbohydrate=[
    "once",
    "twice",
    "three times" 
  ];
  fruity=[
    "once",
    "twice",
    "three times"
  ];

  proteiny=[
    "once",
    "twice",
    "three times"
  ];
      dismissOnSubmit(id: number){
        this.db.deleteDetails(id)
          .then(data => this.details = data);

          this.presentToast("You activity has been submitted successfully");
      }

      //show or hide the div when the button is clicked
      hideShowMe=true;
      hideShow() {
        if(this.hideShowMe==false){
          this.hideShowMe = true;
        }
        else{
          this.hideShowMe = false;
        }
      }


    takePicture() {
      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true,
      };

      this.camera.getPicture(options).then((imageData) => {
        this.currentImage = 'data:image/jpeg;base64,' + imageData;

        this.ib = imageData;
      }, (err) => {
        // Handle error
        console.log("Camera issue:" + err);
        this.presentToast('Error taking Photo ' + err);
      });
    }

    takePictureID() {
      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
        correctOrientation: true,
      };

      this.camera.getPicture(options).then((imageData) => {
        this.currentImageID = 'data:image/jpeg;base64,' + imageData;

        this.im = imageData;
      }, (err) => {
        // Handle error
        console.log("Camera issue:" + err);
        this.presentToast('Error taking Photo ' + err);
      });
    }

    options = {
      timeout: 10000, 
      enableHighAccuracy: true, 
      maximumAge: 3600,
      saveToPhotoAlbum: true,
      targetWidth: 50,
      targetHeight: 50,
      correctOrientation:true
    };

    // use geolocation to get user's device coordinates
    getCurrentCoordinates() {
      this.geolocation.getCurrentPosition({
        timeout:30000,
        maximumAge: 60000, 
        enableHighAccuracy: true
      }).then((resp) => {
        this.latitude1 = resp.coords.latitude;
        this.longitude1 = resp.coords.longitude;
        this.accuracy1 =resp.coords.accuracy;
      }).catch((error) => {
        console.log('Error getting location', error);
        this.presentToast('Error getting GPS location ' + error);
      });
    }
    getCurrentCoordinates1() {
      this.geolocation.getCurrentPosition({
        timeout:30000,
        maximumAge: 60000, 
        enableHighAccuracy: true
      }).then((resp) => {
        this.latitude2 = resp.coords.latitude;
        this.longitude2 = resp.coords.longitude;
        this.accuracy2 =resp.coords.accuracy;
      }).catch((error) => {
        console.log('Error getting location', error);
        this.presentToast('Error getting GPS location ' + error);
      });
    }


  //Concatenating the location values
  //_location:string= this.la1 +""+this.lo1;
  //Concatenate the GpS main enterprise


  //List of all districts.
  districts=[
  "Abim",
  "adjumani",
  "Agago",
  "Alebtong",
  "Amolatar",
  "Amudat",
  "Amuria",
  "Amuru",
  "Apac",
  "Arua",
  "Budaka",
  "Bududa",
  "Bugiri",
  "Buikwe",
  "Bukedea",
  "Bukomansimbi",
  "Bukwo",
  "Bulambuli",
  "Buliisa",
  "Bundibugyo",
  "Bushenyi",
  "Busia",
  "Butaleja",
  "Butambala",
  "Buvuma",
  "Buyende",
  "Dokolo",
  "Gomba",
  "Gulu",
  "Hoima ",
  "Ibanda",
  "Iganga",
  "Isingiro",
  "Jinja",
  "Kaabong",
  "Kabale",
  "Kabarole",
  "Kaberamaido",
  "Kalangala",
  "Kaliro",
  "Kalungu",
  "Kampala",
  "Kamuli",
  "Kamwenge",
  "Kanungu",
  "Kapchorwa",
  "Kasese",
  "Kassanda",
  "Katakwi",
  "Kayunga",
  "Kibaale",
  "Kiboga",
  "Kibuku",
  "Kiruhura",
  "Kiryandongo",
  "Kisoro",
  "Kitgum",
  "Koboko",
  "Kole",
  "Kotido",
  "Kumi",
  "Kwania",
  "Kween",
  "Kyankwanzi",
  "Kyegegwa",
  "Kyenjojo",
  "Kyotera ",
  "Lamwo",
  "Lira",
  "Luuka",
  "Luweero",
  "Lwengo",
  "Lyantonde",
  "Madi-okollo",
  "Manafwa",
  "Maracha",
  "Masaka",
  "Masindi",
  "Mayuge",
  "Mbale",
  "Mbarara",
  "Mitooma",
  "Mityana",
  "Moroto",
  "Moyo",
  "Moyo",
  "Mpigi",
  "Mubende",
  "Mukono",
  "Nakapiripirit",
  "Nakaseke",
  "Nakasongola",
  "Namayingo",
  "Namisindwa ",
  "Namutumba",
  "Napak",
  "Nebbi",
  "Ngora",
  "Ntotorko",
  "Ntungamo",
  "Nwoya",
  "Omoro",
  "other",
  "Otuke",
  "Oyam",
  "Pader",
  "Pallisa",
  "Rakai",
  "Rubanda",
  "Rukiga",
  "Rukungiri",
  "Serere",
  "Sheema",
  "Sironko",
  "Soroti",
  "Ssembabule",
  "Terego",
  "Tororo",
  "Wakiso",
  "Yumbe ",
  "Zombo"
  ];

  //list of variety mainenterprise
  mainenterprise1=[
  "bush_beans",
  "Nambale",
  "Narobean1",
  "Narobean2",
  "Narobean3",
  "Narobean4c",
  "Narobean5c",
  "Narobean6",
  "Narobean7",
  "Narobean19",
  "k131",
  "k132",
  "Nabe2",
  "Nabe3",
  "Nabe4",
  "Nabe14",
  "Nabe15",
  "Nabe19",
  "local",
  "others" 
  ];
  //list of sesame variety
  mainenterprise2=[
  "Serra",
  "Sesim1", 
  "others"
  ];

  //
  currentcrop=[
  "none","maize","beans","sesame","soyabeans","rice","millet","sorghum","irish_potatoes","cotton","sweet_potatoes","sunflower","ground_nuts","coffee","banana","cassava","others"
  ];
  //Listing all the subcounties
  subcounties=["Abako",
  "Abarilela",
  "Aber","Abia", "Abim","Abogomola",
  "Abok","Aboke","Aboke TC","Abongomola","Abuga", "Aceba", "Acet TC","Achaba", "Acholibur","Acholibur TC","Acii", "Acowa","Adeknino",
  "Adekokwok","Adilang", "Adilang TC","Adjumani Tc","Adok","Adropi","Aduku", "Aduku","Aduku TC","Aduku TC",
  "Adumi","Adwari","Adwari TC","Adwir","Adyel division","Agago Tc","Agaii TC",
  "Agali","Agengo","Agikdak","Agoro","Agule","Agullu Division","Agwata TC","Agwatta","Agweng","Agweng TC","Agwingiri","Aii-Vu","Ajali","Ajan","Ajia","Ajira","Akali",
  "Akalo","Akalo Tc","Akere Division", "Akidi","Akisim","Akokoro","Akokoro TC","Akura","Akwang","Akwon","Akworo",
  "Alango","Alebtong TC","Aleka","Alerek","Alero","Aliba","Aliba",
  "Alikua", "Alito", "Alito TC","Aloi","Aloi TC","Aluru","Alwa","Alwi",
  "Amach","Amach TC","Amolatar TC","Amudat","Amugu","Amugu TC","Amukol","Amuru", "Amuru TC","Amwoma", "Anaka","Angagura",
  "Angetta","Anyara","Anyiribu","Apac","Apac Tc","Apala","Apala TC","Apapai",
  "Aper Kira","Apo","Apoi","Apopong","Aputi","Arafa","Arapai","Aremo",
  "Aria", "Arilo", "Arivu","Ariwa","Arocha Division","Aroi","Aromo","Arua Hill",
  "Arum","Arwotcek","Asamuk","Asuret","Atanga","Atanga TC","atego","Atiak",
  "Atiira","Atik Division","Atong Tidi","Atutur","Atyak","Awach","Awei","Awei",
  "Awello","Awere","Awiziru","Ayabi ","Ayabi TC","Ayami","Ayer","Bagezza","Baitambogwe","Bakatube","Bala",
  "Bala Tc","Balawoli", "Bamunanika","Banda","Banda","Barakala TC",
  "Bar-dege",
  "Barjobi",
  "Barr", "Bata TC", "Batta","Bbaale","Bbanda TC","Beleafe", "Benet","Bigasa",
  "Bigasa",
  "Biguli",
  "Biharwe","Biiso","Bijo","Binyiny","Binyiny TC", "Birere","Birere","Bisheshe",
  "Bitereko", "bitooma","Bobi","Bobi","Bombo Tc","Bongtiko","Bubaare","Bubaare","Bubaare TC","Bubandi","Bubare",
  "Bubare","Bubeke","Bubiita", "Bubukwanga", "Bubutu","Bubutu", "Bubutu town council","Bubyangu","Budadiri TC",
  "Budaka",
  "Budde",
  "Budhaya",
  "Budondo",
  "Budongo",
  "Budongo",
  "Bududa",
  "Bududa town council",
  "Budumba",
  "Budwale",
  "Bufujja-Kachonga town council",
  "Bufuma",
  "Bufumbo",
  "Bufumbo",
  "Bufumira",
  "Bufundi",
  "Bufundi",
  "Bugaaki",
  "Bugamba",
  "Bugambe",
  "Bugangari",
  "Bugango TC",
  "Bugaya",
  "Bugaya",
  "Buginyanya",
  "Bugiri Tc",
  "Bugiri Tc",
  "bugitimwa",
  "Bugobero",
  "Bugobero TC",
  "Bugondo",
  "Bugongi",
  "Bugongi TC",
  "Bugoye",
  "Bugulumbya",
  "Buhanika",
  "Buhara",
  "Buheesi",
  "Buhehe",
  "Buhemba",
  "Buhimba",
  "Buhugu",
  "Buhuhira",
  "Buhunga",
  "Buikwe",
  "Bujjumba",
  "bujjumbura division",
  "Bukaboole",
  "Bukakata",
  "Bukalasi",
  "Bukanga",
  "Bukasakya",
  "Bukedea",
  "Bukewa",
  "Bukhabusi",
  "Bukhabusi",
  "Bukhadala",
  "Bukhalu",
  "Bukhaweka",
  "Bukhaweka",
  "Bukhaweka",
  "Bukhiende",
  "Bukhofu",
  "Bukhofu",
  "Bukhoko",
  "Bukhulo",
  "Bukiabi",
  "Bukiabi",
  "Bukibino",
  "Bukibokolo",
  "Bukigai",
  "Bukiise",
  "Bukimbiri",
  "Bukinda",
  "Bukinda",
  "Bukiro",
  "Bukiyi",
  "Bukoho",
  "Bukoma",
  "Bukomansimbi TC",
  "Bukomero",
  "Bukomero TC",
  "Bukonde",
  "Bukooma",
  "Bukuku",
  "Bukulula",
  "Bukusu",
  "Bukusu",
  "Bukuya",
  "Bukuya",
  "Bukuya TC",
  "Bukwa",
  "Bukwahaweka town council",
  "Bukyambi",
  "bukyambi",
  "Bulago",
  "Bulamagi",
  "Bulamagi",
  "Bulangira",
  "Bulegeni",
  "Bulembia division",
  "Bulembia Division",
  "Bulera",
  "Bulesa",
  "Bulidha",
  "Buliisa",
  "Bulo",
  "Bulongo",
  "Bulongo",
  "Bulopa",
  "Bulucheke",
  "Buluganya",
  "Buluguyi",
  "Buluguyi",
  "Bululu",
  "Bulumbi",
  "bumalimba",
  "Bumanya",
  "Bumasheti",
  "Bumasifwa",
  "Bumasikye",
  "Bumayoka",
  "Bumayoka",
  "Bumbaire",
  "Bumbo",
  "Bumbo",
  "Bumbo town council",
  "Bumbobi",
  "Bumbobi",
  "Bumityero",
  "Bumumali",
  "Bumwalukani",
  "Bumwoni",
  "Bumwoni",
  "Bunabutiti",
  "Bunabutsale",
  "Bunabwana",
  "Bunambutye",
  "Bunambutye",
  "Bundesi",
  "Bundibugyo Tc",
  "Bundibugyo Tc",
  "Bungati",
  "Bungatira",
  "Bungokho",
  "Bungokho",
  "Bunyafwa",
  "Bupoto",
  "Bupoto",
  "Buremba",
  "Burunga",
  "Busaba",
  "Busaba town council",
  "Busabo",
  "Busakira",
  "Busamuzi",
  "Busana",
  "Busano",
  "Busano",
  "Busanza",
  "Busaru",
  "Busedde",
  "Busembatia",
  "Buseruka",
  "Buseta",
  "Bushenyi-ishaka Tc",
  "Bushika",
  "Bushiribo",
  "Bushiyi",
  "Busia Tc",
  "Busiisi",
  "Busimbi",
  "Busimbi Division",
  "Busime",
  "Busiriba",
  "Busiriwa",
  "Busitema",
  "Busiu",
  "Busiu town council",
  "Busoba",
  "Busoba",
  "Busolwe",
  "Busolwe town council",
  "Busoro",
  "Busukuma",
  "Busulani",
  "Busunju TC",
  "Buswale",
  "Butagaya",
  "Butaleja",
  "Butaleja town council",
  "Butalungu TC",
  "Butandiga",
  "Butansi",
  "Butare Katojo TC",
  "Butayunja",
  "Buteba",
  "Butebo",
  "Butemba",
  "Butemba TC",
  "Butenga",
  "Butennga TC",
  "Buteza",
  "Butiiti",
  "Butiru",
  "Butiru",
  "Butiru TC",
  "butogota TC",
  "Butoloogo",
  "Butooto",
  "Butta",
  "Butunduzi",
  "Butunduzi TC",
  "Butungama",
  "Butuntumula",
  "Buvuma tc",
  "Buwaaya",
  "BuwaBwala",
  "Buwabwala",
  "Buwagogo",
  "Buwalasi",
  "Buwali",
  "Buwama",
  "Buwambwa",
  "Buwangani TC",
  "buwasa ",
  "Buwatuwa",
  "Buwaya TC",
  "Buwenge",
  "Buwenge Tc",
  "Buwunga",
  "Buwunga",
  "Buyaga",
  "Buyanga",
  "Buyanga",
  "Buyanja",
  "Buyende",
  "Buyende TC",
  "Buyengo",
  "Buyinja",
  "Buyinza TC",
  "Buyobo",
  "Bwambara",
  "Bwamiramira",
  "Bwanswa",
  "Bweema",
  "Bwera",
  "Bweramule",
  "bwesumbu",
  "Bweyale TC",
  "Bwiizi",
  "Bwijanga",
  "Bwikara",
  "Bwongyera",
  "Byakabanda",
  "Cawente",
  "Cawente",
  "central",
  "Central ",
  "Central Division",
  "Central Division",
  "Central Division",
  "Central Division",
  "central division",
  "Central Division",
  "Central Division Kap",
  "Central Division Kit",
  "Central Division Kot",
  "Central Division Mity",
  "Central Division Ntu",
  "Chahi",
  "Chegere",
  "Chelekule",
  "Chema",
  "Cheptarech",
  "Chepterech",
  "Chesower",
  "Ciforo",
  "Ciforo",
  "Dabani",
  "Dadamu",
  "Ddwaniro",
  "Division A",
  "Division B",
  "Dokolo",
  "Dokolo TC",
  "Drajini",
  "Drambu",
  "Dranya",
  "Dufile",
  "Dufile",
  "Dwaniro",
  "Dyango TC",
  "Dzaipi",
  "Eastern",
  "Eastern Division",
  "Eastern Division",
  "Eastern Division",
  "Eastern Division",
  "Eastern Division Kap",
  "Eastern Division Ntu",
  "Endinzi",
  "Endinzi TC",
  "Engari",
  "Erussi",
  "Etam",
  "Ewanga",
  "Gadumire",
  "Galiraaya",
  "Gamogo",
  "Gayaza",
  "Geregere",
  "Gimara",
  "Gimara",
  "Gogonyo",
  "Goma",
  "Gombe",
  "Got Apwoyo",
  "Gweri",
  "Habuhutu Mugyera TC",
  "Hakibaale",
  "Hamuhamno TC",
  "Hamurwa",
  "Hamurwa",
  "Hamurwa TC",
  "Hamurwa Tc",
  "Hapuyo",
  "Harugali",
  "Hima TC",
  "Himutu",
  "Hoima Tc",
  "Ibaare",
  "Ibanda Tc",
  "Ibuje",
  "Ibuje TC",
  "Ibulanku",
  "Iceme",
  "Icheme TC",
  "Igombe",
  "Ihandiro",
  "Ihunga",
  "Iki-iki",
  "Ikumba",
  "Ikumba",
  "Ikumbya",
  "Immanyiro",
  "Inde TC",
  "Industrial Borough",
  "Inomo",
  "Inomo",
  "Inomo TC",
  "Iriiri",
  "Irongo",
  "isango",
  "Ishongororo",
  "Ishongororo TC",
  "Isingiro TC",
  "Itek",
  "Itojo",
  "Itula",
  "Itula",
  "Ivukula",
  "Iwemba",
  "Iyolwa",
  "Jangokoro",
  "Jewa town council",
  "Kaabong east",
  "Kaabong Tc",
  "Kaabong west",
  "Kaato",
  "Kabale Central",
  "Kabale Northern",
  "Kabale Southern",
  "kabambiro",
  "Kabei",
  "Kaberamaido",
  "Kaberamaido",
  "Kaberamaido Tc",
  "Kaberebere",
  "Kaberebere TC",
  "Kabeywa",
  "Kabingo",
  "Kabira",
  "Kabira",
  "Kabira",
  "Kabonera",
  "kabonero",
  "Kabujan",
  "Kabulasoke",
  "Kabuyanda",
  "Kabuyanda",
  "Kabuyanda TC",
  "Kabuyanda TC",
  "Kabwangasi",
  "Kabweri",
  "Kabwohe-itendero Tc",
  "Kabwoya",
  "Kacerere TC",
  "Kacheera",
  "Kacheri",
  "Kacheri TC",
  "Kachonga",
  "Kachumbala",
  "Kadama",
  "Kaderuna",
  "Kadungulu",
  "Kafunjo Mirama TC",
  "Kagadi",
  "Kagamba (buyamba)",
  "Kagango",
  "Kagarama",
  "Kagarama TC",
  "Kagologolo TC",
  "Kagongi",
  "Kagulu",
  "Kagumu",
  "kahaaro division",
  "Kaharo",
  "Kahunge",
  "Kakabara",
  "Kakamba",
  "Kakanju",
  "Kakiika",
  "Kakindo",
  "Kakindu",
  "Kakira",
  "Kakiri",
  "Kakoba",
  "Kakomongole",
  "Kakooge",
  "Kakoonge TC",
  "Kakoro",
  "Kakure",
  "Kakuru-rwenarura TC",
  "Kakuuto",
  "Kakuuto",
  "Kalagala",
  "Kalaki",
  "Kalamba",
  "Kalangala Tc",
  "Kalangalo",
  "Kalangalo",
  "Kalapata",
  "Kaliiro",
  "Kaliiro TC",
  "Kaliro TC",
  "Kalisizo",
  "Kalisizo",
  "Kalisizo TC",
  "Kalisizo TC",
  "Kalongo",
  "Kalongo Tc",
  "Kalungi",
  "Kalungu",
  "Kalungu TC",
  "Kalwana",
  "Kalwana",
  "Kambuga",
  "Kambuga TC",
  "Kamdini",
  "Kamdini TC",
  "Kameke",
  "Kamengo",
  "Kameruka",
  "Kamion",
  "kamion",
  "Kamira",
  "Kamonkoli",
  "Kamor",
  "Kamubeizi ",
  "Kamubeizi TC",
  "Kamuda",
  "Kamuda",
  "Kamuganguzi",
  "Kamuge",
  "Kamukuzi",
  "Kamuli",
  "Kamuli Tc",
  "Kamwenge",
  "Kamwenge Tc",
  "Kamwezi",
  "Kamwezi",
  "Kanaba",
  "Kanair",
  "kanara",
  "Kanara ",
  "Kanara TC",
  "Kangai",
  "Kangai TC",
  "Kanginima",
  "Kango",
  "Kangulumira",
  "Kanoni",
  "Kanoni TC",
  "Kanungu Tc",
  "Kanyabwanga",
  "Kanyantogo",
  "Kanyaryeru",
  "Kanyum",
  "Kapchesombe",
  "Kapchorwa Municipality",
  "Kapchorwa Tc",
  "Kapedo",
  "Kapeeka",
  "Kapeke",
  "Kapelebyong",
  "Kapeta",
  "Kapir",
  "Kaproron",
  "Kapsinda",
  "Kapsinda",
  "Kaptanya",
  "kapteret",
  "Kaptoyoy",
  "Kaptum",
  "Kapyanga",
  "Kapyanga",
  "Karagutu TC",
  "Karambi",
  "Karambi",
  "karangura",
  "Kariki",
  "Karita",
  "Karita",
  "Karugutu",
  "Karujubu",
  "Karuma Fa",
  "Karusandara",
  "Kasaali",
  "Kasaali TC",
  "kasaana",
  "Kasagama",
  "Kasambya",
  "Kasambya",
  "Kasangombe",
  "Kasanje",
  "Kasankala",
  "Kasasa",
  "Kasasa",
  "Kasawo",
  "Kasenda",
  "Kasensero TC",
  "Kaserem",
  "Kashambya",
  "Kashambya",
  "Kashangura",
  "Kashare",
  "Kashasha TC",
  "Kashenshero",
  "Kashenshero TC",
  "Kashongi",
  "Kashumba",
  "Kasilo TC",
  "Kasitu",
  "Kasodo",
  "Kassanda",
  "Kassanda",
  "Kassanda TC",
  "Kasule",
  "Katabi",
  "Katakwi",
  "Katakwi Tc",
  "Kateta",
  "katete",
  "Kathile",
  "Katikamu",
  "Katikekile",
  "Katine",
  "Katoke",
  "Katooke TC",
  "Katovu TC",
  "Katrini",
  "Katum",
  "Katuna tc",
  "Katwe Kabatoro Tc",
  "Katwe/butego",
  "kawalkol",
  "Kawanda",
  "Kawempe Division",
  "Kawolo",
  "Kawowo",
  "Kayera",
  "Kayonza",
  "Kayonza",
  "Kayonza",
  "Kayunga",
  "Kayunga Tc",
  "Kazo",
  "Kebisoni",
  "Kei",
  "Kenshunga",
  "kerwa",
  "Kfahingara",
  "Khabutoola",
  "Kiatsi",
  "Kibaale",
  "Kibaale TC",
  "Kibaale Tc",
  "Kibale",
  "Kibanda",
  "Kibatsi",
  "Kibibi",
  "Kibiga",
  "Kibiito",
  "kibiito tc",
  "Kibinge",
  "Kibingo TC",
  "Kiboga Tc",
  "Kibuku",
  "Kibuku TC",
  "Kibuku TC",
  "Kicheche",
  "Kicuzi",
  "Kicwamba",
  "Kidera",
  "Kidongole",
  "Kifamba",
  "Kiganda",
  "Kiganda TC",
  "Kigandalo",
  "Kigando",
  "kigaraare",
  "Kigarama",
  "Kigorobya",
  "Kigorobya Tc",
  "Kigulya Division",
  "Kigumba",
  "Kigumba TC",
  "Kihiihi",
  "Kihiihi TC",
  "Kihuura",
  "Kijjuna",
  "Kijomoro",
  "Kijongo",
  "kijura tc",
  "Kikagate",
  "Kikagate TC",
  "Kikamulo",
  "Kikandwa",
  "Kikyenkye",
  "kikyenkye",
  "Kikyusa",
  "Kilak",
  "Kilembe",
  "Kimaluli",
  "Kimanya/kyabakuza",
  "Kimengo",
  "Kimenyedde",
  "Kingo",
  "Kinoni",
  "Kinoni",
  "kinoni TC",
  "Kinuuka",
  "Kinyogoga",
  "Kira",
  "Kirewa",
  "Kirika",
  "Kirima",
  "Kiringente",
  "Kirumba",
  "Kirumba",
  "Kirundo",
  "kiryadongo TC",
  "Kiryandongo",
  "Kiryanga",
  "Kiryannongo",
  "Kisala",
  "Kisekka",
  "Kisiita",
  "Kisinga",
  "kisojo",
  "Kisoko",
  "Kisomoro",
  "Kisoro Tc",
  "Kisozi",
  "Kitabona",
  "Kitagata",
  "Kitanda",
  "Kitawoi",
  "Kitayunjwa",
  "Kitayunjwa",
  "Kitenga",
  "Kiteny",
  "Kitgum Matidi",
  "Kitgum Tc",
  "Kitholhu",
  "Kito",
  "Kitoba",
  "Kitswamba",
  "Kitumba",
  "Kitumbi",
  "Kitumbi",
  "Kituntu",
  "Kitura",
  "Kitwe TC",
  "Kityerera",
  "Kiwoko TC",
  "Kiyanga",
  "Kiyuni",
  "Kiziba",
  "Kiziba TC",
  "Kiziranfumbi",
  "Kkome Islands",
  "Koboko Tc",
  "Kobulubulu",
  "Kobwin",
  "Koch Goma",
  "Koch Goma TC",
  "kochi",
  "kole tc",
  "Kolir",
  "Koro",
  "Koro",
  "Kotido",
  "Kotido",
  "Kotido Tc",
  "Kotomor",
  "Kucwiny",
  "Kuju",
  "Kuluba",
  "kululu",
  "Kumi",
  "Kumi Tc",
  "Kuru",
  "Kuru TC",
  "Kuushu town council",
  "Kuywee",
  "Kwanyiny",
  "Kwapa",
  "Kwapa",
  "Kwera",
  "Kwosir",
  "Kwoti",
  "Kwoti",
  "Kyabarungira",
  "Kyabigambire",
  "Kyabugimbi",
  "Kyalulangira",
  "Kyampisi",
  "Kyamuhunga",
  "Kyamuliibwa",
  "Kyamuliibwa TC",
  "Kyamuswa",
  "Kyanaisoke",
  "Kyanamira",
  "Kyanamukaaka",
  "Kyangwali",
  "Kyangyenyi",
  "Kyankwanzi",
  "Kyarumba",
  "Kyarusozi",
  "Kyarusozi TC",
  "Kyazanga",
  "kyazanga TC",
  "Kyebando",
  "Kyebe",
  "Kyebe",
  "Kyeera",
  "Kyegegwa",
  "Kyegonza",
  "Kyeizoba",
  "Kyekumbya",
  "Kyenjojo Tc",
  "Kyere",
  "Kyesiiga",
  "Kyomya",
  "Kyondo",
  "Kyotera TC",
  "Kyotera Tc",
  "L. Katwe",
  "Labongo Akwang",
  "Labongo Amida",
  "Labongo Amida West",
  "Labongo Layamo",
  "Labora",
  "Labori",
  "Lagoro",
  "Laguti",
  "Lai-mutto TC",
  "Lakwana",
  "Lakwana",
  "Lakwaya",
  "Lalano",
  "Lalogi",
  "Lalogi",
  "Lamiyo",
  "Lamogi",
  "Lamwo TC",
  "Laperebong",
  "Lapono",
  "Lapul",
  "Laroo",
  "Laropi",
  "Laropi TC",
  "Latanya",
  "Layibi",
  "Lefori",
  "Lefori",
  "Lefori TC",
  "Leju TC",
  "Lii",
  "Lira",
  "Lira Palwo",
  "Lira Palwo TC",
  "Lobalangit",
  "Lobule",
  "lodonga",
  "Logiri",
  "lokido",
  "Lokitelaebu TC",
  "Lokole",
  "Lokopo",
  "Lokung",
  "Lokung East",
  "Lokwakial",
  "Lolachat",
  "Lolelia",
  "Loletio",
  "Longaroe",
  "Lopei",
  "Loregae",
  "Lorengecora",
  "Lorengedwat",
  "Loro",
  "Loro TC",
  "Loroo",
  "Lotome",
  "Lotukei",
  "Loyoro",
  "Ludara",
  "Lugazi Tc",
  "Lugusulu",
  "Lukaya Tc",
  "Lukhonge",
  "Lumino",
  "Lungulu",
  "Lunyiri",
  "Lunyo",
  "Luuka TC",
  "Luwa town council",
  "Luwero",
  "Luwero Tc",
  "Lwabenge",
  "Lwabyata",
  "Lwakhakha TC",
  "Lwakhakha town council",
  "Lwamaggwa",
  "Lwamaggwa TC",
  "Lwamata",
  "Lwamata TC",
  "Lwampanga",
  "Lwanda",
  "Lwanjusi",
  "Lwankoni",
  "Lwankoni",
  "Lwasso",
  "Lwebitakuli",
  "Lwemiyaga",
  "Lwengo",
  "Lwengo",
  "lwengo TC",
  "Lwentulege TC",
  "Lyakajura",
  "Lyama",
  "Lyantonde",
  "Lyantonde Tc",
  "Maanyi",
  "Maaru",
  "Mabaale",
  "Mabindo",
  "Mabono",
  "Maddu",
  "Madi Opei",
  "Madi Opei TC",
  "Madudu",
  "Maefe",
  "Mafubira",
  "Magada",
  "Magale",
  "Magale",
  "Magale town council",
  "Magoro",
  "Mahango",
  "Mahyoro",
  "Majanji",
  "Makindye Division",
  "Makokoto",
  "Makookota",
  "Makulubita",
  "Makuutu",
  "Malaba TC",
  "Malangala",
  "Malera",
  "Maliba",
  "Malongo",
  "Malongo",
  "Manafwa",
  "Manafwa TC",
  "Manibe",
  "Manyogaseka",
  "Manyogaseka",
  "Maracha TC",
  "Masaba",
  "masaba",
  "Masafu",
  "Masaka TTC",
  "Masese/walukuba",
  "Masha",
  "Masheruka",
  "Masiira",
  "Masindi port",
  "Masindi Port",
  "Masinyi",
  "Masodde - Kalagi TC",
  "Masulita",
  "Matale",
  "Matany",
  "Mateete",
  "Mateete TC",
  "Mayanza",
  "Mayuge Tc",
  "Maziba",
  "Mazimasa",
  "Mazinga",
  "mbaare",
  "Mbulamuti",
  "Mella",
  "Merikit",
  "Metu",
  "Metu",
  "Midia",
  "Midigo",
  "Midigo TC",
  "Migeera TC",
  "Miirya",
  "Mijwala",
  "Minakulu",
  "Minakulu TC",
  "Mitete",
  "Mitima",
  "Mitooma",
  "Mitooma TC",
  "Mityana Tc",
  "Molo",
  "Moruita",
  "Morulem",
  "Morungatuny",
  "Moyo",
  "Moyo",
  "Moyo Tc",
  "Moyo Tc",
  "mpaaro division",
  "mpaaro division",
  "Mpaata",
  "Mpara",
  "Mparo TC",
  "Mpeefu",
  "Mpenja",
  "Mpigi",
  "Mpigi Tc",
  "mpondwe lhubiriha TC",
  "Mpumudde",
  "Mpumudde/kimaka",
  "Mpunge",
  "Mpungu",
  "Mpungwe",
  "Mubende Tc",
  "Mucwini",
  "Mucwini East",
  "Mucwini West",
  "Muduma",
  "Mugarama",
  "Mugoye",
  "Mugusu",
  "Muhanga TC",
  "Muhanga TC",
  "Muhokya",
  "Muhoro",
  "Mukhuyu",
  "Muko",
  "Muko",
  "Mukongoro",
  "Mukoto",
  "Mukoto",
  "Mukuju",
  "Mukungwe",
  "Mukura",
  "Mulagi",
  "Mulanda",
  "Munarya",
  "Munkunyu",
  "Muntu",
  "Muramba",
  "Murora",
  "Mutara",
  "Muterere",
  "Mutukula TC",
  "Mutumba",
  "Mutunda",
  "Muwanga",
  "Muwangi",
  "Mweruka TC",
  "Mwizi",
  "Mwizi",
  "Myanzi",
  "Myanzi",
  "Myene",
  "Nabaale",
  "Nabiganda Town council",
  "Nabigasa",
  "Nabigasa",
  "Nabilatuk",
  "Nabinyoola",
  "Nabiswera",
  "Nabitanga",
  "Nabitende",
  "nabitsikhi",
  "Naboa",
  "Naboa",
  "Nabukalu",
  "Nabumali town council",
  "Nabuyoga",
  "Nabweru",
  "Nabweya",
  "Nabwigulu",
  "Nadunget",
  "Nagojje",
  "Nagongera",
  "Nagongera TC",
  "Nairambi",
  "Najja",
  "Najjembe",
  "Nakalama",
  "Nakaloke",
  "Nakaloke town council",
  "Nakapelimoru",
  "Nakapiripirit Tc",
  "Nakaseke",
  "Nakaseke TC",
  "Nakasenyi",
  "Nakasongola Tc",
  "Nakasozi",
  "Nakatsi",
  "Nakawa Division",
  "Nakigo",
  "Nakisunga",
  "Nakitoma",
  "Nalondo",
  "Nalubwoyo",
  "Nalusala",
  "Nalutuntu",
  "Nalutuntu",
  "Nalwanza",
  "Nalweyo",
  "Nama",
  "Namabya",
  "Namabya",
  "Namalemba",
  "Namalu",
  "Namanyonyi",
  "Namasagali",
  "Namasale",
  "Namasale TC",
  "Namayingo TC",
  "Namayumba",
  "Nambale",
  "Nambale",
  "Nambieso",
  "Nambieso",
  "Namboko",
  "Namisindwa town council",
  "Namitsa",
  "Namokora",
  "Namokora North",
  "Namokora TC",
  "Namugongo",
  "Namungalwe",
  "Namungo",
  "Namutumba",
  "Namutumba TC",
  "Namwendwa",
  "Namwiwa",
  "Nangabo",
  "Nangako town council",
  "Nangalwe",
  "Nangoma",
  "Nankoma",
  "Napore (Karenga)",
  "Napumpum",
  "Nawaikoke",
  "Nawampiti",
  "Nawandala",
  "Nawanjofu",
  "Nawanyago",
  "Nawanyingi",
  "Naweyo",
  "Nazigo",
  "Ndagwe",
  "Ndaija",
  "Nduguto",
  "ndwe",
  "Ndyamwamba Division",
  "Nebbi",
  "Nebbi Tc",
  "Ngai",
  "Ngando",
  "Ngarama",
  "Ngariam",
  "Ngenge",
  "Ngetta",
  "ngetta",
  "Ngogwe",
  "Ngoma",
  "Ngoma",
  "Ngoma TC",
  "Ngora",
  "Ngora TC",
  "Ngorora TC",
  "Njeru Tc",
  "Nkandwa",
  "Nkokonjeru Tc",
  "Nkoma",
  "Nkondo",
  "Nkooko",
  "Nkozi",
  "Nkungu",
  "Nombe",
  "North Division Kot",
  "Northern Borough",
  "Northern Division",
  "Northern Division",
  "nothern division",
  "Nsambya",
  "Nsangi",
  "Nsasi",
  "Nshanjare TC",
  "Nsinze",
  "Ntantamuki TC",
  "Ntara",
  "Ntenjeru",
  "Ntunda",
  "Ntungamo",
  "Ntuusi",
  "Ntuusi TC",
  "Ntwetwe",
  "Ntwetwe TC",
  "Nwoya TC",
  "Nyabbani",
  "nyabbani",
  "Nyabihoko",
  "Nyabubare",
  "nyabuharwa",
  "Nyabushenyi",
  "Nyabuyikye",
  "Nyabwishenya",
  "Nyadri",
  "Nyadri South",
  "Nyakabande",
  "Nyakabirizi",
  "Nyakagyeme",
  "Nyakashashara",
  "Nyakatonzi",
  "Nyakayojo",
  "Nyakinama",
  "Nyakishenyi",
  "Nyakitunda",
  "Nyakiyumbu",
  "Nyakwae",
  "Nyakyera",
  "Nyakyera TC",
  "Nyamarebe",
  "Nyamirama",
  "Nyamitanga",
  "Nyamukana TC",
  "Nyamunuka TC",
  "nyamuyanja",
  "Nyamweeru",
  "nyamweru",
  "nyanga",
  "Nyangahya",
  "Nyankwanzi",
  "Nyantungo",
  "Nyapea",
  "Nyaravur",
  "Nyarubuye",
  "Nyarushanje",
  "Nyarusiza",
  "Nyarutuntu",
  "Nyendo/senyange",
  "Nyenga",
  "Nyero",
  "Nyimbwa",
  "Nyondo",
  "Nyondo",
  "Nyundo",
  "Obalanga",
  "Obiba",
  "Ochero",
  "Odek",
  "Odek",
  "Odravu",
  "Odravu West",
  "Odupi",
  "Offaka",
  "Offaka",
  "Ofua",
  "Ogoko",
  "Ogoko",
  "Ogom",
  "Ogor",
  "Ogur",
  "Ogwette",
  "Ojwina Division",
  "Okokoro TC",
  "Okollo",
  "Okollo",
  "Okollo TC",
  "okwalongwen",
  "Okwang",
  "Okwang TC",
  "okwerodot",
  "Okwongdul",
  "Okwongo TC",
  "Oleba",
  "Oleba TC",
  "Oli River",
  "Olilim",
  "Olio",
  "Olok",
  "Oluffe",
  "Oluko",
  "Oluvu",
  "Omel",
  "Omiya Anyima",
  "Omiya Anyima West",
  "Omiya Pachwa",
  "Omodoi",
  "Omoro",
  "Omoro TC",
  "Omot",
  "Omugo",
  "Ongako",
  "Ongako",
  "Ongino",
  "Ongongoja",
  "Opwateta",
  "Orapwoyo",
  "Orom",
  "Orom East",
  "Orum",
  "Orungo",
  "Osukuru",
  "Otce",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "other",
  "others",
  "Otuboi",
  "Otuke TC",
  "Otwal",
  "Ovujo TC",
  "Owalo",
  "Owoo",
  "Oyam TC",
  "Pabbo",
  "Pader",
  "Pader Tc",
  "Padibe East",
  "Padibe TC",
  "Padibe West",
  "Pager Division",
  "Paibona",
  "Paicho",
  "Paidha",
  "Paidha Tc",
  "Paimol",
  "Paiula",
  "Pajule",
  "Pajulu",
  "Pakanyi",
  "Pakelle",
  "Pakwach",
  "Pakwach Tc",
  "Palabek Abera",
  "Palabek Gem",
  "Palabek Kal",
  "Palabek Kal TC",
  "Palabek Nyimur",
  "Palabek Ogili",
  "Palaro",
  "Palenga TC",
  "Pallisa",
  "Pallisa Tc",
  "Paloga",
  "Paminyai",
  "Pandwong Division",
  "Panyangara",
  "Panyango",
  "Panyimur",
  "Parabongo",
  "Paranga",
  "Parombo",
  "Patiko",
  "Patongo",
  "Patongo Tc",
  "Pawor",
  "Paya",
  "Pece",
  "Petete",
  "Petta",
  "Pingire",
  "Porogali",
  "Potika",
  "Pukony",
  "Pukor",
  "Puranga",
  "Puranga TC",
  "Purongo",
  "Purongo TC",
  "Puti-puti",
  "Railways division",
  "Rakai Tc",
  "Ramogi",
  "Rengen",
  "Rhino Camp",
  "Rhino Camp",
  "Rhino Camp TC",
  "Rigbo",
  "Rigbo",
  "Romogi",
  "Rubaare",
  "Rubaare TC",
  "Rubaga Division",
  "Rubanda TC",
  "Rubaya",
  "Rubaya",
  "Rubindi",
  "rubona tc",
  "Rubongi",
  "Ruborogota",
  "Rugaaga",
  "Rugaaga TC",
  "Rugando",
  "Rugarama",
  "Rugarama North",
  "Rugashari",
  "Rugyeyo",
  "Ruhaama",
  "Ruhija",
  "Ruhija",
  "Ruhija TC",
  "Ruhinda",
  "Ruhiri TC",
  "Ruhumuro",
  "Rukiri",
  "rukoki",
  "Rukoni east",
  "Rukoni west",
  "Rupa",
  "Rushango TC",
  "Rushasha",
  "Ruteete",
  "Rutenga",
  "Ruyanga",
  "Rwamabondo TC",
  "Rwamucucu",
  "Rwamucucu",
  "Rwanjogyera",
  "Rwanyamahembe",
  "RwashamaireTC",
  "Rwebisengo",
  "Rweikiniro",
  "Rwemikoma",
  "Rwenbisengo TC",
  "Rwentango",
  "Rwentobo-Rwahi TC",
  "Rwimi",
  "rwimi tc",
  "Rwoho TC",
  "S. County:",
  "Sanga",
  "Seeta-namuganga",
  "Semuto",
  "Serere TC",
  "Serere TC",
  "Shuuka",
  "Sibanga",
  "Sidok",
  "Sigulu Islands",
  "Sikude",
  "Sipi",
  "Sironko Tc",
  "Sisuni",
  "Sisuni",
  "Sop Sop",
  "Soroti",
  "South Division Kot",
  "Southern",
  "Southern Division",
  "Southern Division",
  "Ssabagabo-makindye",
  "Ssekanyonyi",
  "Ssekanyonyi TC",
  "Ssembabule Tc",
  "Ssi-bukunja",
  "Ssisa",
  "Suam",
  "Tapac",
  "Tapac",
  "Tara",
  "Te-Boke",
  "Tegeres",
  "Te-Nam",
  "Tirinyi",
  "Toroma",
  "Tsekukulu",
  "Tsekululu",
  "Ttamu Division",
  "Tubur",
  "Twekululu",
  "Uleppi",
  "Uleppi",
  "Unyama",
  "Uriama",
  "Usuk",
  "Vurra",
  "Wabinyonyi",
  "Wabwoko-kitimbwa",
  "Wadelai",
  "Waibuga",
  "Wairasa",
  "Wakisi",
  "Wakiso",
  "Wakiso Tc",
  "Wakyato",
  "Wamale",
  "Wanale Borough",
  "Wandi",
  "Wankole",
  "Wattuba",
  "Wattuba TC",
  "Wera",
  "West Division Kot",
  "Western",
  "Western Division",
  "Western Division",
  "Western Division",
  "Western Division",
  "Western Division Kap",
  "Western Division Ntu",
  "Weswa",
  "Wiodyek",
  "Wobulenzi Tc",
  "Wol TC",
  "Woli ",
  "Yivu",
  "Yumbe Tc",
  "Zesui",
  "Zeu",
  "Zigoti Tc",
  "Zirobwe",
  "zombo TC",

  ];
  //List of soil types
  soiltypes=[
    "Buikwe",
    "Kawolo",
    "Lugazi Tc",
    "Najja",
    "Najjembe",
    "Ngogwe",
    "Njeru Tc",
    "Nkokonjeru Tc",
    "Nyenga",
    "Ssi-bukunja",
    "Wakisi",
    "Bigasa",
    "Butenga",
    "Kibinge",
    "Kitanda",
    "Budde",
    "Bulo",
    "Kalamba",
    "Kibibi",
    "Ngando",
    "Bugaya",
    "Busamuzi",
    "Bweema",
    "Nairambi",
    "Buvuma tc",
    "Kabulasoke",
    "Kyegonza",
    "Maddu",
    "Mpenja",
    "Kanoni TC",
    "Bubeke",
    "Bufumira",
    "Bujjumba",
    "Kalangala Tc",
    "Kyamuswa",
    "Mazinga",
    "Mugoye",
    "Bukulula",
    "Kalungu",
    "Kyamuliibwa",
    "Lukaya Tc",
    "Lwabenge",
    "Central Division",
    "Kawempe Division",
    "Makindye Division",
    "Nakawa Division",
    "Rubaga Division",
    "Bbaale",
    "Busana",
    "Galiraaya",
    "Kangulumira",
    "Kayonza",
    "Kayunga",
    "Kayunga Tc",
    "Nazigo",
    "Wabwoko-kitimbwa",
    "Bukomero",
    "Dwaniro",
    "Kapeke",
    "Kibiga",
    "Kiboga Tc",
    "Lwamata",
    "Muwanga",
    "Bukomero TC",
    "Butemba",
    "Gayaza",
    "Kyankwanzi",
    "Mulagi",
    "Nsambya",
    "Ntwetwe",
    "Wattuba",
    "Butemba TC",
    "Ntwetwe TC",
    "Bamunanika",
    "Bombo Tc",
    "Butuntumula",
    "Kalagala",
    "Kamira",
    "Katikamu",
    "Kikyusa",
    "Luwero",
    "Luwero Tc",
    "Makulubita",
    "Nyimbwa",
    "Wobulenzi Tc",
    "Zirobwe",
    "Kisekka",
    "Kyazanga",
    "Lwengo",
    "Malongo",
    "Ndagwe",
    "Lwengo",
    "lwengo TC",
    "kyazanga TC",
    "Kkingo",
    "Kaliiro",
    "Kasagama",
    "Kinuuka",
    "Lyantonde",
    "Lyantonde Tc",
    "Mpumudde",
    "Bukakata",
    "Buwunga",
    "Kabonera",
    "Katwe/butego",
    "Kimanya/kyabakuza",
    "Kyesiiga",
    "Kyanamukaaka",
    "Mukungwe",
    "Nyendo/senyange",
    "Bulera",
    "Busimbi",
    "Butayunja",
    "Kakindu",
    "Kikandwa",
    "Maanyi",
    "Malangala",
    "Mityana Tc",
    "Ssekanyonyi",
    "Kalangalo",
    "Banda",
    "Namungo",
    "Buwama",
    "Kamengo",
    "Kiringente",
    "Kituntu",
    "Mpigi",
    "Mpigi Tc",
    "Muduma",
    "Nkozi",
    "Bagezza",
    "Bukuya",
    "Butoloogo",
    "Kasambya",
    "Kassanda",
    "Kigando",
    "Kitenga",
    "Kiyuni",
    "Madudu",
    "Mubende Tc",
    "Myanzi",
    "Kitumbi",
    "Makookota",
    "Kalwana",
    "Nalutuntu",
    "Manyogaseka",
    "Nabinyoola",
    "Goma",
    "Kasawo",
    "Kimenyedde",
    "Kkome Islands",
    "Kyampisi",
    "central",
    "Nabaale",
    "Nagojje",
    "Nakisunga",
    "Nama",
    "Ntenjeru",
    "Ntunda",
    "Seeta-namuganga",
    "Mpaata",
    "Mpunge",
    "Kapeeka",
    "Kasangombe",
    "Kikamulo",
    "Nakaseke",
    "Nakaseke TC",
    "Ngoma",
    "Ngoma TC",
    "Semuto",
    "Wakyato",
    "Kinoni",
    "Kinyogoga",
    "Butalungu TC",
    "Kiwoko TC",
    "Kito",
    "Kakooge",
    "Kalongo",
    "Kalungi",
    "Lwabyata",
    "Lwampanga",
    "Nabiswera",
    "Nakasongola Tc",
    "Nakitoma",
    "Wabinyonyi",
    "Migeera TC",
    "Kakoonge TC",
    "Byakabanda",
    "Ddwaniro",
    "Kabira",
    "Kacheera",
    "Kagamba (buyamba)",
    "Kakuuto",
    "Kalisizo",
    "Kasaali",
    "Kasasa",
    "Kibanda",
    "Kifamba",
    "Kirumba",
    "Kyalulangira",
    "Kyebe",
    "Kyotera Tc",
    "Kalisizo TC",
    "Lwamaggwa",
    "Lwanda",
    "Lwankoni",
    "Nabigasa",
    "Rakai Tc",
    "Kiziba",
    "Lugusulu",
    "Lwebitakuli",
    "Lwemiyaga",
    "Mateete",
    "Mijwala",
    "Ntusi",
    "Sembabule Tc",
    "Busukuma",
    "Division A",
    "Division B",
    "Gombe",
    "Kakiri",
    "Kasanje",
    "Katabi",
    "Kira",
    "Masulita",
    "Nabweru",
    "Namayumba",
    "Nangabo",
    "Nsangi",
    "Ssabagabo-makindye",
    "Ssisa",
    "Wakiso",
    "Wakiso Tc",
    "Abim",
    "Alerek",
    "Lotukei",
    "Morulem",
    "Nyakwae",
    "Amudat",
    "Karita",
    "Loroo",
    "Obalanga",
    "Abarilela",
    "Acowa",
    "Asamuk",
    "Kapelebyong",
    "Kuju",
    "Morungatuny",
    "Orungo",
    "Wera",
    "Budaka",
    "Iki-iki",
    "Kaderuna",
    "Kameruka",
    "Kamonkoli",
    "Lyama",
    "Naboa",
    "Bubiita",
    "Bududa",
    "Bukibokolo",
    "Bukigai",
    "Bulucheke",
    "Bumayoka",
    "Bushika",
    "Budhaya",
    "Bugiri Tc",
    "Bulesa",
    "Bulidha",
    "Buluguyi",
    "Buwunga",
    "Iwemba",
    "Kapyanga",
    "Muterere",
    "Nabukalu",
    "Nankoma",
    "Bukedea",
    "Kachumbala",
    "Kidongole",
    "Kolir",
    "Malera",
    "Bukwa",
    "Chesower",
    "Kabei",
    "Suam",
    "Buginyanya",
    "Bukhalu",
    "Bulago",
    "Bulegeni",
    "Buluganya",
    "Bunambutye",
    "Masiira",
    "Buhehe",
    "Bulumbi",
    "Busia Tc",
    "Busitema",
    "Buteba",
    "Dabani",
    "Lumino",
    "Lunyo",
    "Masaba",
    "Masafu",
    "Buyaga",
    "Sikude",
    "Western Division",
    "Eastern Division",
    "Masinyi",
    "Majanji",
    "Busime",
    "Budumba",
    "Busaba",
    "Busolwe",
    "Butaleja",
    "Kachonga",
    "Nawanjofu",
    "Mazimasa",
    "Naweyo",
    "Himutu",
    "Butaleja TC",
    "Busolwe TC",
    "Bugaya",
    "Buyende",
    "Kagulu",
    "Kidera",
    "Nkondo",
    "Buyende TC",
    "Bulamagi",
    "Buyanga",
    "Ibulanku",
    "Igombe",
    "Makuutu",
    "Nabitende",
    "Nakalama",
    "Nakigo",
    "Namalemba",
    "Nambale",
    "Namungalwe",
    "Nawandala",
    "nothern division",
    "Central Division",
    "Busembatia",
    "Nawanyingi",
    "Budondo",
    "Busedde",
    "Butagaya",
    "Buwenge",
    "Buwenge Tc",
    "Buyengo",
    "Central Division",
    "Kakira",
    "Mafubira",
    "Masese/walukuba",
    "Mpumudde/kimaka",
    "Alwa",
    "Anyara",
    "Bululu",
    "Kaberamaido",
    "Kaberamaido Tc",
    "Kalaki",
    "Kobulubulu",
    "Ochero",
    "Otuboi",
    "Kakure",
    "Apapai",
    "Aper Kira",
    "Bumanya",
    "Gadumire",
    "Namugongo",
    "Namwiwa",
    "Nawaikoke",
    "Kaliro TC",
    "Balawoli",
    "Bugulumbya",
    "Bulopa",
    "Butansi",
    "Kamuli Tc",
    "Kisozi",
    "Kitayunjwa",
    "Mbulamuti",
    "Nabwigulu",
    "Namasagali",
    "Namwendwa",
    "Nawanyago",
    "Wankole",
    "Chema",
    "Central Division Kap",
    "Western Division Kap",
    "Eastern Division Kap",
    "kapteret",
    "Kapchorwa Municipality",
    "Kwoti",
    "Gamogo",
    "Kapchorwa Tc",
    "Kaptanya",
    "Kaserem",
    "Kawowo",
    "Sipi",
    "Tegeres",
    "Kapchesombe",
    "Munarya",
    "Kapsinda",
    "Amukol",
    "Chepterech",
    "Gamogo",
    "Kabeywa",
    "Kabujan",
    "Katakwi",
    "Katakwi Tc",
    "Magoro",
    "Ngariam",
    "Omodoi",
    "Ongongoja",
    "Toroma",
    "Usuk",
    "Bulangira",
    "Buseta",
    "Kadama",
    "Kagumu",
    "Kibuku",
    "Kibuku TC",
    "Kirika",
    "Tirinyi",
    "Kabweri",
    "Atutur",
    "Kanyum",
    "Kumi",
    "Kumi Tc",
    "Mukongoro",
    "Nyero",
    "Ongino",
    "Benet",
    "Binyiny",
    "Binyiny TC",
    "Kaproron",
    "Kwanyiny",
    "Ngenge",
    "Kariki",
    "Kaptum",
    "Kwosir",
    "Kitawoi",
    "Kaptoyoy",
    "Bukanga",
    "Bukooma",
    "Bulongo",
    "Ikumbya",
    "Irongo",
    "Nawampiti",
    "Waibuga",
    "Luuka TC",
    "Bubutu",
    "Bugobero",
    "Bumbo",
    "Bumwoni",
    "Bupoto",
    "Butiru",
    "Buwabwala",
    "Buwagogo",
    "Kaato",
    "Sibanga",
    "Busukuya",
    "Bugobero",
    "Bunabwana",
    "Namboko",
    "Lwakhaka TC",
    "Bukiabi",
    "Bukokho",
    "Magale",
    "sisuni",
    "Bukusu",
    "Namabya",
    "Bukhofu",
    "Khabutoola",
    "Nalondo",
    "Butta",
    "Manafwa TC",
    "Mt Elgon NP",
    "Bukhabusi",
    "Bukhaweka",
    "Mutoto",
    "Twekululu",
    "Weswa",
    "Baitambogwe",
    "Buwaaya",
    "Immanyiro",
    "Kigandalo",
    "Kityerera",
    "Malongo",
    "Mayuge Tc",
    "Wairasa",
    "Bakatube",
    "Busakira",
    "Mpungwe",
    "Bukaboole",
    "Bufumbo",
    "Bukonde",
    "Bukyiende",
    "Bungokho",
    "Bungokho-mutoto",
    "Busano",
    "Busiu",
    "Busoba",
    "Industrial Division",
    "Nakaloke",
    "Nakaloke TC ",
    "Namanyonyi",
    "Northern Division",
    "Wanale",
    "Wanale Division",
    "Bukasakya",
    "Lwasso",
    "Bubyangu",
    "Budwale",
    "Bumbobi",
    "Nyondo",
    "Bumasikye",
    "Lukhonge",
    "Banda",
    "Buswale",
    "Buyinja",
    "Mutumba",
    "Sigulu Islands",
    "Buhemba",
    "Namayingo TC",
    "Ivukula",
    "Kibaale",
    "Magada",
    "Namutumba",
    "Nsinze",
    "Namutumba TC",
    "Kapir",
    "Kobwin",
    "Mukura",
    "Ngora",
    "Ngora TC",
    "Agule",
    "Apopong",
    "Butebo",
    "Gogonyo",
    "Kabwangasi",
    "Kakoro",
    "Kameke",
    "Kamuge",
    "Kasodo",
    "Kibale",
    "Pallisa",
    "Pallisa Tc",
    "Petete",
    "Puti-puti",
    "Olok",
    "Chelekule",
    "Akisim",
    "Opwateta",
    "Kanginima",
    "Atiira",
    "Bugondo",
    "Kadungulu",
    "Kateta",
    "Kyere",
    "Olio",
    "Pingire",
    "Labori",
    "Serere TC",
    "Kasilo TC",
    "Buhugu",
    "Bukhulo",
    "Bumasifwa",
    "Busulani",
    "Butandiga",
    "Buteza",
    "Buwalasi",
    "Buyobo",
    "Sironko Tc",
    "Zesui",
    "bukyambi",
    "buwasa ",
    "Bunyafwa",
    "Bukiyi",
    "Nalusala",
    "Budadiri TC",
    "Bukiise",
    "bugitimwa",
    "masaba",
    "bumalimba",
    "Arapai",
    "Asuret",
    "Eastern Division",
    "Gweri",
    "Kamuda",
    "Katine",
    "Northern Division",
    "Soroti",
    "Tubur",
    "Western Division",
    "Eastern Division",
    "Iyolwa",
    "Kirewa",
    "Kisoko",
    "Kwapa",
    "Mella",
    "Merikit",
    "Molo",
    "Mukuju",
    "Mulanda",
    "Nabuyoga",
    "Nagongera",
    "Osukuru",
    "Paya",
    "Petta",
    "Rubongi",
    "Western Division",
    "Sop Sop",
    "Nagongera TC",
    "Malaba TC",
    "Adilang",
    "Agago Tc",
    "Arum",
    "Kalongo Tc",
    "Kotomor",
    "Lamiyo",
    "Lapono",
    "Lira Palwo",
    "Lukole",
    "Omiya Pachwa",
    "Omot",
    "Paimol",
    "Parabongo",
    "Patongo",
    "Patongo Tc",
    "Abako",
    "Aloi",
    "Amugo",
    "Apala",
    "Omoro",
    "Aputi",
    "Awelo",
    "Muntu",
    "Namasale",
    "Amuru",
    "Atiak",
    "Lamogi",
    "Pabbo",
    "Abongomola",
    "Aduku",
    "Akokoro",
    "Apac",
    "Apac Tc",
    "Cegere",
    "Chawente",
    "Ibuje",
    "Inomo",
    "Nambieso",
    "Adumi",
    "Ajia",
    "Arivu",
    "Aroi",
    "Arua Hill",
    "Dadamu",
    "Logiri",
    "Manibe",
    "Offaka",
    "Ogoko",
    "Okollo",
    "Oli River",
    "Oluko",
    "Pajulu",
    "Rhino Camp",
    "Rigbo",
    "Uleppi",
    "Vurra",
    "Agwata",
    "Batta",
    "Dokolo",
    "Kangai",
    "Kwera",
    "okwalongwen",
    "Dokolo TC",
    "Amwoma",
    "Okwongul",
    "Adeknino",
    "Awach",
    "Bar-dege",
    "Bobi",
    "Bungatira",
    "Koro",
    "Lakwana",
    "Lalogi",
    "Laroo",
    "Layibi",
    "Odek",
    "Ongako",
    "Paicho",
    "Palaro",
    "Patiko",
    "Pece",
    "Unyama",
    "Kaabong east",
    "Kaabong Tc",
    "Kalapata",
    "Kapedo",
    "Napore (Karenga)",
    "Kathile",
    "Lolelia",
    "Loyoro",
    "Sidok",
    "Kaabong west",
    "Lobalangit",
    "kawalkol",
    "kamion",
    "lokido",
    "Kitgum Matidi",
    "Kitgum Tc",
    "Labongo Akwang",
    "Labongo Amida",
    "Labongo Layamo",
    "Lagoro",
    "Mucwini",
    "Namokora",
    "Omiya Anyima",
    "Orom",
    "Koboko Tc",
    "Kuluba",
    "Lobule",
    "Ludara",
    "Midia",
    "Dranya",
    "Aboke",
    "Akalo",
    "Alito",
    "Ayer",
    "Bala",
    "okwerodot",
    "kole tc",
    "Kacheri",
    "Kotido",
    "Kotido Tc",
    "Nakapelimoru",
    "Panyangara",
    "Rengen",
    "Agoro",
    "Lokung",
    "Madi Opei",
    "Padibe East",
    "Padibe West",
    "Palabek Gem",
    "Palabek Kal",
    "Palabek Ogili",
    "Paloga",
    "Lamwo TC",
    "Adekokwok",
    "Adyel division",
    "Amach",
    "Aromo",
    "Barr",
    "Central Division",
    "Lira",
    "Ogur",
    "Ojwina Division",
    "Railways division",
    "Agweng",
    "ngetta",
    "Agali",
    "Katikekile",
    "Nadunget",
    "Northern Division",
    "Rupa",
    "Southern Division",
    "Tapac",
    "Aliba",
    "Dufile",
    "Gimara",
    "Itula",
    "Lefori",
    "Metu",
    "Moyo",
    "Moyo Tc",
    "Kakomongole",
    "Lolachat",
    "Loregae",
    "Lorengedwat",
    "Moruita",
    "Nabilatuk",
    "Nakapiripirit Tc",
    "Namalu",
    "Iriiri",
    "Lokopo",
    "Lopei",
    "Lotome",
    "Matany",
    "Lorengecora",
    "Alero",
    "Anaka",
    "Koch Goma",
    "Purongo",
    "Nwoya TC",
    "Adwari",
    "Adwari TC",
    "Barjobi",
    "Okwang",
    "Okwang TC",
    "Okwongo",
    "Olilim",
    "Olilim TC",
    "Orum",
    "Ogwette",
    "Ogor",
    "Alango",
    "Otuke TC",
    "Aber",
    "Acaba",
    "Iceme",
    "Loro",
    "Minakulu",
    "Ngai",
    "Otwal",
    "Myene",
    "Kamdini",
    "Oyam TC",
    "Abok",
    "Aleka",
    "Acholibur",
    "Angagura",
    "Atanga",
    "Awere",
    "Kilak",
    "Laguti",
    "Lapul",
    "Latanya",
    "Ogom",
    "Pader",
    "Pader Tc",
    "Pajule",
    "Puranga",
    "Biiso",
    "Budongo",
    "Buliisa",
    "Bubandi",
    "Bubukwanga",
    "Bundibugyo Tc",
    "Busaru",
    "Harugali",
    "Kasitu",
    "Nduguto",
    "Bumbaire",
    "Bushenyi-ishaka Tc",
    "Kakanju",
    "bitooma",
    "Central ",
    "Nyakabirizi",
    "Ibaare",
    "Kyabugimbi",
    "Kyamuhunga",
    "Kyeizoba",
    "Nyabubare",
    "Ruhumuro",
    "Bugambe",
    "Buhanika",
    "Buhimba",
    "Buseruka",
    "Busiisi",
    "Hoima Tc",
    "Kabwoya",
    "Kigorobya",
    "Kigorobya Tc",
    "Kitoba",
    "Kiziranfumbi",
    "Kyabigambire",
    "Kyangwali",
    "bujjumbura division",
    "kahaaro division",
    "mpaaro division",
    "Bisheshe",
    "Ibanda Tc",
    "Ishongororo",
    "Kicuzi",
    "Kikyenkye",
    "Nyabuyikye",
    "Nyamarebe",
    "Rukiri",
    "Rushango TC",
    "Ishongororo TC",
    "Kijongo",
    "Kashangura",
    "Nsasi",
    "Kfahingara",
    "kikyenkye",
    "Ngorora TC",
    "Birere",
    "Endinzi",
    "Kabingo",
    "Kabuyanda",
    "Kashumba",
    "Kikagate",
    "Masha",
    "Ngarama",
    "Nyakitunda",
    "Rugaaga",
    "Kaberebere",
    "nyamuyanja",
    "Kabuyanda",
    "Kabuyanda TC",
    "Ruborogota",
    "Isingiro TC",
    "mbaare",
    "rushasha",
    "Bubare",
    "Bufundi",
    "Buhara",
    "Bukinda",
    "Hamurwa",
    "Ikumba",
    "Kabale Central",
    "Kabale Northern",
    "Kabale Southern",
    "Kaharo",
    "Kamuganguzi",
    "Kamwezi",
    "Kashambya",
    "Kitumba",
    "Kyanamira",
    "Maziba",
    "Muko",
    "Rubaya",
    "Ruhija",
    "Hamurwa TC",
    "Katuna tc",
    "nyamweru",
    "Rwamucucu",
    "Muhanga TC",
    "Buheesi",
    "Bukuku",
    "Busoro",
    "Eastern",
    "Hakibaale",
    "Karambi",
    "Kibiito",
    "Kicwamba",
    "Kisomoro",
    "Mugusu",
    "Ruteete",
    "Rwimi",
    "Southern",
    "Western",
    "Kasenda",
    "kabonero",
    "rwimi tc",
    "kibiito tc",
    "rubona tc",
    "karangura",
    "kijura tc",
    "Bwiizi",
    "Kahunge",
    "Kamwenge",
    "Kamwenge Tc",
    "Kicheche",
    "Mahyoro",
    "Nkoma",
    "Ntara",
    "Nyabbani",
    "Busiriba",
    "Biguli",
    "kabambiro",
    "kanara",
    "nyabbani",
    "Kambuga",
    "Kambuga TC",
    "Kanungu Tc",
    "Kanyantogo",
    "Kayonza",
    "Kihiihi",
    "Kirima",
    "Mpungu",
    "Nyamirama",
    "Rugyeyo",
    "Rutenga",
    "butogota TC",
    "nyanga",
    "katete",
    "Kihiihi TC",
    "Bugoye",
    "Bwera",
    "Ihandiro",
    "Karambi",
    "Karusandara",
    "Katwe Kabatoro Tc",
    "Kilembe",
    "Kisinga",
    "Kitholhu",
    "Kitswamba",
    "Kyabarungira",
    "Kyarumba",
    "Kyondo",
    "L. Katwe",
    "Mahango",
    "Maliba",
    "Muhokya",
    "Munkunyu",
    "Nyakiyumbu",
    "Buhuhira",
    "bwesumbu",
    "Hima TC",
    "Bulembia Division",
    "rukoki",
    "Ndyamwamba Division",
    "central division",
    "Nyakatonzi",
    "isango",
    "mpondwe lhubiriha TC",
    "Bwamiramira",
    "Bwanswa",
    "Bwikara",
    "Kagadi",
    "Kakindo",
    "Kasambya",
    "Kibaale Tc",
    "Kiryanga",
    "Kisiita",
    "Kyanaisoke",
    "Kyebando",
    "Mabaale",
    "Matale",
    "Mpeefu",
    "Mugarama",
    "Muhoro",
    "Nalweyo",
    "Nkooko",
    "Rugashari",
    "Nyakashashara",
    "Buremba",
    "Kitura",
    "Kinoni",
    "Kiatsi",
    "Sanga",
    "Kenshunga",
    "Kashongi",
    "Kanyaryeru",
    "Burunga",
    "Engari",
    "Kanoni",
    "Rwemikoma",
    "Nkungu",
    "Kazo",
    "Kigumba",
    "Kiryandongo",
    "Masindi Port",
    "Mutunda",
    "Karuma Fa",
    "kiryadongo TC",
    "Bweyale TC",
    "Kigumba TC",
    "Bukimbiri",
    "Busanza",
    "Chahi",
    "Kanaba",
    "Kirundo",
    "Kisoro Tc",
    "Muramba",
    "Murora",
    "Nyabwishenya",
    "Nyakabande",
    "Nyakinama",
    "Nyarubuye",
    "Nyarusiza",
    "Nyundo",
    "Hapuyo",
    "Kakabara",
    "Kasule",
    "Kyegegwa",
    "Mpara",
    "Bufunjo",
    "Bugaaki",
    "Butiiti",
    "Katoke",
    "Kihuura",
    "Kyarusozi",
    "Kyenjojo Tc",
    "Nyankwanzi",
    "Nyantungo",
    "Katooke TC",
    "Kyarusozi TC",
    "nyabuharwa",
    "kigaraare",
    "kisojo",
    "Butunduzi",
    "Butunduzi TC",
    "Bwijanga",
    "Karujubu",
    "Kimengo",
    "Kigulya Division",
    "Miirya",
    "Nyangahya",
    "Pakanyi",
    "Budongo",
    "Central Division",
    "Bubaare",
    "Bugamba",
    "Bukiro",
    "Kagongi",
    "Kakiika",
    "Kakoba",
    "Kamukuzi",
    "Kashare",
    "Mwizi",
    "Ndaija",
    "Nyakayojo",
    "Nyamitanga",
    "Rubaya",
    "Rubindi",
    "Rugando",
    "Rwanyamahembe",
    "Biharwe",
    "Bitereko",
    "Kabira",
    "Kanyabwanga",
    "Kashenshero",
    "Kiyanga",
    "Mitooma",
    "Mutara",
    "Kashenshero TC",
    "Mitooma TC",
    "Kanara TC",
    "Karugutu",
    "Rwebisengo",
    "Kanara ",
    "Butungama",
    "Bweramule",
    "Rwenbisengo TC",
    "Kibuku TC",
    "Karagutu TC",
    "Nombe",
    "Bwongyera",
    "Ihunga",
    "Itojo",
    "Kayonza",
    "Kibatsi",
    "Ngoma",
    "Ntungamo",
    "Western Division",
    "Nyabihoko",
    "Nyakyera",
    "Rubaare",
    "Rugarama",
    "Ruhaama",
    "Rukoni west",
    "Rweikiniro",
    "Eastern Division_Ntung",
    "Western Division_Ntung",
    "Central Division_Ntung",
    "Kitwe TC",
    "Rukoni east",
    "Bugangari",
    "Buhunga",
    "Buyanja",
    "Bwambara",
    "Eastern Division",
    "Kebisoni",
    "Nyakagyeme",
    "Nyakishenyi",
    "Nyarushanje",
    "Ruhinda",
    "Western Division",
    "Southern Division",
    "Masheruka",
    "Kigarama",
    "Kyangyenyi",
    "Kagango",
    "Kabwohe-itendero Tc",
    "Kibingo TC",
    "Bugongi",
    "Bugongi TC",
    "Shuuka",
    "kasaana",
    "Kitagata",
    "Adjumani Tc",
    "Adropi",
    "Ciforo",
    "Dzaipi",
    "Ofua",
    "Pakelle",
    "Kijomoro",
    "Nyadri",
    "Oleba",
    "Oluffe",
    "Oluvu",
    "Tara",
    "Yivu",
    "Maracha TC",
    "Aliba",
    "Dufile",
    "Gimara",
    "Itula",
    "Lefori",
    "Metu",
    "Moyo",
    "Moyo Tc",
    "Akworo",
    "Erussi",
    "Kucwiny",
    "Nebbi",
    "Nebbi Tc",
    "Nyaravur",
    "Pakwach",
    "Pakwach Tc",
    "Panyango",
    "Panyimur",
    "Parombo",
    "Wadelai",
    "Alwi",
    "ndwe",
    "atego",
    "Apo",
    "Drajani",
    "Kei",
    "Kuru",
    "Midigo",
    "Odravu",
    "Romogi",
    "Yumbe Tc",
    "kerwa",
    "koch",
    "lodonga",
    "kululu",
    "ariwa",
    "Atyak",
    "Jangokoro",
    "Kango",
    "Nyapea",
    "Paidha",
    "Paidha Tc",
    "Zeu",
    "zombo TC"
  ];
  formofdisabilitys=["Yes", "No"
  ];
  benefits=[
  "increased production","increased income","increased investiment", "property ownership","Increased market access","Imprved producequality","Enhanced leadership skills","increased jont decision making"
  ];
  trainings=[
  "access to inputs (seeds, fertilisers, pesticides)","financial literacy (credit access, insurance, financial mgt)","Nutrition_education","Climate smart practices (GAP,land management)","farming as a business","market access","Postharvest management (value addition)","Bulking & collective marketing", "Leadership skills","gender mainstreaming" 

  ];

  //list of levels of education
  educLevels=["none","primary","secondary","tertiary"
  ];
  //List of mobile literacy
  mobileLiteracys=["Cannot use","Basic","Good","Very Good"
  ];
  //List of dependant age brackets.
  form = [
    'males 0-14', 'males 15-24','males 25-34','males 35-59','males 60 and above.','Females 0-14', 'Females 15-24','Females 25-34','Females 35-59', 'Females 60 and above'
  ];
  cooperation=[
  "excellent",
  "very_good",
  "good", 
  "poor",
  "very_poor"
  ];
  knows=[
    "very well",
    "well enough",
    "i dont know much", 
    "we are complete strangers"
  ];
  accuracy=[
  "very Accurate",
  "relatively Accurate",
  "Inacurate",
  "Very inaccurate"
  ];
  quality=[
  "Veryhigh",
  "high",
  "low",
  "Very low"
  ];
  //list of land tenure
  tenures = ["Privately owned with title_proof","privately owned with local agreement",
    "Inherited land with a will",
    "leasehold with title",
    "inherited land without_a_will",
    "communually shared land",
    "unregistered land",
    "some owned and some leased",
    "others"
  ];
  //list of agents
  agents=[" Kaganda Patrick",
  " Madivani Yeremayia",
  " OKULLO GEOFFREY",
  " Barugahare Mutwalidi",
  " Hajji Ssembatya aufi ",
  " Kisseka Daniel",
  " Lugomala Deus",
  " Mutebi Zailu",
  " Nakalema Aidah ",
  " Nambajjo maxy",
  " Sseruwugge Muzafalu",
  "0KELLO BENEDICK",
  "0KELLO JIMMY",
  "0KELLO JOHN",
  "0MARA THOMAS ",
  "Aba Ruth",
  "Abade Edward",
  "ABALO FLAVIA",
  "Abalo Monica",
  "Abibu Abdul Haman",
  "Abio Jackline",
  "Abitimo Samorati",
  "ABOR JIMMY",
  "Abura Innocent",
  "ABURA JOEL",
  "ACAN JULLIET",
  "ACAR MOSES",
  "ACAR YUVENTINO",
  "Acema Pascal",
  "ACEN AGNESS",
  "ACEN ALICE",
  "Acen Stella",
  "ACENG LUCY",
  "ACENG MARY",
  "ACENG MOLLY",
  "ACIO LILLY ROSE ",
  "Aciro Betty",
  "ACOBI MOSES",
  "ACOBI MOSES",
  "ACOLA GRACE",
  "Addah Byaruhanga",
  "ADILO ROBERT",
  "ADINYA FRANCIS Y Y",
  "ADINYA GEOFFRY",
  "ADOKORACH JENNIFER",
  "Adriko Esborn",
  "AFSA GIFT",
  "Agaba Edison",
  "Agaba Nicholas",
  "AGETA DENISH",
  "AGOM MARTIN",
  "AGUTI AGNES",
  "AISU RUTH ANYAIT",
  "AJAL PETER",
  "AJOK SANTA",
  "AKAN FRANCIS",
  "Akango Pamela",
  "Akedo Richard",
  "AKELLO GRACE",
  "AKELLO GRACE",
  "Akello Jennet",
  "Akello Nancy",
  "AKII RICHARD",
  "AKITE JENNET",
  "AKON VASPUCA",
  "AKONO JOHN BOSCO",
  "AKONO TOM",
  "AKOPE LUCY",
  "AKOPE LUCY",
  "AKULLO CAROLINE",
  "AKULLO JENNIFER",
  "AKULLO MARGRATE",
  "AKULLO PRICILLA",
  "AKULLU BETTY",
  "AKULLU MARY",
  "AKULU GRACE",
  "AKWAR MARKDONALD",
  "AKWI JENIFER",
  "ALANY SAMUEL",
  "Alex Pitia",
  "Aliku Alfred",
  "Alioni Patrick",
  "ALOL ALEX",
  "ALOL PETER",
  "Alum Eunice",
  "ALWOC ALICE",
  "ALWOCH SEMMY",
  "ALYEK SOFIA",
  "Amacha Gilbert",
  "Amaguru Florence",
  "AMOLO GILLIAN",
  "AMONG GRACE",
  "AMONGI JOAN",
  "AMONI BENZ",
  "Amule Grace",
  "AMULE HELLEN",
  "Andama Richard",
  "ANGOLI DAVID",
  "ANGOM BETTY",
  "ANGU ALICE",
  "Annet Bandihihi",
  "Annet Bejuura",
  "ANYAI LAMECK",
  "ANYANGO ANNA",
  "ANYUK GEORGE ",
  "Apio Anna Grace",
  "APIO BETTY",
  "Apio Catherine",
  "APIO CONCY",
  "APIO EVALINE",
  "APIO JENET",
  "APIO LUCY ONYOLO",
  "Aporo Denis",
  "APORO JASPER",
  "Asigaci Moses",
  "Asiimwe Edgar",
  "Asiimwe johnbosco",
  "ATIM EUNICE",
  "Atim Sharon",
  "ATONO PHILIPS",
  "Atuheire vicent",
  "Auma Mercy Winny",
  "AWICI BOSCO",
  "AWICI DAVID",
  "Awio Jasper",
  "AWIO JIMMY",
  "Awira Ezekiel",
  "AYO PATRICK",
  "AYO PATRICK","Ayoma Fedrick","AYUGI BRENDA",
  "AYUGI JUSPHIN","Azama Walter",
  "bamburiza Longino","Barigye Yosam",
  "Basingwire fred",
  "Bejuura Adams",
  "Bigombe Katuga",
  "Billy Kayemba",
  "Bukenya Abdul",
  "Bukenya Charles ",
  "Byakurama Donati",
  "Byamukama Jackson",
  "Byaruhanga Lodoviko",
  "Byensi Elias",
  "Candia Christopher",
  "CURU PATRICT",
  "Dalnga Alex",
  "DENGO LAMECK",
  "Denya Ronald",
  "Dinah Nalwadda",
  "Drabuga William",
  "Dralobu Akuti Pascal",
  "Dramadri Richard",
  "Dranimva Patrick",
  "Dranzoa Agness",
  "EKOL JACOB",
  "ELEM JONATHAN",
  "Emmanuel Mukasa",
  "EMOL ALEX ",
  "ENYEL THOMAS ",
  "ENYEL TOBBY",
  "EPILA JAMES",
  "EPILLA RICHARD",
  "EPONGU JOHN PAUL",
  "Faibi Ndyarugayo",
  "Florence Nazema",
  "GIRA YUVENTINO",
  "Jemma Nabajja",
  "Jenifer Bamunoba",
  "Jjumba George",
  "Jjumba Vincent",
  "Joan",
  "JONGA PAUL",
  "Kagubwa Johnbosco",
  "Kakuru Wilber",
  "Kaliff",
  "Kamukama Patrick",
  "Kamuntu joel",
  "Kangire Adrine",
  "Kanishane Steven",
  "Kasozi Annatoli",
  "Kateregga Rose",
  "Kayiwa Charles",
  "KERE GEOFFREY",
  "KICARWOT DENIS ",
  "Kirangwa Dominico",
  "Kiweewa Swaibu",
  "Kiyingi John",
  "Kwatamazima valentine",
  "Kwikiriza Mercy",
  "Kyabaggu Matovu Deo",
  "Kyarikunda Justine",
  "Kyogabirwe midred",
  "Kyohairwe Rosw",
  "Lino Yata",
  "LIRA NELSON",
  "Lokwiya Thomas",
  "Lugaaju Achileo",
  "Lukwata Charles",
  "Mawadri Thomas",
  "Mubaiha David",
  "Mucunguzi clear",
  "Mugabirwe Marion",
  "Muggaga Joachim",
  "Mugimbaho Elisa",
  "Mugisha Edson",
  "Muhike  Good",
  "Munyagwa Moses",
  "Musomesa Mayanja",
  "Mutabazi job",
  "Muyinda Angello",
  "Mwanje Nasoni",
  "Mwesigwa Herbert",
  "Nabuyondo Imelda",
  "Nakaye Jennifer",
  "Nalwada Angella",
  "Nalwanga Sarah/Kasendwa",
  "Namanya Nelson",
  "Namumpenje Resty",
  "Namusoke Jane",
  "Namuyanja Justine",
  "Nansubuga Betty",
  "Nanziri Mary",
  "Nassolo Aidah",
  "Niwagaba Kenneth",
  "Niwagaba pamela",
  "Nkurunungu Asaph",
  "Nockrach Kassim",
  "Nsengeyuva",
  "Nuriat Mutembeya",
  "Nyadru William",
  "NYANG MOSES",
  "OBAA NELSON JOE",
  "OBIRA CHARLES",
  "OBOTE TOM",
  "OBUA GODFREY",
  "OBUA ISSAC",
  "OBUA MOSES",
  "OBUA SAM",
  "Ocan Patrick",
  "OCEN JASPHER",
  "OCEN JOE ANTHONY",
  "OCEN PATRICK",
  "Ochwa Patrick",
  "ODONGO ALTERO",
  "ODONGO AMBROSE",
  "ODONGO AMOS",
  "ODONGO EMMANUEL",
  "ODONGO FRANCIS",
  "ODONGO GEORGE",
  "ODONGO PETER",
  "Odur Geoffrey",
  "ODYENY BOSCO",
  "Ogaba Nasenori",
  "OGEI OLWA ALFRED",
  "OGONG MOSES",
  "OGUMA TONNY",
  "OGWAL PETER",
  "OGWANG BONNY",
  "OGWANG BOSCO",
  "OGWANG DANIEL",
  "OGWANG DENISH",
  "OGWANG GEORGE",
  "OGWANG JAMES",
  "OGWANG JOHN BOSCO",
  "OGWANG RICHARD",
  "OGWANG SAMUEL",
  "Ogwang Tonny",
  "Ojok Charles",
  "OJOK SAM",
  "OJOK TOM EDWARD",
  "OJUKA SOLOMON",
  "OJUKA THOMAS",
  "OJUKASOLOMON",
  "Okal Geoffrey",
  "OKECH BONIFACE",
  "OKECH GODFREY",
  "Okello Baptist",
  "OKELLO BDENISH ",
  "OKELLO BENARD",
  "OKELLO DENISH ",
  "Okello Eric",
  "OKELLO JIMMY ",
  "OKELLO JOEL",
  "OKELLO JOEL",
  "OKELLO MOSES",
  "OKELLO OSCAR",
  "OKELLO RICHARD",
  "OKELLO ROBERT CEASER",
  "Okello Thomas",
  "OKELLO TONNY",
  "OKELLO TONNY",
  "Okeny Samuel",
  "Okidi Bazil",
  "OKOL PETER ",
  "OKONYE BOSCO",
  "OKORI PATRICK",
  "OKORI RICHARD",
  "Okori Willy",
  "OKULLO CEASEAR",
  "Okullo David ",
  "OKUTA MORIS",
  "OKWENYE ANJILO",
  "OKWIR ANGELO",
  "OKWIR JAMES",
  "Olaa Vicent",
  "Olanya Stephen",
  "OLET DONALD",
  "Oloya Francis",
  "OLUM EDWARD",
  "Olum Fred",
  "OMACH GEOFFREY SAMUEL",
  "OMARA CALVIN DECON",
  "OMARA GEOFFREY",
  "OMARA GEOFFREY",
  "OMARA GODFREY",
  "OMARA PATRICK",
  "Omony Ronald",
  "Onach Andrew",
  "ONAP RICHARD",
  "Onek David",
  "ONGADA CEASER",
  "Ongala James",
  "ONGERA JOHN",
  "ONGOM PATRICK",
  "ONGOM RICHARD",
  "ONGORA GEOFFREY",
  "ONGURA AMBROSE",
  "Onyam Sam",
  "ONYANGA JERIFANSIO",
  "ONYANGA JIMMY",
  "ONYONG JOEL",
  "Onzima Edward",
  "OOLA MICHEAL",
  "OPENE NELSON ",
  "OPIDO JOHN BOSCO",
  "OPIO JAMES",
  "OPIO JIMMY",
  "OPIO JOSHUA",
  "OPIO MOSES",
  "Opio Moses",
  "OPIO PETER",
  "OPIO QUINTO",
  "Opiyo Denis",
  "Opon Francis",
  "OPUA JOEL LEONARD",
  "ORYEM TADEO GEORGE",
  "OTIM ALBERT",
  "OTIM FRANCIS",
  "OTIM ISAAC ",
  "OTIM JIMMY",
  "OTIM PETER",
  "OTIM RICHARD BUTTON",
  "OTIM THOMAS",
  "OTOA MAXWEL",
  "OUNI INNOCENT",
  "OUNI JAMES",
  "OWANI SAMUEL",
  "OWERA PATRICK",
  "OWUNI BOSCO",
  "OYANGA RICHARD",
  "OYOL RICHARDSON",
  "Polina Elijah",
  "POLINA OGWANG",
  "Polly  Najjuko",
  "Robert okello",
  "Rugabariho Elian",
  "Ssekajjugo Ronald",
  "Ssemuguzi Jude",
  "Ssengabire John",
  "Ssenyondo Suudi",
  "Ssenyonga Abdu",
  "Sserufusa Andrew",
  "Sserunkuuma Mark",
  "Sseruwo  Charles",
  "Sserwadda Ibrahim",
  "Susan",
  "Tinamasiko Jolly",
  "TINO SHARA",
  "Tugineyo Kellen",
  "Tukahirwa Lehema",
  "Twemigye Benon",
  "Twesigye Sabastiano",
  "Twinomukama Silveri",
  "Twongirwe flavia",
  "Ulego Albert Vuciri ",
  "Valentino Fastino Amule",
  "Walea  Beatrice",
  "Yahia Wani ",
  "Ziwa John"
  ];

  tasks=[
  "land_preparation","planting","weeding","harvesting","threshing","spraying", "prunning","transport","others"
  ];

  assistances=[
  "children","relative","husband","wife","neighbour","other","no_body"
  ]
  crops= [
    "beans","sesame","others"
  ];

  adopted=[
  "Access_and_use_of_improved_seeds",
  "financial_literacy",
  "Nutrition_education",
  "Climate_smart_practices", 
  "farming_as_a_business",
  "market_access",
  "Postharvest_management",
  "Bulking_&_collective_marketing", 
  "leadership",
  "household_joint_decision_making"
  ];
  mostadopted=[
  "Access and use of improved seeds",
  "financial literacy (credit access, insurance, financial mgt)",
  "Nutrition_education",
  "Climate smart practices (GAP,land management)",
  "farming as a business",
  "market access",
  "Postharvest management (value addition)",
  "Bulking & collective marketing", 
  "Leadership skills",
  "household joint decision making"
  ];

  farmMachinery=[
  "Farm structure (storagefacility)" ,
  "oxyplough ",
  "knapsack sprayer",
  "other smaller implements (hoes, rakes)"
  ];


  last_season=[
  "maize","beans","sesame","soyabeans","rice","millet","sorghum","irish_potatoes","cotton","sweet_potatoes","sunflower","ground_nuts","coffee","banana","cassava","others"
  ];

  livestocks=[
    "none","cattle","goat","sheep","chicken","pigs","donkey","others"
    ];

  yearofservice=[
  "season A 2021",
  "season B 2020",
  "season A 2020  and ealier"
  ];

  seasons=[
  "season_one",
  "season_two",
  "both"
  ];


    async presentToast(a){
      const toast = await this.toastCtrl.create({
        message: a,
        duration:5000,
      });
      toast.present();
    }

//function to hold the data in the form
holdData(){
  return this.storage.set('farmerData', [this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,	this.next_of_kin,	this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.farmer_org,this.name_of_farmer_org,this.belong_farmergp,this.name_farmergp,this.year_services,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.Variety_of_mainenterprise,this.Variety2_of_mainenterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.season_of_planting,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.postharvest_mgt,this.produce_storage,this.preservation,this.crops_for_new_season,this.other_crops_intended,this.landsize_cropselected,this.yield_per_acre,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.donkey_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.pesticide_effectiveness,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.involved_in_marketing,this.sell_of_produce_Nyakyera,this.sell_of_produce_green,this.sell_of_produce_equator,this.sell_of_produce_liraresort,this.sell_of_produce_cedo,this.sell_of_produce_orum,this.Marketlink,this.agent_name,this.produce_transport,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.adopted_practices,this.most_mostadoptedpractice,this.Rate_services_training,this.frequently_access_ext_svcs,this.is_information_provided_accurt,this.trainingappropriate,this.benefits_of_practices,this.pay_anything_to_access_ext_svc,this.training,this.pay_per_season,this.pest_fertilizer_pesticide_info,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.trainig_on_insurance,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.hhplanting_decision,this.hhproductionphase_decision,this.hhpostharvet_decision,this.hhmarketing_decision,this.hhincome_decision,this.meals_a_day,this.Vegetables,this.Carbohydrates,this.fruits,this.proteins,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality]);
} 


//function to fetch the number of submissions a particular user has made
SubmissionNumbers(){
  return new Promise(resolve => {
    let body = {
      aski:'checkNumbers',
      field_officer:this.fo
    }
    this.accsPrvds.postData(body, 'process.php').subscribe((res:any)=> {
      if(res.success==true){
          //this.presentToast("You have "+ res.result + " submissions");
          this.storage.set('numberOfProfiles', res.result);          
      }else{
          this.presentToast(res.result);              
      }
    },(err)=>{
      console.log('Error ', err);
    });

  });
  
}
// submit data to the end point when you have an active internet connection
  async SubmitData(){
    if(this.farmers_name==""){
        this.presentToast('Farmer name is required');
    }
    else if(this.What_is_your_gender==""){
      this.presentToast('You have not specified the gender');
    }
    else if(this.do_you_have_disability==""){
      this.presentToast('Specify whether you are disabled or not.');
    }
    /**added some missing logic on disability*/
    else if(this.do_you_have_disability=="Yes" && this.disability_type==""){
      this.presentToast('Specify your from of disability'); 
    }
    else if(this.do_you_have_disability=="No" && this.disability_type !=""){
    this.disability_type="";
    this.presentToast('Value: Disability type has been erased due to a change in selection');
    } 

    else if(this.own_a_mobile_phone==""){
      this.presentToast('Specify whether you own a mobile phone or not');
    }
    /**added some missing logic on mobile_phone*/
    else if(this.own_a_mobile_phone=="Yes" && this.What_type_of_phone_do_you_own ==""){
        this.presentToast('Specify, What type of phone do you own?'); 
    }
    else if(this.own_a_mobile_phone=="No" && this.What_type_of_phone_do_you_own !=""){
      this.What_type_of_phone_do_you_own="";
      this.presentToast('Value : what type of phone do you own has been erased due to a change in selection');
    }

    /**added some missing logic on number of contacts*/
    else if(this.No_of_contacts ==null && (this.What_type_of_phone_do_you_own || this.own_a_mobile_phone=="Yes")){
    this.presentToast('Specify, How many telephone contacts do you use'); 
    }
    else if(this.No_of_contacts !=null && this.own_a_mobile_phone=="No"){
      this.No_of_contacts=null; //clears the number of contacts
      this.presentToast('Value : Number of contacts has been erased due to a change in selection');
    }
    // checking the primary and secondary contacts entries
    else if(this.tel_no1=="" && (this.own_a_mobile_phone=="Yes" || this.No_of_contacts > 0)){
      this.presentToast('Specify, the primary telephone contact'); 
    }
    else if(this.tel_no1 !="" && (this.own_a_mobile_phone=="No" ||  this.No_of_contacts==null)){
      this.tel_no1=""; //clears the  primary telephone number
      this.presentToast('Value : Primary telephone number has been erased due to a change in selection');
    }
    //checking secondary telephone
    else if(this.tel_No_2=="" && (this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 1)){
      this.presentToast('Specify, the secondary telephone contact'); 
    }
    else if(this.tel_No_2 !="" && (this.own_a_mobile_phone=="No" ||  this.No_of_contacts==null)){
      this.tel_No_2=""; //clears the  primary telephone number
      this.presentToast('Value : Secondary telephone number has been erased due to a change in selection');
    }
    //service_provider
    else if(this.service_provider=="" && (this.tel_no1 !="" && this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 0 )){
      this.presentToast('Specify, the service provider of the primary telephone number.'); 
    }
    else if(this.service_provider !="" && (this.tel_no1 =="" || this.own_a_mobile_phone=="No" || this.No_of_contacts ==null )){
      this.service_provider=""; //clears the  service provider
      this.presentToast('Value : Service provider has been erased due to a change in selection');
    }
    // Other service provider
    //"service_provider=='Others' && What_type_of_phone_do_you_own && own_a_mobile_phone=='Yes'"
    else if(this.Specify_svc_provider=="" && (this.What_type_of_phone_do_you_own !="" && this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 0 && this.service_provider =="Others")){
      this.presentToast('Specify, Other service provider.'); 
    }
    else if(this.Specify_svc_provider !="" && (this.What_type_of_phone_do_you_own =="" || this.own_a_mobile_phone=="No" || this.No_of_contacts ==null || this.service_provider !="Others")){
      this.Specify_svc_provider=""; //clears the  service provider
      this.presentToast('Value :  Other Service provider has been erased due to a change in selection');
    }
    //mm_reg_status
    else if(this.mm_reg_status=="" && (this.What_type_of_phone_do_you_own !="" && this.own_a_mobile_phone=="Yes" && this.No_of_contacts > 0)){
      this.presentToast('Specify, Are you registered on Mobile Money ?'); 
    }
    else if(this.mm_reg_status !="" && (this.What_type_of_phone_do_you_own =="" || this.own_a_mobile_phone=="No" || this.No_of_contacts ==null )){
      this.mm_reg_status=""; //clears the  service provider
      this.presentToast('Value :  Are you registered on Mobile Money has been erased due to a change in selection');
    }
    
//To continue further validation from here

    else if(this.Photo_url==""){
      this.presentToast('Please capture the farmers photo');
    }
    
    else if(this.occupation==""){
      this.presentToast('Please specify the occupation');
    }
    //condition for other occupation
    else if(this.occupation=="Yes" && this.specify_other_occupation ==""){
      this.presentToast('Specify, other occupation'); 
    }
   
    else if(this.occupation=="No" && this.specify_other_occupation !=null){
      this.specify_other_occupation=null;
    }
    
    else if(this.Martial_status==""){
      this.presentToast('Please specify the Marital status');
    }
    
   //conditions for marital status.
    //else if(this.Martial_status=="married" && this.What_is_your_gender=="female"){
     // this.presentToast('Please specify the name of the husband');
    //}
    
   // else if(this.Martial_status !="married" || this.What_is_your_gender!="female"){
    //  this.name_of_husband="";
    //}
    //else if(this.Martial_status =="married" && this.number_of_wives_husbands ==""){
    //  this.presentToast('Please specify the number of wives or husbands');
    //}
    //else if(this.Martial_status !="married" && this.number_of_wives_husbands !=""){
    //  this.number_of_wives_husbands ="";
    //}
    
    //logic for first wife

    //else if(this.Martial_status =="married" && this.What_is_your_gender !='female'){
    //  this.presentToast('Please specify the name of first wive ');
    //}
    
    //else if(this.Martial_status !="married" || this.What_is_your_gender =="female"){
    //  this.name_first_wife ="";
    //}
//ENDED HERE ON
    
    else if(this.next_of_kin==""){
      this.presentToast('Specify the next of kin');
    }
    //some change added
    else if(this.next_of_kin!="" && this. next_of_kin_has_contact==""){
      this.presentToast('You didnt specify whether the next of kin has a telephone contact or not');
    } 
    else if(this.region==""){
      this.presentToast('Please specify the region');
    }
    else if(this.distr==""){
      this.presentToast('Please specify the district');
    }
    else if(this.subcounty==""){
      this.presentToast('Please specify the subcounty');
    }
    
    else if(this.parish==""){
      this.presentToast('Specify the Parish');
    }
    else if(this.village==""){
      this.presentToast('Specify the Village');
    }
    else if(this.nearest_town==""){
      this.presentToast('Specify the nearest town from here');
    }
    else if(this.Local_council1_name==""){
      this.presentToast('Specify the LC1 chairman');
    }
    
    else if(this.resident_since==""){
      this.presentToast('Specify since when have been a resident of this place');
    }
    
    else if(this.Description_of_location==""){
      this.presentToast('Specify the Description of location');
    }
    else if(this.DOB==""){
      this.presentToast('Specify the Date of Birth');
    }
    else if(this.level_of_education==""){
      this.presentToast('Specify your highest level of education');
    }
  
    else if(this.head_of_the_household==""){
      this.presentToast('Specify if your the head of household');
    } 
    else if(this.lo1==""){
      this.presentToast('Click the Get Location button to get the coordinates');
    }
    else if(this.la1==""){
      this.presentToast('Click the Get Location button to get the coordinates');
    }
    else if(this.lo2==""){
      this.presentToast('Click the Get gps main crop enterprise button');
    }
    else if(this.la2==""){
      this.presentToast('Click the Get gps main crop enterprise button');
    }
    
    else if(this.Mobile_literacy==""){
      this.presentToast('Specify how well can you use a phone');
    }
    else if(this.any_dependants==""){
      this.presentToast('Specify whether you have the dependants or not');
    }
    
    else if(this.farmer_org==""){
      this.presentToast('Specify if you are a member of CASA partners?');
    }
    else if(this.belong_farmergp==""){
      this.presentToast('Specify if you belong to any farmer group.');
    }
  
    else if(this.Affiliation==""){
      this.presentToast('Specify if the farmer group is connected to membership association');
    }
    
    else if(this.main_income_source==""){
      this.presentToast('Specify the main source of income');
    }
    
    else if(this.mainincome_since==""){
      this.presentToast('Specify Since when have you been involved in the main source of income');
    }
    
    else if(this.sector==""){
      this.presentToast('Specify your main sector');
    }
    
    else if(this.main_income_relaibility==""){
      this.presentToast('Specify how reliable is your main income source');
    }
    else if(this.main_income_amount==""){
      this.presentToast('Please fill in, How much do you get from your main source of income');
    }
    
    else if(this.annual_income==null){
      this.presentToast('Please fill in, What is your total annual income?');
    }
    
    else if(this.other_income_sources==""){
      this.presentToast('Please fill in, Do you have any other sources of income');
    }
    
    else if(this.income_trend==""){
      this.presentToast('Please fill in, How has your income been over the past 3 years');
    }
    
    else if(this.access_to_Health_services==""){
      this.presentToast('Please fill in, Do you have access to Health services ?');
    }
    
    else if(this.school_going_children==""){
      this.presentToast('Please fill in, Do you have any school going children?');
    }
    else if(this.what_is_the_land_tenor==""){
      this.presentToast('Please fill in, Under what tenure do you access the land for your production');
    }
    else if(this.value_of_land==""){
      this.presentToast('Please fill in, How much is land valued here');
    }
    else if(this.own_any_farm_machinery==[]){
      this.presentToast('Please fill in, Do you own any farm machinery');
    }
    else if(this.house_ownership==""){
      this.presentToast('Specify ownership of the house you live in');
    }
    else if(this.house_structure==""){
      this.presentToast('Indicate the farmers housing structure');
    }
    
    else if(this.Farm_size==null){
      this.presentToast('Indicate the farmers housing structure');
    }
    else if(this.total_land_size==null){
      this.presentToast('Fillout the total land size');
    }
    else if(this.postharvest_mgt==""){
      this.presentToast('Please fill in, Where do you mainly dry your {{Main_crop_enterprise}}');
    }
    else if(this.fo==""){
      this.presentToast('Please re-login again to continue');
    }
    
    else if(this.produce_storage==""){
      this.presentToast('Please fill in, Where do you mainly store your harvest ?');
    }
    else if(this.preservation==""){
      this.presentToast('Please fill in, How do you preserve your harvest');
    }
    
    else if(this.crops_for_new_season==[]){
      this.presentToast('What other crops do you intend to produce or  are under production this season');
    }
    
    else if(this.number_of_employees==""){
      this.presentToast('since How many employees do you have on your farm');
    }
    
    else if(this.livestock==[]){
      this.presentToast('Please respond to: Do you keep any livestock?');
    }

    else if(this.Did_you_plant_last_season==""){
      this.presentToast('Please respond to question, Did you plant last season?');
    }
    else if(this.crops_grown_last_season==[]){
      this.presentToast('Please respond to question, What crops did you grow last season');
    }
    
    else if(this.crops_stored_from_last_season ==""){
      this.presentToast('Please respond to question, Of the crops grown last season,did you store any?');
    }
    else if(this.use_pesticides_or_herbicides ==""){
      this.presentToast('Please respond to question, Did you use any pesticides and herbicides?');
    }
    
    else if(this.Did_you_apply_fertilizer ==""){
      this.presentToast('Please respond to question, Did you apply fertilizer?');
    }
    else if(this.crop_use ==""){
      this.presentToast('Please respond to question, Is your crop for commercial or subsistance purposes?');
    }
    
    else if(this.involved_in_marketing ==""){
      this.presentToast('Please respond to question, Are you involved in bulking and collective marketing');
    }
    
    else if(this.Marketlink ==""){
      this.presentToast('Please respond to question, How does your produce reach'+ this.name_of_farmer_org);
    }
    
    else if(this.agent_name ==""){
      this.presentToast('Please respond to question, Provide the name of the agent that collects/buys produce from yo'+ this.name_of_farmer_org);
    }
    
    else if(this.produce_transport ==""){
      this.presentToast('Please respond to question, By what means do you mainly deliver you produce to the market');
    }
    
    else if(this.Who_assisted_you ==[]){
      this.presentToast('Please respond to question, Who assisted you?');
    }
    
      else if(this.Are_you_aware_of_climate_shock ==""){
      this.presentToast('Please respond to question, Are you aware of climate shocks.');
    }
    
    else if(this.training_on_addressing_climate ==""){
      this.presentToast('Please respond to question, Have you ever received any training on addressing climate shocks in your farming business?');
    }
    
    else if(this.Which_crops_for_rotation ==""){
      this.presentToast('Please respond to question, Which crops do you consider for rotaton');
    }
    
      else if(this.knoledge_of_rain_date ==""){
      this.presentToast('Please respond to question, How important is it to know when it will rain 3 days ahead of time?');
    }
    
    else if(this.heard_of_agri_insurance ==""){
      this.presentToast('Please respond to question, Have you ever heard of agri insurance?');
    }
    
    else if(this.access_to_agri_insurance ==""){
      this.presentToast('Please respond to question, Do you have access to agri insurance');
    }
    
    else if(this.fair_charge_for_insurance ==""){
      this.presentToast('Please respond to question, How much do you think is fair (UGX) to protect your financial losses as a result of extreme weather?');
    }
    
    else if(this.prefer_ordinary_or_az_bunlde ==""){
      this.presentToast('Please respond to question, Would you prefer az bundle to other ordinary insurance');
    }
    
    else if(this.challenges_last_season ==[]){
      this.presentToast('Please respond to question, What are some of the challenges that you faced last season?');
    }
    
      else if(this.What_type_of_pests ==""){
      this.presentToast('Please respond to question, What type of pests');
      }
      else if(this.type_of_weather_and_effect ==""){
      this.presentToast('Please respond to question, What type of weather and effect on the crop?');
      }
      
      else if(this.Do_you_have_a_bank_account ==""){
      this.presentToast('Please respond to question, Do you have a bank account?');
      }
      
      else if(this.financial_access ==""){
      this.presentToast('Please respond to question, Which type of financial services do you have access to?');
      }
      
      else if(this.transaction_monthly_costs ==""){
      this.presentToast('Please respond to question, What are your monthly costs for carrying out financial transactions?');
      }
      
      else if(this.travel_distance ==""){
      this.presentToast('Please respond to question, How far do you travel to make a financial transaction');
      }

      else if(this.Have_you_ever_received_credit ==""){
      this.presentToast('Please respond to question, Have you ever received loan from a bank?');
      }
      
      else if(this.How_do_you_keep_your_money ==[]){
      this.presentToast('Please respond to question: How do you keep your money');
      }
      
      else if(this.financial_transaction_challeng ==[]){
      this.presentToast('Please respond to question: What challenges have you faced when making financial transactions?');
      }
    
    else if(this.action_access_to_financial_svc ==""){
      this.presentToast('Please respond to question: Give a view on some of the solutions to your challenge');
      }
      
      else if(this.access_to_agric_ext_services ==""){
      this.presentToast('Please respond to question: Do you have access to training/ services from CASApartner?');
      }
      
      else if(this.How_do_you_access_Agric_ext_sv ==[]){
      this.presentToast('Please respond to question: How do you access Agricultural extension services?');
      }

      else if(this.extension_type_channel_receive ==[]){
      this.presentToast('Please respond to question: What training/services have you received from CASA parters');
      }

      else if(this.adopted_practices ==[]){
      this.presentToast('Please respond to question: Which practices have you adopted');

      }

      else if(this.Rate_services_training ==""){
      this.presentToast('Please respond to question: Rate the quality of services/training provided to you');
      }
      
      else if(this.frequently_access_ext_svcs ==""){
      this.presentToast('Please respond to question: Is the information provided accurate?');
      }
      
      else if(this.is_information_provided_accurt ==""){
      this.presentToast('Please respond to question: Rate the quality of services/training provided to you');
      }

      else if(this.trainingappropriate ==""){
      this.presentToast('Please respond to question: Was the training appropirate?');
      }
      
      else if(this.benefits_of_practices ==""){
      this.presentToast('Please respond to question: Of practices you have adopted from the training, whats the main benefit you have achieved');
      }
      
      else if(this.pay_anything_to_access_ext_svc ==""){
      this.presentToast('Please respond to question: Do you pay anything to access the extension services?');
      }
      
      else if(this.training ==[]){
        this.presentToast('Please respond to question: Which other training and services would you require');
        }
        
        else if(this.pay_per_season ==""){
          this.presentToast('Please respond to question: How much do you pay per season?');
        }
        else if(this.pest_fertilizer_pesticide_info ==[]){
          this.presentToast('Please respond to question: How did you access information for seed, fertilizer & pesticides in the last 3 months');
        }

        else if(this.Do_you_receive_weather_data ==""){
          this.presentToast('Please respond to question: Do you receive weather information?');
        }
        
        else if(this.access_to_weather_data ==[]){
          this.presentToast('Please respond to question: How accurate is the information?');
        }
        
        else if(this.most_harmful_info ==""){
          this.presentToast('Please respond to question:Which information is most harmful to your farming decision?');
        }
        
        else if(this.biggest_prob_in_data_access ==""){
          this.presentToast('Please respond to question:What has been the biggest constraint in accessing information on weather data in the last 3 months?');
        }
              
        else if(this.spend_on_your_phone_monthly ==""){
          this.presentToast('Please respond to question:How much do you spend on your phone per month?');
        }
        else if(this.main_phone_use ==[]){
          this.presentToast('Please respond to question:What did you mainly use your phone for in the last 3 months');
        }
        
        else if(this.subscribed_to_info_svces_on_ph ==""){
          this.presentToast('Please respond to question:Are you subscribed to information services through your mobile phone?');
        }
        
        else if(this.training_on_using_phone_servic ==""){
          this.presentToast('Please respond to question:Have you received any training on using mobile products/services in the last 3 months');
        }
        
        else if(this.training_on_weather_alerts ==""){
          this.presentToast('Please respond to question:Have you received any training on weather alerts.');
        }
        
        else if(this.How_accurate_is_the_info ==""){
          this.presentToast('Please respond to question:How accurate is the information?');
        }
        
        else if(this.trainig_on_insurance ==""){
          this.presentToast('Please respond to question:Have you received any training on insurance?');
        }
        
        else if(this.probs_of_using_cellphone ==[]){
          this.presentToast('Please respond to question:What are some of the constraints faced in using your cellphone');
        }
        
         
        
        
        
        else if(this.hhplanting_decision ==""){
          this.presentToast('Please respond to question:who decides on what to plant ');
        }
        else if(this.hhproductionphase_decision ==""){
          this.presentToast('Please respond to question:who is involved in crop production phase');
        }
        else if(this.hhpostharvet_decision ==""){
          this.presentToast('Please respond to question:who is involved in the postharvet management phase in the household');
        }
        else if(this.hhmarketing_decision ==""){
          this.presentToast('Please respond to question:who is involved in marketing and sale of produce in household');
        }
        else if(this.hhincome_decision ==""){
          this.presentToast('Please respond to question:Who decides on how and what to spend on the household income from the produce');
        }
         
else if(this.meals_a_day ==""){
  this.presentToast('Please respond to question:How many times do you have meals in a day');
}

else if(this.Vegetables ==""){
  this.presentToast('Please respond to question:How often do you eat vegetables');
}
else if(this.Carbohydrates ==""){
  this.presentToast('Please respond to question:How often do you eat carbohydrates');
}
else if(this.fruits ==""){
  this.presentToast('Please respond to question:how often do you eat fruits');
}
else if(this.proteins ==""){
  this.presentToast('Please respond to question:how often to do you eat proteins');
}


else if(this.farmers_cooperation_responding ==""){
  this.presentToast('Please respond to question:Rate the farmers cooperation in responding to the questions');
}
else if(this.how_well_agent_knows_beneficiary ==""){
  this.presentToast('Please respond to question:On a personal level how well do you know the respondent(farmer)');
}
else if(this.accuracy_of_info_collected ==""){
  this.presentToast('Please respond to question:rate the accuracy of the information that the farmer has provide according to you');
}
else if(this.data_quality ==""){
  this.presentToast('Please respond to question:rate the quality of data you have collected given time, langauage, repondents attitudee and other factors');
}
else{ 
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'please wait ...',
      });
      loader.present();

      return new Promise(resolve => {
          let body = {
            aski:'submit',
            consent: this.consent,
            farmers_name:this.farmers_name,
            do_you_have_disability:this.do_you_have_disability,
            disability_type:this.disability_type,
            own_a_mobile_phone:this.own_a_mobile_phone,
            What_type_of_phone_do_you_own:this.What_type_of_phone_do_you_own,
            No_of_contacts: this.No_of_contacts,
            tel_no1:this.tel_no1,
            tel_No_2:this.tel_No_2,
            service_provider: this.service_provider,
            Specify_svc_provider:this.Specify_svc_provider,
            mm_reg_status:this.mm_reg_status,
            registered_mm_number: this.registered_mm_number,
            nin:this.nin,
            Photo_url:this.Photo_url,
            ID_photo_url:this.ID_photo_url,
            occupation:this.occupation,
            specify_other_occupation: this.specify_other_occupation,
            Martial_status:this.Martial_status,
            What_is_your_gender:this.What_is_your_gender,
            name_of_husband:this.name_of_husband,
            number_of_wives_husbands:this.number_of_wives_husbands,
            name_first_wife:this.name_first_wife,
            name_second_wife:this.name_second_wife,
            status_in_a_family:this.status_in_a_family,
            next_of_kin:this.next_of_kin,
            next_of_kin_has_contact:this.next_of_kin_has_contact,
            next_of_kin_phone_no: this.next_of_kin_phone_no,
            region:this.region,
            distr:this.distr,
            other_district:this.other_district,
            subcounty:this.subcounty,
            other_subcounty:this.other_subcounty,
            subcounty_other_district:this.subcounty_other_district,
            soiltype:this.soiltype,
            parish: this.parish,
            village:this.village,
            nearest_town:this.nearest_town,
            Local_council1_name:this.Local_council1_name,
            resident_since:this.resident_since,
            Description_of_location:this.Description_of_location,
            DOB:this.DOB,
            level_of_education:this.level_of_education,
            head_of_the_household:this.head_of_the_household,
  //Gps cordinates for the location
            la1:this.la1,
            lo1:this.lo1,
            acc1:this.acc1,
  //gps main enterprise
            la2:this.la2,
            lo2:this.lo2,
            acc2:this.acc2,

            Mobile_literacy:this.Mobile_literacy,
            any_dependants:this.any_dependants,
            dependant_no:this.dependant_no,
            dependants_age_bracket:this.dependants_age_bracket,
            //Casa Data 
            farmer_org:this.farmer_org,
            name_of_farmer_org:this.name_of_farmer_org,
            belong_farmergp:this.belong_farmergp,
            name_farmergp:this.belong_farmergp,
            year_services:this.year_services,
            position_in_FO:this.position_in_FO,
            Your_position_in_the_fo:this.Your_position_in_the_fo,
            male_members_in_FO:this.male_members_in_FO,
            female_members_in_FO:this.female_members_in_FO,
            Affiliation:this.Affiliation,
            Name_of_connected_ACE_or_DFA:this.Name_of_connected_ACE_or_DFA,
            main_income_source:this.main_income_source,
            mainincome_since:this.mainincome_since,
            sector:this.sector,
            main_income_relaibility:this.main_income_relaibility,
            main_income_amount:this.main_income_amount,
            annual_income:this.annual_income,
            other_income_sources:this.other_income_sources,
//Include the columns that are in a loop for other sources of income these are to be put in a separate table
            other_income_activity:this.other_income_activity,
            years_of_experince:this.years_of_experince,
            other_income_reliability:this.other_income_reliability,
            amount:this.amount,
//end columns for other income loop            
            income_trend:this.income_trend,
            access_to_Health_services:this.access_to_Health_services,
            health_expense:this.health_expense,
            school_going_children:this.school_going_children,
            no_of_school_going_children:this.no_of_school_going_children,
            school_fees_expense:this.school_fees_expense,
            what_is_the_land_tenor:this.what_is_the_land_tenor,
            Specify_other:this.Specify_other,
            value_of_land:this.value_of_land,
            own_any_farm_machinery:this.own_any_farm_machinery,
            house_ownership:this.house_ownership,
            house_structure:this.house_structure,
            Farm_size:this.Farm_size,
            total_land_size:this.total_land_size,
            Main_crop_enterprise:this.Main_crop_enterprise,
            Variety_of_mainenterprise:this.Variety_of_mainenterprise,
            Variety2_of_mainenterprise:this.Variety2_of_mainenterprise,
            landsize_main_crop_enterprise:this.landsize_main_crop_enterprise,
            additional_land_main_enterprise:this.additional_land_main_enterprise,
            season_of_planting:this.season_of_planting,
            yield_expected_main_enterprise:this.yield_expected_main_enterprise,
            farm_at_residence:this.farm_at_residence,
            //GPS_main_enterprise:this.GPS_main_enterprise,
            postharvest_mgt:this.postharvest_mgt,
            produce_storage:this.produce_storage,
            preservation:this.preservation,
            crops_for_new_season:this.crops_for_new_season,
            other_crops_intended:this.other_crops_intended,

            number_of_employees:this.number_of_employees,
            landsize_cropselected:this.landsize_cropselected,
            livestock:this.livestock,
            specify_livestock:this.specify_livestock,
            cattle_number:this.cattle_number,
            goat_number:this.goat_number,
            sheep_number:this.sheep_number,
            chicken_number:this.chicken_number,
            pigs_number:this.pigs_number,
            donkey_number:this.donkey_number,
            Did_you_plant_last_season:this.Did_you_plant_last_season,
            crops_grown_last_season:this.crops_grown_last_season,
            Specify_other_crops_grown:this.Specify_other_crops_grown,
            in_business_since:this.in_business_since,

            yield_with_drought:this.yield_with_drought,
            year_of_severe_drought:this.year_of_severe_drought,
            how_much_seed:this.how_much_seed,
            
            yield_per_acre:this.yield_per_acre,
            yield_of_maize_with_adequate_rain_per_acre:this.yield_of_maize_with_adequate_rain_per_acre,
            yield_of_beans_with_adequate_rain_per_acre:this.yield_of_beans_with_adequate_rain_per_acre,
            yield_of_sesame_with_adequate_rain_per_acre:this.yield_of_sesame_with_adequate_rain_per_acre,
            yield_of_soyabean_with_adequate_rain_per_acre:this.yield_of_soyabean_with_adequate_rain_per_acre,
            yield_of_rice_with_adequate_rain_per_acre:this.yield_of_rice_with_adequate_rain_per_acre,
            yield_of_millet_with_adequate_rain_per_acre:this.yield_of_millet_with_adequate_rain_per_acre,
            yield_of_sorghum_with_adequate_rain_per_acre:this.yield_of_sorghum_with_adequate_rain_per_acre,
            yield_of_irish_potatoes_with_adequate_rain_per_acre:this.yield_of_irish_potatoes_with_adequate_rain_per_acre,
            yield_of_cotton_with_adequate_rain_per_acre:this.yield_of_cotton_with_adequate_rain_per_acre,
            yield_of_sweet_potatoes_with_adequate_rain_per_acre:this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,
            yield_of_sunflower_with_adequate_rain_per_acre:this.yield_of_sunflower_with_adequate_rain_per_acre,
            yield_of_groundnuts_with_adequate_rain_per_acre:this.yield_of_groundnuts_with_adequate_rain_per_acre,
            yield_of_coffee_with_adequate_rain_per_acre:this.yield_of_coffee_with_adequate_rain_per_acre,
            yield_of_banana_with_adequate_rain_per_acre:this.yield_of_banana_with_adequate_rain_per_acre,
            yield_of_cassava_with_adequate_rain_per_acre:this.yield_of_cassava_with_adequate_rain_per_acre,
            crops_stored_from_last_season:this.crops_stored_from_last_season,
            disturbances_in_storage:this.disturbances_in_storage,
            storage_time:this.storage_time,
            Specify_others:this.Specify_others,
            yield_last_season:this.yield_last_season,



          maize_per_kg:this.maize_per_kg,
          beans_per_kg:this.beans_per_kg ,
          sesame_per_kg:this.sesame_per_kg,
          soyabean_per_kg:this.soyabean_per_kg,
          rice_per_kg:this.rice_per_kg,
          millet_per_kg:this.millet_per_kg,
          sorghum_per_kg:this.sorghum_per_kg,
          irish_potatoes_per_kg:this.irish_potatoes_per_kg,
          cotton_per_kg:this.cotton_per_kg,
          sweet_potatoes_per_kg:this.sweet_potatoes_per_kg,
          sunflower_per_kg:this.sunflower_per_kg,
          ground_nuts_per_kg:this.ground_nuts_per_kg,
          coffee_per_kg:this.coffee_per_kg,
          Banana_per_bunch:this.Banana_per_bunch,
          cassava_per_kg:this.cassava_per_kg,
          seed_variety:this.seed_variety,
          
  //More
          Did_you_apply_fertilizer:this.Did_you_apply_fertilizer,
          Specify_the_type:this.Specify_the_type,
          organic_specify:this.organic_specify,
          Specify_other_organic:this.Specify_other_organic,
          inorganic_Specify:this.inorganic_Specify,
          fertilizer_type:this.fertilizer_type,
          fertilizer_amount:this.fertilizer_amount,

          use_pesticides_or_herbicides:this.use_pesticides_or_herbicides,
          Please_specify_which_one:this.Please_specify_which_one,
          pesticide_effectiveness:this.pesticide_effectiveness,
          crop_use:this.crop_use,
          crop_subsistence:this.crop_subsistence,
          crop_commercial:this.crop_commercial,
          income_from_crops:this.income_from_crops,
          involved_in_marketing:this.involved_in_marketing,
          sell_of_produce_Nyakyera:this.sell_of_produce_Nyakyera,
          sell_of_produce_green:this.sell_of_produce_green,
          sell_of_produce_equator:this.sell_of_produce_equator,
          sell_of_produce_liraresort:this.sell_of_produce_liraresort,
          sell_of_produce_cedo:this.sell_of_produce_cedo,
          sell_of_produce_orum:this.sell_of_produce_orum,
          Marketlink:this.Marketlink,
          agent_name:this.agent_name,
          produce_transport:this.produce_transport,
          employ_any_farm_labour:this.employ_any_farm_labour,
          Specify_their_task:this.Specify_their_task,
          Who_assisted_you:this.Who_assisted_you,
          How_much_did_you_pay_them:this.How_much_did_you_pay_them,
          Are_you_aware_of_climate_shock:this.Are_you_aware_of_climate_shock,
          which_ones_you_are_aware_of:this.which_ones_you_are_aware_of,
          training_on_addressing_climate:this.training_on_addressing_climate,
          Please_specify:this.Please_specify,
          Which_crops_for_rotation:this.Which_crops_for_rotation,
          _1st_choice:this._1st_choice,
          _2nd_choice:this._1st_choice,
          _3rd_choice:this._3rd_choice,

          knoledge_of_rain_date:this.knoledge_of_rain_date,
          heard_of_agri_insurance:this.heard_of_agri_insurance,
          access_to_agri_insurance:this.access_to_agri_insurance,
          Please_specify_the_agri_insurance_type:this.Please_specify_the_agri_insurance_type,
          Specify_the_insurance_provider:this.Specify_the_insurance_provider,
          fair_charge_for_insurance:this.fair_charge_for_insurance,
          prefer_ordinary_or_az_bunlde:this.prefer_ordinary_or_az_bunlde,
          challenges_last_season:this.challenges_last_season,
          Specify:this.Specify,
          What_type_of_pests:this.What_type_of_pests,
          type_of_weather_and_effect:this.type_of_weather_and_effect,
          Do_you_have_a_bank_account:this.Do_you_have_a_bank_account,
          financial_access:this.financial_access,
          transaction_monthly_costs:this.transaction_monthly_costs,
          Specify_other_monthly_transaction_costs:this.Specify_other_monthly_transaction_costs,
          travel_distance:this.travel_distance,
          specify_other_travel_distance:this.specify_other_travel_distance,
          Have_you_ever_received_credit:this.Have_you_ever_received_credit,
          no_of_times_borrowed:this.no_of_times_borrowed,
          loanoutstanding:this.loanoutstanding,
          How_much_repayment_was_made_per_month:this.How_much_repayment_was_made_per_month,
          delay_time_for_repayment:this.delay_time_for_repayment,
          How_do_you_keep_your_money:this.How_do_you_keep_your_money,
          financial_transaction_challeng:this.financial_transaction_challeng,
          Specify_Other_financial_transaction_challeng:this.Specify_Other_financial_transaction_challeng,
          action_access_to_financial_svc:this.action_access_to_financial_svc,
          access_to_agric_ext_services:this.access_to_agric_ext_services,
          How_do_you_access_Agric_ext_sv:this.How_do_you_access_Agric_ext_sv,
          extension_type_channel_receive:this.extension_type_channel_receive,
          adopted_practices:this.adopted_practices,
          most_mostadoptedpractice:this.most_mostadoptedpractice,
          Rate_services_training:this.Rate_services_training,
          frequently_access_ext_svcs:this.frequently_access_ext_svcs,
          is_information_provided_accurt:this.is_information_provided_accurt,
          trainingappropriate:this.trainingappropriate,
          benefits_of_practices:this.benefits_of_practices,
          pay_anything_to_access_ext_svc:this.pay_anything_to_access_ext_svc,
          training:this.training, 
          pay_per_season:this.pay_per_season,
          pest_fertilizer_pesticide_info:this.pest_fertilizer_pesticide_info,
          Do_you_receive_weather_data:this.Do_you_receive_weather_data,
          access_to_weather_data:this.access_to_weather_data,
          How_accurate_is_the_info:this.How_accurate_is_the_info,
          most_harmful_info:this.most_harmful_info,
          biggest_prob_in_data_access:this.biggest_prob_in_data_access,
          spend_on_your_phone_monthly:this.spend_on_your_phone_monthly,
          main_phone_use:this.main_phone_use,

          Voice_calling_and_receiving:this.Voice_calling_and_receiving,
          SMS:this.SMS,
          Internet:this.Internet,
          Social_media:this.Social_media,
          subscribed_to_info_svces_on_ph:this.subscribed_to_info_svces_on_ph,
          services_suscribed_to: this.services_suscribed_to,
          training_on_using_phone_servic:this.training_on_using_phone_servic,
          training_on_weather_alerts:this.training_on_weather_alerts,
          Who_provided_the_training_on_weather_alerts:this.Who_provided_the_training_on_weather_alerts,
          trainig_on_insurance:this.trainig_on_insurance,
          Who_provided_the_training_on_insurance:this.Who_provided_the_training_on_insurance,
          probs_of_using_cellphone:this.probs_of_using_cellphone,
          field_officer:this.fo,
          hhplanting_decision:this.hhplanting_decision,
          hhproductionphase_decision:this.hhproductionphase_decision,
          hhpostharvet_decision:this.hhpostharvet_decision,
          hhmarketing_decision:this.hhmarketing_decision,
          hhincome_decision:this.hhincome_decision,
          meals_a_day:this.meals_a_day,
          Vegetables:this.Vegetables,
          Carbohydrates:this.Carbohydrates,
          fruits:this.fruits,
          proteins:this.proteins,
          farmers_cooperation_responding:this.farmers_cooperation_responding,
          how_well_agent_knows_beneficiary:this.how_well_agent_knows_beneficiary,
          accuracy_of_info_collected:this.accuracy_of_info_collected,
          data_quality:this.data_quality
          }
            this.accsPrvds.postData(body, 'process2.php').subscribe((res:any)=> {
        if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/beneficiary']);
            this.consent=false;
            this.farmers_name="";
            this.do_you_have_disability="";
            this.disability_type="";
            this.own_a_mobile_phone="";
            this.What_type_of_phone_do_you_own="";
            this.No_of_contacts=null;
            this.tel_no1="";
            this.tel_No_2="";
            this.service_provider="";
            this.Specify_svc_provider="";
            this.mm_reg_status="";
            this.registered_mm_number="";
            this.nin="";
            this.Photo_url="";
            this.ID_photo_url="";
            this.currentImage="";
            this.currentImageID="";
            this.occupation="";
            this.specify_other_occupation="";
            this.Martial_status="";
            this.What_is_your_gender="";
            this.name_of_husband="";
            this.number_of_wives_husbands="";
            this.name_first_wife="";
            this.name_second_wife="";
            this.status_in_a_family="";
            this.next_of_kin="";
            this.next_of_kin_has_contact="";
            this.next_of_kin_phone_no="";
            this.region="";
            this.distr="";
            this.other_district="";
            this.subcounty="";
            this.other_subcounty="";
            this.subcounty_other_district="";
            this.soiltype="";
            this.parish="";
            this.village="";
            this.nearest_town="";
            this.Local_council1_name="";
            this.resident_since="";
            this.Description_of_location="";
            this.DOB="";
            this.level_of_education="";
            this.head_of_the_household="";
            this.lo1="";
            this.la1="";
            this.acc1="";

            this.lo2="";
            this.la2="";
            this.acc2="";

            this.Mobile_literacy="";
            this.any_dependants="";
            this.dependant_no="";
            this.dependants_age_bracket=[];
            //Casa Data 
            this.farmer_org="";
            this.name_of_farmer_org="";
            this.belong_farmergp="";
            this.name_farmergp="";

            this.year_services="";
            this.belong_farmergp="";
            this.position_in_FO="";
            this.Your_position_in_the_fo="";
            this.male_members_in_FO="";
            this.female_members_in_FO="";
            this.Affiliation="";
            this.Name_of_connected_ACE_or_DFA="";
            this.main_income_source="";
            //Here we include the values that are in aloop for other income source.
            

            this.mainincome_since="";
            this.sector="";
            this.main_income_relaibility="";
            this.main_income_amount="";
            this.other_income_reliability="";
            this.amount=null;
            this.income_trend="";
            this.access_to_Health_services="";
            this.health_expense=null;
            this.school_going_children="";
            this.no_of_school_going_children=null;
            this.school_fees_expense="";
            //expenditure
            //disposable_income
            this.what_is_the_land_tenor="";
            this.Specify_other="";
            this.value_of_land="";
            this.own_any_farm_machinery=[];
            this.house_ownership="";
            this.house_structure="";
            this.Farm_size=null;
            this.total_land_size=null;
            this.Main_crop_enterprise;
            this.yield_expected_main_enterprise;
            this.farm_at_residence="";
            //Gps
            this.postharvest_mgt="";
            this.produce_storage="";
            this.preservation="";
            this.crops_for_new_season=[];

            this.Main_crop_enterprise="";
            this.other_crops_intended="";
            
            this.number_of_employees="";
            this.landsize_cropselected=[];

            this.livestock=[];
            this.specify_livestock="";
            this.cattle_number=null;
            this.goat_number=null;
            this.sheep_number=null;
            this.chicken_number=null;
            this.pigs_number=null;
            this.donkey_number=null;
            this.Did_you_plant_last_season="";
            this.crops_grown_last_season=[];
            this.Specify_other_crops_grown="";
            this.in_business_since=[];
            this.yield_with_drought=[];
            this.year_of_severe_drought="";
            this.how_much_seed=[];

            this.yield_per_acre=[];
            this.yield_of_maize_with_adequate_rain_per_acre=null;
            this.yield_of_beans_with_adequate_rain_per_acre=null;
            this.yield_of_sesame_with_adequate_rain_per_acre=null;
            this.yield_of_soyabean_with_adequate_rain_per_acre=null;
            this.yield_of_rice_with_adequate_rain_per_acre=null;
            this.yield_of_millet_with_adequate_rain_per_acre=null;
            this.yield_of_sorghum_with_adequate_rain_per_acre=null;
            this.yield_of_irish_potatoes_with_adequate_rain_per_acre=null;
            this.yield_of_cotton_with_adequate_rain_per_acre=null;
            this.yield_of_sweet_potatoes_with_adequate_rain_per_acre=null;
            this.yield_of_sunflower_with_adequate_rain_per_acre=null;
            this.yield_of_groundnuts_with_adequate_rain_per_acre=null;
            this.yield_of_coffee_with_adequate_rain_per_acre=null;
            this.yield_of_banana_with_adequate_rain_per_acre=null;
            this.yield_of_cassava_with_adequate_rain_per_acre=null;
            this.crops_stored_from_last_season="";
            this.disturbances_in_storage="";
            this.storage_time="";
            this.Specify_others="";

            this.yield_last_season=[];

            this.yield_with_drought=[];
            this.year_of_severe_drought="";

            this.maize_per_kg=null;
            this.beans_per_kg=null;
            this.sesame_per_kg=null;
            this.soyabean_per_kg=null;
            this.rice_per_kg=null;
            this.millet_per_kg=null;
            this.sorghum_per_kg=null;
            this.irish_potatoes_per_kg=null;
            this.cotton_per_kg=null;
            this.sweet_potatoes_per_kg=null;
            this.sunflower_per_kg=null;
            this.ground_nuts_per_kg=null;
            this.coffee_per_kg=null;
            this.Banana_per_bunch=null;
            this.cassava_per_kg=null;
            this.seed_variety=[];
  //More
          this.Did_you_apply_fertilizer=null;
          this.Specify_the_type=null;
          this.organic_specify=null;
          this.Specify_other_organic=null;
          this.inorganic_Specify=[];
          this.fertilizer_type=[];
          this.fertilizer_amount=[];

          this.use_pesticides_or_herbicides="";
          this.Please_specify_which_one="";
          this.pesticide_effectiveness="";
          this.crop_use="";
          this.crop_subsistence=[];
          this.crop_commercial=[];
          this.income_from_crops=[];

          this.involved_in_marketing="";
          this.sell_of_produce_Nyakyera="";
          this.sell_of_produce_green="";
          this.sell_of_produce_equator="";
          this.sell_of_produce_liraresort="";
          this.sell_of_produce_cedo="";
          this.sell_of_produce_orum="";
          this.Marketlink="";
          this.agent_name="";
          this.produce_transport="";
          this.employ_any_farm_labour="";
          this.Specify_their_task=[];
          this.Who_assisted_you=[];
          this.How_much_did_you_pay_them=null;
          this.Are_you_aware_of_climate_shock="";
          this.which_ones_you_are_aware_of="";
          this.training_on_addressing_climate="";
          this.Please_specify=[];
          this.Which_crops_for_rotation="";
          this._1st_choice="";
          this._2nd_choice="";
          this._3rd_choice="";

          this.knoledge_of_rain_date="";
          this.heard_of_agri_insurance="";
          this.access_to_agri_insurance="";
          this.Please_specify_the_agri_insurance_type=[];
          this.Specify_the_insurance_provider="";
          this.fair_charge_for_insurance="";
          this.prefer_ordinary_or_az_bunlde="";
          this.challenges_last_season=[];
          this.Specify="";
          this.What_type_of_pests="";
          this.type_of_weather_and_effect="";
          this.Do_you_have_a_bank_account="";
          this.financial_access="";
          this.transaction_monthly_costs="";
          this.Specify_other_monthly_transaction_costs="";
          this.travel_distance="";
          this.specify_other_travel_distance="";
          this.Have_you_ever_received_credit="";
          this.no_of_times_borrowed="";
          this.loanoutstanding="";
          this.How_much_repayment_was_made_per_month="";
          this.delay_time_for_repayment="";
          this.How_do_you_keep_your_money=[];
          this.financial_transaction_challeng=[];
          this.Specify_Other_financial_transaction_challeng="";
          this.action_access_to_financial_svc="";
          this.access_to_agric_ext_services="";
          this.How_do_you_access_Agric_ext_sv=[];
          this.extension_type_channel_receive=[];
          this.adopted_practices=[];
          this.most_mostadoptedpractice="";
          this.Rate_services_training="";
          this.frequently_access_ext_svcs="";
          this.is_information_provided_accurt="";
          this.trainingappropriate="";
          this.benefits_of_practices="";
          this.pay_anything_to_access_ext_svc="";
          this.training=[];
          this.pay_per_season="";
          this.pest_fertilizer_pesticide_info=[];
          this.Do_you_receive_weather_data="";
          this.access_to_weather_data=[];
          this.How_accurate_is_the_info;
          this.most_harmful_info="";
          this.biggest_prob_in_data_access="";
          this.spend_on_your_phone_monthly="";
          this.main_phone_use=[];
          this.subscribed_to_info_svces_on_ph="";
          this.services_suscribed_to=[];
          this.training_on_using_phone_servic="";
          this.training_on_weather_alerts="";
          this.Who_provided_the_training_on_weather_alerts="";
          this.trainig_on_insurance="";
          this.Who_provided_the_training_on_insurance="";
          this.probs_of_using_cellphone=[];
          this.Variety_of_mainenterprise=""; //it should be after main crop enterprisehhplanting_decision;
          this.Variety2_of_mainenterprise="";
          this.landsize_main_crop_enterprise=null;
          this.additional_land_main_enterprise=null;
          this.season_of_planting="",
          this.hhproductionphase_decision=""; 
          this.hhpostharvet_decision="";
          this.hhmarketing_decision="";
          this.hhincome_decision="";
          this.meals_a_day="";
          this.Vegetables=""; 
          this.Carbohydrates="";
          this.fruits="";
          this.proteins=""; 
          this.farmers_cooperation_responding="";
          this.how_well_agent_knows_beneficiary="";
          this.accuracy_of_info_collected="";
          this.data_quality="";

          this.other_income_sources=="";
          this.mainincome_since=="";
          this.annual_income=null;
          //clearing storage
          //this.storage.clear();

                        }else{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                        }
                  },(err)=>{
                    loader.dismiss();
                    this.disabledButton = false;
                    this.presentAlert('You are offline');
                    console.log('Error ', err);
            });
      });
      }
    
  }
    async presentAlert(a) {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: a,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Save and submit when online',
            handler: () => {
              this.addDetails(this.consent, this.farmers_name, this.do_you_have_disability,this.disability_type,this.own_a_mobile_phone,this.What_type_of_phone_do_you_own,this.No_of_contacts,this.tel_no1,this.tel_No_2,this.service_provider,this.Specify_svc_provider,this.mm_reg_status,this.registered_mm_number,this.nin,this.ID_photo_url,this.Photo_url,this.occupation,this.specify_other_occupation,this.Martial_status,this.What_is_your_gender,this.name_of_husband,this.number_of_wives_husbands,this.name_first_wife,this.name_second_wife,this.status_in_a_family,this.next_of_kin,this.next_of_kin_has_contact,this.next_of_kin_phone_no,this.region,this.distr,this.other_district,this.subcounty,this.other_subcounty,this.subcounty_other_district,this.soiltype,this.parish,this.village,this.nearest_town,this.resident_since,this.Description_of_location,this.DOB,this.level_of_education,this.head_of_the_household,this.la1,this.lo1,this.acc1,this.Mobile_literacy,this.any_dependants,this.dependant_no,this.dependants_age_bracket,this.farmer_org,this.name_of_farmer_org,this.belong_farmergp,this.name_farmergp,this.year_services,this.position_in_FO,this.Your_position_in_the_fo,this.male_members_in_FO,this.female_members_in_FO,this.Affiliation,this.Name_of_connected_ACE_or_DFA,this.main_income_source,this.mainincome_since,this.sector,this.main_income_relaibility,this.main_income_amount,this.annual_income,this.other_income_sources,this.other_income_activity,this.years_of_experince,this.other_income_reliability,this.amount,this.income_trend,this.access_to_Health_services,this.health_expense,this.school_going_children,this.no_of_school_going_children,this.school_fees_expense,this.what_is_the_land_tenor,this.Specify_other,this.value_of_land,this.own_any_farm_machinery,this.house_ownership,this.house_structure,this.Farm_size,this.total_land_size,this.Main_crop_enterprise,this.Variety_of_mainenterprise,this.Variety2_of_mainenterprise,this.landsize_main_crop_enterprise,this.additional_land_main_enterprise,this.season_of_planting,this.yield_expected_main_enterprise,this.farm_at_residence,this.la2,this.lo2,this.acc2,this.postharvest_mgt,this.produce_storage,this.preservation,this.crops_for_new_season,this.other_crops_intended,this.landsize_cropselected,this.yield_per_acre,this.in_business_since,this.number_of_employees,this.livestock,this.specify_livestock,this.cattle_number,this.goat_number,this.sheep_number,this.chicken_number,this.pigs_number,this.donkey_number,this.Did_you_plant_last_season,this.crops_grown_last_season,this.Specify_other_crops_grown,this.yield_of_maize_with_adequate_rain_per_acre,this.yield_of_beans_with_adequate_rain_per_acre,this.yield_of_sesame_with_adequate_rain_per_acre,this.yield_of_soyabean_with_adequate_rain_per_acre,this.yield_of_rice_with_adequate_rain_per_acre,this.yield_of_millet_with_adequate_rain_per_acre,this.yield_of_sorghum_with_adequate_rain_per_acre,this.yield_of_irish_potatoes_with_adequate_rain_per_acre,this.yield_of_cotton_with_adequate_rain_per_acre,this.yield_of_sweet_potatoes_with_adequate_rain_per_acre,this.yield_of_sunflower_with_adequate_rain_per_acre,this.yield_of_groundnuts_with_adequate_rain_per_acre,this.yield_of_coffee_with_adequate_rain_per_acre,this.yield_of_banana_with_adequate_rain_per_acre,this.yield_of_cassava_with_adequate_rain_per_acre,this.crops_stored_from_last_season,this.storage_time,this.disturbances_in_storage,this.Specify_others,this.yield_last_season,this.yield_with_drought,this.year_of_severe_drought,this.how_much_seed,this.maize_per_kg,this.beans_per_kg,this.rice_per_kg,this.sesame_per_kg,this.soyabean_per_kg,this.millet_per_kg,this.sorghum_per_kg,this.irish_potatoes_per_kg,this.cotton_per_kg,this.sweet_potatoes_per_kg,this.sunflower_per_kg,this.ground_nuts_per_kg,this.coffee_per_kg,this.Banana_per_bunch,this.cassava_per_kg,this.seed_variety,this.Did_you_apply_fertilizer,this.Specify_the_type,this.organic_specify,this.Specify_other_organic,this.inorganic_Specify,this.fertilizer_type,this.fertilizer_amount,this.use_pesticides_or_herbicides,this.Please_specify_which_one,this.pesticide_effectiveness,this.crop_use,this.crop_subsistence,this.crop_commercial,this.income_from_crops,this.involved_in_marketing,this.sell_of_produce_Nyakyera,this.sell_of_produce_green,this.sell_of_produce_equator,this.sell_of_produce_liraresort,this.sell_of_produce_cedo,this.sell_of_produce_orum,this.Marketlink,this.agent_name,this.produce_transport,this.employ_any_farm_labour,this.Specify_their_task,this.Who_assisted_you,this.How_much_did_you_pay_them,this.Are_you_aware_of_climate_shock,this.which_ones_you_are_aware_of,this.training_on_addressing_climate,this.Please_specify,this.Which_crops_for_rotation,this._1st_choice,this._2nd_choice,this._3rd_choice,this.knoledge_of_rain_date,this.heard_of_agri_insurance,this.access_to_agri_insurance,this.Please_specify_the_agri_insurance_type,this.Specify_the_insurance_provider,this.fair_charge_for_insurance,this.prefer_ordinary_or_az_bunlde,this.challenges_last_season,this.Specify,this.What_type_of_pests,this.type_of_weather_and_effect,this.Do_you_have_a_bank_account,this.financial_access,this.transaction_monthly_costs,this.Specify_other_monthly_transaction_costs,this.travel_distance,this.specify_other_travel_distance,this.Have_you_ever_received_credit,this.no_of_times_borrowed,this.loanoutstanding,this.How_much_repayment_was_made_per_month,this.delay_time_for_repayment,this.How_do_you_keep_your_money,this.financial_transaction_challeng,this.Specify_Other_financial_transaction_challeng,this.action_access_to_financial_svc,this.access_to_agric_ext_services,this.How_do_you_access_Agric_ext_sv,this.extension_type_channel_receive,this.adopted_practices,this.most_mostadoptedpractice,this.Rate_services_training,this.frequently_access_ext_svcs,this.is_information_provided_accurt,this.trainingappropriate,this.benefits_of_practices,this.pay_anything_to_access_ext_svc,this.training,this.pay_per_season,this.pest_fertilizer_pesticide_info,this.Do_you_receive_weather_data,this.access_to_weather_data,this.How_accurate_is_the_info,this.most_harmful_info,this.biggest_prob_in_data_access,this.spend_on_your_phone_monthly,this.main_phone_use,this.Voice_calling_and_receiving,this.SMS,this.Internet,this.Social_media,this.subscribed_to_info_svces_on_ph,this.services_suscribed_to,this.training_on_using_phone_servic,this.training_on_weather_alerts,this.Who_provided_the_training_on_weather_alerts,this.trainig_on_insurance,this.Who_provided_the_training_on_insurance,this.probs_of_using_cellphone,this.hhplanting_decision,this.hhproductionphase_decision,this.hhpostharvet_decision,this.hhmarketing_decision,this.hhincome_decision,this.meals_a_day,this.Vegetables,this.Carbohydrates,this.fruits,this.proteins,this.farmers_cooperation_responding,this.how_well_agent_knows_beneficiary,this.accuracy_of_info_collected,this.data_quality
);
            }
          },
          {
            text: 'Try Again',
            handler: () => {
              this.SubmitData();
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

    async Alertforback(a) {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: a,
        backdropDismiss: false,
        buttons: [
          {
            text: 'It is OK',
            handler: () => {
              this.router.navigate(['/newsurvey']);
            }
          },
          {
            text: 'No keep My Data',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
          
        ]
      });

      await alert.present();
    }
  
  }
