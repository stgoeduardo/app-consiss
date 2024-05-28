import { Component } from "@angular/core";
import loginData from '../../utils/data/config-form-login.json';
import { AuthService } from "src/app/shared/services/auth.service";
import { Storage } from "@ionic/storage-angular";
import { Router } from "@angular/router";
import { CheckStorageService } from "src/app/shared/services/check-storage.service";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ToastController } from "@ionic/angular";
import { UtilsService } from "src/app/shared/services/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginConfigForm = loginData.data;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    private checkStorageService: CheckStorageService,
    private loadingService: LoadingService,
    private toastController: ToastController,
    private utilsService: UtilsService
  ) {}

  login(data: any): void {
    this.loadingService.handleLoading(true);
    this.authService.login(data).subscribe({
      next: async res => {
        if (res) {
          await this.storage.set('user', {
            email: res.email,
            username: res.username,
            token: res.token
          });
          this.checkStorageService.handleStatus(true);
          this.loadingService.handleLoading(false);
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        this.utilsService.showToast(err.message, 3000, 'bottom');
        this.loadingService.handleLoading(false);
      }
    })
  }

  /*async showToast(message: string, duration: number, position: 'top' | 'middle' | 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });
    await toast.present();
  }*/
}