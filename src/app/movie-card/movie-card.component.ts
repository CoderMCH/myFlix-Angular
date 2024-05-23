import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    constructor(
        public fetchApiData: FetchApiDataService,
        public router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe(res => {
            this.movies = res;
            return this.movies;
        }, res => {
            console.error(res)
        })
    }

    logout(): void {
        this.router.navigate(["welcome"]);
        localStorage.removeItem("user");
    }

    redirectProfile(): void {
        this.router.navigate(["profile"]);
    }

    addFavorite(title: any): void {
        let user = JSON.parse(localStorage.getItem("user") || "");
        this.fetchApiData.addFavoriteMovie(user.id, title).subscribe(res => {
            console.log("add success")
        }, res => {
            console.error(res)
        })
    }

    showGenre(movie: any): void {
        // this.dialog.open()
        console.log(movie.genre)
    }
    showDirector(movie: any): void {
        console.log(movie.director)
    }
    showDetail(movie: any): void {
        console.log(movie.description)
    }
}
