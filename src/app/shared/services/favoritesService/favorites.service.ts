import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RESTConnectorService } from './../RestService/index';
import { AddFav } from './../../entities/index';

@Injectable()
export class FavoriteService {
    contentType: string = "application/json";
    public constructor(private restConnector: RESTConnectorService) {
    }
    public addFavrouit(values: AddFav): Observable<any> {
        let url = "/kid/" + values.kidId + "/favorites/add";
        return this.restConnector.httpPostWeb(values, url);
    }
    public GetFavorite(kidId: any): Observable<any> {
        let url = "/kid/" + kidId + "/favorites/getList";
        return this.restConnector.httpGetWeb(url, this.contentType);
    }
    public RemoveFavorite(videoId: any): Observable<any> {
        var kidId = localStorage.getItem("kidId");
        let url = "/kid/" + kidId + "/favorites/remove";
        return this.restConnector.httpPostWeb(videoId, url);
    }
    public SetLanguage(id: any): Observable<any> {
        let url = "/language/set";
        return this.restConnector.httpPostWeb(id, url);
    }
}