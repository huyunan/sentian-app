import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadReadingPage } from './lead-reading.page';

const routes: Routes = [
  {
    path: '',
    component: LeadReadingPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadReadingPageRoutingModule {}
