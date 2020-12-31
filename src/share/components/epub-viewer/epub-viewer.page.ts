import { AfterViewInit, Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Book } from 'epubjs';

@Component({
  selector: 'app-epub-viewer',
  templateUrl: 'epub-viewer.page.html',
  styleUrls: ['epub-viewer.page.scss'],
})
export class EpubViewerPage implements AfterViewInit {
  @Input() DEFAULT_URL: string | null = null;

  constructor(private modalCtrl: ModalController) {
  }

  ngAfterViewInit(): void {
    this.open();
  }

  open() {
    // const url = decodeURIComponent('url');
    const book: Book = new Book('../../../assets/epub/森田心理疗法实践 - 高良武久1111.epub');

    const viewer = document.getElementById('viewer');
    const rendition = book.renderTo(viewer, {
      manager: 'continuous',
      flow: 'paginated',
      width: '100%',
      height: '100%',
      snap: true
    });

    const displayed = rendition.display();

    displayed.then(function(renderer){
      // -- do stuff
    });

    // Navigation loaded
    book.loaded.navigation.then(function(toc){
      // console.log(toc);
    });

    const next = document.getElementById('next');
    next.addEventListener('click', function(){
      rendition.next();
    }, false);

    const prev = document.getElementById('prev');
    prev.addEventListener('click', function(){
      rendition.prev();
    }, false);

    document.addEventListener('keyup', function(e: any){
      // Left Key
      if ((e.keyCode || e.which) == 37) {
        rendition.prev();
      }

      // Right Key
      if ((e.keyCode || e.which) == 39) {
        rendition.next();
      }

    }, false);

    // $(window).on( "swipeleft", function( event ) {
    //   rendition.next();
    // });
    //
    // $(window).on( "swiperight", function( event ) {
    //   rendition.prev();
    // });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      pdfHistory: 'this.pdfHistory'
    });
  }
}
