import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoSelectionComponent } from './video-selection.component';

@NgModule({
    imports: [CommonModule],
    declarations: [VideoSelectionComponent],
    exports: [VideoSelectionComponent],
    providers: []
})
export class VideoSelectionModule { }