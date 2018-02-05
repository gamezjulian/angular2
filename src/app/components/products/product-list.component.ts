import { Component } from '@angular/core'

@Component({
    templateUrl: './product-list.component.html',
    selector: 'product-list'
})
export class ProductsListComponent {
  
    constructor() {
       console.log("Products page")
    }
}