import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable({
  providedIn: 'root'
})

export class DatasetService {
    //api json
    //server: string ="http://3.12.97.246/ican/azcollect/api/";
    //server: string ="http://localhost/uiaapp/api/";
    //server: string ="http://localhost/Agribulker/api/";
    //server: string="http://3.12.97.246/standard_bank/public/test/";
    server: string="http://3.12.97.246/standard_bank/public/api/";
    //server: string ="http://3.12.97.246/uia/uia_api/";

    constructor(
        private http: HttpClient
      ) { }

      postData(body, file){
          let headers = new HttpHeaders({
              'content-type': 'application/json; charset=UTF-8'
          });
          let options = {
              headers: headers
          }
          return this.http.post(this.server + file, JSON.stringify(body),options)
          .timeout(59000)//59 sec timout
          .map(res => res);
      }
}