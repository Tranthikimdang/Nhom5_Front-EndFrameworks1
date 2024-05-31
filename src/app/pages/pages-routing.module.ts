import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CommentsComponent } from './comments/comments.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommentsHistoryComponent } from './comments-history/comments-history.component';
import { CreateUserComponent } from './unit/user/create-user/create.component';
import { UpdateUserComponent } from './unit/user/update-user/update.component';
import { CreateCateComponent } from './unit/category/create-cate/create-cate.component';
import { UpdateCateComponent } from './unit/category/update-cate/update-cate.component';



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
      path: 'add-cate',
      component: CreateCateComponent,
      data: {breadcrumb: 'add-cate'},
    },
    {
      path: 'edit-cate',
      component: UpdateCateComponent,
      data: {breadcrumb: 'edit-cate'},
    },
    {
      path: 'users',
      component: UsersComponent,
      data: {breadcrumb: 'users'},
    },
    {
      path: 'add-user',
      component: CreateUserComponent,
      data: {breadcrumb: 'add-user'},
    },
    {
      path: 'edit-user',
      component: UpdateUserComponent,
      data: {breadcrumb: 'edit-user'},
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
      path: 'comments-history',
      component: CommentsHistoryComponent,
      data: { breadcrumb: 'comments-history' },
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
export class PagesRoutingModule {}
