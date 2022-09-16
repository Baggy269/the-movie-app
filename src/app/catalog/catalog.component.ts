import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  nextPage: number = 0;
  totalPages: number = 1;
  selected: number = -1;
  topRatedUrl: string = 'http://localhost:8080/movies/';
  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
  // @ts-ignore
  jwt: string = localStorage.getItem("jwt");
  headerDict = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + this.jwt
  }
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  private fetchMovies() {
    this.http.get<{ currentPage: number, movies: Movie[], totalPages: number }>(this.topRatedUrl + this.nextPage, {"headers":this.headerDict})
      .subscribe(responseData => {
        this.movies = responseData['movies'];
        this.totalPages = responseData['totalPages'];
      })
    this.nextPage++;
  }

  fetchMoreMovies() {
    if (this.nextPage >= this.totalPages)
      return
    this.http.get<{ currentPage: number, movies: Movie[] }>(this.topRatedUrl + this.nextPage, {"headers":this.headerDict})
      .subscribe(responseData => {
        this.movies = this.movies.concat(responseData['movies']);
      })
    this.nextPage++;
  }

  onClick(index: number) {
    this.router.navigate(["/catalog-component/" + this.movies[index].id]);
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
