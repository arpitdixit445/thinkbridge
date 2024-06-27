import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';

const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"addrestaurant",component:AddRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
