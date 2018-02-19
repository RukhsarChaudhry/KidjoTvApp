import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FavoriteService } from './../shared/services/favoritesService/index';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(public favService: FavoriteService,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.getList();
  }

  ngOnInit() {
  }
  getList() {
    var kidId = localStorage.getItem('kidId');
    this.spinnerService.show();
    this.favService.GetFavorite(kidId).subscribe(data => {
      this.spinnerService.hide();
      console.log(data);
    },
      Error => {
        this.spinnerService.hide();
      });
  }
  deleteFav(id: any) {
    this.spinnerService.show();
    this.favService.RemoveFavorite(id).subscribe(data => {
      this.spinnerService.hide();
    },
      Error => {
        this.spinnerService.hide();
      });

  }

}
