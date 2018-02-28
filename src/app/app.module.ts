import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxCarouselModule } from 'ngx-carousel';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgStreamingModule } from 'videogular2/streaming';




import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { VideoSelectionComponent } from './video-selection/video-selection.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { OvertimeErrorComponent } from './overtime-error/overtime-error.component';
import { FolderComponent } from './folder/folder.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    VideoSelectionComponent,
    FavoritesComponent,
    AgeGateComponent,
    OvertimeErrorComponent,
    FolderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot(),
    NgxCarouselModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
