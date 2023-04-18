import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from "./shared/services/user-info.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  textOfUser: string | undefined;
  response: any;
  form!: FormGroup;
  subscription?: Subscription | null;
  text = new FormControl('', [Validators.minLength(5)]);
  token: string = '';
  big5 = [];
  neo = [];

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit() {
    this.form = new FormGroup({
      text: this.text
    });
  }

  setData() {
    this.subscription = this.userInfoService.postData({
      text: this.text.value as string,
      inventories: ['big5', 'neo']
    }, this.token)
      .subscribe((data) => {
          this.response = data;
          this.big5 = this.response.scoring.big5;
          this.neo = this.response.scoring.neo;
          this.textOfUser = this.response.text;
          console.log(this.big5, this.neo)
        },
        error => console.log(error)
      )
    console.log(this.token)
    this.form.reset();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

}
