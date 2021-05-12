import { Platform } from '@ionic/angular';

  import { Component, OnInit,  NgZone } from '@angular/core';
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

@Component({
  selector: 'app-casaupdate',
  templateUrl: './casaupdate.page.html',
  styleUrls: ['./casaupdate.page.scss'],
})
export class CasaupdatePage implements OnInit {
  //farmers_name:string="";
  disabledButton;
  productList: any;

  farmers_name:string="";
  do_you_have_disability:string="";
  disability_type:string="";
  tel_no1:string="";
  mm_reg_status:string="";
  nin:string="";
  farmer_org:string="";
  name_of_farmer_org: string="";
  year_services:string="";
  Main_crop_enterprise:string="";
  Variety_of_mainenterprise:string="";
  Variety2_of_mainenterprise:string="";
  landsize_main_crop_enterprise:number=null;
  season_of_planting:string="";
  crops_grown_last_season:any[]=[]; //not part of update tool but its a determinant of other qns
  how_much_seed:any[]=[];
  crop_commercial:any[]=[];
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
  access_to_agric_ext_services: string="";
  extension_type_channel_receive: any[]=[];
  adopted_practices: any[]=[];
  most_mostadoptedpractice: string="";
  Rate_services_training: string="";
  frequently_access_ext_svcs: string="";
  How_accurate_is_the_info: string="";
  benefits_of_practices: string="";
  pay_anything_to_access_ext_svc: string="";

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
  id: number;
  What_is_your_gender: string="";
  fo: string="";
  datastorage: any;
  name: any;
  field_officer=this.fo;
  
  constructor(
    private router:Router,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController,
      private accsPrvds : DatasetService,
      private camera: Camera,

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
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.name;
      this.disabledButton = false;
  });
  }

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
    
    yearofservice=[
      "season A 2021",
      "season B 2020",
      "season A 2020  and ealier"
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
    last_season=[
      "maize","beans","sesame","soyabeans","rice","millet","sorghum","irish_potatoes","cotton","sweet_potatoes","sunflower","ground_nuts","coffee","banana","cassava","others"
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
  seasons=[
    "season_one",
    "season_two",
    "both"
  ];
  benefits=[
    "increased production","increased income","increased investiment", "property ownership","Increased market access","Imprved producequality","Enhanced leadership skills","increased jont decision making"
  ];
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
    async UpdateData(){
      if(this.id==null){
        this.presentToast('Farmer ID is required');
      }
      else if(this.farmers_name==""){
          this.presentToast('Farmer name is required');
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
      else if(this.involved_in_marketing ==""){
        this.presentToast('Please respond to question, Are you involved in bulking and collective marketing');
      }
      
      else if(this.Marketlink ==""){
        this.presentToast('Please respond to question, How does your produce reach'+ this.name_of_farmer_org);
      }
      
      else if(this.agent_name ==""){
        this.presentToast('Please respond to question, Provide the name of the agent that collects/buys produce from yo'+ this.name_of_farmer_org);
      }
      else if(this.crops_grown_last_season==[]){
        this.presentToast('Please respond to question, What crops did you grow last season');
      }
      
      else if(this.farmer_org==""){
        this.presentToast('Please respond to question, Are you a member of CASA partners?');
      }

  /**To continue further validation from here

  //ENDED HERE ON

      
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
  */
  else{ 
        this.disabledButton = true;
        const loader = await this.loadingCtrl.create({
          message: 'please wait ...',
        });
        loader.present();
  
        return new Promise(resolve => {
            let body = {
              aski:'update',
              id: this.id,
              farmers_name:this.farmers_name,
              What_is_your_gender:this.What_is_your_gender,
              do_you_have_disability:this.do_you_have_disability,
              disability_type:this.disability_type,              
              tel_no1:this.tel_no1,
              nin:this.nin,
              farmer_org:this.farmer_org,
              name_of_farmer_org:this.name_of_farmer_org, 
              year_services:this.year_services,
              Main_crop_enterprise:this.Main_crop_enterprise,
              Variety_of_mainenterprise:this.Variety_of_mainenterprise,
              Variety2_of_mainenterprise:this.Variety2_of_mainenterprise,
              landsize_main_crop_enterprise:this.landsize_main_crop_enterprise,
              season_of_planting:this.season_of_planting,
              crops_grown_last_season:this.crops_grown_last_season, //not part              
              how_much_seed:this.how_much_seed, 
              crop_commercial:this.crop_commercial,
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
            
            access_to_agric_ext_services:this.access_to_agric_ext_services,
            extension_type_channel_receive:this.extension_type_channel_receive,
            adopted_practices:this.adopted_practices,
            most_mostadoptedpractice:this.most_mostadoptedpractice,
            Rate_services_training:this.Rate_services_training,
            frequently_access_ext_svcs:this.frequently_access_ext_svcs,
            benefits_of_practices:this.benefits_of_practices,
            pay_anything_to_access_ext_svc:this.pay_anything_to_access_ext_svc,
            How_accurate_is_the_info:this.How_accurate_is_the_info,
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
            field_officer:this.datastorage.name
            }
              this.accsPrvds.postData(body, 'process.php').subscribe((res:any)=> {
          if(res.success==true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg);
              this.router.navigate(['/casaupdate']);
              this.id=null;
              this.farmers_name="";
              this.What_is_your_gender="";
              this.do_you_have_disability="";
              this.disability_type="";              
              this.tel_no1="";             
              this.mm_reg_status="";
              this.nin="";
              //Casa Data 
              this.farmer_org="";
              this.name_of_farmer_org="";
              this.year_services="";              
              //expenditure
              this.Main_crop_enterprise;              
              this.Main_crop_enterprise="";

              this.how_much_seed=[];

            this.crop_commercial=[];  
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
            this.access_to_agric_ext_services="";
            this.extension_type_channel_receive=[];
            this.adopted_practices=[];
            this.most_mostadoptedpractice="";
            this.Rate_services_training="";
            this.frequently_access_ext_svcs="";
            this.benefits_of_practices="";
            this.pay_anything_to_access_ext_svc="";
            this.How_accurate_is_the_info;
            this.Variety_of_mainenterprise=""; //it should be after main crop enterprisehhplanting_decision;
            this.Variety2_of_mainenterprise="";
            this.landsize_main_crop_enterprise=null;
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
  
  //Fetch all the data from the database
  getData(){
    this.http.get("http://localhost/azcollect/api/process2.php").subscribe( output => {
    this.productList = JSON.parse(output["_body"]); 
    }, err =>{
    console.log(err); 
    }); 
  }  

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Try Again',
          handler: () => {
            this.UpdateData();
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

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:5000,
    });
    toast.present();
  }
}
