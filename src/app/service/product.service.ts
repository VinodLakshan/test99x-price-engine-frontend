import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product";
import {ProductPriceDetail} from "../model/product-price-detail";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get All product details list
   */
  getAllProducts(): Promise<Product[]> {
    return this.httpClient.get<Product[]>(environment.productsUrl).toPromise();
  }

  /**
   * Calculate price of a product
   * @param productPriceDetails
   */
  calculateProductPrice(productPriceDetails: ProductPriceDetail) : Observable<ProductPriceDetail>{
    return this.httpClient.post<ProductPriceDetail>(environment.calculatePriceUrl, productPriceDetails);
  }

  /**
   * Calculate prices of list of product
   * @param productPriceDetailsList
   */
  calculateMultipleProductPrice(productPriceDetailsList: ProductPriceDetail[]) : Observable<ProductPriceDetail[]>{
    return this.httpClient.post<ProductPriceDetail[]>(environment.calculateMultiplePriceUrl, productPriceDetailsList);
  }
}
