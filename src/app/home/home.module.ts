import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [CommonModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: []
})
export class HomeModule { }