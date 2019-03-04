import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppEvent} from '../../shared/models/app-event';
import {EventService} from '../../shared/services/event.service';
import {Category} from '../../shared/models/category';

import {CategoryService} from '../../shared/services/category.service';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.css']
})
export class HistoryEventsComponent implements OnInit {


  @Input() events: AppEvent[] = [];
  @Input() categories: Category[] = [];

  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';


    constructor() { }

  ngOnInit() {

    console.log(this.events);
      console.log(this.categories);

    this.events.forEach((e: AppEvent) => {
      e.categoryName = this.categories.find((c: Category) => {
        return c.id === e.category;
      }).name;
    });
  }

  changeCriteria(field: string) {
      const namesMap = {
          amount: 'Сумма',
          date: 'Дата',
          category: 'Категория',
          type: 'Тип'
      };
      this.searchPlaceholder = namesMap[field];
      this.searchField = field;
  }

  getEventClass(e) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    };
  }



}
