import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../entities/dashboard';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard[] = [
    {
      dashboardID: 1,
      name: 'CestBon',
      cateName: 'snack',
      price: 20,
      qty: 50,
      imageURL:
        'https://gs25.com.vn/media/5252/cestbon-banh-s%E1%BB%A3i-th%E1%BB%8Bt-ga-85g-5-cai.jpg',
    },
    {
      dashboardID: 2,
      name: 'COCA',
      cateName: 'Nước ngọt',
      price: 30,
      qty: 5,
      imageURL:
        'https://tea-3.lozi.vn/v1/ship/resized/losupply-ninh-thuan-thanh-pho-phan-rang-thap-cham-ninh-thuan-1648800066330548890-nuoc-ngot-coca-cola-lon-320ml-0-1658896003?w=480&type=o',
    },

  ];
  constructor() {}
  ngOnInit(): void {}
  
}
