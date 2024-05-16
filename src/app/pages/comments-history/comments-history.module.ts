import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsHistoryComponent } from './comments-history.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
@NgModule({
  imports: [BreadcrumbModule, FormsModule, CommonModule],
  declarations: [CommentsHistoryComponent],
})
export class CommentsHistoryModule {}
