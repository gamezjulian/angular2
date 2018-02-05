import { Component } from '@angular/core'
import { ProductService } from './product.service'

@Component({
    templateUrl: './product-list.component.html',
    selector: 'product-list'
})
export class ProductsListComponent {

    constructor(private productService: ProductService) {
        console.log("Products page")
    }
}