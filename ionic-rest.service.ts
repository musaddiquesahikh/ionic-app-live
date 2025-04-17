import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Party {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
}


@Injectable({
  providedIn: 'root'
})
export class IonicRestService {
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public http:HttpClient) { }

  getStudentList(): Observable<Party[]> {
    return this.http.get<Party[]>('https://jsonplaceholder.typicode.com/Users')
      .pipe(
        tap(Party => console.log('Party fetched!')),
        catchError(this.handleError<Party[]>('Get Party', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
