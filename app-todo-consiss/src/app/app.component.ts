import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CheckStorageService } from './shared/services/check-storage.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
  showToolbar: boolean = false;
  loading: boolean = false;

  constructor(
    private storage: Storage,
    private checkStorageService: CheckStorageService,
    private loadingService: LoadingService
  ) {
    this.init();
  }

  async init() {
    try {
      await this.storage.create();
    } catch (error) {
      console.log('error ', error);
    }
  }

  ngOnInit(): void {
    this.checkStorage();
    this.setLoading();
  }

  private checkStorage(): void {
    this.checkStorageService.checkStorage$.subscribe(async res => {
      const storage = await this.storage.get('user');
      this.showToolbar = !!storage;
    });
  }

  private setLoading(): void {
    this.loadingService.loading$.subscribe({
        next: (res: any) => {
          this.loading = res;
        },
        error: (err: any) => console.log('Error: ', err)
    });
}

}
