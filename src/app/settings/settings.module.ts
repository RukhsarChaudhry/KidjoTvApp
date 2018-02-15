import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [CommonModule],
    declarations: [SettingsComponent],
    exports: [SettingsComponent],
    providers: []
})
export class SettingsModule { }