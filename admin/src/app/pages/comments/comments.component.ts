import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Thêm FormBuilder và Validators vào imports
import { Icomments } from '../entities/comments';
import { CommentService } from 'app/@core/services/apis/comment.service';

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
  originalComments: Icomments[]; // Sửa kiểu dữ liệu của originalComments

  constructor(private formBuilder: FormBuilder, private commentService: CommentService)  { // Thêm commentService vào constructor
    this.formData = this.formBuilder.group({
      userName: ['', Validators.required],
      commentsEmail: ['', [Validators.required, Validators.email]],
      // imageUrl: ['', [Validators.required, Validators.pattern('(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)')]], // Thêm Validators.required và Validators.pattern
      imageUrl: ['', [Validators.required]],
      productName: ['', Validators.required],
      commentsContent: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadComment();
  }

  loadComment() {
    this.commentService.getAllComment().subscribe({
      next: (res: any) => { // Sửa kiểu dữ liệu của res
        const { data, status } = res;
        if (status === 'success') {
          this.comments = data.comments;
          this.originalComments = data.comments; // Lưu trữ các ý kiến ​​​​ban đầu
        }
      },
      error: (err) => {
        console.error('Error loading comments', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openDialogDelete(comment: Icomments) { // Sửa kiểu dữ liệu của comment
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

  addComment(): void {
    if (this.formData.valid) {
      if (!this.isEdit) {
        const newComment: Icomments = {
          userName: this.formData.value.userName,
          commentsEmail: this.formData.value.commentsEmail,
          imageUrl: this.formData.value.imageUrl,
          commentsContent: this.formData.value.commentsContent,
          productName: this.formData.value.productName,
        };

        this.commentService.createComment(newComment).subscribe({
          next: () => { // Sửa kiểu dữ liệu của next
            this.isDialogOpen = false;
            this.loadComment();
          },
          error: (err) => {
            console.error('Lỗi khi thêm:', err);
          },
        });
      } else {
        if (this.editCommentId) {
          const editedComment: Icomments = {
            commentsId: this.editCommentId,
            userName: this.formData.value.userName,
            commentsEmail: this.formData.value.commentsEmail,
            imageUrl: this.formData.value.imageUrl,
            commentsContent: this.formData.value.commentsContent,
            productName: this.formData.value.productName,
          };

          this.commentService.updateCommennt(editedComment).subscribe({ // Sửa tên hàm từ updateCommennt thành updateComment
            next: () => { // Sửa kiểu dữ liệu của next
              this.isDialogOpen = false;
              this.loadComment();
            },
            error: (err) => {
              console.error('Lỗi khi sửa:', err);
            },
          });
        }
      }
      this.closeDialog();
    } else {
      // Hiển thị thông báo lỗi
      console.log('Form không hợp lệ');
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

    this.comments = this.originalComments.filter(comment => {
      const userName = comment.userName.trim().toLowerCase();
      const commentsEmail = comment.commentsEmail.trim().toLowerCase();
      const productName = comment.productName.trim().toLowerCase();
      const commentsContent = comment.commentsContent.trim().toLowerCase();
      
      return userName.includes(filterText) ||
             commentsEmail.includes(filterText) ||
             productName.includes(filterText) ||
             commentsContent.includes(filterText);
    });
  }

  trackByComment(index: number, comment: Icomments): number {
    return comment.commentsId;
  }

  handleDelete() {
    if (this.dataComment && this.dataComment.commentsId) {
    this.isDeleteDialogOpen = false;
    this.commentService.deleteComment(this.dataComment.commentsId).subscribe({
    next: () => { // Sửa kiểu dữ liệu của next
    this.isDeleteDialogOpen = false;
    this.dataComment = {};
    this.loadComment();
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
}
