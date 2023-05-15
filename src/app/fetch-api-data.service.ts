import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = 'https://my-blockbusters.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * User registration
   * @service POST to the user endpoint
   * @param userDetails
   * @returns A JSON object holding data about the added user
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User login
   * @service POST to the login endpoint
   * @param userDetails
   * @returns A JSON object holding data about the logged-in user
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all movies
   * @service GET all movies from movies endpoint
   * @returns A JSON abject holding data about all movies
   * @function getAllMovies
   */

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get one movie
   * @service GET a single movie from the movies/:title endpoint
   * @param title
   * @returns A JSON object holding data about one movie
   * @function getMovie
   */

  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get director
   * @service GET data about a director by name from the movies/director/:directorName endpoint
   * @param directorName
   * @returns A JSON object holding data about the specified director
   * @function getDirector
   */

  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get genre
   * @service GET data about a genre by name from the movies/genre/:genreName endpoint
   * @param genreName
   * @returns A JSON object holding the name, description and movies of a genre
   * @function getGenre
   */

  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/genres/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get user
   * @service GET the user data by name from the user/:username endpoint
   * @returns A JSON object holding data about the user
   * @function getUser
   */

  public getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add a movie to favorite movies
   * @service POST a movie to user's favorite movies list at endpoint /users/:username/movies/:movieId
   * @param movieId
   * @returns A JSON object holding the updated user data
   * @function addFavoriteMovie
   */

  public addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(`${apiUrl}/users/${username}/movies/${movieId}`, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a movie from the favorite movies
   * @service DELETE favorite movie at endpoint /users/:username/movies/:movieId
   * @param movieId
   * @returns A JSON object holding the updated user data
   * @function removeFavoriteMovie
   */

  public removeFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit user
   * @service PUT request to update user at endpoint users/:username
   * @param userDetails
   * @returns A JSON object holding the updated user data
   * @function editUser
   */

  public editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}/users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete user
   * @service DELETE the user at endpoint /users/:username
   * @returns a message on delete
   * @function deleteUser
   */

  public deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        responseType: "text",
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Extract the response data from the HTTP response
   * @param response
   * @returns the response body or an empty object
   */

  private extractResponseData(response: any): any {
    const body = response;
    return body || {};
  }

  /**
   * Handle API call errors
   * @param error
   * @returns error message
   * @function handleError
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    }
    return throwError(
      () => new Error(`${error.status} / ${error.error.message}`)
    );
  }
}
