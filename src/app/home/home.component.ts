import { Component, OnInit } from '@angular/core';
import { RefreshWebService } from './../shared/services/RefreshWeb/index';

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
  constructor(public refreshweb: RefreshWebService) {
    this.refreshWeb();
    this.GetCard();
    this.folderImage();
  }

  ngOnInit() {
  }

  refreshWeb() {
    this.deviceId = localStorage.getItem('X-Kidjo-DeviceId');
    if (!this.deviceId) {
      this.refreshweb.RefreshWeb().subscribe(data => {
        console.log(data);
        this.ImageUrl = data.folderImageUrl;
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
    this.refreshweb.GetCard(this.obj).subscribe(data => {
      console.log(data);
      var imgName = data.forEach(e => e.id);
      console.log(imgName);
    })
    console.log(window.innerHeight);
    console.log(window.innerWidth);

  }
  folderImage() {
    var url = localStorage.getItem('folderImageUrl');
    this.innerheigth = window.innerHeight;
    this.innerWidth = window.innerWidth;
    if (this.innerheigth <= 1440 && this.innerheigth >= 1080) {
      this.imgPath = url + 'folderImage' + '/phone-l' + '/88.png';
    } else if (this.innerheigth <= 1080 && this.innerheigth >= 768) {
      this.imgPath = url + 'folderImage' + '/phone-m' + '/88.png';
    } else if (this.innerheigth <= 360 && this.innerheigth >= 0) {
      this.imgPath = url + 'folderImage' + '/phone-s' + '/88.png';
    } else if (this.innerheigth <= 2048 && this.innerheigth >= 1536) {
      this.imgPath = url + 'folderImage' + '/tablet-l' + '/88.png';
    } else if (this.innerheigth <= 1536 && this.innerheigth >= 1440) {
      this.imgPath = url + 'folderImage' + '/tablet-m' + '/88.png';
    } else if (this.innerheigth <= 768 && this.innerheigth >= 360) {
      this.imgPath = url + 'folderImage' + '/tablet-s' + '/88.png';
    } else {
      return;
    }
  }
}
