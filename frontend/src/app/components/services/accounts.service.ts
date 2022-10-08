import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';     
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) export class AccountsService {
    constructor(private http: HttpClient) {}

    headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    options = {
        headers: this.headers
    };

    sendLogin(account: any): Observable<any> {
        const body = {
            'email': account.email,
            'password': account.password
        }
        return this.http.post<any>('http://localhost:5500/user/login', body, this.options);
    }

    sendRegister(account: any): Observable<any> {
        const body = {
            'email': account.email,
            'password': account.password,
            'firstName': account.firstName,
            'lastName': account.lastName,
            'birthDate': account.birthDate
        }
        return this.http.post<any>('http://localhost:5500/user/register', body, this.options);
    }

    sendLogout(token: string): Observable<any> {
        const body = {
            'token': token
        }
        return this.http.post<any>('http://localhost:5500/user/logout', body, this.options);
    }

    checkDefaultToken(token: string): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        const body = {
            'token': token
        }
        return this.http.post<any>('http://localhost:5500/user/check', body, { headers });
    }
}
