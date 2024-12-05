import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToysPage } from './toys.page';

const routes: Routes = [
  {
    path: '',
    component: ToysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToysPageRoutingModule {}
