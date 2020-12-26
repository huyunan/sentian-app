import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookRackPage } from './bookrack.page';

const routes: Routes = [
  {
    path: '',
    component: BookRackPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRackPagePageRoutingModule {}
