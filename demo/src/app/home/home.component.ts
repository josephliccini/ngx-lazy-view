import { Inject, Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ROUTES, Route } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public testLoadChildrenString: any;

  constructor(
    private titleService:Title,
    @Inject(ROUTES) private loadableRoutes: Route[][]
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-lazy-view');

    setTimeout(() => {
      // const flattenedRoutes = [ ...this.loadableRoutes ];
      // console.log(flattenedRoutes);
      this.testLoadChildrenString = this.loadableRoutes[1][0].loadChildren;
      // this.testLoadChildrenString = ngxLazyLoadableComponents[0].loadChildren;
    }, 6000);
  }

}
