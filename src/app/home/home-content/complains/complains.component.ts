import { complain } from './../../../shared/models/compalins';
import { CompalinService } from './../../../shared/services/complain/complain.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.css']
})
export class ComplainsComponent implements OnInit {

  complains: complain[];
  constructor(private complainService: CompalinService) { }

  ngOnInit(): void {
    this.complainService.getAllComplains().subscribe(complains => {
      this.complains = complains.map(complain => {
        return{
          key: complain.key,
          name: complain.payload.val()['name'],
          email: complain.payload.val()['email'],
          message: complain.payload.val()['message']
        };
      });

    });
  }

}
