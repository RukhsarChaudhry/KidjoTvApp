import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideoService } from './../shared/services/videoService/index';
import { FavoriteService } from './../shared/services/favoritesService/index';
import { AddFav } from './../shared/entities/index';


@Component({
  selector: 'app-video-selection',
  templateUrl: './video-selection.component.html',
  styleUrls: ['./video-selection.component.css']
})
export class VideoSelectionComponent implements OnInit {
  kidID: string;
  obj = new Object();
  idss: any;
  video = new Object();
  cards: any[] = [];
  url: any[] = [];
  bucketName: any;
  innerheigth: any;
  formate: any[] = [];
  size: any;
  color: any;
  constructor(private route: ActivatedRoute,
    private videoService: VideoService,
    public favService: FavoriteService,
    private spinnerService: Ng4LoadingSpinnerService) {
    // this.toastr.setRootViewContainerRef(vcr);
    var ids = this.route.params.subscribe(params => {
      this.idss = +params['id'];
    });
    this.getSubCard();
  }

  ngOnInit() {

  }
  getSubCard() {
    this.spinnerService.show();
    this.videoService.GetSubCard(this.idss).subscribe(data => {
      this.spinnerService.hide();
      console.log(data);
      this.cards = data.subcards;

      // this.formate = this.cards.
      console.log(this.cards[0].formats);

      var subCard = [];
      var temp = [];
      var url = "https://www.youtube.com/embed/qY4S5lJx_ss?rel=0&amp;showinfo=0";
      for (var index = 0; index < this.cards.length; index++) {
        subCard = [{ 'id': this.cards[index].id, 'videourl': this.videoURL(this.cards[0].formats), 'Title': this.cards[index].title }];
        temp.push(subCard);
      }
      this.video = temp;
    },
      Error => {
        this.spinnerService.hide();
      });
  }
  videoURL(id: any[]) {
    // this.videoURL(this.cards[index].formats[index].id)
    console.log(id);
    var url = localStorage.getItem('videoUrl');
    // this.size = this.formate[index].id;
    this.innerheigth = window.innerHeight;
    if (this.innerheigth <= 720 && this.innerheigth >= 480) {
      // if (id == 1 || id == 2 || id == 3) {
      //   var ID = id;
      // }
      this.bucketName = '.mp4';
    } else if (this.innerheigth <= 480 && this.innerheigth >= 360) {
      // if (id == 4 || id == 5 || id == 6) {
      //   var ID = id;
      // }
      this.bucketName = '.mp4';
    } else if (this.innerheigth <= 360 && this.innerheigth >= 240) {
      // if (id == 7) {
      //   var ID = id;
      // }
      this.bucketName = '.mp4';
    } else if (this.innerheigth <= 240 && this.innerheigth >= 0) {
      // if (id == 8) {
      //   var ID = id;
      // }
      this.bucketName = '.mp4';
    }
    return url + '/' + 'ID' + '/' + this.idss + '/' + this.idss + this.bucketName;
  }
  addToFav(id: any) {
    let favourite = new AddFav();
    favourite.videoId = id;
    favourite.kidId = localStorage.getItem('kidId');
    this.spinnerService.show();
    this.favService.addFavrouit(favourite).subscribe(data => {
      // this.toastr.success('Added to favourite!', 'Success!');
      console.log("success");
      this.spinnerService.hide();
    },
      Error => {
        this.spinnerService.hide();
        // this.toastr.error('Somethis is went wrong', 'Oops!');
      });
  }
}
