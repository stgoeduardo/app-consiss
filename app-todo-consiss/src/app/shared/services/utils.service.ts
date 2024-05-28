import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  constructor(private toastController: ToastController) {}

  async showToast(message: string, duration: number, position: 'top' | 'middle' | 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });
    await toast.present();
  }

}