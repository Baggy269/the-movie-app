import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  
  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.queryParamMap.get('title')!;
    this.poster_path = this.route.snapshot.queryParamMap.get('poster_path')!;
    this.overview = this.route.snapshot.queryParamMap.get('overview')!;
    this.vote_average = this.route.snapshot.queryParamMap.get('vote_average')!;
    this.release_date = this.route.snapshot.queryParamMap.get('release_date')!;
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
  }

}
