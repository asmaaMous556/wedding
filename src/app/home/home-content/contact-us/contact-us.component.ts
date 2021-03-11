import { contactUs } from './../../../shared/models/contactUs';
import { ContactUsService } from './../../../shared/services/contactUs.ts/contact-us.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit,OnDestroy {
contactUsForm: FormGroup;
form: contactUs;
contactSubscription: Subscription;
  constructor(private fb: FormBuilder, private contactUsService: ContactUsService) { }
  
 

  ngOnInit(): void {
   this.contactSubscription= this.contactUsService.getContactUsForm().subscribe(form => {
      this.form = form;
      console.log(this.form);
      if (this.form){
        this.contactUsForm.patchValue({
          email: this.form.email,
          facebook: this.form.facebook,
          instagram: this.form.instagram,
          twitter: this.form.twitter,
          phoneNumber: this.form.phoneNumber,
          whatsapp: this.form.whatsapp,
          snapchat: this.form.snapchat,

        });
      }
    });

    this.contactUsForm = this.fb.group({
    email: ['', [Validators.required]],
    facebook: ['', Validators.required],
    instagram: ['', [Validators.required]],
    twitter: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    whatsapp: ['', [Validators.required]],
    snapchat: ['', Validators.required],
  });
  }


  updateLinks(linksForm){
  this.contactUsService.setContactUsForm(linksForm);
  confirm('تم حفظ البيانات');
  }

  ngOnDestroy(): void {
    this.contactSubscription.unsubscribe();
  }

}
