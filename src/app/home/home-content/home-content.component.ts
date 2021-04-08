import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
isHidden :boolean=false;
text:string='';
  constructor(private toggle:ToggleService) { }

  ngOnInit(): void {
  }
  activate(){
    this.isHidden=!this.isHidden;
    if(this.isHidden==true){
      this.text='تعطيل'
    }
    else{
      this.text='تفعيل'
    }
    console.log(this.isHidden);
    this.toggle.setShow(this.isHidden);

  }

}
