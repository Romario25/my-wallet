import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {AppEvent} from '../models/app-event';

@Injectable()
export class EventService extends BaseApi{

    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(appEvent: AppEvent) {
        return this.post('/events', appEvent);
    }

    getEvents()
    {
        return this.get('/events');
    }

    getEventById(id: string) {
        return this.get(`/events/${id}`);
    }

}
