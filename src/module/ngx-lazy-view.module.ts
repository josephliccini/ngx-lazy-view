import { CommonModule } from '@angular/common';
import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';

import { NgxLazyViewComponent } from './component/ngx-lazy-view.component';
import { NgxLazyService } from './service/ngx-lazy.service';

// Export module's public API
export { NgxLazyViewComponent } from './component/ngx-lazy-view.component';
export { NgxLazyService } from './service/ngx-lazy.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NgxLazyViewComponent
  ],
  declarations: [
    NgxLazyViewComponent
  ]
})
export class NgxLazyViewModule {
  static forRoot(): ModuleWithProviders {
    return {
    ngModule: NgxLazyViewModule,
      providers: [
        NgxLazyService
      ]
    }
  }
}
