import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validator, Validators} from '@angular/forms';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  formAddCategory: FormGroup;



  constructor(private categoryService: CategoryService) { }

  @Output() addCategory = new EventEmitter<Category>();

  message = new Message('success', '');



  ngOnInit() {

    this.formAddCategory = new FormGroup({
      category_name : new FormControl(null, [Validators.required]),
      capacity : new FormControl(null, [Validators.required, Validators.min(1)])
    });
  }

  onAddCategory(){
    console.log(this.formAddCategory.value);

    const {category_name, capacity} = this.formAddCategory.value;

    this.categoryService.addCategory(new Category(category_name, capacity)).subscribe((category: Category) => {
      console.log(category);
      this.addCategory.emit(category);
      this.message.text = 'Категория успешно добавлена';
      window.setTimeout(() => {
        this.message.text = '';
      }, 5000);
    });

  }

}
