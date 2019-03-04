import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category';
import {AppEvent} from '../../shared/models/app-event';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnInit {

  constructor() { }

  @Input() categories: Category[] = [];
  types = [
    {label: 'Доход', value: 'income'},
    {label: 'Расход', value: 'outcome'},
  ];
  @Output() cWindow = new EventEmitter();

  ngOnInit() {
  }

  cancelWindows() {
    this.cWindow.emit();
  }

  applyFilter() {

  }

}
