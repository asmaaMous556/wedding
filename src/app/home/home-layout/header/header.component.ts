import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToggleService } from './../../../shared/services/toggle/toggle.service';
import { UserService } from './../../../shared/services/user/user.service';
import { AuthService } from './../../../shared/services/guards/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
email:string='';
isUser:boolean=false;
show:boolean=false;
userSub:Subscription;
  
  constructor(private auth :AuthService,
    private userService:UserService,
    private router:Router,
    private toggle:ToggleService) { }
 

  ngOnInit(): void {
  this.userSub= this.auth.user$.subscribe(user=>{
      if(user && user!=null){
       this.email=user.email;
       this.isUser=true;
      }
      else{
        this.isUser=false;
      }
    });
    this.toggle.visible.subscribe(show=>{
      this.show=show;
    })
  }

  logout(){
   this.auth.logout();
   this.router.navigate(['/login']);
  }

  toggleMenu(){
    this.toggle.nextVisible(this.show);
  }
  ngOnDestroy(): void {
   if(this.userSub){
     this.userSub.unsubscribe();
   }
  }

}
