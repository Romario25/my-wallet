import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit {

  constructor() { }

  @Input() currency: any;

  uah: number;
  usd: number;
  eur: number;

  ngOnInit() {
    console.log(this.currency);

     this.eur = this.currency.rates.UAH;
     this.usd = this.currency.rates.UAH / this.currency.rates.USD;
     this.uah = 1;
  }

}
