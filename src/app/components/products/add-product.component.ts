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

@Component({
    selector: 'add-product',
    templateUrl: 'add-product.component.html'
})
export class AddProductComponent implements OnInit, AfterViewInit {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    productForm: FormGroup;
    validator: GenericValidator;
    displayMessage: { [key: string]: string } = {};
    internation: boolean;

    private errorMessages = {
        code: {
            required: 'Code is required',
            pattern: 'Code format is invalid'
        },
        name: {
            required: 'Name is required'
        },
        price: {
            range: 'Range is not valid',
            required: 'Price is required'
        },
        description: {
            maxlength: 'Up to 20 chars allowed'
        }
    }

    constructor(private fb: FormBuilder) {
        this.validator = new GenericValidator(this.errorMessages);
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            code: ['', [Validators.required, Validators.pattern('0000-[a-zA-Z]+')]],
            name: ['', Validators.required],
            description: ['', Validators.maxLength(20)],
            price: ['', [Validators.required, ValidationFuncs.Price(0, 100)]],
            elaboration: ['National'],
            internationalTax: ''
        })

        this.productForm.get('elaboration').valueChanges.subscribe(value => {
            if (value == "International") {
                this.productForm.patchValue({
                    International: true
                })
            }
        });
    }

    ngAfterViewInit(): void {

        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.validator.getMessages(this.productForm);
        });
    }
}