import { Component, OnInit } from '@angular/core';
import { Product } from '../entities/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: Product[] = [
    {
      productID: 1,
      productCode: "C001",
      productType: "Beverage",
      productName: "Coca Cola",
      imageURL: "https://tea-3.lozi.vn/v1/ship/resized/losupply-ninh-thuan-thanh-pho-phan-rang-thap-cham-ninh-thuan-1648800066330548890-nuoc-ngot-coca-cola-lon-320ml-0-1658896003?w=480&type=o",
      price: 1.50,
      view: 1500,
      expiryDate: "2024-12-31",
      quantity: 100
  },
  {
      productID: 2,
      productCode: "C002",
      productType: "Snack",
      productName: "Potato Chips",
      imageURL: "https://m.media-amazon.com/images/I/813axPlVxBL._SX679_.jpg",
      price: 2.00,
      view: 800,
      expiryDate: "2024-06-30",
      quantity: 50
  },
  {
      productID: 3,
      productCode: "C003",
      productType: "Dairy",
      productName: "Milk",
      imageURL: "https://gutafood.vn/wp-content/uploads/2020/09/sua-tuoi-tiet-trung-nguyen-kem-meadow-fresh-hop-1-lit-2-247x296.jpg",
      price: 1.20,
      view: 500,
      expiryDate: "2024-05-20",
      quantity: 30
  },
  {
      productID: 4,
      productCode: "C004",
      productType: "Bakery",
      productName: "Bread",
      imageURL: "https://i5.walmartimages.com/seo/Nature-s-Own-Butterbread-Sliced-White-Bread-Loaf-20-oz_8dcbd46b-895e-4b52-ba78-e9c3ca8d9f7e.8aa84b73b45fed02b8a8433d3cc5d824.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      price: 1.00,
      view: 400,
      expiryDate: "2024-05-15",
      quantity: 20
  },
  {
      productID: 5,
      productCode: "C005",
      productType: "Frozen Food",
      productName: "Pizza",
      imageURL: "https://thucphamsieuthi.vn/wp-content/uploads/2021/08/banh-pizza-hai-san-dong-lanh.jpg",
      price: 5.00,
      view: 600,
      expiryDate: "2025-01-01",
      quantity: 15
  },
  {
      productID: 6,
      productCode: "C006",
      productType: "Beverage",
      productName: "Orange Juice",
      imageURL: "https://target.scene7.com/is/image/Target/GUEST_2b7f75ea-fbb8-4767-8b1f-6bb809bfe214?wid=1200&hei=1200&qlt=80&fmt=webp",
      price: 2.50,
      view: 700,
      expiryDate: "2024-07-15",
      quantity: 40
  },
  {
      productID: 7,
      productCode: "C007",
      productType: "Snack",
      productName: "Chocolate Bar",
      imageURL: "https://i5.walmartimages.com/seo/Hershey-s-Milk-Chocolate-XL-Candy-Bar-4-4-oz-16-Pieces_068168f9-5e33-4024-86f1-e9f33017b34e.56a0ac3569d24c7b0920d18881b88888.jpeg",
      price: 1.00,
      view: 900,
      expiryDate: "2024-11-11",
      quantity: 60
  },
  {
      productID: 8,
      productCode: "C008",
      productType: "Household",
      productName: "Detergent",
      imageURL: "https://primomart.ph/cdn/shop/products/image_20cb6cf2-c65d-4cbe-afd4-a9c87bb9c797_504x504.jpg?v=1590477093",
      price: 3.00,
      view: 300,
      expiryDate: "2025-12-31",
      quantity: 25
  }
  ];
  constructor() { }
  ngOnInit() {
  }

}
