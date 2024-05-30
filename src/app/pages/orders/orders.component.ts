import { Component, OnInit } from '@angular/core';
import { Order } from '../entities/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [
    {
      orderID: 1,
      client: 'Kim Đang',
      quantity: 2,
      valueOrder: '20',
      date: '2024-05-01',
      payment: 'Credit Card',
    },
    {
      orderID: 2,
      client: 'Hoàng Phi',
      quantity: 5,
      valueOrder: '50',
      date: '2024-05-01',
      payment: 'Direct payment',
    },
    {
      orderID: 3,
      client: 'Khiêm',
      quantity: 4,
      valueOrder: '30',
      date: '2024-05-01',
      payment: 'Paypal',
    },
    {
        orderID: 4,
        client: 'Diễm Ái',
        quantity: 7,
        valueOrder: '50',
        date: '2024-05-01',
        payment: 'Direct payment',
      }
  ];
  constructor() {}
  ngOnInit(): void {}
}
