import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductsComponent} from './products/products.component';
import {UsersComponent} from './users/users.component';
import {OrdersComponent} from './orders/orders.component';
import {CommentsComponent} from './comments/comments.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {CategoriesComponent} from './categories/categories.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {breadcrumb: 'Dashboard'},
    },
    {
      path: 'products',
      component: ProductsComponent,
      data: {breadcrumb: 'products'},
    },
    {
      path: 'categories',
      component: CategoriesComponent,
      data: {breadcrumb: 'categories'},
    },
    {
      path: 'users',
      component: UsersComponent,
      data: {breadcrumb: 'users'},
    },
    {
      path: 'orders',
      component: OrdersComponent,
      data: {breadcrumb: 'orders'},
    },
    {
      path: 'comments',
      component: CommentsComponent,
      data: {breadcrumb: 'comments'},
    },
    {
      path: 'statistics',
      component: StatisticsComponent,
      data: {breadcrumb: 'statistics'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
