import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Text} from "../model/text"

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  url = 'https://api.sentino.org/api/score/text';

  constructor(private  http: HttpClient) {
  }

  postData(postText: Text, token: string): Observable<any> {
    console.log(token);
    return this.http.post<Text>(
      this.url,
      postText,
      {headers:  new HttpHeaders().set('Authorization', token)}
    )
  }
}
