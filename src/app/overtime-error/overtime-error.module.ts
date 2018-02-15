import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OvertimeErrorComponent } from './overtime-error.component';

@NgModule({
    imports: [CommonModule],
    declarations: [OvertimeErrorComponent],
    exports: [OvertimeErrorComponent],
    providers: []
})
export class OverTimeModule { }