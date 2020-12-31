import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StackRoomPage } from './stack-room.page';

import { StackRoomPageRoutingModule } from './stack-room-routing.module';
import { EpubViewerPageModule } from 'src/share/components/epub-viewer/epub-viewer.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EpubViewerPageModule,
    StackRoomPageRoutingModule
  ],
  declarations: [StackRoomPage]
})
export class StackRoomPageModule {}
