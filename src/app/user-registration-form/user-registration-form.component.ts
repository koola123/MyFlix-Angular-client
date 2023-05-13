import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  storeDate(event: MatDatepickerInputEvent<Date>) {
    this.userData.Birthday = `${event.value}`;
  }

  /**
   * send the form inputs to the backend
   * @function onSubmit
   */

  onSubmit(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
          this.dialogRef.close();
          this.snackBar.open(`User ${response.Username} has been registered`, 'OK', {
            duration: 2000,
          });
      },
      (response) => {
        this.snackBar.open(`Registration failed`, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}