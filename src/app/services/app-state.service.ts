import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productsState: any = {
  products :[],
  keyword : "",
  totalPages :0,
  pageSizes:4,
  currentPage:1,
  productsSizeInPage:0,
  totalProducts:0,
  }

  constructor() { }
}
