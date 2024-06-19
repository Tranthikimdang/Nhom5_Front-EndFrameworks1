export interface Icomments {
  createdAt: any;
  commentsId?: number;
  userName: string;
  commentsEmail: string;
  productName: string;
  imageUrl?: string;
  imageFile?: File; // Tệp ảnh được tải lên
  commentsContent: string;
  commentsDate?: string;
}
