import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductPricesComponent} from "./component/product-prices/product-prices.component";
import {ProductsCartComponent} from "./component/products-cart/products-cart.component";

const routes: Routes = [
  {path: "products", component: ProductPricesComponent},
  {path: "cart", component: ProductsCartComponent},
  {path: "", redirectTo: "products", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
