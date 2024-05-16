import { Component, OnInit } from '@angular/core';
import { Icomments } from '../../entities/comments';
@Component({
  selector: 'app-comments-history',
  templateUrl: './comments-history.component.html',
  styleUrls: ['./comments-history.component.scss'],
})
export class CommentsHistoryComponent implements OnInit {
  defaultComments: Icomments[] = [
    {
      commentsId: 1,
      userName: 'Kim Đang',
      commentsEmail: 'dang@gmail.com',
      commentsDate: '2024-05-14 7:30 AM',
      productName: 'CestBon',
      commentsContent: 'Bánh CestBon hương vị thơm ngon',
      imageUrl:
        'https://gs25.com.vn/media/5252/cestbon-banh-s%E1%BB%A3i-th%E1%BB%8Bt-ga-85g-5-cai.jpg',
    },
    {
      commentsId: 2,
      userName: 'Hoàng phi',
      commentsEmail: 'phi@gmail.com',
      commentsDate: '2024-05-15 8:00 AM',
      productName: 'Bánh Gạo An',
      commentsContent: 'Bánh gạo giòn giòn thơm ngon',
      imageUrl:
        'https://gs25.com.vn/media/5246/orion-banh-g%E1%BA%A1o-an-v%E1%BB%8B-t%E1%BA%A3o-bi%E1%BB%83n-1113g.jpg',
    },
    {
      commentsId: 3,
      userName: 'Nghiêm',
      commentsEmail: 'nghiem@gmail.com',
      commentsDate: '2024-05-16 9:30 AM',
      productName: 'Khoai tây chiên',
      commentsContent: 'Bánh Snack Ostar vị bùi ngon',
      imageUrl:
        'https://gs25.com.vn/media/5240/ostar-khoai-t%C3%A2y-chi%C3%AAn-v%E1%BB%8B-tr%E1%BB%A9ng-mu%E1%BB%91i-56g.jpg',
    },
    {
      commentsId: 4,
      userName: 'Ái',
      commentsEmail: 'ai@gmail.com',
      commentsDate: '2024-05-17 10:00 AM',
      productName: 'khoai tây bốn vị',
      commentsContent: 'Vị tảo ngọt, sự kết hợp tuyệt vời',
      imageUrl:
        'https://gs25.com.vn/media/5242/orion-snack-khoai-t%C3%A2y-b%E1%BB%91n-v%E1%BB%8B-150g.jpg',
    },
    {
      commentsId: 5,
      userName: 'Minh',
      commentsEmail: 'minh@gmail.com',
      commentsDate: '2024-05-18 10:30 AM',
      productName: 'MAX vị bò',
      commentsContent: 'Snack vị bò',
      imageUrl:
        'https://gs25.com.vn/media/5250/swing-maxx-ktc-v%E1%BB%8B-b%C3%B2-n%C6%B0%E1%BB%9Bng-108g.jpg',
    },
  ];
  comments: Icomments[] = [];
  filterValue = '';

  constructor() {}

  ngOnInit(): void {
    this.comments = this.defaultComments;
  }

  filter() {
    console.log(this.filterValue);

    // Kiểm tra filter trống
    if (!this.filterValue) {
      this.comments = this.defaultComments; // Hiển thị lại danh sách sản phẩm gốc
      return;
    }

    // Lọc sản phẩm
    const filterText = this.filterValue.toLowerCase();
    console.log(filterText);

    this.comments = this.defaultComments.filter((p) =>
      p.productName.toLowerCase().includes(filterText)
    );
  }
}
