import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DetailModalComponent } from './components/detail-modal/detail-modal.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    DetailModalComponent,
    DynamicFormComponent,
    LoadingComponent,
    TaskModalComponent,
    ToolbarComponent
  ],
  exports: [
    DetailModalComponent,
    DynamicFormComponent,
    LoadingComponent,
    TaskModalComponent,
    ToolbarComponent,
    CommonModule,
    IonicModule
  ],
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      IonicModule
  ]
})
export class SharedModule {}
