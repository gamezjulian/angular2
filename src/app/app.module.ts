import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//routes
import { appRoutes } from './router'

//container
import { RootComponent } from './components/root/root.component'

//components
import { ProductsListComponent } from './components/products/product-list.component'
import { HomeComponent } from './components/home/home.component'
import { Navigation } from './components/nav/nav.component'

@NgModule({
  declarations: [
    RootComponent,
    ProductsListComponent,
    HomeComponent,
    Navigation
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
