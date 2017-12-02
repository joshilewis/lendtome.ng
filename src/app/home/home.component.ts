import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LendtomeService } from '../lendtome.service';
import { BookSearchResult } from '../booksearchresult';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    public lendtomeService: LendtomeService
    ) {}

  ngOnInit() {
    this.lendtomeService.initialiseLibrary();
  }
}
