import { Component } from '@angular/core';
import { FormService } from '../../form.service';

import { FormFieldDateComponent } from '../date/date.component';

/**
 * Datetime field
 *
 * @export
 * @class MpFormFieldDatetimeComponent
 * @extends {MpFormFieldAbstract}
 */
@Component({
    selector: 'app-form-field-datetime',
    templateUrl: './datetime.component.html',
    styles: []
})
export class FormFieldDatetimeComponent extends FormFieldDateComponent {

    /**
     * Creates an instance of FormFieldDatetimeComponent.
     * @param {FormService} formService
     * @memberof FormFieldDatetimeComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

}
