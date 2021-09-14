import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  //proj_id: string = "";
  password: string = "";
  token: string="";
  disabledButton

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AccessProviders,
    private storage : Storage,
    private navCtrl : NavController

  ) { }

  ngOnInit() {
  }
    ionViewDidEnter(){
      this.disabledButton = false;
  }

  async tryLogin (){
    if(this.email==""){
        this.presentToast('Your email is required');
    }else if(this.password==""){
      this.presentToast('Your password is required');
    }
    else if(this.token==""){
      this.presentToast('The token is required');
    }
    else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'please wait ...',
      });
      loader.present();

      return new Promise(resolve => {
          let body = {
            aski:'process_login',
            email:this.email,
            password:this.password,
            token:this.token
            }
                  this.accsPrvds.postData(body, 'process.php').subscribe((res:any)=> {
                        if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast('Login successful');
                            this.storage.set('storage_xxx', res.result); //create storage session
                            this.navCtrl.navigateRoot(['/home']);
                        }else{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast('Email or Password or token is wrong');
                        }
                  },(err)=>{
                    loader.dismiss();
                    this.disabledButton = false;
                    this.presentToast('Error, Please try again,if error persists contact support');
                  });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:1500,
    });
    toast.present();
  }

openRegister(){
  this.router.navigate(['/register']);
}

//Getting access to the system with a code.
}
