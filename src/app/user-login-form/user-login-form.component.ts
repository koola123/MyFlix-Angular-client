import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  @Input() userData = {
    Username: '',
    Password: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {});
  }

  /**
   * send the form inputs to the backend, navigate to /movies
   * @function onSubmit
   */

  onSubmit(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
          this.snackBar.open(`User Login has been successful!`, 'OK', {
            duration: 2000,
          });
        localStorage.setItem('user', this.userData.Username);
        localStorage.setItem('token', response.token);
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(`User Login failed`,'OK', {
          duration: 2000,
        });
      }
    );
  }
}


