import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = "";
  name: string = "";
  gender: string = "";
  dob: string = "";
  phone: string = "";
  //proj_id: string = "";
  password: string = "";
  rep_password: string = "";
  disabledButton

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds : AccessProviders

  ) { }

  ngOnInit() {
  }
    ionViewDidEnter(){
      this.disabledButton = false;
    }
  async tryRegister(){
    if(this.email==""){
        this.presentToast('Your email is required');
    }else if(this.name==""){
      this.presentToast('Your name is required');
    }else if(this.gender==""){
      this.presentToast('Your gender is required');
    }else if(this.dob==""){
      this.presentToast('Your date of birth is required');
    }else if(this.phone==""){
      this.presentToast('Your phone is required');
    /*}else if(this.proj_id==""){
      this.presentToast('Your project id is required');*/
    }else if(this.password==""){
      this.presentToast('Your password is required');
    }else if(this.rep_password!=this.password){
      this.presentToast('Passwords donot match');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'please wait ...',
      });
      loader.present();

      return new Promise(resolve => {
          let body = {
            aski:'process_register',
            name:this.name,
            email:this.email,
            gender:this.gender,
            dob:this.dob,
            phone:this.phone,
            //proj_id:this.proj_id,
            password:this.password
            }
                  this.accsPrvds.postData(body, 'process.php').subscribe((res:any)=> {
                        if(res.success==true){
                            loader.dismiss();
                            this.disabledButton = false;
                            this.presentToast(res.msg);
                            this.router.navigate(['/login']);
                        }else{
                          loader.dismiss();
                          this.disabledButton = false;
                          this.presentToast(res.msg);
                        }
                  },(err)=>{
                    loader.dismiss();
                    this.disabledButton = false;
                    this.presentAlert('Timeout');
                  });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration:1500,
      position:'top'
    });
    toast.present();
  }
  
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }
}
