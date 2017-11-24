import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
} from '@angular/material';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialog,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatToolbarModule, MatDialogModule, MatCardModule, ],
  exports: [MatButtonModule, MatToolbarModule, MatDialogModule, MatDialogActions, MatDialogContent, MatCardModule, ],
  declarations: []
})
export class MaterialModuleModule {}
