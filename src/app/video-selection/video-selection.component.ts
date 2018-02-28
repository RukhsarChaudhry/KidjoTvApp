import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { VideoService } from './../shared/services/videoService/index';
import { FavoriteService } from './../shared/services/favoritesService/index';
import { AddFav } from './../shared/entities/index';
import { NgxCarousel } from 'ngx-carousel';


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
  manifestUri: any = "https://d23sw6prl9jc74.cloudfront.net/8/NavdQMkX7J.mp4";
  currentStream = "https://d23sw6prl9jc74.cloudfront.net/6/NavdQMkX7J.mp4";
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
      console.log(this.video);
    },
      Error => {
        this.spinnerService.hide();
      });
  }
  videoURL(FormateId: any[], id: any) {
    var url = localStorage.getItem('videoUrl');
    var formate = [1, 2, 3, 4, 5, 6, 7, 8];
    this.innerheigth = window.innerHeight;
    if (this.innerheigth >= 720) {
      if (FormateId[0].id == 1) {
        var ID = FormateId[0].id;
        console.log(ID);
        this.bucketName = '.m3u8';
        return url + ID + '/' + id + '/' + id + this.bucketName;
      } else if (FormateId[0].id == 2) {
        var ID = FormateId[0].id;
        console.log(ID);
        this.bucketName = '.mpd';
        return url + ID + '/' + id + '/' + id + this.bucketName;
      } else if (FormateId[0].id == 3) {
        var ID = FormateId[0].id;
        console.log(ID);
        this.bucketName = '.mp4';
        return url + ID + '/' + id + this.bucketName;
      }

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
