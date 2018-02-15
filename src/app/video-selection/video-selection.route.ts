import { Route } from '@angular/router';
import { VideoSelectionComponent } from './video-selection.component';

export const VideoSelectionRoutes: Route[] = [
    {
        path: 'folder',
        component: VideoSelectionComponent,
    },
];