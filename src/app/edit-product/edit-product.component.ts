import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  /*
  ActivatedRoute : permet de récupérer les paramètres de l'url
   */
  productId!: string;
  productFormGroup!: FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private productService: ProductService,
              private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.productFormGroup = this.fb.group({
          id: [data.id],
          name: [data.name,Validators.required],
          price: [data.price,[Validators.required, Validators.min(1)]],
          checked: [data.checked]
        });
      },
      error: (err) => {
        console.log('Error', err);
      }
    });

  }


  updateProduct() {
    let product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: (data) => {
        alert(JSON.stringify(data));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
