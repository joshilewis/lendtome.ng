import { Injectable } from '@angular/core';
import { PersistenceService } from 'angular-persistence';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { LibrarySearchResult } from './librarysearchresult';
import { BookSearchResult } from './booksearchresult';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthService } from './core/auth.service';
import { retry } from 'rxjs/operators/retry';
import { environment } from '../environments/environment';
import { StorageType } from 'angular-persistence/src/constants/persistence.storage_type';

const libraryIdkey = 'libraryId';
@Injectable()
export class LendtomeService {
  private libraryId: string;
  constructor(
    private persistenceService: PersistenceService,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  public initialiseLibrary(): void {
    this.libraryId = this.persistenceService.get(libraryIdkey, StorageType.LOCAL);
    if (!this.libraryId) {
      this.http.get<LibrarySearchResult[]>(
        `${environment.apiUrl}/libraries/`
      ).subscribe(libraries => {
        if (libraries.length === 0) {
          this.openNewLibrary();
        } else {
          this.persistenceService.set(libraryIdkey, libraries[0].id, {
            type: StorageType.LOCAL
          });
        }
      });
    }
  }

  private openNewLibrary(): void {
    this.http
      .post(`${environment.apiUrl}/libraries/`, {
        name: this.authService.currentUser.displayName,
        picture: this.authService.currentUser.photoURL
      })
      .subscribe(
        result => {
          this.persistenceService.set(libraryIdkey, result, {
            type: StorageType.LOCAL
          });
          this.libraryId = result.toString();
        },
        err => {
          console.log(err);
        }
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(err); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${err.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
