import { Routes } from '@angular/router'

//pages
import { HomeComponent } from './components/home/home.component'
import { ProductsListComponent } from './components/products/product-list.component'

export const appRoutes: Routes = [
    { path: 'products', component: ProductsListComponent },
    { path: '', component: HomeComponent, pathMatch: 'full' }
]