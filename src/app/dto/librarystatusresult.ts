import { LibrarySearchResult } from './librarysearchresult';

export class LibraryStatusResult {
  connectedLibraries: LibrarySearchResult[];
  receivedRequests: LibrarySearchResult[];
  sentRequests: LibrarySearchResult[];
}
