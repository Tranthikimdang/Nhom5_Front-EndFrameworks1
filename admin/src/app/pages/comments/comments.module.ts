import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule, FormsModule, CommonModule],
  declarations: [],
})
export class CommentsModule {}
