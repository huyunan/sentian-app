import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadReadingPage } from './lead-reading.page';

import { LeadReadingPageRoutingModule } from './lead-reading-routing.module';
import { PdfViewerPageModule } from 'src/share/components/pdf-viewer/pdf-viewer.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PdfViewerPageModule,
    FormsModule,
    LeadReadingPageRoutingModule
  ],
  declarations: [LeadReadingPage]
})
export class LeadReadingPageModule {}
