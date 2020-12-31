import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cards } from 'src/const/cards.const';
import { EpubViewerPage } from 'src/share/components/epub-viewer/epub-viewer.page';

export interface Card {
  src: string;
  title: string;
  url: string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  cards: Card[] = [];
  pdfHistory: any;
  constructor(private modalCtrl: ModalController) {
    this.cards = Cards;
  }

  async presentModal(url: string) {
    const modal = await this.modalCtrl.create({
      component: EpubViewerPage,
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
