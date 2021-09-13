import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {Product} from "../../model/product";
import {ProductPriceDetail} from "../../model/product-price-detail";

@Component({
  selector: 'app-product-prices',
  templateUrl: './product-prices.component.html',
  styleUrls: ['./product-prices.component.css']
})
export class ProductPricesComponent implements OnInit {

  products!: Product[];
  initialUnitQuantities = [1,5, 10, 20, 30, 40, 50];
  initialProductPriceDetails: ProductPriceDetail[] = [];

  constructor(private productService: ProductService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getProductDetails()
    this.getDataForPriceListTable();
  }

  /**
   * Set up product data for price list table
   * @private
   */
  private getDataForPriceListTable() {
    for (const unitCount of this.initialUnitQuantities) {
      for (const product of this.products) {
        const priceDetail = new ProductPriceDetail();
        priceDetail.productId = product.productId;
        priceDetail.quantityType = "units";
        priceDetail.quantity = unitCount;

        this.initialProductPriceDetails.push(priceDetail);
      }
    }

    this.getCalculatedMultipleProductPrices();
  }

  /**
   * Get All Products
   * @private
   */
  private async getProductDetails(): Promise<void>  {
    this.products = await this.productService.getAllProducts();
  }

  /**
   * Get calculated multiple products prices
   * @private
   */
  private getCalculatedMultipleProductPrices() {
    this.productService.calculateMultipleProductPrice(this.initialProductPriceDetails).subscribe(
      data => {
        this.initialProductPriceDetails = data;
      },
      error => console.log(error)
    )
  }

}
