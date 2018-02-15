import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { WebStorageModule, LocalStorageService } from "angular-localstorage";
import { DatePipe } from '@angular/common';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';



import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { VideoSelectionComponent } from './video-selection/video-selection.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AgeGateComponent } from './age-gate/age-gate.component';
import { OvertimeErrorComponent } from './overtime-error/overtime-error.component';
import { BookSectionComponent } from './book-section/book-section.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    VideoSelectionComponent,
    FavoritesComponent,
    AgeGateComponent,
    OvertimeErrorComponent,
    BookSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes),
    AsyncLocalStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
