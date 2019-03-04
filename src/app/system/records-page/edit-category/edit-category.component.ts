import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from '../../shared/services/category.service';
import {Message} from '../../../shared/models/message.model';
import {Category} from '../../shared/models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  message: Message;
  @Input() categories: Category[] = [];

  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;

  currentCategory: Category;

  formEditCategory = new FormGroup({
    category: new FormControl(1, [Validators.required]),
    category_name : new FormControl(null, [Validators.required]),
    capacity : new FormControl(null, [Validators.required, Validators.min(1)])
  });

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onChange();
  }

  onEditCategory()
  {
    console.log(this.formEditCategory);

   let {category_name, capacity} = this.formEditCategory.value;

    if (capacity < 0) capacity *= -1;

    const category = new Category(category_name, capacity, +this.currentCategoryId);

    this.categoryService.updateCategory(category)
        .subscribe((category: Category) => {
          this.onCategoryEdit.emit(category);
          this.message.text = 'Категория успешно отредактирована.';
          window.setTimeout(() => this.message.text = '', 5000);
        });


  }

  onChange()
  {
    this.currentCategory = this.categories
        .find(c => c.id === +this.currentCategoryId);
  }
}
