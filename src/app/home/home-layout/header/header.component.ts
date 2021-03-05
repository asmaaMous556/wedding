import { UserService } from './../../../shared/services/user/user.service';
import { AuthService } from './../../../shared/services/guards/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
email:string='';
isUser:boolean=false;
  
  constructor(private auth :AuthService,private userService:UserService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>{
      if(user){
       this.email=user.email;
       this.isUser=true
      }
    })
  }

  logout(){
    this.auth.logout();
  }

}
