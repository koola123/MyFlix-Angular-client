import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
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
      this.userData = response.data;
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
  this.fetchApiData.deleteUser().subscribe(
    (response) => {
      if (response.success === true) {
        this.snackBar.open(response.message, 'OK', {
          duration: 8000,
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      }
    },
    (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 8000,
      });
    }
  );
}
}  

