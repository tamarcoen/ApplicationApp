import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationDetailsComponent } from './network/components/application-details/application-details.component';
import { ApplicationComponent } from './network/components/application/application.component';

const routes: Routes = [
  { path: '', redirectTo: '/application', pathMatch: 'full' },
  { path: 'application', component: ApplicationComponent },
  { path: 'appDetails/:id', component: ApplicationDetailsComponent },
  { path: '**', redirectTo: '/application' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
