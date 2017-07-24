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
  public testLoadChildrenString: string;

  constructor(
    private readonly titleService:Title,
    private readonly ngxLazyService: NgxLazyService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-lazy-view');

    setTimeout(() => {
      // const flattenedRoutes = [ ...this.loadableRoutes ];
      // console.log(flattenedRoutes);
      this.testLoadChildrenString = this.ngxLazyService.getLoadChildrenString('ngx-lazy-view-lazy1');
      // this.testLoadChildrenString = ngxLazyLoadableComponents[0].loadChildren;
    }, 6000);
  }

}
