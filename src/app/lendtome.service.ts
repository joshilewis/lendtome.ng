import { Injectable } from "@angular/core";
import { PersistenceService } from "angular-persistence";
import { HttpClient } from "@angular/common/http";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { LibrarySearchResult } from "./dto/librarysearchresult";
import { BookSearchResult } from "./dto/booksearchresult";
import { error } from "util";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { AuthService } from "./infra/auth/auth.service";
import { retry } from "rxjs/operators/retry";
import { environment } from "../environments/environment";
import { StorageType } from "angular-persistence/src/constants/persistence.storage_type";
import { GoogleBook } from "./googlebooks/googlebook";
import "rxjs/add/operator/toPromise";
import { Promise } from "q";
import { Constants } from "./infra/contstants";
import { LibraryStatusResult } from "./dto/librarystatusresult";
import "rxjs/add/operator/mergeMap";

@Injectable()
export class LendtomeService {
  public books: Observable<BookSearchResult[]>;
  public libraryStatus: Observable<LibraryStatusResult>;
  public connectionRequests: Observable<LibrarySearchResult[]>;
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
    this.connectionRequests = this.getConnectionRequests();
  }

  private getLibraryId(): Promise<string> {
    const libraryId = this.persistenceService.get(
      Constants.keys.libraryId,
      StorageType.LOCAL
    );

    return Promise(resolve => {
      if (libraryId) {
        return resolve(libraryId);
      }

      console.log(`libraryId not in storage, getting from API`);
      this.getLibraryIdFromApi().then(result => {
        console.log(`received libraryId from API: ${result}`);
        this.persistenceService.set(Constants.keys.libraryId, result, {
          type: StorageType.LOCAL
        });
        resolve(result);
      });
    });
  }

  private listBooks(): Observable<BookSearchResult[]> {
    return Observable.fromPromise(this.getLibraryId() as PromiseLike<
      string
    >).flatMap(libraryId =>
      this.http.get<BookSearchResult[]>(
        `${environment.apiUrl}/libraries/${libraryId}/books`
      )
    );
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

  public refreshLibraryStatus(): void {
    this.libraryStatus = this.getLibraryStatus();
  }

  private getLibraryIdFromApi(): Promise<string> {
    return Promise(resolve => {
      this.http
        .get<LibrarySearchResult[]>(`${environment.apiUrl}/libraries/`)
        .subscribe(libraries => {
          if (libraries.length > 0) {
            return resolve(libraries[0].id);
          } else {
            return resolve(this.openNewLibrary().toString());
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
        .toPromise();
    });
  }

  public addBook(book: GoogleBook): Promise<Object> {
    const bookToAdd = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors[0],
      isbn: book.volumeInfo.industryIdentifiers.find(x => x.type === "ISBN_13")
        .identifier,
      publishYear: +book.volumeInfo.publishedDate.substr(0, 4),
      coverPicture: book.volumeInfo.imageLinks.thumbnail
    };
    return this.getLibraryId().then(libraryId => {
      return this.http
        .post(
          `${environment.apiUrl}/libraries/${libraryId}/books/add/`,
          bookToAdd
        )
        .toPromise();
    });
  }

  public removeBook(book: BookSearchResult): Promise<Object> {
    return this.getLibraryId().then(libraryId => {
      return this.http
        .post(`${environment.apiUrl}/libraries/${libraryId}/books/remove/`, {
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publishYear: book.publishYear,
          coverPicture: book.coverPicture
        })
        .toPromise();
    });
  }

  private getLibraryStatus(): Observable<LibraryStatusResult> {
    return Observable.fromPromise(this.getLibraryId() as PromiseLike<
      string
    >).flatMap(libraryId =>
      this.http.get<LibraryStatusResult>(
        `${environment.apiUrl}/libraries/${libraryId}/status/`
      )
    );
  }

  public requestConnection(library: LibrarySearchResult): Promise<Object> {
    return this.getLibraryId().then(libraryId => {
      return this.http
        .post(`${environment.apiUrl}/libraries/${libraryId}/links/request/`, {
          targetLibraryId: library.id
        })
        .toPromise();
    });
  }

  public acceptConnection(library: LibrarySearchResult): Promise<Object> {
    return this.getLibraryId().then(libraryId => {
      return this.http
        .post(`${environment.apiUrl}/libraries/${libraryId}/links/accept/`, {
          requestingLibraryId: library.id
        })
        .toPromise();
    });
  }

  public searchBooks(searchTerm: string): Observable<BookSearchResult[]> {
    return Observable.fromPromise(this.getLibraryId() as PromiseLike<
      string
    >).flatMap(libraryId =>
      this.http.get<BookSearchResult[]>(
        `${environment.apiUrl}/books/${searchTerm}`
      )
    );
  }

  private getConnectionRequests(): Observable<LibrarySearchResult[]> {
    return Observable.fromPromise(this.getLibraryId() as PromiseLike<
      string
    >).flatMap(libraryId =>
      this.http.get<LibrarySearchResult[]>(
        `${environment.apiUrl}/libraries/${libraryId}/links/received/`
      )
    );
  }

  public refreshReceivedConnections(): void {
    this.connectionRequests = this.getConnectionRequests();
  }

  private handleError<T>(operation = "operation", result?: T) {
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
