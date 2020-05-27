import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientComponent } from './client/client.component';
import { PlansComponent } from './plans/plans.component';


const routes: Routes = [
  {
    path: 'clients-list', component: ClientsListComponent
  },
  {
    path: 'client-add', component: ClientComponent
  },
  {
    path: 'client-edit/:clientId', component: ClientComponent
  },
  {
    path: 'plans', component: PlansComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
