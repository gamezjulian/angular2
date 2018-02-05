import { FormGroup, FormControl } from '@angular/forms'
import { forEach } from '@angular/router/src/utils/collection';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

export class GenericValidator {
    constructor(private messages: any) {

    }

    getMessages(container: FormGroup): { [key: string]: string } {
        let messages = {};
        for (let controlName in container.controls) {
            if (container.controls.hasOwnProperty(controlName)) {
                let control = container.controls[controlName];

                if (control && control instanceof FormGroup) {
                    var output = this.getMessages(control);
                    Object.assign(messages, output);
                } else {
                    if (this.messages[controlName]) {
                        messages[controlName] = '';
                        if ((control.dirty || control.touched) && control.errors) {
                            Object.keys(control.errors).map(messageKey => {
                                if (this.messages[controlName][messageKey]) {
                                    messages[controlName] += this.messages[controlName][messageKey] + ' ';
                                }
                            });
                        }
                    }
                }
            }
        }

        return messages;
    }
}