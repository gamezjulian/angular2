import { Component, AfterViewInit, ElementRef, ViewChildren } from '@angular/core'
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormGroupDirective } from '@angular/forms/src/directives/reactive_directives/form_group_directive';
import { ValidationFuncs } from '../validators/validation-func';
import { GenericValidator } from '../validators/generic-validator';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { FormArray } from '@angular/forms/src/model';
import { ValidationMessages } from '../validators/validation-messages';
import { ProductService } from './product.service';
import { IProduct } from './product.interface';

import { Router, ActivatedRoute } from '@angular/router'
import { Product } from './product.entity';

@Component({
    selector: 'add-product',
    templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    productForm: FormGroup;
    validator: GenericValidator;
    displayMessage: { [key: string]: string } = {};
    product: IProduct;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router) {

        this.product = new Product();
        this.validator = new GenericValidator(ValidationMessages);
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            code: ['', [Validators.required, Validators.pattern('0000-[a-zA-Z]+')]],
            name: ['', Validators.required],
            description: ['', Validators.maxLength(100)],
            price: ['', [Validators.required, ValidationFuncs.Price(0, 100)]],
            elaboration: ['National'],
            internationalTax: '',
            tags: this.fb.array([])
        })

        this.route.params.subscribe(params => {
            let id = params['id'];

            if (parseInt(id) != 0) {
                this.loadProduct(id);
            } else {
                this.productForm.reset();
            }
        })
    }

    loadProduct(id: number): void {
        this.productService.getProduct(id).
            subscribe(p => {
                this.product = p;

                this.productForm.patchValue({
                    id: this.product.id,
                    code: this.product.code,
                    name: this.product.name,
                    description: this.product.description,
                    price: this.product.price
                })

                if (this.product.tags.length) {
                    this.productForm.setControl('tags', this.fb.array(this.product.tags));
                }
            })
    }

    addTag(): void {
        let tags = <FormArray>this.productForm.get('tags')
        this.buildTagsForm();
    }

    buildTagsForm(): void {
        (<FormArray>this.productForm.get('tags')).push(new FormControl());
    }

    isInternational(): boolean {
        return this.productForm.get('elaboration').value == 'International'
    }

    ngAfterViewInit(): void {

        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.validator.getMessages(this.productForm);
        });
    }

    cancel(): void {
        this.goToProductList();
    }

    save(): void {
        let p = Object.assign(this.product, this.productForm.value)

        if (p.id == 0) {

            this.productService.addProduct(p).subscribe(() => {
                this.productForm.reset();
                this.goToProductList();
            });
        } else {
            this.productService.updateProduct(p).subscribe(() => {
                this.productForm.reset();
                this.goToProductList();
            });
        }
    }

    goToProductList(): void {
        this.router.navigate(['/products']);
    }
}