import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersServices} from '../../shared/services/users.services';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';

import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthServices} from '../../shared/services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  message: Message;

  constructor(
      private userService: UsersServices,
      private authService: AuthServices,
      private route: ActivatedRoute,
      private router: Router
  ) {  }

  ngOnInit() {
  this.message = new Message('danger', '');

  this.route.queryParams.subscribe((params: Params) => {
     if (params['canLogin']) {
         this.showMessage(new Message('success', 'Можешь логиниться'));
     }
  });

    this.form = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
      console.log(user);
      if (user[0]) {

        if (user[0].password === formData.password) {
            this.showMessage({text: 'Login is good', type: 'info'});
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user[0]));
            this.message.text = '';

            this.router.navigate(['/system', 'bill']);
        } else {

            this.showMessage({text: 'Пароль неверный', type: 'danger'});
        }
      } else {
          this.showMessage({text: 'Такой пользователь не найден', type: 'danger'});
      }
    });


  }

}
