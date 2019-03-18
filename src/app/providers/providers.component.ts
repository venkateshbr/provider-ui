import { Component, OnInit } from '@angular/core';
import { Provider } from './providers';
import { ProviderService } from '../services/provider.service';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];

  errorMessage = '';

  providerSearchForm: FormGroup;

  constructor(private providerService:ProviderService) { }

  ngOnInit() {
    this.providerSearchForm = new FormGroup({
      number: new FormControl(''),
      name: new FormControl(''),
      city: new FormControl(''),
      pin: new FormControl('')
    })
    this.getProviders();
  }

  findProvider(){
    this.errorMessage = '';
    console.log("Form Values" +  JSON.stringify(this.providerSearchForm.value));
    if(this.providerSearchForm.valid){
      this.providerService.findNPIProviders(this.providerSearchForm.value).subscribe(
        providers => {
          this.providers = providers;
        },
        error => {
          this.errorMessage = <any>error
        }
      )
    }else{
      console.log("Please fill the form before submitting");
    }
    console.log("Data = " + JSON.stringify(this.providers));
  }

  getProviders(){
    this.providerService.getNPIProviders().subscribe(
      providers => {
        this.providers = providers;
      },
      error => this.errorMessage = <any>error
    );
    console.log("Data = " + JSON.stringify(this.providers));
  }

}
