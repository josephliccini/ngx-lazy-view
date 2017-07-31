import {
  ContentChild,
  Component,
  Input,
  NgModuleFactoryLoader,
  NgModuleFactory,
  Injector,
  ViewContainerRef,
  OnDestroy,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NGX_LAZY_VIEW_ENTRY_POINT } from '../lazy-entry-point.injection-token';
import { NGX_LAZY_VIEW_PATH_PREFIX } from '../ngx-lazy-view-path-prefix.constant';
import { NgxLazyService } from '../service/ngx-lazy.service';

import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'ngx-lazy-view',
  templateUrl: './ngx-lazy-view.component.html'
})
export class NgxLazyViewComponent implements OnDestroy {

  @Output() public loaded = new EventEmitter<void>();

  public hasLoaded = false;

  private moduleLoadSubscription: Subscription;

  constructor(
    private readonly moduleLoader: NgModuleFactoryLoader,
    private readonly injector: Injector,
    private readonly viewRef: ViewContainerRef,
    private readonly ngxLazyService: NgxLazyService
  ) {
  }

  @Input() set lookupKey(value: string) {
    if (!value) {
      return;
    }

    this.hasLoaded = false;

    if (this.moduleLoadSubscription) {
      this.moduleLoadSubscription.unsubscribe();
    }

    const routeValue = `${NGX_LAZY_VIEW_PATH_PREFIX}${value}`;

    const lazyLoadPath = this.ngxLazyService.getLoadChildrenString(routeValue);

    if (!lazyLoadPath) {
      const warning = `Attempted to load path: ${routeValue} no matching route was found!\n` +
                  `Did you make sure to use:
                   provideRoutes([{
                      path: '${routeValue}',
                      loadChildren: '/path/to/lazy.module#YourLazyModule'
                  }]) and include it in the AppModule in the @NgModule() providers: []?`;
      console.warn(warning);
      return;
    }

    const moduleLoaderObservable$ = Observable.fromPromise(this.moduleLoader.load(lazyLoadPath));

    this.moduleLoadSubscription = moduleLoaderObservable$.subscribe((ngModuleFactory: NgModuleFactory<any>) => {
      const ngModule = ngModuleFactory.create(this.injector);
      const entryComponentType = ngModule.injector.get(NGX_LAZY_VIEW_ENTRY_POINT);
      const componentFactory = ngModule.componentFactoryResolver.resolveComponentFactory(entryComponentType as any);

      this.viewRef.clear();

      this.viewRef.createComponent(componentFactory);

      this.hasLoaded = true;

      this.loaded.emit();

      this.moduleLoadSubscription.unsubscribe();
    });
  }

  public ngOnDestroy() {
    if (this.moduleLoadSubscription) {
      this.moduleLoadSubscription.unsubscribe();
    }
  }
}
