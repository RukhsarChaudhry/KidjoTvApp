import { Routes } from '@angular/router';

import { SettingsRoutes } from './settings/index';
import { VideoSelectionRoutes } from './video-selection/index';
import { FavoritesRoutes } from './favorites/index';
import { AgeGateRoutes } from './age-gate/index';
import { OverTimeRoutes } from './overtime-error/index';
import { BookSectionRoutes } from './book-section/index';
import { HomeRoutes} from './home/index';

export const routes: Routes = [
    ...SettingsRoutes,
    ...VideoSelectionRoutes,
    ...FavoritesRoutes,
    ...AgeGateRoutes,
    ...OverTimeRoutes,
    ...BookSectionRoutes,
    ...HomeRoutes,
    // {
    //     path: '',
    //     redirectTo: '/home',
    //     pathMatch: 'full'
    // },
    // {
    //     path: '**',
    //     redirectTo: '/home',
    //     pathMatch: 'full'
    // }
]