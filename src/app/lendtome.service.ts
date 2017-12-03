import { Injectable } from '@angular/core';
import { PersistenceService } from 'angular-persistence';
import { HttpClient } from '@angular/common/http';
import { catchError, map, flatMap } from 'rxjs/operators';
import { LibrarySearchResult } from './librarysearchresult';
import { BookSearchResult } from './booksearchresult';
import { error } from 'util';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AuthService } from './core/auth.service';
import { retry } from 'rxjs/operators/retry';
import { environment } from '../environments/environment';
import { StorageType } from 'angular-persistence/src/constants/persistence.storage_type';
import { GoogleBook } from './googlebooks/googlebook';
import 'rxjs/add/operator/toPromise';
import { Promise } from 'q';
import { KeyConstants } from './core/key-contstants';
import { LibraryStatusResult } from './librarystatusresult';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class LendtomeService {
  public books: Observable<BookSearchResult[]>;
  public libraryStatus: Observable<LibraryStatusResult>;
  constructor(
    private persistenceService: PersistenceService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // authService.addSignOutCallback(
    //   persistenceService.remove(libraryIdkey, StorageType.LOCAL)
    // );
    this.books = this.listBooks();
    this.libraryStatus = this.getLibraryStatus();
  }

  private getLibraryId(): Promise<string> {
    const libraryId = this.persistenceService.get(
      KeyConstants.libraryId,
      StorageType.LOCAL
    );

    return Promise(resolve => {
      if (libraryId) {
        return resolve(libraryId);
      }

      console.log(`libraryId not in storage, getting from API`);
      this.getLibraryIdFromApi().then(result => {
        console.log(`received libraryId from API: ${result}`);
        this.persistenceService.set(KeyConstants.libraryId, result, {
          type: StorageType.LOCAL
        });
        resolve(result);
      });
    });
  }

  private clearLibraryId(): void {
    this.persistenceService.remove(KeyConstants.libraryId, StorageType.LOCAL);
  }

  private listBooks(): Observable<BookSearchResult[]> {
    return Observable
    .fromPromise(this.getLibraryId() as PromiseLike<string>)
    .flatMap(libraryId => this.http.get<BookSearchResult[]>(
      `${environment.apiUrl}/libraries/${libraryId}/books`
    ));
  }

  public searchLibraries(
    searchTerm: string
  ): Observable<LibrarySearchResult[]> {
    return this.http.get<LibrarySearchResult[]>(
      `${environment.apiUrl}/libraries/${searchTerm}`
    );
  }

  public refreshBooks(): void {
    this.books = this.listBooks();
  }

  private getLibraryIdFromApi(): Promise<string> {
    return Promise(resolve => {
      this.http
        .get<LibrarySearchResult[]>(`${environment.apiUrl}/libraries/`)
        .subscribe(libraries => {
          if (libraries.length === 0) {
            resolve(this.openNewLibrary().toString());
          } else {
            resolve(libraries[0].id);
          }
        });
    });
  }

  private openNewLibrary(): Promise<string> {
    return Promise(resolve => {
      this.http
        .post(`${environment.apiUrl}/libraries/`, {
          name: this.authService.currentUser.displayName,
          picture: this.authService.currentUser.photoURL
        })
        .subscribe(
          data => {
            resolve(data.toString());
          },
          err => {
            resolve(err);
          }
        );
    });
  }

  public addBook(book: GoogleBook): Promise<Object> {
    const bookToAdd = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      isbn: book.volumeInfo.industryIdentifiers.find(x => x.type === 'ISBN_13')
        .identifier,
      publishYear: +book.volumeInfo.publishedDate.substr(0, 4),
      coverPicture: book.volumeInfo.imageLinks.thumbnail
    };
    return  Promise((resolve, reject) => {
      this.getLibraryId()
      .then(libraryId => {
      this.http
        .post(
          `${environment.apiUrl}/libraries/${libraryId}/books/add/`,
          bookToAdd
        )
        .toPromise()
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          return reject;
        });
      });
    });
  }

  public removeBook(book: BookSearchResult): Promise<Object> {
    return Promise((resolve, reject) => {
      this.getLibraryId()
      .then(libraryId => {
      this.http
        .post(
          `${environment.apiUrl}/libraries/${libraryId}/books/remove/`,
          {
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publishYear: book.publishYear,
            coverPicture: book.coverPicture
          }
        )
        .toPromise()
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          console.log(err.message);
          return reject;
        });
      });
    });
  }

  private getLibraryStatus(): Observable<LibraryStatusResult> {
    return Observable
    .fromPromise(this.getLibraryId() as PromiseLike<string>)
    .flatMap(libraryId => this.http.get<LibraryStatusResult>(
      `${environment.apiUrl}/libraries/${libraryId}`
    ));
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
