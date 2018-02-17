import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  credentials: any;
  userName: string;
  password: string;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  login(userCredential) {
    this.userName = userCredential.username;
    this.password = userCredential.password;
    console.log(this.userName + ' ' + this.password);
  }
}
