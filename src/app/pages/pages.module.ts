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
import { CommentsHistoryModule } from './comments-history/comments-history.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { CommentsModule } from './comments/comments.module';
import { UnitComponent } from './unit/unit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './unit/user/create-user/create.component';
import { UpdateUserComponent } from './unit/user/update-user/update.component';
import { DeleteComponent } from './unit/user/delete-user/delete.component';
import { FormsModule } from '@angular/forms';
import { DeleteCateComponent } from './unit/category/delete-cate/delete-cate.component';
import { UpdateCateComponent } from './unit/category/update-cate/update-cate.component';
import { CreateCateComponent } from './unit/category/create-cate/create-cate.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    // DashboardModule,
    NbMenuModule,
    PaginatorModule,
    CommentsModule,
    CommentsHistoryModule,
    FormsModule
  ],
  declarations: [
    PagesComponent,
    ProductsComponent,
    CategoriesComponent,
    UsersComponent,
    OrdersComponent,
    // CommentsComponent,
    StatisticsComponent,
    DashboardComponent,
    UnitComponent,
    CreateUserComponent,
    UpdateUserComponent,
    DeleteComponent,
    DeleteCateComponent,
    UpdateCateComponent,
    CreateCateComponent,
  ],
  providers: [],
})
export class PagesModule {}
