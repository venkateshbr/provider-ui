import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Provider } from '../providers/providers';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  
  providers: Provider[] = [];

  constructor(private http:HttpClient) { }

  getProviders(){
    let token = localStorage.getItem('access_token');    
    return this.http.get('/server/api/v1/providers',
    {headers: new HttpHeaders().set('Authorization','Bearer '+token)}
  );
  }

  getNPIProviders(): Observable<Provider[]>{   
    return this.http.get<Provider[]>('/server/api/npi').pipe(
      tap(data => console.log('Product: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );;
  }

  findNPIProviders(provider): Observable<Provider[]>{ 
    let body = JSON.stringify(provider) ;
    return this.http.post<Provider[]>('/server/api/npi',provider,httpOptions).pipe(
      tap(data => console.log('Product: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );;
  }

  getProvider(id: number){
    let token = localStorage.getItem('access_token'); 
    console.log("/server/api/v1/providers/"+id);
    return this.http.get('/server/api/v1/providers/' + id,
    {headers: new HttpHeaders().set('Authorization','Bearer '+token)}
  );
  }

  createProviderRegistration(provider){
    let body = JSON.stringify(provider);
    console.log(body)
    return this.http.post('server/api/v1/providers',body,httpOptions);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
