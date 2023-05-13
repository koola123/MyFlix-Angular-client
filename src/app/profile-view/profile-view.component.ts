import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
   
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.getUser();
    } else {
      this.router.navigate(['welcome']);
    }
  }

  storeData(event: MatDatepickerInputEvent<Date>) {
    this.userData.Birthday = `${event.value}`;
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.userData.Username = response.Username;
      this.userData.Password = response.Password;
      this.userData.Email = response.Email;
      this.userData.Birthday = formatDate(response.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
      // this.fetchApiData.getAllMovies().subscribe((response: any) => {
      //   this.favoriteMovies = response.filter((movie: {_id: any, }) => this.userData.Username.FavoriteMovies.indexOf(movie._id) >= 0);
      // });
      console.log(response);
      console.log(this.userData);
      return this.userData;
    });
  }

    /**
   * Update the user info using input value (editUser)
   * If input is empty, assign current user value (user), otherwise, assign updated input value (editUser)
   * set localStorage username to updated username, inform user, then reload
   * @function onSubmit
   */

    onSubmit(): void {
      this.fetchApiData.editUser(this.userData).subscribe(
        (response) => {
          if (response.success === true) {
            localStorage.setItem('user', response.data.Username);
            this.snackBar.open(response.message, 'OK', {
              duration: 8000,
            });
          }
        },
        (response) => {
          this.snackBar.open(response, 'OK', {
            duration: 8000,
          });
        }
      );
    }
 /**
   * Get a confirmation from the user, if given, navigate to the welcome page
   * Inform the user of the changes and delete user data (deleteUser)
   * @function onDelete
   */

 onDelete(): void {
  this.fetchApiData.deleteUser().subscribe((response) => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(`User successfully deleted.`, 'OK', {
          duration: 2000,
        });
      },
    (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    }
  );
}
}  

