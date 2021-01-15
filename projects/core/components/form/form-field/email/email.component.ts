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
    selector: 'app-form-field-email',
    templateUrl: './email.component.html',
    styles: []
})
export class FormFieldDatetimeComponent extends FormFieldAbstract {

    /**
     * Creates an instance of FormFieldDatetimeComponent.
     * @param {FormService} formService
     * @memberof FormFieldDatetimeComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
