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
    selector: 'app-form-field-checkbox',
    templateUrl: './checkbox.component.html',
    styles: []
})
export class FormFieldCheckboxComponent extends FormFieldAbstract {

    /**
     * Creates an instance of FormFieldCheckboxComponent.
     * @param {FormService} formService
     * @memberof FormFieldCheckboxComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
