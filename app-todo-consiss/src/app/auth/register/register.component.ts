import { Component } from "@angular/core";
import registerData from '../../utils/data/config-form-register.json';
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage-angular";
import { CheckStorageService } from "src/app/shared/services/check-storage.service";
import { LoadingService } from "src/app/shared/services/loading.service";
import { UtilsService } from "src/app/shared/services/utils.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerConfigForm = registerData.data;

  constructor(
    private authService: AuthService,
    private storage: Storage,
    private router: Router,
    private checkStorageService: CheckStorageService,
    private loadingService: LoadingService,
    private utilsService: UtilsService
  ) {}

  register(data: any): void {
    this.loadingService.handleLoading(true);
    this.authService.register(data).subscribe({
      next: async res => {
        if (res) {
          await this.storage.set('user', {
            email: res.email,
            username: res.username,
            token: res.token
          });
          this.utilsService.showToast('Se creó correctamente el usuario...redirigiendo...', 3000, 'bottom');
          this.checkStorageService.handleStatus(true);
          this.loadingService.handleLoading(false);
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        this.loadingService.handleLoading(false);
        this.utilsService.showToast(err.message, 3000, 'bottom');
      }
    })
  }
}