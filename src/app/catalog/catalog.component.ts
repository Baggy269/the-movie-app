import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  pageNumber: number = 1;
  totalPages: number = 1;
  selected: number = -1;
  topRatedUrl: string = 'https://api.themoviedb.org/3/discover/movie?api_key=4611f52c874578f1e74a6f29ccbefb1e&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=';
  topRatedUrl2: string = '&vote_count.gte=10000&with_watch_monetization_types=flatrate';
  posterPrefix: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
  scrolledDown: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchMovies();
  }

  private fetchMovies() {
    this.http.get<{ page: number, results: Movie[], total_pages: number }>(this.topRatedUrl + this.pageNumber + this.topRatedUrl2)
      .subscribe(responseData => {
        this.movies = responseData['results'];
        this.totalPages = responseData['total_pages'];
      })
    this.pageNumber++;
  }

  fetchMoreMovies() {
    if (this.pageNumber > this.totalPages)
      return
    this.http.get<{ page: number, results: Movie[] }>(this.topRatedUrl + this.pageNumber + this.topRatedUrl2)
      .subscribe(responseData => {
        this.movies = this.movies.concat(responseData['results']);
        console.log(responseData['results'])

      })
    this.pageNumber++;
  }

  onClick(index: number) {
    this.router.navigate(["/catalog-component/" + index], {
      queryParams: {
        title: this.movies[index].title,
        poster_path: this.movies[index].poster_path,
        overview: this.movies[index].overview,
        vote_average: this.movies[index].vote_average,
        release_date: this.movies[index].release_date
      }
    });
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
  }

  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
