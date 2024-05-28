import { Component, EventEmitter, Input, Output } from "@angular/core";
import taskData from '../../../utils/data/config-form-new-task.json';
import { TaskService } from "../../services/task.service";
import { LoadingService } from "../../services/loading.service";
import { UtilsService } from "../../services/utils.service";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styles: `
    ion-toolbar {
      --background: radial-gradient(circle at 10% 20%, rgb(0, 95, 104) 0%, rgb(15, 156, 168) 90%);
      --color: #fff;
    } 
  `
})
export class TaskModalComponent {
  @Input() isModalOpen: boolean = false;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  taskConfigForm = taskData.data;

  constructor(
    private taskService: TaskService,
    private loadingService: LoadingService,
    private utilsService: UtilsService
  ) {}

  createTask(evt: any) {
    this.loadingService.handleLoading(true);
    const body = {
      ...evt,
      status: false
    };
    this.taskService.createTask(body).subscribe({
      next: res => {
        this.loadingService.handleLoading(false);
        this.utilsService.showToast('Se creó correctamente la tarea', 3000, 'bottom');
        this.closeModal(res);
      },
      error: err => {
        this.utilsService.showToast(err.message, 3000, 'bottom');
        this.loadingService.handleLoading(false);
      }
    });
  }

  closeModal(data: any = null): void {
    this.close.emit({
      status: false,
      data
    });
  }

}