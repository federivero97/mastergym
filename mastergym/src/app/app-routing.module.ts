import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { PlansComponent } from './plans/plans.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'enrollment', pathMatch: 'full'
  },
  {
    path: 'enrollment', component: EnrollmentComponent
  },
  {
    path: 'clients-list', component: ClientsListComponent
  },
  {
    path: 'client-add', component: ClientFormComponent
  },
  {
    path: 'client-edit/:clientId', component: ClientFormComponent
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
