import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideoService } from './../shared/services/videoService/index';
import { FavoriteService } from './../shared/services/favoritesService/index';
import { AddFav } from './../shared/entities/index';
import { NgxCarousel } from 'ngx-carousel';
import * as shaka from 'shaka-player';


@Component({
  selector: 'app-video-selection',
  templateUrl: './video-selection.component.html',
  styleUrls: ['./video-selection.component.css'],
})
export class VideoSelectionComponent implements OnInit {
  kidID: string;
  idss: any;
  video = new Object();
  cards: any[] = [];
  bucketName: any;
  innerheigth: any;
  formate: any[] = [];
  public carouselTile: NgxCarousel;
  uri: any[] = [];
  public carouselTileItems: Array<any>;
  manifestUri: any = "https://d23sw6prl9jc74.cloudfront.net/8/NavdQMkX7J.mp4";
  constructor(private route: ActivatedRoute,
    private videoService: VideoService,
    public favService: FavoriteService,
    private spinnerService: Ng4LoadingSpinnerService) {
    var ids = this.route.params.subscribe(params => {
      this.idss = +params['id'];
    });
    this.getSubCard();
    this.uri.push([this.manifestUri]);
    this.uri.push([this.manifestUri]);
    this.uri.push([this.manifestUri]);
    this.uri.push([this.manifestUri]);
    this.uri.push([this.manifestUri]);

  }

  ngOnInit() {
    this.carouselTile = {
      grid: { xs: 2, sm: 3, md: 5, lg: 5, all: 0 },
      slide: 2,
      speed: 400,
      loop: true,
      animation: 'lazy',
      point: {
        visible: true,
        pointStyles: `
        .tile {
          position: relative;
      }
      .ngxcarousel-inner {
        height: 260px;
    }
      .ngxcarouselPoint {
        display: none;
    }

        `
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.uri.push(this.manifestUri);
    this.initApp();
  }


  initApp() {
    shaka.polyfill.installAll();
    if (shaka.Player.isBrowserSupported()) {
      this.initPlayer();
    } else {
      console.error('Browser not supported!');
    }
  }

  initPlayer() {
    var video = document.getElementById('video');
    var player = new shaka.Player(video);
    player.addEventListener('error', this.onErrorEvent);
    player.load(this.manifestUri).then(function () {
      console.log('The video has now been loaded!');
    }).catch(this.onError);
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
      var url = "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8";
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
      console.log(data);
      this.spinnerService.hide();
    },
      Error => {
        this.spinnerService.hide();
      });
  }
}
