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
  fontSizeEmail : string = '0.9rem';
  topEmail : string = '50px';
  fontSizePassword : string = '0.9rem';
  topPassword : string = '50px';

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

  onFocus(isEmail : boolean){
    if(isEmail){
      this.fontSizeEmail = '0.7rem'
      this.topEmail = '35px'
    }
    else{
      this.fontSizePassword = '0.7rem'
      this.topPassword = '35px'
    }
  }

  onBlur(){
      if(this.username == ''){
        this.fontSizeEmail = '0.9rem'
        this.topEmail = '50px'
      }
      if(this.password == ''){
        this.fontSizePassword = '0.9rem'
        this.topPassword = '50px'
      }

  }
}
