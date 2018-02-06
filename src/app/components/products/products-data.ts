import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IProduct } from './product.interface';

export class ProductData implements InMemoryDbService {

    createDb() {
        let products: IProduct[] = [
            {
                'id': 1,
                'code': '0000-AB',
                'description': 'Ultrabook. SSD. RAM',
                'name': 'HP Envy 13',
                'price': 60,
                'tags': ['HP', 'IT', 'Ultrabook']
            },
            {
                'id': 2,
                'code': '0000-AC',
                'description': 'Monitor Samsung',
                'name': 'Samsung LED 19',
                'price': 20,
                'tags': ['Samsung', 'Monitor', 'GAMER']
            },
            {
                'id': 3,
                'code': '0000-AD',
                'description': 'Game card to run all the games with full resolution',
                'name': 'ATI RADEON 999999',
                'price': 90,
                'tags': ['ATI', 'GAMER', 'NERD']
            },            
            {
                'id': 4,
                'code': '0000-AE',
                'description': 'new IPAD',
                'name': 'IPAD Retina 5',
                'price': 80,
                'tags': ['Apple', 'Macri Cat', 'Expensive', 'Cristi come back']
            }
        ];
        return { products };
    }
}
