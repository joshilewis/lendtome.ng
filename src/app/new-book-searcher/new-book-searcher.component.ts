import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book-searcher',
  templateUrl: './new-book-searcher.component.html',
  styleUrls: ['./new-book-searcher.component.css']
})
export class NewBookSearcherComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public searchForBooks(searchTerm: string): void {
    this.router.navigateByUrl('addbook/' + searchTerm);
  }

}
