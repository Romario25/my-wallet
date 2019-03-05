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
  @Output() cWindowCancel = new EventEmitter();
  @Output() cWindowApply = new EventEmitter();

  selectedTypes = [];

  selectedCategories = [];

  ngOnInit() {
  }

  cancelWindows() {
    this.cWindowCancel.emit();
    this.selectedCategories = [];
    this.selectedTypes = [];
  }

  applyFilter() {
    this.cWindowApply.emit({
      types : this.selectedTypes,
      categories : this.selectedCategories
    });
    this.selectedCategories = [];
    this.selectedTypes = [];
  }

  handleChangeType(target: any) {
    if (target.checked) {
      if (this.selectedTypes.indexOf(target.value) === -1) {
        this.selectedTypes.push(target.value);
      }
    } else {
      this.selectedTypes = this.selectedTypes.filter((i) => {
        return i !== target.value;
      });
    }
  }

  handleChangeCategory(target: any) {
    if (target.checked) {
      if (this.selectedCategories.indexOf(target.value) === -1) {
        this.selectedCategories.push(target.value);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter((i) => {
        return i !== target.value;
      });
    }
  }

}
