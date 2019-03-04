import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class BaseApi {

    baseUrl = 'http://localhost:3000';

    constructor(public http: HttpClient) {

    }

    private getUrl(url: string) {
        return this.baseUrl + url;
    }

    get(url: string): Observable<any> {
        return this.http.get(this.getUrl(url));
    }

    post(url: string, data: object = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data);
    }

    put(url: string, data: object = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data);
    }
}
