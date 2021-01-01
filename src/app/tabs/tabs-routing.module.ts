import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'bookrack',
        loadChildren: () => import('../bookrack/bookrack.module').then(m => m.BookRackPageModule)
      },
      {
        path: 'stack',
        loadChildren: () => import('../stack-room/stack-room.module').then(m => m.StackRoomPageModule)
      },
      {
        path: 'lead',
        loadChildren: () => import('../lead-reading/lead-reading.module').then(m => m.LeadReadingPageModule)
      },
      {
        path: 'person',
        loadChildren: () => import('../person/person.module').then(m => m.PersonPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/bookrack',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/bookrack',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
