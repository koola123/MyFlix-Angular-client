import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
          this.dialogRef.close();
          this.snackBar.open(`${this.userData.Username} Login successful!`, 'OK', {
            duration: 2000,
          });
        localStorage.setItem('user', this.userData.Username);
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open('Failed to Login User', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}

