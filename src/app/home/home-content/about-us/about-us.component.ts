import { aboutUs } from './../../../shared/models/aboutUs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUsService } from './../../../shared/services/aboutUs/about-us.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, OnDestroy {
aboutUsForm: FormGroup;
text: any;
aboutSubscribe:Subscription;
  constructor(private aboutUsService: AboutUsService, private fb: FormBuilder) { }
 
  ngOnInit(): void {

  this.aboutSubscribe= this.aboutUsService.getText().subscribe(text => {
      this.text = text;
      if (this.text){
        this.aboutUsForm.patchValue({
          aboutUsText : this.text.aboutUsText
        });
      }
    });

    this.aboutUsForm = this.fb.group({
   aboutUsText: ['', [Validators.required]]
 });
}

setText(text){
 this.aboutUsService.setText(text);
 confirm('تم حظ البيانات');
}


ngOnDestroy(): void {
 this.aboutSubscribe.unsubscribe();
}



}
