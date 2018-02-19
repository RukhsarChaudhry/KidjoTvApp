import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RESTConnectorService } from './../RestService/index';
import { Card } from './../../entities/index';

@Injectable()
export class VideoService {
    contentType: string = "application/json";
    public constructor(private restConnector: RESTConnectorService) {
    }
    public GetSubCard(SubId: any): Observable<any> {
        var id = SubId;
        let url = "/cards/folder/" + id;
        return this.restConnector.httpGetWeb(url, this.contentType);
    }
    public getVideo(videoID: any): Observable<any> {
        let url = "/cards/video/" + videoID;
        return this.restConnector.httpGetWeb(url, this.contentType);
    }
    public startVideo(videoId: any): Observable<any> {
        let url = "/cards/video/" + videoId + "/started";
        return this.restConnector.httpGetWeb(url, this.contentType);
    }
    public EndVideo(videoId: any): Observable<any> {
        var kidId = localStorage.getItem('kidId');
        var obj = new Object();
        obj = videoId;
        obj = kidId;
        let url = "/cards/video/" + videoId + "/end";
        return this.restConnector.httpPostWeb(obj, url, this.contentType);
    }
}