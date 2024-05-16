import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PaginatorModule } from '../@theme/components/paginator/paginator.module';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CommentsHistoryModule } from './comments-history/comments-history.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { CommentsModule } from './comments/comments.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    PaginatorModule,
    CommentsModule,
    CommentsHistoryModule,
  ],
  declarations: [
    PagesComponent,
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
    OrdersComponent,
    // CommentsComponent,
    StatisticsComponent,
  ],
  providers: [],
})
export class PagesModule {}
