import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Icomments } from '../entities/comments';
import { CommentService } from 'app/@core/services/apis/comment.service';
import { ImageUploadService } from 'app/@core/services/apis/upload.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'assets/fonts/OpenSans-Regular-normal.js';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Icomments[] = [];
  filterValue = '';
  title: string;
  dataComment: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editCommentId: any = null;
  isEdit = false;
  confirmationMessage: string;
  file: any = null;
  originalComments: Icomments[];
  alertMessages: any[] = [];
  last_page: number = 1;
  page: number = 1;
  limit: number = 5;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private imageUploadService: ImageUploadService
  ) {
    this.formData = this.formBuilder.group({
      userName: ['', Validators.required],
      commentsEmail: ['', [Validators.required, Validators.email]],
      imageUrl: ['', [Validators.required]],
      productName: ['', Validators.required],
      commentsContent: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadComment();
  }

  loadComment(page: number = 1) {
    this.commentService.getAllComment(page, this.limit).subscribe({
      next: (res: any) => {
        const { data, status, pagination } = res;

        if (status === 'success') {
          this.comments = data.comments?.map((comment: any, index: number) => ({
            ...comment,
            index: this.limit * (page - 1) + index,
          }));
          console.log(this.comments);

          this.originalComments = data.comments;
          this.last_page = pagination.totalPages;
          this.page = pagination.page;
        }
      },
      error: (err) => {
        console.error('Error loading comments', err);
      },
    });
  }

  getPage(currentPage: number) {
    console.log('commentPage', currentPage);

    this.loadComment(currentPage);
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openDialogDelete(comment: Icomments) {
    if (comment) {
      this.isDeleteDialogOpen = true;
      this.dataComment = comment;
      this.title = 'Confirm Delete';
      this.confirmationMessage = `Are you sure you want to delete the comment from ${comment.userName}?`;
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editCommentId = null;
    this.formData.reset();
  }

  async addComment(): Promise<void> {
    if (this.formData.valid) {
      const formDataImg = new FormData();
      formDataImg.append('image', this.file);

      try {
        const res = await this.imageUploadService
          .uploadImage(formDataImg)
          .toPromise();
        if (res.status === 201) {
          const imageUrl = res.imagePath;

          if (!this.isEdit) {
            const newComment: Icomments = {
              userName: this.formData.value.userName,
              commentsEmail: this.formData.value.commentsEmail,
              imageUrl: imageUrl,
              commentsContent: this.formData.value.commentsContent,
              productName: this.formData.value.productName,
              createdAt: undefined,
            };

            this.commentService.createComment(newComment).subscribe({
              next: () => {
                this.isDialogOpen = false;
                this.loadComment();
              },
              error: (err) => {
                console.error('Error adding comment:', err);
              },
            });
          } else {
            if (this.editCommentId) {
              const editedComment: Icomments = {
                commentsId: this.editCommentId,
                userName: this.formData.value.userName,
                commentsEmail: this.formData.value.commentsEmail,
                imageUrl: imageUrl,
                commentsContent: this.formData.value.commentsContent,
                productName: this.formData.value.productName,
                createdAt: undefined,
              };

              this.commentService.updateCommennt(editedComment).subscribe({
                next: () => {
                  this.isDialogOpen = false;
                  this.loadComment();
                },
                error: (err) => {
                  console.error('Error updating comment:', err);
                },
              });
            }
          }
        } else {
          console.error('Error uploading image:', res);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }

      this.closeDialog();
      this.alertMessages = [{ status: 'success', message: 'Successful!' }];
    } else {
      console.log('Form is invalid');
    }
  }

  filter() {
    if (!this.originalComments) {
      return;
    }

    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.comments = this.originalComments;
      return;
    }

    this.comments = this.originalComments.filter((comment) => {
      const userName = comment.userName.trim().toLowerCase();
      const commentsEmail = comment.commentsEmail.trim().toLowerCase();
      const productName = comment.productName.trim().toLowerCase();
      const commentsContent = comment.commentsContent.trim().toLowerCase();

      return (
        userName.includes(filterText) ||
        commentsEmail.includes(filterText) ||
        productName.includes(filterText) ||
        commentsContent.includes(filterText)
      );
    });
  }

  trackByComment(index: number, comment: Icomments): number {
    return comment.commentsId;
  }

  handleDelete() {
    if (this.dataComment && this.dataComment.commentsId) {
      this.isDeleteDialogOpen = false;
      this.commentService.deleteComment(this.dataComment.commentsId).subscribe({
        next: () => {
          this.isDeleteDialogOpen = false;
          this.dataComment = {};
          this.loadComment();
          this.alertMessages = [{ status: 'success', message: 'Successful!' }];
        },
        error: (err: any) => {
          console.error('Error deleting comment:', err);
        },
      });
    }
  }

  onImageSelected(event) {
    this.file = event.target.files[0];
  }

  close() {
    this.isDeleteDialogOpen = false;
  }

  // Hàm chuyển đổi URL hình ảnh thành Base64
  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }

  // xuất file pdf
  public async exportPdf() {
    const doc = new jsPDF('p', 'mm', 'a4'); // Tạo một tài liệu PDF mới với kích thước A4
    const exportData: any[] = [];
    const exportColumns = {
      commentsId: 'ID',
      userName: 'Username',
      commentsEmail: 'Email',
      productName: 'Product name',
      imageUrl: 'Image',
      commentsContent: 'Comment content',
      createdAt: 'Time',
    };

    // Đăng ký font trước khi sử dụng
    if (doc.getFontList()['Open Sans']) {
      doc.setFont('Open Sans');
    }

    // Thêm productID tự động tăng từ 1
    for (let i = 0; i < this.comments.length; i++) {
      this.comments[i].commentsId= i + 1;
    }

    // Chuyển đổi URL hình ảnh sang Base64 trước khi thêm vào PDF
    for (const comment of this.comments) {
      const base64Image = await this.getBase64ImageFromURL(comment.imageUrl);
      const row = [
        comment.commentsId,
        comment.userName,
        comment.commentsEmail,
        comment.productName,
        { image: base64Image, width: 26, height: 20 },
        comment.commentsContent,
        comment.createdAt,
      ];
      exportData.push(row);
    }

    autoTable(doc, {
      head: [Object.values(exportColumns)], // Mảng các tiêu đề cột
      body: exportData, // Mảng các dòng dữ liệu
      didDrawCell: (data) => {
        if (data.column.index === 3 && data.cell.raw) {
          const { image, width, height }: any = data.cell.raw;
          if (width > 0 && height > 0) {
            const xPos = data.cell.x + (data.cell.width - width) / 2; // Canh giữa hình ảnh theo chiều ngang trong ô
            const yPos = data.cell.y + (data.cell.height - height) / 2; // Canh giữa hình ảnh theo chiều dọc trong ô

            doc.addImage(image, xPos, yPos, width, height); // Thêm hình ảnh vào tài liệu PDF
          } else {
            console.error('Kích thước hình ảnh không hợp lệ:', width, height);
          }
        }
      },
      styles: {
        font: 'OpenSans-Regular',
        fontSize: 9,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        valign: 'middle',
      },
      columnStyles: {
      //   0: { cellWidth: 20 }, // Tên người dùng
      //   1: { cellWidth: 35 }, // Email
      //   2: { cellWidth: 30 }, // Tên sản phẩm
        3: { cellWidth: 30, minCellHeight: 30 }, // Hình ảnh (điều chỉnh chiều rộng nếu cần)
      //   4: { cellWidth: 50 }, // Nội dung bình luận
      //   5: { cellWidth: 30 }, // Thời gian
      },
      headStyles: {
        fillColor: [200, 200, 255], // Màu nền header
        textColor: [0, 0, 0], // Màu chữ header
        fontStyle: 'bold', // Kiểu chữ header
        halign: 'center', // Canh giữa header
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // Màu nền body
        textColor: [0, 0, 0], // Màu chữ body
        valign: 'middle', // Canh giữa theo chiều dọc body
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245], // Màu nền của các dòng xen kẽ
      },
      margin: { top: 20, right: 10, bottom: 20, left: 10 }, // Lề của trang PDF
      pageBreak: 'auto', // Tự động ngắt trang nếu nội dung quá dài
    });

    doc.save('comments.pdf'); // Lưu tệp PDF
  }
}
