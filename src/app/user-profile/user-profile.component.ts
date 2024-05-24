import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favouriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe(res => {
      this.userData = {
        ...res,
        id: res._id,
        password: this.userData.password
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    }, err => {
      console.log(err)
    })
  }
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }
  backToMovie(): void {
    this.router.navigate(["movies"]);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favouriteMovies = res.filter((movie: any) => 
        this.userData.favoriteMovies.includes(movie._id)
      )
    }, (err: any) => {
      console.error(err);
    });
  }
}
