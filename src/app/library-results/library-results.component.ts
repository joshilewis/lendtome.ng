import { Component, OnInit } from '@angular/core';
import { LibrarySearchResult } from '../librarysearchresult';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { LendtomeService } from '../lendtome.service';

@Component({
  selector: 'app-library-results',
  templateUrl: './library-results.component.html',
  styleUrls: ['./library-results.component.css']
})
export class LibraryResultsComponent implements OnInit {
  public libraries: Observable<LibrarySearchResult[]>;
  public searchTerm: string;

  constructor(
    private route: ActivatedRoute,
    public lendtomeService: LendtomeService,
  ) {
    this.searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    this.libraries = lendtomeService.searchLibraries(this.searchTerm);
  }

  ngOnInit() {
  }

}
