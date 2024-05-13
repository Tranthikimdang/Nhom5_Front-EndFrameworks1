import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  Statistics_Revenue = [
    {
      cate: 'Nước trái cây',
      revenue: '30000000',
      ratio: '2%'
    },
    {
      cate: 'Đồ ăn vặt',
      revenue: '30000000',
      ratio: '5%'
    },
  ]

  Statistics_Client = [
    {
      cate: 'Nước trái cây',
      Customers_number: '30000000',
      Age: '13-20',
      Ratio: '5%'
    },
    {
      cate: 'Nước giải khát',
      Customers_number: '378',
      Age: '13-25',
      Ratio: '10%'
    },
    
  ]
}
