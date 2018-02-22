import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideoService } from './../shared/services/videoService/index';
import { FavoriteService } from './../shared/services/favoritesService/index';
import { AddFav } from './../shared/entities/index';
import { NgxCarousel } from 'ngx-carousel';
// declare var shaka: any;
// import shaka from 'shaka-player/dist/shaka-player.compiled.js';
// import * as shaka from "shaka-player/dist/shaka-player.compiled.js";
import * as shaka from "shaka-player";


@Component({
  selector: 'app-video-selection',
  templateUrl: './video-selection.component.html',
  styleUrls: ['./video-selection.component.css'],
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
  public carouselOne: NgxCarousel;
  manifestUri: any = "https://d23sw6prl9jc74.cloudfront.net/1/7BVo6A4Xr1/7BVo6A4Xr1.m3u8";
  constructor(private route: ActivatedRoute,
    private videoService: VideoService,
    public favService: FavoriteService,
    private spinnerService: Ng4LoadingSpinnerService) {
    console.log(shaka);
    var ids = this.route.params.subscribe(params => {
      this.idss = +params['id'];
    });
    this.getSubCard();
  }

  ngOnInit() {
    this.carouselOne = {
      grid: { xs: 2, sm: 2, md: 2, lg: 3, all: 0 },
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      easing: 'ease'
    }
    this.initApp();
  }


  initApp() {
    console.log("test");
    shaka.polyfill.installAll();
    shaka.polyfill.installAll();
    console.log("test");
    if (shaka.Player.isBrowserSupported()) {
      console.log("good");
      this.initPlayer();
    } else {
      console.log('Browser not supported!');
    }
  }

  initPlayer() {
    console.log("good");
    const video = document.getElementById('video');
    var player = new shaka.Player(video);
    player.addEventListener('error', this.onErrorEvent);
    player.load(this.manifestUri).then(function () {
      console.log('The video has now been loaded!');
    }).catch(error => { this.onError(error) });
  }

  onErrorEvent(event) {
    this.onError(event.detail);
  }

  onError(error) {
    console.error('Error code', error.code, 'object', error);
  }












  getSubCard() {
    this.spinnerService.show();
    this.videoService.GetSubCard(this.idss).subscribe(data => {
      this.spinnerService.hide();
      console.log(data);
      this.cards = data.subcards;
      var subCard = [];
      var temp = [];
      var url = "https://www.youtube.com/embed/qY4S5lJx_ss?rel=0&amp;showinfo=0";
      for (var index = 0; index < this.cards.length; index++) {
        subCard = [{ 'id': this.cards[index].id, 'videourl': this.videoURL(this.cards[index].formats, this.cards[index].id), 'Title': this.cards[index].title }];

        temp.push(subCard);
      }
      this.video = temp;
      // console.log(this.video);
    },
      Error => {
        this.spinnerService.hide();
      });
  }
  videoURL(FormateId: any[], id: any) {
    var url = localStorage.getItem('videoUrl');
    // console.log(FormateId, id);
    // this.size = this.formate[index].id;
    var formate = [1, 2, 3, 4, 5, 6, 7, 8];
    this.innerheigth = window.innerHeight;
    if (this.innerheigth <= 720 && this.innerheigth >= 480) {
      if (FormateId[0].id == formate || FormateId[0].id == formate || FormateId[0].id == formate) {
        var ID = FormateId[0].id;
        console.log(ID);
      }
      this.bucketName = '.mp4';
      return url + '/' + ID + '/' + id + '/' + id + this.bucketName;
    } else if (this.innerheigth <= 480 && this.innerheigth >= 360) {
      if (FormateId[0].id == 4 || FormateId[0].id == 5 || FormateId[0].id == 6) {
        var ID = FormateId[0].id;
      }
      this.bucketName = '.mp4';
      return url + '/' + ID + '/' + id + '/' + id + this.bucketName;
    } else if (this.innerheigth <= 360 && this.innerheigth >= 240) {
      if (FormateId[0].id == 7) {
        var ID = FormateId[0].id;
      }
      this.bucketName = '.mp4';
      return url + '/' + ID + '/' + id + '/' + id + this.bucketName;
    } else if (this.innerheigth <= 240 && this.innerheigth >= 0) {
      if (FormateId[0].id == 8) {
        var ID = FormateId[0].id;
      }
      this.bucketName = '.mp4';
      return url + '/' + ID + '/' + id + '/' + id + this.bucketName;
    }
  }
  addToFav(id: any) {
    let favourite = new AddFav();
    favourite.videoId = id;
    favourite.kidId = localStorage.getItem('kidId');
    this.spinnerService.show();
    this.favService.addFavrouit(favourite).subscribe(data => {
      // this.toastr.success('Added to favourite!', 'Success!');
      console.log(data);
      console.log("success");
      this.spinnerService.hide();
    },
      Error => {
        this.spinnerService.hide();
        // this.toastr.error('Somethis is went wrong', 'Oops!');
      });
  }
}
