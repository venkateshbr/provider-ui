import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  models: string[] = [
    '1C','2C','3C'
  ]
  providerForm: FormGroup;
  validMessage: string = "";

  constructor(private providerService: ProviderService) { }
r
  ngOnInit() {
    this.providerForm = new FormGroup({
      name: new FormControl('',Validators.required),
      type: new FormControl('',Validators.required),
      address: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      country: new FormControl('',Validators.required),
      requiredDate: new FormControl()
    })
  }

  submitRegistration(){
    if(this.providerForm.valid){
      this.validMessage = "Provider Registration has been completed successfully. Thank you";
      this.providerService.createProviderRegistration(this.providerForm.value).subscribe(
        data => {
          this.providerForm.reset();
          return true;
        },
        error => {
          return Observable.throw(error);
        }
      )
    }else{
      this.validMessage = "Please fill the form before submitting";
    }
  }
}
