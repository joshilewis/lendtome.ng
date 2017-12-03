import { Component, OnInit } from '@angular/core';
import { LendtomeService } from '../lendtome.service';
import { Observable } from 'rxjs/Observable';
import { LibrarySearchResult } from '../librarysearchresult';

@Component({
  selector: 'app-connected-libraries',
  templateUrl: './connected-libraries.component.html',
  styleUrls: ['./connected-libraries.component.css']
})
export class ConnectedLibrariesComponent implements OnInit {

  constructor(public lendtomeService: LendtomeService) {  }

  ngOnInit() {
  }

}
