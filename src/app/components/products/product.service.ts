import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ProductService {

    /**
     *
     */
    constructor(private http: Http) {

    }

    getProduct(id: number): any {
        return this.http.get(`http://localhost:4400/products/${id}`);
    }
}