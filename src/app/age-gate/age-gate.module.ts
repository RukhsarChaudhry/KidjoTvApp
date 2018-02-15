import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AgeGateComponent } from './age-gate.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AgeGateComponent],
    exports: [AgeGateComponent],
    providers: []
})
export class AgeGateModule { }