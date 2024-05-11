import {NgModule} from '@angular/core';
import {NbMenuModule} from "@nebular/theme";
import {ThemeModule} from '../@theme/theme.module';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PaginatorModule} from "../@theme/components/paginator/paginator.module";
<<<<<<< HEAD
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CommentsComponent } from './comments/comments.component';
import { StatisticsComponent } from './statistics/statistics.component';
=======
>>>>>>> main

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    PaginatorModule,
  ],
  declarations: [
    PagesComponent,
<<<<<<< HEAD
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
    OrdersComponent,
    CommentsComponent,
    StatisticsComponent,
=======
>>>>>>> main
  ],
  providers: []
})
export class PagesModule { }
