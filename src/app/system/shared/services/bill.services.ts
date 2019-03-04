import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../models/Bill';

@Injectable()
export class BillServices extends BaseApi{

    constructor(public http: HttpClient) {
        super(http);
    }

    getBill() {
        return this.get('/bill');
    }

    getCurrency(): Observable<any> {
        const url: string = 'http://data.fixer.io/api/latest?access_key=35e67dcff6c6cc85dc8867fc82b7d9e8&symbols=UAH,USD';

        return this.http.get(url);
    }

    updateBill(bill: Bill)
    {
        return this.put(`/bill`, bill);
    }
}
