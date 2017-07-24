import { Component, Input, NgModuleFactoryLoader, Injector, ViewContainerRef, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/fromPromise';

import { NGX_LAZY_LOAD_ENTRY_POINT } from '../lazy-entry-point.injection-token';

@Component({
  selector: 'ngx-lazy-view',
  templateUrl: './ngx-lazy-view.component.html'
})
export class NgxLazyViewComponent implements OnDestroy {

  private moduleLoadSubscription: Subscription;

  constructor(
    private readonly moduleLoader: NgModuleFactoryLoader,
    private readonly injector: Injector,
    private readonly viewRef: ViewContainerRef
  ) {
  }

  @Input() set loadChildrenString(value: string) {
    if (!value) {
      return;
    }

    // Clear old Module Load Subscription
    if (this.moduleLoadSubscription) {
      this.moduleLoadSubscription.unsubscribe();
    }

    const moduleLoaderObservable$ = Observable.fromPromise(this.moduleLoader.load(value));

    this.moduleLoadSubscription = moduleLoaderObservable$.subscribe((ngModuleFactory) => {
      const ngModule = ngModuleFactory.create(this.injector);
      const entryComponentType = this.injector.get(NGX_LAZY_LOAD_ENTRY_POINT);
      const componentFactory = ngModule.componentFactoryResolver.resolveComponentFactory(entryComponentType);
      // this.viewRef.clear();
      this.viewRef.createComponent(componentFactory);
      // this.moduleLoadSubscription.unsubscribe();
    });
  }

  public ngOnDestroy() {
    if (this.moduleLoadSubscription) {
      this.moduleLoadSubscription.unsubscribe();
    }
  }
}
