import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoritesComponent } from './favorites.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FavoritesComponent],
    exports: [FavoritesComponent],
    providers: []
})
export class FavoritesModule { }