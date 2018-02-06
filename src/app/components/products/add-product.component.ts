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

@Component({
    selector: 'add-product',
    templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    productForm: FormGroup;
    validator: GenericValidator;
    displayMessage: { [key: string]: string } = {};
    product = {};

    constructor(private fb: FormBuilder,
        private productService: ProductService) {
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
            tags: this.fb.array([this.buildTagsForm()])
        })
    }

    addTag(): void {
        let tags = <FormArray>this.productForm.get('tags')
        tags.push(this.buildTagsForm());
    }

    buildTagsForm(): FormGroup {
        return this.fb.group({
            tag: ''
        })
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

    save(): void {
        let p = Object.assign(this.product, this.productForm.value)

        this.productService.addProduct(p).subscribe();
    }
}