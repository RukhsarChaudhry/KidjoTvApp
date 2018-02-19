import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FolderComponent } from './folder.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FolderComponent],
    exports: [FolderComponent],
    providers: []
})
export class FolderModule { }