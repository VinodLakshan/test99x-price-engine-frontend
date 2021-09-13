import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {ProductPriceDetail} from "../../model/product-price-detail";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.css']
})
export class ProductsCartComponent implements OnInit {

  products!: Product[];
  productPriceDetails: ProductPriceDetail = new ProductPriceDetail();
  productsInTheCart: ProductPriceDetail[] = [];
  totalPrice: number = 0;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductDetails();
  }


  calculatePrice(productForm: NgForm) {
    if (!productForm.invalid) {
      this.productService.calculateProductPrice(this.productPriceDetails).subscribe(
        data => {
          this.productsInTheCart.push(data)
          this.totalPrice += data.totalPrice;

      // Optimize count in Cart Table
      //------------------------------------------
      // if (this.productsInTheCart.length > 0) {
      //   this.productsInTheCart.forEach(product => {
      //     if ((product.productId == data.productId) && (product.quantityType == data.quantityType)) {
      //       product.quantity += data.quantity;
      //       product.totalPrice += data.totalPrice
      //
      //     } else {
      //       this.productsInTheCart.push(data);
      //     }
      //   })
      // } else {
      //   this.productsInTheCart.push(data);
      // }

        },
        error => console.log(error)
      );

    }
  }

  /**
   * Get All Products
   * @private
   */
  private getProductDetails() {
    this.productService.getAllProducts().then(data => {
      this.products = data;
    });
  }

}
