import { CommonModule } from '@angular/common';
import { NgModule, InjectionToken } from '@angular/core';

import { NgxLazyViewComponent } from './component/ngx-lazy-view.component';

// Export module's public API
export { NgxLazyViewComponent } from './component/ngx-lazy-view.component';

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
}
