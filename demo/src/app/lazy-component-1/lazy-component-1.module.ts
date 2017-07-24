import { NgModule } from '@angular/core';

import { LazyComponent1 } from './lazy-component-1.component';

import { NGX_LAZY_LOAD_ENTRY_POINT } from 'ngx-lazy-view';

@NgModule({
    declarations: [
        LazyComponent1
    ],
    entryComponents: [
        LazyComponent1
    ],
    providers: [
        { provide: NGX_LAZY_LOAD_ENTRY_POINT, useValue: LazyComponent1 }
    ]
})
export class LazyComponent1Module {
}