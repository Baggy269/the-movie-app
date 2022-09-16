import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';
import { UsersService } from './users.service';
import {Movie} from "../movie.model";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";


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

  headerDict = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  constructor(private router: Router,
              private usersService : UsersService, private http: HttpClient) { }

  login(){
    this.http.post<{ token: string }>("http://localhost:8080/authenticate",
      {"username":this.username,"password":this.password},{"headers":this.headerDict})
      .subscribe(responseData => {
        let token = responseData['token'] ? responseData['token'] : "" ;
        localStorage.setItem("jwt", token);
          localStorage.setItem('loggedIn','true');
          this.router.navigate(["/catalog-component"]);
      },
        (error: HttpErrorResponse)=>{
        this.correctPassword = false
          this.correctUsername = true;
        this.errorMessage = 'Invalid credentials.'
          return;
        })
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
