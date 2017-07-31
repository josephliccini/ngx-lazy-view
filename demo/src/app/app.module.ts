import { provideRoutes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppSharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { NgxLazyViewModule, NGX_LAZY_VIEW_PATH_PREFIX } from 'ngx-lazy-view';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppSharedModule,
        NgxLazyViewModule.forRoot()
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }, // if using RouterModule.forRoot(...), you do NOT need to do this.
        // Define your ngx-lazy-view-modules.
        // format: path: `${NGX_LAZY_VIEW_PATH_PREFIX}LOOKUPKEY`
        // the LookupKeys can be anything you like.
        provideRoutes([
            { 
                path: `${NGX_LAZY_VIEW_PATH_PREFIX}LazyModule1`, 
                loadChildren: './lazy-component-1/lazy-component-1.module#LazyComponent1Module' 
            },
            { 
                path: `${NGX_LAZY_VIEW_PATH_PREFIX}LazyModule2`, 
                loadChildren: './lazy-component-2/lazy-component-2.module#LazyComponent2Module' 
            }
        ])
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
