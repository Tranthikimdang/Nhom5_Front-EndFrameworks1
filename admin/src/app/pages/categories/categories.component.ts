import { Component, OnInit } from '@angular/core';
import { Category } from '../entities/categories';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'app/@core/services/apis/category.service';
import { IAlertMessage } from 'app/@theme/components/alert/ngx-alerts.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  alertMessages: IAlertMessage[] = []; // thông báo lỗi
  categories: Category[] = [];
  filterValue = '';
  title: string;
  dataCategory: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editCategoryId: any = null;
  isEdit = false;
  confirmationMessage: string;
  originalCategories: Category[];
  editingCategory: Category | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.formData = this.formBuilder.group({
      cateName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe({
      next: (res: any) => {
        const { data, status } = res;
        if (status === 'success') {
          this.categories = data.categories;
          this.originalCategories = data.categories;
        }
      },
      error: (err) => {
        console.error('Error loading category', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openDialogDelete(cate: Category) {
    if (cate) {
      this.isDeleteDialogOpen = true;
      this.dataCategory = cate;
      this.title = 'Confirm Delete';
      this.confirmationMessage = `Bạn có chắc chắn muốn xóa danh mục ${cate.cateName}?`;
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editCategoryId = null;
    this.formData.reset();
  }

  addCategory(): void {
    if (this.formData.valid) {
      if (!this.isEdit) {
        const newCategory: Category = {
          cateName: this.formData.value.cateName,
        };

        this.categoryService.createCategory(newCategory).subscribe({
          next: () => {
            this.isDialogOpen = false;
            this.loadCategory();
          },
          error: (err) => {
            console.error('Lỗi khi thêm:', err);
          },
        });
      } else {
        if (this.editingCategory) {
          const editedCategory: Category = {
            cateId: this.editingCategory.cateId,
            cateName: this.formData.value.cateName,
          };
          this.categoryService.updateCategory(editedCategory).subscribe({
            next: () => {
              this.isDialogOpen = false;
              this.loadCategory();
            },
            error: (err) => {
              console.error('Lỗi khi sửa:', err);
            },
          });
        }
      }
      this.closeDialog();
      this.alertMessages = [{ status: 'success', message: 'Successful!' }]; // hiện thông báo submit thành công
    } else {
      console.log('Form không hợp lệ');
    }
  }

  filter() {
    if (!this.originalCategories) {
      return;
    }

    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.categories = this.originalCategories;
      return;
    }

    this.categories = this.originalCategories.filter((cate) => {
      const cateName = cate.cateName.trim().toLowerCase();

      return cateName.includes(filterText);
    });
  }

  trackByCategory(index: number, category: Category): number {
    return category.cateId;
  }

  handleDelete() {
    if (this.dataCategory && this.dataCategory.cateId) {
      this.isDeleteDialogOpen = false;
      this.categoryService.deleteCategory(this.dataCategory.cateId).subscribe({
        next: () => {
          this.isDeleteDialogOpen = false;
          this.dataCategory = {};
          this.loadCategory();
          this.alertMessages = [{ status: 'success', message: 'Successful!' }];
        },
        error: (err: any) => {
          console.error('Lỗi khi xóa:', err);
        },
      });
    }
  }

  close() {
    this.isDeleteDialogOpen = false;
  }

  openEditDialog(cate: Category) {
    this.isDialogOpen = true;
    this.isEdit = true;
    this.editCategoryId = cate.cateId;
    this.formData.patchValue({
      cateName: cate.cateName,
    });
  }

  closeEditDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editingCategory = null;
    this.formData.reset();
  }

  editCategory(cate: Category) {
    this.editingCategory = cate;
    this.openEditDialog(cate);
  }
}
