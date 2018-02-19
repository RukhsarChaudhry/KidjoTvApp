import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Headers, RequestOptions } from "@angular/http";
import { BlockUIService } from "../blockui/index";
import { ResponseError, Refresh } from "../../entities/index";
import * as shajs from 'sha.js';

/**
 * This class provides the Wrrapper Http service to call REST / WebAPI
 */
@Injectable()
export class RESTConnectorService {
    AppString = " Tg4TwzUgR8";
    timeZoneOffsetInMinutes: any;
    // time = new Date();
    Url = "https://staging.kidjo.net/app/api/3";
    date: string;
    d = new Date();
    DeviceId: string = "5492532046838041";
    constructor(
        private http: Http,
        private blockUiService: BlockUIService
    ) {
        this.date = new Date(this.d.getUTCDay(), this.d.getUTCDate(), this.d.getUTCMonth(), this.d.getUTCFullYear(), this.d.getUTCHours(), this.d.getUTCMinutes(), this.d.getUTCSeconds()).toString();

        this.d.getTimezoneOffset();
        this.timeZoneOffsetInMinutes = this.d;
    }

    private getHeader(contentType: string): Headers {
        const headers = new Headers();
        headers.append("Content-Type", contentType);
        headers.append("X-Kidjo-DeviceId", this.DeviceId);
        headers.append("X-Kidjo-Date", this.date);
        var auth = shajs('sha256').update(this.DeviceId + this.date + this.AppString).digest('hex');
        headers.append("Authorization", auth);
        return headers;
    }
    private handleErrorWeb(error: any, stopBlock: boolean) {
        console.log(error);
        let body = error.json();
        let err = new ResponseError();
        err.type = error.type;
        err.status = error.status;
        err.statusText = error.statusText;
        err.error = body.error;
        err.message = body.Message;
        err.description = body.error_description;
        this.blockUiService.stopBlock();
        return Observable.throw(err);
    }
    private handleError(error: any, blockUiService: BlockUIService, blocking: Boolean) {
        //let body = error.json();
        if (blocking) {
            blockUiService.stopBlock();
        }
        return Observable.throw(error);
    }
    private parseResponseWeb(response: Response) {
        if (response.text.length == 0) {
            console.log("Lenght is zero");
            return;
        }
        let body
        try {
            body = response.json();
        }
        catch (e) {
            this.blockUiService.stopBlock();
            //return Observable.throw(e);
            console.log(response);
        }
        this.blockUiService.stopBlock();
        return body;
    }

    httpPostWeb(obj: any, url: string, contentType: string = "application/json"): Observable<any> {
        url = this.Url + url;
        this.blockUiService.startBlock();
        var body = obj;
        const headers = this.getHeader(contentType);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map((response: Response) =>
                this.parseResponse(response, this.blockUiService, true)
            )
            .catch((error) => this.handleError(error, this.blockUiService, true));
    }
    httpGetWeb(url: string, contentType: string) {
        url = this.Url + url;
        this.blockUiService.startBlock();
        const headers = this.getHeader(contentType);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options)
            .map((response: Response) =>
                this.parseResponse(response, this.blockUiService, true)
            )
            .catch((error) => this.handleError(error, this.blockUiService, true));
    }
    private parseResponse(response: Response, blockUiService: BlockUIService, blocking: Boolean) {
        if (blocking) {
            blockUiService.stopBlock();
        }
        let body = response.json();
        return body;
    }
}