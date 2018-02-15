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
    constructor(
        private http: Http,
        private blockUiService: BlockUIService
    ) {
        this.date = new Date(this.d.getUTCDay(), this.d.getUTCDate(), this.d.getUTCMonth(), this.d.getUTCFullYear(), this.d.getUTCHours(), this.d.getUTCMinutes(), this.d.getUTCSeconds()).toString();

        this.d.getTimezoneOffset();
        this.timeZoneOffsetInMinutes = this.d;
    }

    private getHeader(contentType: string, obj: any): Headers {
        const headers = new Headers();
        headers.append("Content-Type", contentType);
        headers.append("X-Kidjo-DeviceId", obj.deviceId);
        headers.append("X-Kidjo-Date", this.date);
        // console.log(obj.deviceId);
        // console.log(obj.Date);
        var auth = shajs('sha256').update(obj.DeviceId + obj.Date + this.AppString).digest('hex');
        // console.log(auth);
        headers.append("Authorization", auth);
        return headers;
    }
    private handleErrorWeb(error: any, stopBlock: boolean) {
        console.log(error);
        let body = error.json();
        //console.log(body);
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
        let body = this.timeZoneOffsetInMinutes;
        const headers = this.getHeader(contentType, obj);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map((response: Response) =>
                this.parseResponseWeb(response)
            )
            .catch((error) => this.handleErrorWeb(error, true));
    }
    httpGetWeb(obj: any, url: string, contentType: string) {
        url = this.Url + url;
        const headers = this.getHeader(contentType, obj);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).map((response: Response) =>
            this.parseResponseWeb(response)
        ).catch((error) => this.handleErrorWeb(error, true));
    }
    private parseResponse(response: Response, blockUiService: BlockUIService, blocking: Boolean) {
        if (blocking) {
            blockUiService.stopBlock();
        }
        let body = response.json();
        return body;
    }


    // httpGetWeb(url: string, block: boolean = true, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     const headers = this.getHeader(contentType);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get(url, options).map((response: Response) =>
    //         this.parseResponseWeb(response)
    //     ).catch((error) => this.handleErrorWeb(error, true));
    // }
    // private parseResponse(response: Response, blockUiService: BlockUIService, blocking: Boolean) {
    //     if (blocking) {
    //         blockUiService.stopBlock();
    //     }
    //     let body = response.json();
    //     return body;
    //  }





























    /**
     * Call REST / Web API using HTTP POST
     * @param {any} object - object to be sent to REST API
     * @param {string} url - REST / Web API URL
     * @httpPost
     */
    // public httpPost(obj: any, url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();
    //     let body = (contentType == "application/json") ? JSON.stringify(obj) : obj;
    //     body = (obj == "5");
    //     let headers = new Headers();
    //     // headers.append("Content-Type", "application/json");
    //     headers.append("X-Kidjo-DeviceId", "5492532046838041");
    //     headers.append("X-Kidjo-Date", "Wed, 31 Jan 2018 14:26:24 UTC");
    //     headers.append("Authorisation", "2719bbd79b27a5bc12ec1d965a26af9568bd708c");
    //     headers.append("Access-Control-Allow-Origin", "GET, POST, PATCH, PUT, DELETE");
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(url, body, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }







    // public httpGet(url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();

    //     let headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     if (typeof (Storage) !== "undefined") {
    //         let token = localStorage.getItem("RUKHSARQUIZAPPTOKENA2");
    //         if (token && typeof (token) !== "undefined") {
    //             headers.append("Authorization", "Bearer " + token);
    //         }
    //     }

    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get(url, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }


    // public httpPut(url: string, data: any, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();

    //     let headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     if (typeof (Storage) !== "undefined") {
    //         let token = localStorage.getItem("RUKHSARQUIZAPPTOKENA2");
    //         if (token && typeof (token) !== "undefined") {
    //             headers.append("Authorization", "Bearer " + token);
    //         }
    //     }

    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.put(url, data, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }



    // public httpGetSecure(url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();

    //     let headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     if (typeof (Storage) !== "undefined") {
    //         let token = localStorage.getItem("RUKHSARQUIZAPPTOKENA2");
    //         if (typeof (token) !== "undefined") {
    //             headers.append("Authorization", "Bearer " + token);
    //         }
    //     }

    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get(url, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }

    // public httpPostSecure(obj: any, url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();
    //     let body = (contentType == "application/json") ? JSON.stringify(obj) : obj;

    //     let headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     if (typeof (Storage) !== "undefined") {
    //         let token = localStorage.getItem("RUKHSARQUIZAPPTOKENA2");
    //         if (typeof (token) !== "undefined") {
    //             headers.append("Authorization", "Bearer " + token);
    //         }
    //     }

    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(url, body, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }




    /**
     * Parse REST API / Web API Http Response
     * @param {any} object - object to be sent to REST API
     * @param {string} url - REST / Web API URL
     * @parseResponse
     */
    // public httpPostWithNoBlock(obj: any, url: string): Observable<any> {
    //     url = this.Url + url;
    //     let body = JSON.stringify(obj);

    //     let headers = new Headers();
    //     headers.append("Content-Type", "application/json");
    //     headers.append("Accept", "q=0.8;application/json;q=0.9");

    //     if (typeof (Storage) !== "undefined") {
    //         let token = localStorage.getItem("RUKHSARQUIZAPPTOKENA2");
    //         headers.append("Authorization", token);
    //     }

    //     let options = new RequestOptions({ headers: headers });

    //     return this.http.post(url, body, options)
    //         .map((response: Response) => {
    //             this.parseResponse(response, this.blockUiService, false);
    //         })
    //         //              .do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, false));
    // }


    /**
     * Parse REST API / Web API Http Response
     * @param {Response} response - HTTP Response
     * @param {BlockUIService} blockUiService - BlockUIService
     * @param {Boolean} blocking - UI Blocking flag
     * @parseResponse
     */


    /**
     * Parse REST API / Web API Http Response
     * @param {any} error - Error object
     * @param {BlockUIService} blockUiService - BlockUIService
     * @param {Boolean} blocking - UI Blocking flag
     * @handleError
     */

    // httpDeleteSecure(url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();

    //     let headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     if (typeof (Storage) !== "undefined") {
    //         let token = localStorage.getItem("RUKHSARQUIZAPPTOKENA2");
    //         if (typeof (token) !== "undefined") {
    //             headers.append("Authorization", "Bearer " + token);
    //         }
    //     }

    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.delete(url, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }

    // httpDelete(id: number, url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();

    //     let headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.delete(url, options)
    //         .map((response: Response) =>
    //             this.parseResponse(response, this.blockUiService, true)
    //         )
    //         //.do(data => //console.log("server data:", data))  // debug
    //         .catch((error) => this.handleError(error, this.blockUiService, true));
    // }












    // httpGetSecureWeb(url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();

    //     const headers = this.getHeader(contentType, true);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.get(url, options)
    //         .map((response: Response) =>
    //             this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }

    // public httpPostSecureWeb(obj: any, url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();
    //     let body = (contentType == "application/json") ? JSON.stringify(obj) : obj;
    //     const headers = this.getHeader(contentType, true);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(url, body, options)
    //         .map((response: Response) =>
    //             this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }
    // public httpPutWeb(data: any, url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();
    //     const headers = this.getHeader(contentType, false);
    //     let body = (contentType == "application/json") ? JSON.stringify(data) : data;
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.put(url, body, options)
    //         .map((response: Response) =>
    //             this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }
    // public httpPutSecureWeb(data: any, url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     const headers = this.getHeader(contentType, true);
    //     let body = (contentType == "application/json") ? JSON.stringify(data) : data;
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.put(url, body, options)
    //         .map((response: Response) =>
    //             this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }
    // httpDeleteWeb(url: string, block: boolean = true, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     if (block) {
    //         this.blockUiService.startBlock();
    //     }

    //     const headers = this.getHeader(contentType, false);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.delete(url, options)
    //         .map((response: Response) =>
    //             this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }
    // httpDeleteSecureWeb(url: string, contentType: string = "application/json"): Observable<any> {
    //     url = this.Url + url;
    //     this.blockUiService.startBlock();
    //     const headers = this.getHeader(contentType, true);
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.delete(url, options)
    //         .map((response: Response) =>
    //             this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }




    // postWithFile(url: string, postData: any, files: File[]) {
    //     url = this.Url + url;
    //     let headers = new Headers();
    //     let formData: FormData = new FormData();
    //     formData.append('files', files[0], files[0].name);
    //     if (postData !== "" && postData !== undefined && postData !== null) {
    //         for (var property in postData) {
    //             if (postData.hasOwnProperty(property)) {
    //                 formData.append(property, postData[property]);
    //             }
    //         }
    //     }
    //     let token = this.authTokenService.getToken();
    //     if (token) {
    //         headers.append("Authorization", `Bearer ${token.access_token}`);
    //     }
    //     return this.http.post(url, formData, {
    //         headers: headers
    //     }).map((response: Response) =>
    //         this.parseResponseWeb(response)
    //         )
    //         .catch((error) => this.handleErrorWeb(error, true));
    // }
}