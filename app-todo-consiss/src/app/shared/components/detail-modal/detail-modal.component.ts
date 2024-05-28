import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { TaskService } from "../../services/task.service";
import { LoadingService } from "../../services/loading.service";
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: 'app-modal-detail',
  templateUrl: './detail-modal.component.html'
})
export class DetailModalComponent {
  @Input() detail: any = {};
  @Input() isModalOpen: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private alertController: AlertController,
    private taskService: TaskService,
    private loadingService: LoadingService,
    private utilsService: UtilsService
  ) {}

  closeModal(data: any = null): void {
    this.close.emit({
      status: false,
      data
    });
  }

  async preUpdate(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Finalizar ' + this.detail.title,
      message: '¿Está seguro de finalizar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Finalizar',
          role: 'confirm',
          handler: () => {
            this.updateTask(this.detail?._id);
          }
        }
      ]
    });
    await alert.present();
  }

  async preDelete(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar ' + this.detail.title,
      message: '¿Está seguro de eliminar esta tarea?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.deleteTask(this.detail?._id);
          }
        }
      ]
    });
    await alert.present();
  }

  private updateTask(id: string): void {
    this.loadingService.handleLoading(true);
    const body = {
      status: true
    };
    this.taskService.updateTask(id, body).subscribe({
      next: res => {
        this.loadingService.handleLoading(false);
        this.utilsService.showToast('Se finalizó correctamente la tarea', 3000, 'bottom');
        this.closeModal(res);
      },
      error: err => {
        this.utilsService.showToast(err.message, 3000, 'bottom');
        this.loadingService.handleLoading(false);
      }
    });
  }

  private deleteTask(id: string): void {
    this.loadingService.handleLoading(true);
    this.taskService.deleteTask(id).subscribe({
      next: res => {
        this.loadingService.handleLoading(false);
        this.utilsService.showToast('Se eliminó correctamente la tarea', 3000, 'bottom');
        this.closeModal(res);
      },
      error: err => {
        this.utilsService.showToast(err.message, 3000, 'bottom');
        this.loadingService.handleLoading(true);
      }
    });
  }

}