import { Component, OnInit } from '@angular/core';
import {Bill} from '../shared/models/Bill';
import {BillServices} from '../shared/services/bill.services';
import {CategoryService} from '../shared/services/category.service';
import {Category} from '../shared/models/category';
import {combineLatest} from 'rxjs';
import {AppEvent} from '../shared/models/app-event';
import {EventService} from '../shared/services/event.service';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit {

  bill: Bill;

  events: AppEvent[] = [];

  isLoaded = false;

  categories: Category[] = [];


  constructor(
      private billService: BillServices,
      private categoryService: CategoryService,
      private eventService: EventService
  ) { }

  ngOnInit() {
    combineLatest(this.billService.getBill(), this.categoryService.getCategories(), this.eventService.getEvents())
        .subscribe((data: [Bill, Category[], AppEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

}
