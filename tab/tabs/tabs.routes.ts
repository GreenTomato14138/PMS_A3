// app/tabs/tabs.routes.ts
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadComponent: () => import('../pages/list-search/list-search.page').then(m => m.ListSearchPage)
      },
      {
        path: 'add',
        loadComponent: () => import('../pages/add-featured/add-featured.page').then(m => m.AddFeaturedPage)
      },
      {
        path: 'update',
        loadComponent: () => import('../pages/update-delete/update-delete.page').then(m => m.UpdateDeletePage)
      },
      {
        path: 'privacy',
        loadComponent: () => import('../pages/privacy-security/privacy-security.page').then(m => m.PrivacySecurityPage)
      },
      {
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full'
  }
];