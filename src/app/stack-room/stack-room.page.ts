import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EpubCards } from 'src/const/epub-cards.const';
import { EpubViewerPage } from 'src/share/components/epub-viewer/epub-viewer.page';

export interface Card {
  src: string;
  title: string;
  url: string;
}
@Component({
  selector: 'app-stack-room',
  templateUrl: 'stack-room.page.html',
  styleUrls: ['stack-room.page.scss'],
})
export class StackRoomPage {
  epubCards: Card[] = [];
  constructor(private modalCtrl: ModalController) {
    this.epubCards = EpubCards;
  }

  async presentModal(url: string) {
    const modal = await this.modalCtrl.create({
      component: EpubViewerPage,
      componentProps: {
        url: url
      },
      cssClass: 'st-modal-first',
      swipeToClose: true,
    });
    await modal.present();
  }
}
