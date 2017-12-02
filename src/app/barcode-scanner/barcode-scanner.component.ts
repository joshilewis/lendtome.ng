import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BarcodeScannerDialogComponent } from '../barcode-scanner-dialog/barcode-scanner-dialog.component';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent implements OnInit {

  constructor(    private dialog: MatDialog,
    private router: Router
) { }

  ngOnInit() {
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
