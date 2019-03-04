import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../shared/models/category';
import {AppEvent} from '../shared/models/app-event';
import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy {


  isLoaded = false;

  categories: Category[];

  events: AppEvent[];

  chartData = [];

  s1: Subscription;

  isFilterVisible = false;

  constructor(private categoryService: CategoryService, private eventService: EventService) { }

  ngOnInit() {
    this.s1 = combineLatest(this.categoryService.getCategories(), this.eventService.getEvents())
        .subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }

    calculateChartData(): void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.chartData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }

    toggleFilterVisible(dir: boolean) {
      this.isFilterVisible = dir;
    }

    openFilter() {
      console.log('open filter');
      this.toggleFilterVisible(true);
    }

    cancelFilter() {
      this.toggleFilterVisible(false);
    }


    ngOnDestroy(): void {

      if (this.s1) {
          this.s1.unsubscribe();
      }
    }

}
