import { ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";

export class ValidationFuncs {

    static Price(min: number, max: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
                return { 'range': true };
            }
            return null;
        }
    }
}