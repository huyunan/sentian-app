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
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
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
