import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bill} from '../../shared/models/Bill';
import {BillServices} from '../../shared/services/bill.services';
import {EventService} from '../../shared/services/event.service';
import {AppEvent} from '../../shared/models/app-event';
import {combineLatest} from 'rxjs';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];

  message: Message;

  bill: Bill;

  addEventForm = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(1)]),
    type: new FormControl('outcome', [Validators.required]),
    category: new FormControl(2, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  types = [
      {name: 'Доход', value: 'income'},
      {name: 'Расход', value: 'outcome'},
    ];

  constructor(private billService: BillServices, private eventService: EventService) { }

  ngOnInit() {
    this.billService.getBill().subscribe((bill: Bill) => {
      this.bill = bill;
    });

    this.message = new Message('success', '');
  }

  onAddEvent()
  {
    console.log(this.addEventForm.value);

    const {amount, type, category, description} = this.addEventForm.value;

    console.log(this.bill);

    const value = +this.bill.value - amount;
    if (type === 'outcome') {
      if (value < 0) {
        // error
        console.log('ERROR' + value);
        this.message.type = 'danger';
        this.message.text = 'Недостаточно средств';
      } else {

        combineLatest(
            this.eventService.addEvent(new AppEvent(type, amount, category, new Date().toDateString(), description)),
            this.billService.updateBill(new Bill(value.toString(), 'uah', this.bill.id))
        ).subscribe((data: [AppEvent, Bill]) => {
          this.bill = data[1];
          console.log(this.bill);
          this.addEventForm.setValue({
            amount: 1,
            description: '',
            type: 'outcome',
            category: 1
          });
          this.message.text = 'Save';
        });
      }
    } else {

      combineLatest(
          this.eventService.addEvent(new AppEvent(type, amount, category, new Date().toDateString(), description)),
          this.billService.updateBill(new Bill(amount + this.bill.value, 'uah', this.bill.id))
      ).subscribe((data: [AppEvent, Bill]) => {
        this.bill = data[1];
        console.log(this.bill);
        this.addEventForm.setValue({
          amount: 1,
          description: '',
          type: 'outcome',
          category: 1
        });
      });
      this.message.text = 'Save';
    }

  }

}
