import { Component } from '@angular/core'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'

import { Router } from '@angular/router'

@Component({
    templateUrl: './product-list.component.html',
    selector: 'product-list'
})
export class ProductsListComponent {

    products: Array<IProduct>;

    constructor(
        private productService: ProductService,
        private router: Router) {

        this.productService.getProducts()
            .subscribe(items => {
                this.products = items;
            });
    }

    edit(id: number): void {
        this.router.navigateByUrl(`/products/${id}`)
    }
}