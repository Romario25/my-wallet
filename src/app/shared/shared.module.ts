import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersServices} from './services/users.services';
import {AuthServices} from './services/auth.services';

@NgModule({
    imports: [FormsModule, ReactiveFormsModule],
    exports: [FormsModule, ReactiveFormsModule],
    providers: [UsersServices, AuthServices]
})
export class SharedModule {

}