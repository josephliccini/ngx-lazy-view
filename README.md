# ngx-lazy-view - Angular Lazy Load without using routes

[![npm version](https://badge.fury.io/js/ngx-lazy-view.svg)](https://badge.fury.io/js/ngx-lazy-view)
[![Build Status](https://travis-ci.org/josephliccini/ngx-lazy-view.svg?branch=master)](https://travis-ci.org/josephliccini/ngx-lazy-view)
[![Coverage Status](https://coveralls.io/repos/github/josephliccini/ngx-lazy-view/badge.svg?branch=master)](https://coveralls.io/github/josephliccini/ngx-lazy-view?branch=master)
[![dependency Status](https://david-dm.org/josephliccini/ngx-lazy-view/status.svg)](https://david-dm.org/josephliccini/ngx-lazy-view)
[![devDependency Status](https://david-dm.org/josephliccini/ngx-lazy-view/dev-status.svg?branch=master)](https://david-dm.org/josephliccini/ngx-lazy-view#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/josephliccini/ngx-lazy-view.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://josephliccini.github.io/ngx-lazy-view

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

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
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-lazy-view';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-lazy-view';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-lazy-view';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 Joseph Liccini. Licensed under the MIT License (MIT)

