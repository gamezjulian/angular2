import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//routes
import { appRoutes } from './router'

//container
import { RootComponent } from './components/root/root.component'

//components
import { HomeComponent } from './components/home/home.component'
import { Navigation } from './components/nav/nav.component'

//modules
import { ProductModule } from './components/products/product.module'

@NgModule({
  declarations: [
    RootComponent,
    HomeComponent,
    Navigation
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ProductModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
