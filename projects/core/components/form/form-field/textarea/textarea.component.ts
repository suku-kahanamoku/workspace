import { Component } from '@angular/core';

import { FormFieldAbstract } from '../form-field.abstract';
import { FormService } from '../../form.service';

/**
 * Datetime field
 *
 * @export
 * @class MpFormFieldDatetimeComponent
 * @extends {MpFormFieldAbstract}
 */
@Component({
    selector: 'app-form-field-textarea',
    templateUrl: './textarea.component.html',
    styles: []
})
export class FormFieldTextareaComponent extends FormFieldAbstract {

    /**
     * Creates an instance of FormFieldTextareaComponent.
     * @param {FormService} formService
     * @memberof FormFieldTextareaComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
