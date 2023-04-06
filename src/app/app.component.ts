import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInfoService} from "./shared/services/user-info.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  textOfUser: string | undefined;
  response: any;
  form!: FormGroup;
  text = new FormControl('', [Validators.minLength(5)]);

  constructor(private userInfoService: UserInfoService) {}

  ngOnInit() {
        this.form = new FormGroup({
          text: this.text
        });
  }

  setData() {
    this.userInfoService.postData({
      text: this.text.value as string,
      inventories: ['big5', 'neo']
    })
      .subscribe((data) => {
        this.response = data;
        this.textOfUser = this.response.text;
        },
        error => console.log(error)
    )
    this.form.reset();
  }
}
