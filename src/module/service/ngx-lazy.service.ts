import { Injectable, Inject } from '@angular/core';
import { ROUTES, Routes } from '@angular/router';
import { NGX_LAZY_VIEW_PATH_PREFIX } from '../ngx-lazy-view-path-prefix.constant';

@Injectable()
export class NgxLazyService {
    constructor(
        @Inject(ROUTES) private readonly loadableRoutes: Routes[]
    ) {
    }

    public getLoadChildrenString(path: string): string {
        for (let i = 0; i < this.loadableRoutes.length; ++i) {
            const routeList = this.loadableRoutes[i];
            for (let j = 0; j < routeList.length; ++j) {
                const route = routeList[j];
                if (route.path === path &&
                    typeof route.path === 'string' &&
                    typeof route.loadChildren === 'string' &&
                    route.path.indexOf(NGX_LAZY_VIEW_PATH_PREFIX) === 0) {
                    return route.loadChildren;
                }
            }
        }

        return null;
    }
}
