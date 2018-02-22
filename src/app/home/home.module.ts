import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { SliderModule } from 'angular-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [CommonModule, BrowserAnimationsModule, SliderModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: []
})
export class HomeModule { }