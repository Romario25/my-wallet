import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/Bill';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {

  constructor() { }

  @Input() bill: Bill;

  @Input() currency: any;

  uah: number = 0;
  eur: number = 0;
  usd: number = 0;

  ngOnInit() {
    console.log("BILL = " + this.bill);
    console.log(this.currency.rates.UAH);
    this.uah = +this.bill.value;
    this.eur = this.uah / this.currency.rates.UAH;
    this.usd = this.eur * this.currency.rates.USD;
  }

}
