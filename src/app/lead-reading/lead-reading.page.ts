import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PdfCards } from 'src/const/pdf-cards.const';
import { PdfViewerPage } from 'src/share/components/pdf-viewer/pdf-viewer.page';

export interface Card {
  src: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-lead-reading',
  templateUrl: 'lead-reading.page.html',
  styleUrls: ['lead-reading.page.scss'],
})
export class LeadReadingPage {
  pdfCards: Card[] = [];
  pdfHistory: any;
  constructor(private modalCtrl: ModalController) {
    this.pdfCards = PdfCards;
  }

  async presentModal(url: string) {
    const modal = await this.modalCtrl.create({
      component: PdfViewerPage,
      componentProps: {
        DEFAULT_URL: url,
        pdfHistory: this.pdfHistory
      },
      cssClass: 'st-modal-first',
      swipeToClose: true,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data.pdfHistory);
    this.pdfHistory = data.pdfHistory;
  }
}
