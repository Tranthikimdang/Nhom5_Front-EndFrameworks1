import { Component, OnInit } from '@angular/core';
import { Order } from '../entities/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  orders : Order[] = [
    {
      orderID: 1,
      code: "O001",
      image: "https://i.pinimg.com/564x/c9/20/30/c92030758845eb7cd91584e32d7c39fd.jpg",
      client: "Ran Mori",
      mailUser: "ran@example.com",
      date: "2024-05-01",
      order: "2x Coca Cola, 1x Pizza",
      payment: "Credit Card",
      delivery: "2024-05-02"
  },
  {
      orderID: 2,
      code: "O002",
      image: "https://i.pinimg.com/564x/41/62/56/41625668004822f1a19bfaa5b716ea16.jpg",
      client: "Sonoko",
      mailUser: "sonoko@example.com",
      date: "2024-05-03",
      order: "1x Bread, 3x Milk",
      payment: "PayPal",
      delivery: "2024-05-04"
  },
  {
      orderID: 3,
      code: "O003",
      image: "https://i.pinimg.com/564x/88/c5/5b/88c55b015a9feeb35da57960ab3df5eb.jpg",
      client: "Haibara",
      mailUser: "haibara@example.com",
      date: "2024-05-05",
      order: "5x Chocolate Bar, 2x Orange Juice",
      payment: "Debit Card",
      delivery: "2024-05-06"
  },
  {
      orderID: 4,
      code: "O004",
      image: "https://image.voh.com.vn/voh/Image/2022/06/13/Edogawa-Conan.jpg?w=2100&q=85",
      client: "Edogawa Conan",
      mailUser: "conan@example.com",
      date: "2024-05-07",
      order: "1x Detergent, 3x Milk",
      payment: "Credit Card",
      delivery: "2024-05-08"
  },
  {
      orderID: 5,
      code: "O005",
      image: "https://image.voh.com.vn/voh/Image/2022/06/13/vermouth.jpg?w=2100&q=85",
      client: "Vermouth",
      mailUser: "Vermouth@example.com",
      date: "2024-05-09",
      order: "2x Bread, 1x Pizza",
      payment: "Cash",
      delivery: "2024-05-10"
  },
  {
      orderID: 6,
      code: "O006",
      image: "https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/6/2/photo-1-16541421389021809425825.jpg",
      client: "Sato Miwako",
      mailUser: "sato@example.com",
      date: "2024-05-11",
      order: "3x Coca Cola, 1x Orange Juice",
      payment: "PayPal",
      delivery: "2024-05-12"
  },
  {
      orderID: 7,
      code: "O007",
      image: "https://i.pinimg.com/564x/07/9f/a7/079fa7dbb11fc2608f1e9d63adfa88fa.jpg",
      client: "Kogoro Mori",
      mailUser: "mori@example.com",
      date: "2024-05-13",
      order: "4x Bread, 2x Detergent",
      payment: "Credit Card",
      delivery: "2024-05-14"
  },
  {
      orderID: 8,
      code: "O008",
      image: "https://i.pinimg.com/564x/e5/95/c0/e595c02e20f090de504460f55fa2deac.jpg",
      client: "Hattori Heiji",
      mailUser: "heiji@example.com",
      date: "2024-05-15",
      order: "1x Milk, 1x Pizza, 2x Chocolate Bar",
      payment: "Debit Card",
      delivery: "2024-05-16"
  }
  ];
  constructor() { }
  ngOnInit(): void {
  }
}
