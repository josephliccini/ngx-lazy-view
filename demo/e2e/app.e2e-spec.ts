import { NgxLazyViewDemoPage } from './app.po';

describe('ngx-lazy-view-demo App', () => {
  let page: NgxLazyViewDemoPage;

  beforeEach(() => {
    page = new NgxLazyViewDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
