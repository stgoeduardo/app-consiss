import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HandleRequestsInterceptor } from './interceptors/handle-requests.interceptor';
// import { LoadingComponent } from './components/loading/loading.component';
// import { SharedModule } from '../shared/shared.module';
// import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  // declarations: [ LoadingComponent ],
  // exports: [ LoadingComponent ],
  // imports: [SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleRequestsInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
          'CoreModule has already been loaded, import this module in the AppModule only'
      );
    }
  }
}
