import { Inject, Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ROUTES, Route, LoadChildren } from '@angular/router';

import { NgxLazyService } from 'ngx-lazy-view';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loadLazyComponent1: string;
  public loadLazyComponent2: string;

  public lazy2Message: string = 'Waiting for Lazy 1 to finish rendering';

  constructor(
    private readonly titleService:Title,
    private readonly ngxLazyService: NgxLazyService
  ) { }

  public ngOnInit() {
    this.titleService.setTitle('Home | ngx-lazy-view');

    setTimeout(() => {
      this.loadLazyComponent1 = this.ngxLazyService.getLoadChildrenString('ngx-lazy-view-lazy-component-1');
    }, 3000);

  }

  public beginLoadingLazy2() {
    this.lazy2Message = 'Just 2 more seconds!';
    setTimeout(() => {
      this.loadLazyComponent2 = this.ngxLazyService.getLoadChildrenString('ngx-lazy-view-lazy-component-2');
    }, 2000);
  }

}
