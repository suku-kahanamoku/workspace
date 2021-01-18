import { Component, Input } from '@angular/core';

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
    selector: 'app-form-field-number',
    templateUrl: './number.component.html',
    styles: []
})
export class FormFieldNumberComponent extends FormFieldAbstract {

    /**
     * Min
     *
     * @memberof MpFormFieldNumberComponent
     */
    @Input() set min(value: number) {
        if (this.field) this.field.min = value;
    }

    /**
     * Max
     *
     * @memberof MpFormFieldNumberComponent
     */
    @Input() set max(value: number) {
        if (this.field) this.field.max = value;
    }

    /**
     * Creates an instance of FormFieldNumberComponent.
     * @param {FormService} formService
     * @memberof FormFieldNumberComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
