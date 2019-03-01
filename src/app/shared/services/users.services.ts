import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';


@Injectable()
export class UsersServices {

     constructor(private http: HttpClient) {}

     getUserByEmail(email: string): Observable<User> {
         return this.http.get<User>(`http://localhost:3000/users?email=${email}`);
     }

     createUser(user: User): Observable<User> {
         return this.http.post<User>('http://localhost:3000/users', user);
     }
}
