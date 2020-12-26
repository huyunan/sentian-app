import { AfterViewInit, Component, Input } from "@angular/core";
import { ModalController } from '@ionic/angular';
import * as pdfjsLib from "pdfjs-dist/build/pdf.js";
import * as pdfjsViewer from "pdfjs-dist/web/pdf_viewer.js";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "pdf-viewer.page.html",
  styleUrls: ["pdf-viewer.page.scss"],
})
export class PdfViewerPage implements AfterViewInit {
  @Input() DEFAULT_URL: string | null = null;
  title: string = '';
  value: number = 1;
  
  USE_ONLY_CSS_ZOOM = true;
  pageCssFlg = false;
  TEXT_LAYER_MODE = 0; // DISABLE
  MAX_IMAGE_SIZE = 1024 * 1024;
  CMAP_URL = "./assets/js/pdfjs-dist/cmaps/";
  CMAP_PACKED = true;

  DEFAULT_SCALE_DELTA = 1.1;
  MIN_SCALE = 0.25;
  MAX_SCALE = 10.0;
  DEFAULT_SCALE_VALUE = "auto";
  pdfLoadingTask: any;
  pdfDocument: any;
  pdfViewer: any;
  @Input() pdfHistory: any;
  pdfLinkService: any;
  eventBus: any;
  url: any;
  l10n: any;

  constructor(private modalCtrl: ModalController) {
    if (!pdfjsLib.getDocument || !pdfjsViewer.PDFViewer) {
      alert("Please build the pdfjs-dist library using\n `gulp dist-install`");
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "./assets/js/pdfjs-dist/pdf.worker.js";
  }

  ngAfterViewInit(): void {
    this.initUI();
    setTimeout(() => {
      this.open({
        url: this.DEFAULT_URL,
      });
    }, 1000);
  }

  /**
   * Opens PDF document specified by URL.
   * @returns {Promise} - Returns the promise, which is resolved when document
   *                      is opened.
   */
  open(params) {
    if (this.pdfLoadingTask) {
      // We need to destroy already opened document
      return this.close().then(() => {
        // ... and repeat the open() call.
        return this.open(params);
      });
    }

    let url = params.url;
    this.setTitleUsingUrl(url);

    // Loading document.
    let loadingTask = pdfjsLib.getDocument({
      url: url,
      maxImageSize: this.MAX_IMAGE_SIZE,
      cMapUrl: this.CMAP_URL,
      cMapPacked: this.CMAP_PACKED,
    });
    this.pdfLoadingTask = loadingTask;

    loadingTask.onProgress = (progressData) => {
      this.progress(progressData.loaded / progressData.total);
    };

    return loadingTask.promise.then(
      (pdfDocument) => {
        // Document loaded, specifying document for the viewer.
        this.pdfDocument = pdfDocument;
        this.pdfViewer.setDocument(pdfDocument);
        this.pdfLinkService.setDocument(pdfDocument);
        this.pdfHistory.initialize({ fingerprint: pdfDocument.fingerprint });

        this.loadingBar.hide();
        this.setTitleUsingMetadata(pdfDocument);
      },
      (exception) => {
        let message = exception && exception.message;
        let l10n = this.l10n;
        let loadingErrorMessage;

        if (exception instanceof pdfjsLib.InvalidPDFException) {
          // change error message also for other builds
          loadingErrorMessage = l10n.get(
            "invalid_file_error",
            null,
            "Invalid or corrupted PDF file."
          );
        } else if (exception instanceof pdfjsLib.MissingPDFException) {
          // special message for missing PDFs
          loadingErrorMessage = l10n.get(
            "missing_file_error",
            null,
            "Missing PDF file."
          );
        } else if (exception instanceof pdfjsLib.UnexpectedResponseException) {
          loadingErrorMessage = l10n.get(
            "unexpected_response_error",
            null,
            "Unexpected server response."
          );
        } else {
          loadingErrorMessage = l10n.get(
            "loading_error",
            null,
            "An error occurred while loading the PDF."
          );
        }

        loadingErrorMessage.then((msg) => {
          this.error(msg, { message: message });
        });
        this.loadingBar.hide();
      }
    );
  }

  /**
   * Closes opened PDF document.
   * @returns {Promise} - Returns the promise, which is resolved when all
   *                      destruction is completed.
   */
  close() {
    let errorWrapper = document.getElementById("errorWrapper");
    errorWrapper.setAttribute("hidden", "true");

    if (!this.pdfLoadingTask) {
      return Promise.resolve();
    }

    let promise = this.pdfLoadingTask.destroy();
    this.pdfLoadingTask = null;

    if (this.pdfDocument) {
      this.pdfDocument = null;

      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null, null);

      // if (this.pdfHistory) {
      //   this.pdfHistory.reset();
      // }
    }

    return promise;
  }

  get loadingBar() {
    let bar = new pdfjsViewer.ProgressBar("#loadingBar", {});

    return pdfjsLib.shadow(this, "loadingBar", bar);
  }

  setTitleUsingUrl(url) {
    this.url = url;
    let title = pdfjsLib.getFilenameFromUrl(url) || url;
    try {
      title = decodeURIComponent(title);
    } catch (e) {
      // decodeURIComponent may throw URIError,
      // fall back to using the unprocessed url in that case
    }
    this.setTitle(title);
  }

  setTitleUsingMetadata(pdfDocument) {
    pdfDocument.getMetadata().then((data) => {
      let info = data.info,
        metadata = data.metadata;
      this.pageCssFlg = true;
      // Provides some basic debug information
      console.log(
        "PDF " +
          pdfDocument.fingerprint +
          " [" +
          info.PDFFormatVersion +
          " " +
          (info.Producer || "-").trim() +
          " / " +
          (info.Creator || "-").trim() +
          "]" +
          " (PDF.js: " +
          (pdfjsLib.version || "-") +
          ")"
      );

      this.setTitle(document.title);
    });
  }

  setTitle(title) {
    document.title = title;
    this.title = title;
  }

  error(message, moreInfo) {
    let l10n = this.l10n;
    let moreInfoText = [
      l10n.get(
        "error_version_info",
        { version: pdfjsLib.version || "?", build: pdfjsLib.build || "?" },
        "PDF.js v{{version}} (build: {{build}})"
      ),
    ];

    if (moreInfo) {
      moreInfoText.push(
        l10n.get(
          "error_message",
          { message: moreInfo.message },
          "Message: {{message}}"
        )
      );
      if (moreInfo.stack) {
        moreInfoText.push(
          l10n.get("error_stack", { stack: moreInfo.stack }, "Stack: {{stack}}")
        );
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(
            l10n.get(
              "error_file",
              { file: moreInfo.filename },
              "File: {{file}}"
            )
          );
        }
        if (moreInfo.lineNumber) {
          moreInfoText.push(
            l10n.get(
              "error_line",
              { line: moreInfo.lineNumber },
              "Line: {{line}}"
            )
          );
        }
      }
    }

    let errorWrapper = document.getElementById("errorWrapper");
    errorWrapper.removeAttribute("hidden");

    let errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;

    let closeButton = document.getElementById("errorClose");
    closeButton.onclick = function () {
      errorWrapper.setAttribute("hidden", "true");
    };

    let errorMoreInfo: any = document.getElementById("errorMoreInfo");
    let moreInfoButton = document.getElementById("errorShowMore");
    let lessInfoButton = document.getElementById("errorShowLess");
    moreInfoButton.onclick = function () {
      errorMoreInfo.removeAttribute("hidden");
      moreInfoButton.setAttribute("hidden", "true");
      lessInfoButton.removeAttribute("hidden");
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + "px";
    };
    lessInfoButton.onclick = function () {
      errorMoreInfo.setAttribute("hidden", "true");
      moreInfoButton.removeAttribute("hidden");
      lessInfoButton.setAttribute("hidden", "true");
    };
    moreInfoButton.removeAttribute("hidden");
    lessInfoButton.setAttribute("hidden", "true");
    Promise.all(moreInfoText).then((parts) => {
      errorMoreInfo.value = parts.join("\n");
    });
  }

  progress(level) {
    let percent = Math.round(level * 100);
    // Updating the bar if value increases.
    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
    }
  }

  get pagesCount() {
    return this.pdfDocument.numPages;
  }

  get page() {
    return this.pdfViewer.currentPageNumber;
  }

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  }

  zoomIn(ticks) {
    let newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * this.DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(this.MAX_SCALE, newScale);
    } while (--ticks > 0 && newScale < this.MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  }

  zoomOut(ticks) {
    let newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / this.DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(this.MIN_SCALE, newScale);
    } while (--ticks > 0 && newScale > this.MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  }

  previous() {
    this.page--;
  }

  next() {
    this.page++;
  }

  pageNumberChange() {
    this.page = this.value;
  }

  initUI() {
    let eventBus = new pdfjsViewer.EventBus();
    this.eventBus = eventBus;

    let linkService = new pdfjsViewer.PDFLinkService({
      eventBus: eventBus,
    });
    this.pdfLinkService = linkService;

    this.l10n = pdfjsViewer.NullL10n;

    let container = document.getElementById("viewerContainer");
    let pdfViewer = new pdfjsViewer.PDFViewer({
      container: container,
      eventBus: eventBus,
      linkService: linkService,
      l10n: this.l10n,
      useOnlyCssZoom: this.USE_ONLY_CSS_ZOOM,
      textLayerMode: this.TEXT_LAYER_MODE,
    });
    this.pdfViewer = pdfViewer;
    linkService.setViewer(pdfViewer);

    this.pdfHistory = new pdfjsViewer.PDFHistory({
      eventBus: eventBus,
      linkService: linkService,
    });
    linkService.setHistory(this.pdfHistory);

    eventBus.on("pagesinit", () => {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = this.DEFAULT_SCALE_VALUE;
    });

    eventBus.on(
      "pagechanging",
      (evt) => {
        let page = evt.pageNumber;
        let numPages = this.pagesCount;

        this.value = page;
        (<HTMLButtonElement>document.getElementById("previous")).disabled =
          page <= 1;
        (<HTMLButtonElement>document.getElementById("next")).disabled =
          page >= numPages;
      },
      true
    );
  }

  dismiss() {
    this.close();
    this.modalCtrl.dismiss({
      'pdfHistory': this.pdfHistory
    });
  }
}
