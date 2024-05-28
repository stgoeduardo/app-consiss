import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private urlServer: string = environment.urlServer;
  
  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  login(body: any): Observable<any> {
    return this.http.post(`${this.urlServer}/auth/login`, body);
  }

  register(body: any): Observable<any> {
    return this.http.post(`${this.urlServer}/auth/register`, body);
  }

  logout() {
    return this.storage.remove('user');
  }

}