import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshWebService } from './../shared/services/RefreshWeb/index';
import { Card } from './../shared/entities/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  deviceId: string;
  kidId: string;
  activeSubscription: boolean;
  obj = new Object();
  public innerWidth: any;
  public innerheigth: any;
  ImageUrl: string;
  imgPath: string;
  imgName: any[];
  subCard: any;
  ids: any[] = [];
  cards: any[] = [];
  folders = new Object();
  bucketName: any;
  videoUrl: string;
  constructor(public refreshweb: RefreshWebService, public router: Router) {
    this.refreshWeb();
    this.GetCard();
  }

  ngOnInit() {
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
    console.log('cards');
    this.obj = localStorage.getItem('kidId');
    this.obj = localStorage.getItem('premiumActive');

    this.refreshweb.GetCard(this.obj).subscribe(data => {
      this.cards = data.cards;
      console.log(this.cards);
      var tempData = [];
      var test = [];
      var color: any[] = ['red', 'yellow', 'blue', 'green', 'orange', 'purple'];
      for (var index = 0; index < this.cards.length; index++) {
        if (this.cards[index].id) {
          test = [{ 'id': this.cards[index].id, 'color': color[index], 'imgUrl': this.folderImage(this.cards[index].id) }]
          tempData.push(test);
        }
      }
      this.folders = tempData;
      console.log(this.folders);

    })
  }

  folderImage(id) {
    //bucketName: string;
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
    console.log(id);
    this.router.navigate(['./video', id]);
  }

}
