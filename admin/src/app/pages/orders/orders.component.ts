import { Component, OnInit } from '@angular/core';
import { Order } from '../entities/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'app/@core/services/apis/order.service';
import { IAlertMessage } from 'app/@theme/components/alert/ngx-alerts.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  alertMessages: IAlertMessage[] = []; // thông báo lỗi 
  orders: Order[] = [];
  filterValue = '';
  title: string;
  dataOrder: any;
  isDeleteDialogOpen = false;
  isDialogOpen = false;
  formData: FormGroup;
  editOrderId: any = null;
  isEdit = false;
  confirmationMessage: string;
  originalOrders: Order[];
  editingOrder: Order | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
  ) {
    this.formData = this.formBuilder.group({
      client: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      valueOrder: ['', Validators.required],
      payment: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getAllOrder().subscribe({
      next: (res: any) => {
        const { data, status } = res;
        if (status === 'success') {
          this.orders = data.orders;
          this.originalOrders = data.orders;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openDialogDelete(order: Order) {
    if (order) {
      this.isDeleteDialogOpen = true;
      this.confirmationMessage = `Are you sure you want to delete order ${order.orderID}?`;
      this.dataOrder = order;
      this.title = 'Confirm Delete';
    }
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editOrderId = null;
    this.formData.reset();
  }

  addOrder(): void {
    if (this.formData.valid) {
      if (!this.isEdit) {
        const newOrder: Order = {
          client: this.formData.value.client,
          quantity: this.formData.value.quantity,
          date: this.formData.value.date,
          valueOrder: this.formData.value.valueOrder,
          payment: this.formData.value.payment,
          orderID: 0
        };
        this.orderService.createOrder(newOrder).subscribe({
          next: (res: any) => {
            const { data, status } = res;
            if (status === 'success') {
              this.loadOrder();
              this.closeDialog();
              this.alertMessages = [{ status: 'success', message: 'Successful!' }]; // hiện thông báo submit thành công 
            }
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else {
        if (this.editOrderId) {
          const editedOrder: Order = {
            client: this.formData.value.client,
            quantity: this.formData.value.quantity,
            date: this.formData.value.date,
            valueOrder: this.formData.value.valueOrder,
            payment: this.formData.value.payment,
            orderID: this.editOrderId
          };
          this.orderService.updateOrder(editedOrder).subscribe({
            next: () => {
              this.loadOrder();
              this.closeDialog();
              this.alertMessages = [{ status: 'success', message: 'Successful!' }]; // hiện thông báo submit thành công 
            },
            error: (err) => {
              console.error('Error updating order:', err);
            },
          });
        }
      }
    } else {
      console.log('Invalid form data');
    }
  }

  filter() {
    if (!this.originalOrders) {
      return;
    }
    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.orders = this.originalOrders;
      return;
    }

    this.orders = this.originalOrders.filter((order) => {
      return order.client.toLowerCase().includes(filterText);
    });
  }

  trackByOrder(index: number, order: Order): number {
    return order.orderID;
  }

  handleDelete() {
    if (this.dataOrder && this.dataOrder.orderID) {
      this.orderService.deleteOrder(this.dataOrder.orderID).subscribe({
        next: () => {
          this.isDeleteDialogOpen = false;
          this.dataOrder = null;
          this.loadOrder();
          this.alertMessages = [{ status: 'success', message: 'Successful!' }]; // hiện thông báo submit thành công 
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  close() {
    this.isDeleteDialogOpen = false;
  }

  openEditDialog(order: Order) {
    this.isDialogOpen = true;
    this.isEdit = true;
    this.editOrderId = order.orderID;
    this.formData.patchValue({
      client: order.client,
      quantity: order.quantity,
      date: order.date,
      valueOrder: order.valueOrder,
      payment: order.payment,
    });
  }

  closeEditDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editOrderId = null;
    this.formData.reset();
  }

  editOrder(order: Order) {
    this.editingOrder = order;
    this.openEditDialog(order);
  }
}
