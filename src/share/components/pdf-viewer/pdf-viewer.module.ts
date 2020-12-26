import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfViewerPage } from './pdf-viewer.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [PdfViewerPage]
})
export class PdfViewerPageModule {}
