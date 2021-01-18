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
    selector: 'app-form-field-text',
    templateUrl: './text.component.html',
    styles: []
})
export class FormFieldTextComponent extends FormFieldAbstract {

    /**
     * Creates an instance of FormFieldTextComponent.
     * @param {FormService} formService
     * @memberof FormFieldTextComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
