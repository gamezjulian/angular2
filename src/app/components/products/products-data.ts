import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from './product.interface';

export class ProductData implements InMemoryDbService {

    createDb() {
        let products: IProduct[] = [
            {
                'id': 1,
                'code': '0000-AB',
                'description': 'Product#1',
                'name': 'Name#1',
                'price': 60,
                'tags': ['tag#1']
            }
        ];
        return { products };
    }
}
