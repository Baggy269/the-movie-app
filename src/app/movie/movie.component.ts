import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Movie} from "../movie.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  posterPrefix : string = 'https://image.tmdb.org/t/p/w500';
  title : string = '';
  poster_path : string= '';
  overview : string= '';
  vote_average : string = '';
  release_date : string = '';
  // @ts-ignore
  jwt: string = localStorage.getItem("jwt");
  headerDict = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.jwt
  }
  id: string = "";

  constructor(private route : ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.http.get<{ title: string, poster_path: string, overview: string, vote_average: string, release_date: string }>
    ("http://localhost:8080/movie/" + this.id, {"headers": this.headerDict})
      .subscribe(responseData => {
        this.title = responseData['title'];
        this.poster_path = responseData['poster_path'];
        this.overview = responseData['overview'];
        this.vote_average = responseData['vote_average'];
        this.release_date = responseData['release_date'];
      })
  }


  logout() {
    localStorage.setItem('loggedIn', 'false');
  }

}
