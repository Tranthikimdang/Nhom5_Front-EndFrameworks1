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
import { CreateComponent } from './unit/create/create.component';
import { EditComponent } from './unit/edit/edit.component';
import { DeteleComponent } from './unit/detele/detele.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    // DashboardModule,
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
    DashboardComponent,
    UnitComponent,
    CreateComponent,
    EditComponent,
    DeteleComponent,
    ProfileComponent,
    CreateProductComponent,
    UpdateProductComponent,
  ],
  providers: [],
})
export class PagesModule {}
