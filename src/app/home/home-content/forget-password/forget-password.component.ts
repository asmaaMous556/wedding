import { AuthService } from './../../../shared/services/guards/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
forgetPassForm:FormGroup;
error:string;
  constructor(private fb : FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.forgetPassForm= this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    });
  }

  send(form){
    console.log(form.email);
     this.auth.resetPassword(form.email).catch(error=>{
     this.error=error
     });
  }

}
