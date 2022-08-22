import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { UsersService } from './users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username : string = '';
  password : string = '';
  correctUsername : boolean = false;
  correctPassword : boolean = false;
  errorMessage : string = '';

  users : User[] = this.usersService.getUsers();
  
  constructor(private router: Router,
              private usersService : UsersService) { }

  login(){
    var flag = false;
    this.users.forEach(user=>{
      if(user.username == this.username){
        this.correctUsername=true;
        flag = true;
        if(this.password == user.password)
          this.correctPassword = true;
      }
    })
    this.correctUsername = flag;
    console.log(this.username, this.correctUsername, this.password, this.correctPassword)
    if(!this.correctUsername){
      this.errorMessage = 'Please enter a valid email.';
      return;
    }
    if(!this.correctPassword){
      this.errorMessage = 'Incorrect Password.'
      return;
    }
    localStorage.setItem('loggedIn','true');
    this.router.navigate(["/catalog-component"]);
  }
}
