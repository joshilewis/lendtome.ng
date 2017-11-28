import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LendtomeService } from '../lendtome.service';
import { BookSearchResult } from '../booksearchresult';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public router: Router, public lendtomeService: LendtomeService) {}

  ngOnInit() {
    this.lendtomeService.initialiseLibrary();
  }

  public searchForBooks(searchTerm: string): void {
    this.router.navigateByUrl('addbook/' + searchTerm);
  }

}
