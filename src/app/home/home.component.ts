import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RefreshWebService } from './../shared/services/RefreshWeb/index';
import { Card } from './../shared/entities/index';
import { NgxCarousel } from 'ngx-carousel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  deviceId: string;
  kidId: string;
  activeSubscription: boolean;
  obj = new Object();
  public innerheigth: any;
  ImageUrl: string;
  ids: any[] = [];
  cards: any[] = [];
  folders: any[] = [];
  bucketName: any;
  videoUrl: string;
  public carouselTile: NgxCarousel;
  constructor(public refreshweb: RefreshWebService,
    public router: Router,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.refreshWeb();
  }

  ngOnInit() {
    this.GetCard();
    this.carouselTile = {
      grid: { xs: 2, sm: 4, md: 5, lg: 8, all: 0 },
      slide: 2,
      speed: 400,
      loop: true,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

  }
  refreshWeb() {
    this.deviceId = localStorage.getItem('X-Kidjo-DeviceId');
    if (!this.deviceId) {
      this.refreshweb.RefreshWeb().subscribe(data => {
        console.log(data);
        this.ImageUrl = data.folderImageUrl;
        this.videoUrl = data.videoUrl;
        localStorage.setItem('videoUrl', this.videoUrl)
        localStorage.setItem('folderImageUrl', this.ImageUrl);
        localStorage.setItem('X-Kidjo-DeviceId', data.deviceId);
        this.kidId = data.kids[0].id;
        localStorage.setItem('kidId', this.kidId);
        this.activeSubscription = data.User[0].activeSubscription;
      })
    }
    if (this.activeSubscription == true) {
      localStorage.setItem('premiumActive', 'true');
    } else {
      localStorage.setItem('premiumActive', 'false');
    }
  }
  GetCard() {
    this.obj = localStorage.getItem('kidId');
    this.obj = localStorage.getItem('premiumActive');
    this.spinnerService.show();
    this.refreshweb.GetCard(this.obj).subscribe(data => {
      this.spinnerService.hide();
      this.cards = data.cards;
      var tempData = [];
      var test = [];
      var color: any[] = ['red', 'yellow', 'blue', 'green', 'orange', 'purple'];
      var counter = 0;
      for (var index = 0; index < this.cards.length; index++) {
        if (counter == 5) {
          counter = 0;
        }
        if (this.cards[index].id) {
          test = [{ 'id': this.cards[index].id, 'color': color[counter], 'imgUrl': this.folderImage(this.cards[index].id) }]
          tempData.push(test);
          // increment counter
          counter++;
        }
      }
      this.folders = tempData;
    },
      Error => {
        this.spinnerService.hide();
      });
  }
  folderImage(id) {
    var url = localStorage.getItem('folderImageUrl');
    this.innerheigth = window.innerHeight;
    if (this.innerheigth <= 1440 && this.innerheigth >= 1080) {
      this.bucketName = '/phone-l';
    } else if (this.innerheigth <= 1080 && this.innerheigth >= 768) {
      this.bucketName = '/phone-m';
    } else if (this.innerheigth <= 360 && this.innerheigth >= 0) {
      this.bucketName = '/phone-s';
    } else if (this.innerheigth <= 2048 && this.innerheigth >= 1536) {
      this.bucketName = '/tablet-l';
    } else if (this.innerheigth <= 1536 && this.innerheigth >= 1440) {
      this.bucketName = '/tablet-m';
    } else if (this.innerheigth <= 768 && this.innerheigth >= 360) {
      this.bucketName = '/tablet-s';
    }
    return url + 'folderImage' + this.bucketName + '/' + id + '.png';
  }
  goToVideoPage(id: any) {
    this.router.navigate(['./video', id]);
  }

}
