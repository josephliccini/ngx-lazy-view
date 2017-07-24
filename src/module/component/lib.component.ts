import { Component } from '@angular/core';

@Component({
  selector: 'ngx-lazy-component',
  templateUrl: './lib.component.html',
  styleUrls: ['./lib.component.scss']
})
export class LibComponent {
  description = 'Angular Lazy Load without using routes';
}
