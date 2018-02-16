import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RefreshWebService } from './../shared/services/RefreshWeb/index';


@Component({
  selector: 'app-book-section',
  templateUrl: './book-section.component.html',
  styleUrls: ['./book-section.component.css']
})
export class BookSectionComponent implements OnInit {
  kidID: string;
  obj = new Object();
  idss: any;
  video = new Object();
  cards: any[] = [];
  url: any[] = [];
  constructor(private route: ActivatedRoute, private refreshweb: RefreshWebService) {
    var ids = this.route.params.subscribe(params => {
      console.log(params);
      this.idss = +params['id'];
      console.log(this.idss);
    });
    this.getSubCard();
  }

  ngOnInit() {

  }
  getSubCard() {
    // this.kidID = localStorage.getItem('kidId');
    // this.obj = localStorage.getItem('kidId');
    // this.obj = this.idss;
    // console.log(this.obj);
    this.refreshweb.GetSubCard(this.idss).subscribe(data => {
      console.log(data);
      this.cards = data.subcards;

      var dataa = [];
      var tt = [];
      var url = "https://www.youtube.com/embed/qY4S5lJx_ss?rel=0&amp;showinfo=0";
      for (var index = 0; index < this.cards.length; index++) {
        dataa = [{ 'id': this.cards[index].id, 'videourl': url, 'Title': this.cards[index].title }];
        tt.push(dataa);
      }
      this.video = tt;
      console.log(tt[0][0].id);
    });
  }
  videoUrl() {
    localStorage.getItem('');
    var url = "https://www.youtube.com/embed/qY4S5lJx_ss?rel=0&amp;showinfo=0";
    var id = "9";
    this.url.push(url);
    this.url.push(id);
  }
  addToFav(id: any) {
    console.log(id);
    this.refreshweb.addFavrouit(id).subscribe(data => {

    })
  }

}
