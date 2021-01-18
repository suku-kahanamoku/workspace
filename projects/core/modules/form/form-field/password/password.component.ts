import { Component } from '@angular/core';
import { FormService } from '../../form.service';

import { FormFieldAbstract } from '../form-field.abstract';

/**
 * Datetime field
 *
 * @export
 * @class MpFormFieldDatetimeComponent
 * @extends {MpFormFieldAbstract}
 */
@Component({
    selector: 'app-form-field-password',
    templateUrl: './password.component.html',
    styles: []
})
export class FormFieldPasswordComponent extends FormFieldAbstract {

    /**
     * Creates an instance of FormFieldPasswordComponent.
     * @param {FormService} formService
     * @memberof FormFieldPasswordComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
