import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CheckStorageService {
  private checkStorageSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  checkStorage$ = this.checkStorageSubject.asObservable();

  handleStatus(status: boolean): void {
      this.checkStorageSubject.next(status);
  }
}
