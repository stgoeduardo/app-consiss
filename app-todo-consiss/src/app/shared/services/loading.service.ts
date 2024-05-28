import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loading$ = this.loadingSubject.asObservable();

  handleLoading(status: boolean): void {
    this.loadingSubject.next(status);
  }
}
