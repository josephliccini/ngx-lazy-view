# ngx-lazy-view - Angular Lazy Load without using routes

[![npm version](https://badge.fury.io/js/ngx-lazy-view.svg)](https://badge.fury.io/js/ngx-lazy-view)
[![Build Status](https://travis-ci.org/josephliccini/ngx-lazy-view.svg?branch=master)](https://travis-ci.org/josephliccini/ngx-lazy-view)
[![Coverage Status](https://coveralls.io/repos/github/josephliccini/ngx-lazy-view/badge.svg?branch=master)](https://coveralls.io/github/josephliccini/ngx-lazy-view?branch=master)
[![dependency Status](https://david-dm.org/josephliccini/ngx-lazy-view/status.svg)](https://david-dm.org/josephliccini/ngx-lazy-view)
[![devDependency Status](https://david-dm.org/josephliccini/ngx-lazy-view/dev-status.svg?branch=master)](https://david-dm.org/josephliccini/ngx-lazy-view#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/josephliccini/ngx-lazy-view.svg)](https://greenkeeper.io/)

# Use at your own risk! 
### This is not stable and the API may go through many changes

## Motivation
https://github.com/angular/angular/issues/18093

Basically, there are times we don't wont to include every NgModule in our bundle, but it isn't a routed view.

One example would be a 'Feedback' widget.

This is not something that is required and mission critical for a page, so it can load later.  However, in the current lazy loading mechanism, we would have to specify a route, and that doesn't really make too much sense.

Credits to [Toxicable](https://github.com/Toxicable) for figuring it out!

## Demo

(Demo not available yet)
View it in action at https://josephliccini.github.io/ngx-lazy-view

One can clone this repo, and run:
`yarn`
`yarn run start`
`cd dist`
`yarn link`
`cd ../demo`
`yarn`
`node_modules/.bin/ng serve --aot`

to run the demo locally

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 4 or higher, tested with 4.3.2)

## Installation
Install above dependencies via *npm*.  (not available on NPM yet)

Now install `ngx-lazy-view` via:
```shell
npm install --save ngx-lazy-view
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-lazy-view`:
```js
map: {
  'ngx-lazy-view': 'node_modules/ngx-lazy-view/bundles/ngx-lazy-view.umd.js',
}
```

> **Note** This hasn't been tested thoroughly in SystemJS.  It's mainly tested in the `@angular/cli` which is `webpack` based.

---

Once installed you need to import the main module:
```js
import { NgxLazyViewModule } from 'ngx-lazy-view';
```
Next, list the imported module in your application module:
```js
import { NgxLazyViewModule } from 'ngx-lazy-view';

@NgModule({
  declarations: [
    AppComponent, 
    ...
  ],
  imports: [
    NgxLazyViewModule.forRoot(), 
    ...
  ],  
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader } // This is *REQUIRED* if your app does not use the RouterModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
```

Other modules in your application can simply import ` NgxLazyViewModule `:

```js
import { NgxLazyViewModule } from 'ngx-lazy-view';

@NgModule({
  declarations: [
    OtherComponent, 
    ...
  ],
  imports: [
    NgxLazyViewModule, 
    ...
  ], 
})
export class OtherModule {
}
```
This enables the use of `<ngx-lazy-view>` directive in `OtherModule`'s component's.

## Usage

Once the module are all set up, the next step is to provide some configuration in the `AppModule` and `LazyModules` to let the CLI perform code splitting, and to let the library detect your lazy modules.

In the `AppModule`
```js
import { provideRoutes } from '@angular/router';
import { NgxLazyViewModule, NGX_LAZY_VIEW_PATH_PREFIX } from 'ngx-lazy-view';

@NgModule({
  declarations: [
    AppComponent, 
    ...
  ],
  imports: [
    NgxLazyViewModule.forRoot(), 
    ...
  ],  
  providers: [
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }, // This is *REQUIRED* if your app does not use the RouterModule.forRoot()
    provideRoutes([
      {
        path: `${NGX_LAZY_VIEW_PATH_PREFIX}LOOKUPKEY`,
        loadChildren: '/path/to/lazy.module#LazyModule'
      },
      {
        path: `${NGX_LAZY_VIEW_PATH_PREFIX}LOOKUPKEY2`,
        loadChildren: '/path/to/lazy.module#AnotherLazyModule'
      }
    ])
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
```

*the values for the `path` field are _very_ important.*

The `path` _must_ start with `${NGX_LAZY_VIEW_PATH_PREFIX}`, otherwise at runtime, it won't be able to find your lazy routes.

the value for `LOOKUPKEY` and `LOOKUPKEY2` can be anything you like, though I have a preference for:

```js
`LOOKUPKEY`: `LazyModule`,
`LOOKUPKEY2`: `AnotherLazyModule`
```

but you can use anything you like.

the next step is to go into `LazyModule`, and add an 'entry point'.

```js

import { NgxLazyViewModule, NGX_LAZY_VIEW_ENTRY_POINT } from 'ngx-lazy-view';

@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    NgxLazyViewModule
  ],  
  providers: [
    { provide: NGX_LAZY_VIEW_ENTRY_POINT, useValue: LazyComponent }
  ]
})
export class LazyModule {
}
```
*Note that it must be `useValue` and NOT `useClass`*

Marking the component as the entry point is telling `ngx-lazy-view` to load that component and render that once the module is resolved.

The final step is to use the `<ngx-lazy-view>` component somewhere in your app.

`app.component.html`
```html
<h1>Lazy Load!</h1>
<ngx-lazy-view lookupKey="LazyModule"></ngx-lazy-view>
```

what's convenient about this is one can do some lazy load based on `*ngIf`:

`app.component.html`
```html
<h1>Lazy Load!</h1>
<!-- Will only fetch LazyModule if the shouldShowFeature is true -->
<ngx-lazy-view *ngIf="shouldShowFeature" lookupKey="LazyModule"></ngx-lazy-view>
```

This is good if you are A/B testing an experience, but don't want to ship both experiences to all clients, or if you want to lazy load an experience that isn't within a `<router-outlet></router-outlet>`

One can also provide a placeholder experience while the module is loading.  The placeholder element should be a made a child of the `<ngx-lazy-view>`, and one just has to defer setting the value of `lookupKey`.  
`app.component.html`
```html
<h1>Lazy Load!</h1>
<ngx-lazy-view [lookupKey]="myLookupKey">
  <my-placeholder></my-placeholder>
</ngx-lazy-view>
```

once the `LazyModule` is loaded, `<my-placeholder>` will be destroyed

The component also provides a notification once the lazy component is rendered:

`app.component.html`
```html
<H1>Lazy Load!</h1>
<ngx-lazy-view lookupKey="LazyModule" (loaded)="handleLoadedEvent()"></ngx-lazy-view>
```

## Caveats
- Still have to include `@angular/router` in the app bundle.
- JiT is broken (for now)
- Use of this approach adds new router paths like: `'/ngx-lazy-view-LOOKUPKEY'` (not that I anticipate many people trying to route to this..)

## Advanced
TBD (document using service)

## TODO
- Create an NPM Package and publish
- TODO: Document `NgxLazyViewService`
- TODO: Update website with example (josephliccini.github.io does not exist)
- TODO: Fix JiT Compilation (right now it only works with `@angular/cli` and AoT compilation)
- TODO: figure out a way to sync inputs and outputs of the lazy components
- TODO: What if a lazy component could provide more routes?
- TODO: OnPush Change Detection? (not tested)

## License

Copyright (c) 2017 Joseph Liccini. Licensed under the MIT License (MIT)

