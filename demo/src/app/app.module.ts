import { provideRoutes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing';
import { AppSharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';

import { NgxLazyViewModule } from 'ngx-lazy-view';

@NgModule({
    declarations: [
        AppComponent,
        GettingStartedComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AppSharedModule,
        NgxLazyViewModule.forRoot()
    ],
    providers: [
        provideRoutes([
            { 
                path: 'lazy-component-1', 
                loadChildren: './lazy-component-1/lazy-component-1.module#LazyComponent1Module' 
            }
        ])
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
