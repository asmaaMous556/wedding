import { ToggleService } from './../../../shared/services/toggle/toggle.service';
import { AboutUsService } from './../../../shared/services/aboutUs/about-us.service';
import { aboutUs } from './../../../shared/models/aboutUs';
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
show:boolean=false;
  
  constructor(private auth :AuthService,private userService:UserService,private toggle:ToggleService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user=>{
      if(user){
       this.email=user.email;
       this.isUser=true
      }
    });
    this.toggle.visible.subscribe(show=>{
      this.show=show;
      console.log(this.show)
    })
  }

  logout(){
    this.auth.logout();
  }

  toggleMenu(){
    
    this.toggle.nextVisible(this.show);
    
  }

}
