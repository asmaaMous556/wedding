import { aboutUs } from './../../../shared/models/aboutUs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUsService } from './../../../shared/services/aboutUs/about-us.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
aboutUsForm: FormGroup;
text: any;
  constructor(private aboutUsService: AboutUsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.aboutUsService.getText().subscribe(text => {
      this.text = text;
      console.log(this.text);
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
}


}
