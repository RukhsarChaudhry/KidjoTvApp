import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { RESTConnectorService } from './../RestService/index';
import { Refresh, Card } from './../../entities/index';




@Injectable()
export class RefreshWebService {
    d = new Date();
    date: Date;
    contentType: string;
    public constructor(private restConnector: RESTConnectorService) {
        this.date = new Date(this.d.getUTCDay(), this.d.getUTCDate(), this.d.getUTCMonth(), this.d.getUTCFullYear(), this.d.getUTCHours(), this.d.getUTCMinutes(), this.d.getUTCSeconds());
    }
    public RefreshWeb(): Observable<Refresh> {
        let refreshweb = new Refresh();
        refreshweb.Date = this.date;
        let url = "/device/refreshWeb";
        return this.restConnector.httpPostWeb(refreshweb, url);
    }
    public GetCard(values: any): Observable<any> {
        this.contentType = 'education';
        let url = "/cards/getList";
        return this.restConnector.httpGetWeb(url + "?kidId=" + values.kidId + "contentType" + values.contentType + "premiumActive" + values.premiumActive, this.contentType);
    }
    public updateKid(values: any): Observable<any> {
        let url = "/kid/[kidId]/update";
        return this.restConnector.httpPostWeb(values, url);
    }
}

