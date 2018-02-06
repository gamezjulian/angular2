import { Component } from '@angular/core'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'

import { Router } from '@angular/router'
import { Product } from './product.entity';

@Component({
    templateUrl: './product-list.component.html',
    selector: 'product-list'
})
export class ProductsListComponent {

    products: Array<IProduct>;

    constructor(
        private productService: ProductService,
        private router: Router) {

        this.getProducts();
    }

    getProducts(): void {
        this.productService.getProducts()
            .subscribe(items => {
                this.products = items;
            });
    }

    edit(id: number): void {
        this.router.navigateByUrl(`/products/${id}`)
    }

    delete(id: number): void {
        let product = new Product();
        product.id = id;

        this.productService.deleteProduct(product)
            .subscribe((p) => {
                this.products = this.products.filter((x) => x.id != id);
            });
    }
}