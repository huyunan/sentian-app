import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookRackPage } from './bookrack.page';

import { BookRackPagePageRoutingModule } from './bookrack-routing.module';
import { PdfViewerPageModule } from 'src/share/components/pdf-viewer/pdf-viewer.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PdfViewerPageModule,
    FormsModule,
    BookRackPagePageRoutingModule
  ],
  declarations: [BookRackPage]
})
export class BookRackPageModule {}
