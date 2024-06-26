import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
// import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PaginatorModule } from '../@theme/components/paginator/paginator.module';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { CommentsModule } from './comments/comments.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialog/dialog.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsDetailComponent } from './statistics-detail/statistics-detail.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    // DashboardModule,
    NbMenuModule,
    PaginatorModule,
    // CommentsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
    OrdersComponent,
    CommentsComponent,
    StatisticsComponent,
    DashboardComponent,
    DialogComponent,
    StatisticsDetailComponent,
  ],
  providers: [],
})
export class PagesModule {}
