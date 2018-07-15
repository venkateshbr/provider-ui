import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http:HttpClient) { }

  getProviders(){
    return this.http.get('/server/api/v1/providers');
  }

  getProvider(id: number){
    console.log("/server/api/v1/providers/"+id);
    return this.http.get('/server/api/v1/providers/' + id);
  }

  createProviderRegistration(provider){
    let body = JSON.stringify(provider);
    console.log(body)
    return this.http.post('server/api/v1/providers',body,httpOptions);
  }
}
