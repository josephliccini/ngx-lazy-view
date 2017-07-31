import { Inject, Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ROUTES, Route, LoadChildren } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public lazyComponent1ModuleLookupKey: string;
  public renderLazyModule2 = false;

  constructor(
    private readonly titleService:Title
  ) { }

  public ngOnInit() {
    this.titleService.setTitle('Home | ngx-lazy-view');

    // Set 'lookupKey' later approach
    setTimeout(() => {
      this.lazyComponent1ModuleLookupKey = 'LazyModule1';
    }, 3000);
  }

  public beginLoadingLazy2() {
    // Use *ngIf approach
    setTimeout(() => {
      this.renderLazyModule2 = true;
    }, 2000);
  }

}
