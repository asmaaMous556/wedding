

import { Component, Input, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
show:boolean;
  constructor(private toggle:ToggleService) { }

  ngOnInit(): void {
   this.toggle.visible.subscribe(show=>this.show=show)
  }

}
