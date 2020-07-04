import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatProgressBarModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatRadioModule
} from '@angular/material';

@NgModule({
  imports: [
  CommonModule,
  MatRadioModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
  ],
  exports: [
  CommonModule,
  MatRadioModule,
   MatToolbarModule,
   MatButtonModule,
   MatCardModule,
   MatInputModule,
   MatDialogModule,
   MatTableModule,
   MatMenuModule,
   MatIconModule,
   MatProgressBarModule,
   MatProgressSpinnerModule
   ],
})


export class MaterialModule { }
