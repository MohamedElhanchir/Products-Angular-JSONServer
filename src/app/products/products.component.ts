import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{



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
              private router: Router,
              public appState: AppStateService) {

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
   this.productService.searchProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSizes).subscribe({

      next: (data) => {
        this.appState.productsState.products = data.body as Product[];
        let totalProducts:number = parseInt(data.headers.get('X-Total-Count')!);
        console.log('Total Products', totalProducts);
        this.appState.productsState.totalProducts = totalProducts;

        this.appState.productsState.totalPages = ~~(totalProducts/this.appState.productsState.pageSizes);
        console.log('Total Pages', this.appState.productsState.totalPages);
        //~~ permet de retourner un entier en typeS
        if(totalProducts % this.appState.productsState.pageSizes!=0){
          this.appState.productsState.totalPages++;
        }
        console.log('Total Pages', this.appState.productsState.totalPages);

        this.appState.productsState.productsSizeInPage = this.appState.productsState.pageSizes+(totalProducts-(this.appState.productsState.totalPages*this.appState.productsState.pageSizes));


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
            //this.searchProducts()();
            /*
            si je fais un searchProducts() ici, je vais faire un appel à l'api
            pour récupérer la liste des produits. Mais je peux faire une suppression
            locale en supprimant le produit de la liste des produits
            si je le fais j'ai pas besoin du code au dessus et le variable $productsSizeInPage
             */
            this.appState.productsState.products = this.appState.productsState.products.filter((p:any) => p.id !== product.id);
            this.appState.productsState.totalProducts--;
            this.appState.productsState.productsSizeInPage--;
            if (this.appState.productsState.productsSizeInPage == 0) {
              this.appState.productsState.currentPage--;
              this.searchProducts();
            }
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
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }
}
