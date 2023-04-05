import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  response: any;
  form!: FormGroup;
  text = new FormControl('', [Validators.minLength(5)]);
  url = 'https://api.sentino.org/api/score/text';
  headers =  new HttpHeaders()
    .set('Authorization', 'Token sentino_api_token' )

  constructor(private http: HttpClient) {}

  ngOnInit() {
        this.form = new FormGroup({
          text: this.text
        });
  }

  setData() {
    console.log(this.form.value)

    return this.http.post(this.url, {text: this.form.value}, {headers: this.headers})
      .subscribe(response => {
        this.response = response;
        console.log(this.response);
      }
    )
  }
}
