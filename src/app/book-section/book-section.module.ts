import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookSectionComponent } from './book-section.component';

@NgModule({
    imports: [CommonModule],
    declarations: [BookSectionComponent],
    exports: [BookSectionComponent],
    providers: []
})
export class BookSectionModule { }