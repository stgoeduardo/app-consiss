import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private urlServer: string = environment.urlServer;
  
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(`${this.urlServer}/tasks`);
  }

  createTask(body: any): Observable<any> {
    return this.http.post(`${this.urlServer}/tasks`, body);
  }

  updateTask(id: string, body: any): Observable<any> {
    return this.http.patch(`${this.urlServer}/tasks/${id}`, body);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.urlServer}/tasks/${id}`);
  }

}