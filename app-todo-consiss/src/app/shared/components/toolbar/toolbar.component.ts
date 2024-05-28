import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CheckStorageService } from '../../services/check-storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: `
    ion-toolbar {
      --background: radial-gradient(circle at 10% 20%, rgb(0, 95, 104) 0%, rgb(15, 156, 168) 90%);
      --color: #fff;
    }
  `,
})
export class ToolbarComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private checkStorageService: CheckStorageService
  ) {}

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      setTimeout(() => {
        this.checkStorageService.handleStatus(false);
        this.router.navigate(['/auth/login']);
      }, 2000);
    } catch (error) {
      console.log('Error ', error);
    }
  }

}
