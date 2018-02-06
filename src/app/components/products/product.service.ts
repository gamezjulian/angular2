import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IProduct } from './product.interface';

@Injectable()
export class ProductService {

    private baseUrl = 'api/products';

    constructor(
        private http: Http) {
    }

    public getProduct(id: number): Observable<IProduct> {
        return this.http.get(`${this.baseUrl}/${id}`)
            .map(this.getData)
            .do((item) => console.log(item))
            .catch(err => Observable.throw(err.json));
    }

    public getProducts(): Observable<IProduct[]> {
        return this.http.get(this.baseUrl)
            .map(this.getData)
            .do((item) => console.log(item))
            .catch(err => Observable.throw(err.json));
    }

    public addProduct(product: IProduct): Observable<IProduct> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl, product, options)
            .map(() => product)
            .do(product => console.log(product));
    }

    public updateProduct(product: IProduct): Observable<IProduct> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.baseUrl, product, options)
            .map(() => product)
            .do(product => console.log(product));
    }

    public deleteProduct(product: IProduct): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${product.id}`)
            .map(() => console.log(`Deleted product: ${product.id}`));
    }

    private getData(response: Response): any {
        let body = response.json();

        return body || {};
    }
}