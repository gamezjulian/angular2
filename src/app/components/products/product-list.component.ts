import { Component } from '@angular/core'
import { ProductService } from './product.service'
import { IProduct } from './product.interface';

@Component({
    templateUrl: './product-list.component.html',
    selector: 'product-list'
})
export class ProductsListComponent {

    products: Array<IProduct>;

    constructor(private productService: ProductService) {
        console.log("Products page")

        this.productService.getProducts()
            .subscribe(items => {
                this.products = items;
            });
    }
}