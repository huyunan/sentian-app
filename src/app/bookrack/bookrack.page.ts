import { Component } from "@angular/core";
import { ModalController } from '@ionic/angular';
import { Cards } from "src/const/cards.const";
import { PdfViewerPage } from "src/share/components/pdf-viewer/pdf-viewer.page";

export interface Card {
  src: string,
  title: string,
  url: string
}

@Component({
  selector: "app-bookrack",
  templateUrl: "bookrack.page.html",
  styleUrls: ["bookrack.page.scss"],
})
export class BookRackPage {
  cards: Card[] = [];
  pdfHistory: any;
  constructor(private modalCtrl: ModalController) {
    this.cards = Cards;
  }

  async presentModal(url: string) {
    const modal = await this.modalCtrl.create({
      component: PdfViewerPage,
      componentProps: {
        'DEFAULT_URL': url,
        'pdfHistory': this.pdfHistory
      },
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data.pdfHistory);
    this.pdfHistory = data.pdfHistory;
  }
}
