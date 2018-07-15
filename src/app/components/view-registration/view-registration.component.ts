import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {

  public providerReg;

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProvider(this.route.snapshot.params.id);
  }

  getProvider(id:number){
    this.providerService.getProvider(id).subscribe(
      data => {this.providerReg = data},
      error => console.error(error),
      () => console.log('Provider Loaded')
    )
  }

}
