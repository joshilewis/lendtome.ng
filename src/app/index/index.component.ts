import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SignInComponent } from '../sign-in/sign-in.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  letMeIn(): void {
    console.log('blag');
    const dialogRef = this.dialog.open(SignInComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('home');
    });
  }

}
