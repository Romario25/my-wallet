import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/category';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {


  categories: Category[];

  isLoaded = false;


  constructor(private categoryServices: CategoryService) {

  }



  ngOnInit() {
    this.categoryServices.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.isLoaded = true;

    });
  }

  addNewCategory(category: Category) {
    this.categories.push(category);
  }

  editCategory(category: Category) {
    const idx = this.categories
        .findIndex(c => c.id === category.id);
    this.categories[idx] = category;
  }

}
