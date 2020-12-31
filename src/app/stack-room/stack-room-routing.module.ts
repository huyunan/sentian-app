import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StackRoomPage } from './stack-room.page';

const routes: Routes = [
  {
    path: '',
    component: StackRoomPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StackRoomPageRoutingModule {}
