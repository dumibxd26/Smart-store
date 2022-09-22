import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';     
import { Observable } from 'rxjs'; 
import { Login } from '../interfaces/Login';

@Injectable({ providedIn: 'root' }) export class AccountsService {
    constructor(private http: HttpClient) {}
    
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    getAccounts(body: any): Observable<any> {

        return this.http.post<any>('http://localhost:6000/user/login', body, { headers: this.headers });
    }

    
    }
