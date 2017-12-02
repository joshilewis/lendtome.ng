import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LendtomeService } from '../lendtome.service';
import { BookSearchResult } from '../booksearchresult';
import { NewBookSearcherComponent } from '../new-book-searcher/new-book-searcher.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BarcodeScannerDialogComponent } from '../barcode-scanner-dialog/barcode-scanner-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    public lendtomeService: LendtomeService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.lendtomeService.initialiseLibrary();
  }

  scanBarcode(): void {
    const dialogRef = this.dialog.open(BarcodeScannerDialogComponent);
    dialogRef.afterClosed().subscribe(isbn => {
      if (isbn) {
        console.log(`The scanned ISBN number is ${isbn}`);
        this.router.navigateByUrl('addbook/' + isbn);
      }
    });
  }
}
