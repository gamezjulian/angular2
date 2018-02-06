import { IProduct } from "./product.interface";

export class Product implements IProduct {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    tags: string[];
}