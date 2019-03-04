import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {Bill} from '../shared/models/Bill';
import {BillServices} from '../shared/services/bill.services';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.css']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(private billService: BillServices) { }

  sub1: Subscription;
  sub2: Subscription;

  bill: Bill;
  currency: any;
  isLoaded: boolean = false;

  ngOnInit() {
    this.sub1 = combineLatest(
        this.billService.getBill(),
        this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;

    });


  }

  onRefresh() {
    this.isLoaded = false;
    this.sub2 = this.billService.getCurrency()

        .subscribe((currency: any) => {
          this.currency = currency;
          this.isLoaded = true;
        });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
   // this.sub2.unsubscribe();
  }

}
