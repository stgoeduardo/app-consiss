import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TaskService } from '../shared/services/task.service';
import { LoadingService } from '../shared/services/loading.service';
import { Storage } from '@ionic/storage-angular';
import { UtilsService } from '../shared/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isDetailModalOpen: boolean = false;
  isTaskModalOpen: boolean = false;
  tasks: any[] = [];
  detailTask: any = {};
  username: string = '';

  constructor(
    private loadingService: LoadingService,
    private alertController: AlertController,
    private taskService: TaskService,
    private storage: Storage,
    private utilsService: UtilsService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = await this.storage.get('user');
    this.username = user?.username;
    this.getTasksByUser();
  }

  private getTasksByUser(): void {
    this.loadingService.handleLoading(true);
    this.taskService.getTasks().subscribe({
      next: res => {
        this.loadingService.handleLoading(false);
        this.tasks = res;
      },
      error: err => {
        console.log('ERR ', err);
        this.loadingService.handleLoading(false);
      }
    })
  }

  setOpen(evt: any, type: string, data: any = {}): void {
    switch(type) {
      case 'detail-task':
        this.isDetailModalOpen = evt?.status;
        this.detailTask = data;
        if (evt?.data) {
          this.getTasksByUser();
        }
        break;
      case 'new-task':
        this.isTaskModalOpen = evt?.status;
        if (evt?.data) {
          this.getTasksByUser();
        }
        break;
    }
  }

  async preDelete(task: any): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar ' + task.title,
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
            this.deleteTask(task?._id);
          }
        }
      ]
    });
    await alert.present();
  }

  private deleteTask(id: string): void {
    this.loadingService.handleLoading(true);
    this.taskService.deleteTask(id).subscribe({
      next: res => {
        this.loadingService.handleLoading(false);
        this.utilsService.showToast('Se eliminó correctamente la tarea', 3000, 'bottom');
        this.getTasksByUser();
      },
      error: err => {
        this.utilsService.showToast(err.message, 3000, 'bottom');
      }
    })
  }

}
