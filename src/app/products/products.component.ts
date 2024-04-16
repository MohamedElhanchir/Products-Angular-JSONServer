import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  products :Array<any> = [
    {id: 1, name: 'Product 1', price: 100,checked: false},
    {id: 2, name: 'Product 2', price: 200,checked: false},
    {id: 3, name: 'Product 3', price: 300,checked: true},
    {id: 4, name: 'Product 4', price: 400,checked: false},
    {id: 5, name: 'Product 5', price: 500,checked: false},
    {id: 6, name: 'Product 6', price: 600,checked: false},
  ]

  onCheckProduct(product: any) {
    product.checked = !product.checked;
  }
}
