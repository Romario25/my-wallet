import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UsersServices} from '../../shared/services/users.services';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  form: FormGroup;

  constructor(
      private userService: UsersServices,
      private router: Router
  ) { }

  ngOnInit() {

    this.form = new FormGroup({
       "email" : new FormControl(
           null,
           [Validators.required, Validators.email],
           this.forbiddenEmail.bind(this)
       ),
       "password" : new FormControl(null, [Validators.required, Validators.minLength(6)]),
       "name" : new FormControl(null, [Validators.required]),
       "agree" : new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    console.log(this.form.value);

    const {email, password, name} = this.form.value;

    this.userService.createUser({email: email, passsword: password, name: name}).subscribe((user: User) => {
      console.log(user);
      this.router.navigate(['/login'], {queryParams: { canLogin: true }});
    });
  }

  forbiddenEmail(controle: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
        this.userService.getUserByEmail(controle.value).subscribe((user: User) => {
           console.log(user);
           if (user[0] ) {
             resolve({forbiddenEmail: true});
           } else {
             resolve(null);
           }

      });
    });
  }

}
