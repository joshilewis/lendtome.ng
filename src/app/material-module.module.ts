import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
} from '@angular/material';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialog,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatDialogModule, ],
  exports: [MatButtonModule, MatToolbarModule, MatDialogModule, MatDialogActions, MatDialogContent, ],
  declarations: []
})
export class MaterialModuleModule {}
