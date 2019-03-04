import { Component, OnInit } from '@angular/core';
import {EventService} from '../../shared/services/event.service';
import {CategoryService} from '../../shared/services/category.service';
import {AppEvent} from '../../shared/models/app-event';
import {Category} from '../../shared/models/category';
import {ActivatedRoute, Params} from '@angular/router';

import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';


@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnInit {

  isLoaded = false;

  event: AppEvent;

  id: string;

  s1: Subscription;

  category: Category;

  constructor(private route: ActivatedRoute, private eventService: EventService, private categoryService: CategoryService) { }

  ngOnInit() {

      this.s1 = this.route.params
          .pipe(mergeMap((params: Params) => this.eventService.getEventById(params['id'])))
          .pipe(mergeMap((event: AppEvent) => {
              this.event = event;
              return this.categoryService.getCategoryById(event.category);
          }))
          .subscribe((category: Category) => {
              this.category = category;
              this.isLoaded = true;
          });

  }

}
