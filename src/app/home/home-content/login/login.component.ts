import {faEyeSlash,faEye} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/guards/auth.service';
import { UserService } from './../../../shared/services/user/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
eyeIcon=faEye;
eyeSlash=faEyeSlash;


fieldTextType:boolean=false;
  errorMess = '';
  loginForm: FormGroup;
  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router,
               private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
         Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]
    });

  }
get email(){
  return this.loginForm.get('email');
}
get password(){
  return this.loginForm.get('password');
}

login(value){
this.auth.login(value.email, value.password).then(result => {
  this.userService.save(result.user);
  this.router.navigate(['/']);
}).catch(error => this.errorMess = error);
}

toggledFieldTextType(){
  this.fieldTextType=!this.fieldTextType
}


}
