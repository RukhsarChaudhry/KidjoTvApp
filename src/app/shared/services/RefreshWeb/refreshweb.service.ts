import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { RESTConnectorService } from './../RestService/index';
import { Refresh, Card } from './../../entities/index';




@Injectable()
export class RefreshWebService {
    d = new Date();
    DeviceId: string = "5492532046838041";
    date: Date;
    contentType: string;
    // Date = d;
    // Date: string = "Wed, 31 Jan 2018 14:26:24 UTC";
    public constructor(private restConnector: RESTConnectorService) {
        this.date = new Date(this.d.getUTCDay(), this.d.getUTCDate(), this.d.getUTCMonth(), this.d.getUTCFullYear(), this.d.getUTCHours(), this.d.getUTCMinutes(), this.d.getUTCSeconds());
    }

    public RefreshWeb(): Observable<Refresh> {
        let refreshweb = new Refresh();
        refreshweb.deviceId = this.DeviceId;
        refreshweb.Date = this.date;
        let url = "/device/refreshWeb";
        return this.restConnector.httpPostWeb(refreshweb, url);
    }
    public GetCard(values: any): Observable<any> {
        this.contentType = 'education';
        let url = "/cards/getList";
        return this.restConnector.httpGetWeb(values, url + "?kidId=" + values.kidId + "contentType" + values.contentType + "premiumActive" + values.premiumActive, this.contentType);

    }
    public GetSubCard(idss: any): Observable<any> {
        var deviceid = localStorage.getItem('X-Kidjo-DeviceId');
        var id = idss
        this.contentType = 'application/json';
        let url = "/cards/folder/" + id;
        return this.restConnector.httpGetWeb(deviceid, url, this.contentType);
    }
    public addFavrouit(id: any): Observable<any> {
        var kidid = localStorage.getItem('kidId');
        var dev = localStorage.getItem('deviceId');
        var obj = new Object();
        obj[kidid] = kidid;
        obj[id] = id;
        obj[dev] = dev
        let url = "/kid/" + kidid + "/favorites/add";
        return this.restConnector.httpPostWeb(obj, url);
    }
}

