import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'toys',
        loadChildren: () => import('../toys/toys.module').then(m => m.ToysPageModule)
      },
      {
        path: 'stories',
        loadChildren: () => import('../stories/stories.module').then(m => m.StoriesPageModule)
      },
      {
        path: '',
        redirectTo: 'toys',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
