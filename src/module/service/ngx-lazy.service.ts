import { Injectable, Inject } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';

@Injectable()
export class NgxLazyService {
    constructor(
        @Inject(ROUTES) private readonly loadableRoutes: Routes[]
    ) {
    }

    public getLazyView(path: string): string {
        for (let i = 0; i < this.loadableRoutes.length; ++i) {
            const routeList = this.loadableRoutes[i];
            for (let j = 0; j < routeList.length; ++j) {
                const route = routeList[j];
                if (route.path === path &&
                    typeof route.loadChildren === 'string' &&
                    route.loadChildren.indexOf('ngx-lazy-view-') === 0) {
                    return route.loadChildren;
                }
            }
        }

        return null;
    }
}
