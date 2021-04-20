import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor
  (
  private splashScreen: SplashScreen,
  private router: Router
  ) 
  { }
  
  ngOnInit() {

  }
  login(){
    this.router.navigate(['/login']);

  }

}
