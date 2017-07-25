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

import { NGX_LAZY_LOAD_ENTRY_POINT } from '../lazy-entry-point.injection-token';

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
    private readonly viewRef: ViewContainerRef
  ) {
  }

  @Input() set loadChildrenString(value: string) {
    if (!value) {
      return;
    }

    this.hasLoaded = false;

    if (this.moduleLoadSubscription) {
      this.moduleLoadSubscription.unsubscribe();
    }

    const moduleLoaderObservable$ = Observable.fromPromise(this.moduleLoader.load(value));

    this.moduleLoadSubscription = moduleLoaderObservable$.subscribe((ngModuleFactory: NgModuleFactory<any>) => {
      const ngModule = ngModuleFactory.create(this.injector);
      const entryComponentType = ngModule.injector.get(NGX_LAZY_LOAD_ENTRY_POINT);
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
