import { Component } from '@angular/core';

@Component({
    selector: 'lazy-component-1',
    templateUrl: './lazy-component-1.component.html'
})
export class LazyComponent1 {
    public name = 'Lazy 1';
}