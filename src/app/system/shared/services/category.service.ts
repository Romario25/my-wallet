import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category';

@Injectable()
export class CategoryService extends BaseApi{
    constructor(public http: HttpClient) {
        super(http);
    }

    addCategory(category: Category) {
        return this.post('/categories', category);
    }

    getCategories() {
        return this.get('/categories');
    }

    updateCategory(category: Category) {
        return this.put(`/categories/${category.id}`, category);
    }
}
