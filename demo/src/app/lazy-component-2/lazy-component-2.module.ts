import { NgModule } from '@angular/core';

import { LazyComponent2 } from './lazy-component-2.component';

import { NGX_LAZY_LOAD_ENTRY_POINT } from 'ngx-lazy-view';

@NgModule({
    declarations: [
        LazyComponent2
    ],
    entryComponents: [
        LazyComponent2
    ],
    providers: [
        { provide: NGX_LAZY_LOAD_ENTRY_POINT, useValue: LazyComponent2 }
    ]
})
export class LazyComponent2Module {
}