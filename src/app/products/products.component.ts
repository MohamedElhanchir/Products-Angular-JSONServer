import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  public products :Array<Product> = [];
  public keyword: string = "";
  totalPages:number = 0;
  pageSizes:number=4;
  currentPage:number=1;

  //products$! :Observable<Array<Product>>;
 /*
 //1
  constructor(private http: HttpClient) {
  }
  */
  /*
  *maintenat on peut injecter le service ProductService
   */
  constructor(private productService: ProductService,
              private router: Router) {

  }



  ngOnInit(): void {
    this.searchProducts();
  }

  /* products :Array<any> = [
   {id: 1, name: 'Product 1', price: 100,checked: false},
   {id: 2, name: 'Product 2', price: 200,checked: false},
   {id: 3, name: 'Product 3', price: 300,checked: true},
   {id: 4, name: 'Product 4', price: 400,checked: false},
   {id: 5, name: 'Product 5', price: 500,checked: false},
   {id: 6, name: 'Product 6', price: 600,checked: false},
   {id: 7, name: 'Product 7', price: 700,checked: false}
   ]
   */

  searchProducts() {
   this.productService.searchProducts(this.keyword,this.currentPage,this.pageSizes).subscribe({

      next: (data) => {
        this.products = data.body as Product[];
        let totalProducts:number = parseInt(data.headers.get('X-Total-Count')!);
        console.log('Total Products', totalProducts);

        this.totalPages = ~~(totalProducts/this.pageSizes);
        console.log('Total Pages', this.totalPages);
        //~~ permet de retourner un entier en typeS
        if(totalProducts % this.pageSizes!=0){
          this.totalPages++;
        }
        console.log('Total Pages', this.totalPages);
      },
      error: (error) => {
        console.log('Error', error);
      }
    });
    //this.products$ = this.productService.getAllProducts();
  }


  onCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe(
      {
        /*
        * si le patch est bien passé, on met à jour le produit
         */
        next: (data) => {
          product.checked = !product.checked;
        },
        error: (error) => {
          console.log('Error', error);
        }
      }
    )
  }


  onDeleteProduct(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe(
        {
          next: (data) => {
            //this.getAllProducts();
            this.products = this.products.filter(p => p.id !== product.id);
          },
          error: (error) => {
            console.log('Error', error);
          }
        }
      )
    }
  }

  onEditProduct(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }


  HandleGoToPage(page: number) {
    this.currentPage = page;
    this.searchProducts();
  }
}
