import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public providers;

  constructor(private providerService:ProviderService) { }

  ngOnInit() {
    this.getProviders();
  }

  getProviders(){
    this.providerService.getProviders().subscribe(
      data => {this.providers = data},
      err => console.error(err),
      () => console.log('providers loaded')
    );
  }

}
