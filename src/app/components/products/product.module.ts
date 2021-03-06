//components
import { ProductsListComponent } from './product-list.component'
import { AddProductComponent } from './add-product.component'

//services
import { ProductService } from './product.service'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modules
import { HttpModule } from '@angular/http'

import { ReactiveFormsModule } from '@angular/forms';
import { ProductData } from './products-data'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
    declarations: [
        ProductsListComponent,
        AddProductComponent
    ],
    imports: [
        HttpModule,
        InMemoryWebApiModule.forRoot(ProductData),
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [ProductService],
    bootstrap: []
})
export class ProductModule { }