import { Routes } from '@angular/router'

//pages
import { HomeComponent } from './components/home/home.component'
import { ProductsListComponent } from './components/products/product-list.component'
import { AddProductComponent } from './components/products/add-product.component'

export const appRoutes: Routes = [
    { path: '*', component: HomeComponent, pathMatch: 'full' },
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: AddProductComponent },    
]