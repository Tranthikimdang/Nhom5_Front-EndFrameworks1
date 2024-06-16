import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  imports: [BreadcrumbModule, FormsModule, CommonModule],
  declarations: [],
})
export class ProductsModule {}
