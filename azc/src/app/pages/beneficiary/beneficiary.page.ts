import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.page.html',
  styleUrls: ['./beneficiary.page.scss'],
})
export class BeneficiaryPage implements OnInit {

  currentImage: any;

  constructor(
    private camera: Camera
  ) { }

  ngOnInit() {
  }
  
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }
}
