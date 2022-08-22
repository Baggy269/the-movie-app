import { Injectable } from "@angular/core";
import { User } from './user.model'
@Injectable()

export class UsersService {
    private users: User[] = [
        new User('name@sumerge.com','password'),
        new User('test@email.com','123456'),
    ];

    constructor() {
    }

    getUsers() {
        return this.users.slice();
    }
}

