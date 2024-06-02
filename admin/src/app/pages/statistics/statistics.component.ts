import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  Statistics_Revenue = [
    {
      categoryCode: '1',
      categoryName: 'Snack',
      quantity: '5',
      highestPrice: '20',
      lowestPrice: '5',
      averagePrice: '12',
    },
    {
      categoryCode: '2',
      categoryName: 'Snack',
      quantity: '10',
      highestPrice: '25',
      lowestPrice: '5',
      averagePrice: '15',
    },
    {
      categoryCode: '3',
      categoryName: 'Snack',
      quantity: '10',
      highestPrice: '30',
      lowestPrice: '7',
      averagePrice: '18',
    },
  ];
}
