import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Text} from "../model/text"

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  url = 'https://api.sentino.org/api/score/text';
  headers =  new HttpHeaders()
    .set('Authorization', 'Token da8c25e5008915ed1f14ce340bb2f7f4e5566295' );

  constructor(private  http: HttpClient) {
  }

  postData(postText: Text): Observable<any> {
    return this.http.post<Text>(this.url, postText, {headers: this.headers})
  }
}
