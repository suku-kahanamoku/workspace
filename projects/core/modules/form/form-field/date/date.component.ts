import { Component } from '@angular/core';
import { FormService } from '../../form.service';
import { FormFieldAbstract } from '../form-field.abstract';

/**
 * Datetime field
 *
 * @export
 * @class MpFormFieldDatetimeComponent
 * @extends {FormFieldAbstract}
 */
@Component({
    selector: 'app-form-field-date',
    templateUrl: './date.component.html'
})
export class FormFieldDateComponent extends FormFieldAbstract {

    /**
       * Minimalni datum
       *
       * @type {Date}
       * @memberof MpFormFieldDatetimeComponent
       */
    minDate!: Date;

    /**
       * Maximalni datum
       *
       * @type {Date}
       * @memberof MpFormFieldDatetimeComponent
       */
    maxDate!: Date;

    /**
     * Creates an instance of FormFieldDateComponent.
     * @param {FormService} formService
     * @memberof FormFieldDateComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

    /**
     * Init
     *
     * @memberof MpFormFieldDatetimeComponent
     */
    ngOnInit(): void {
        super.ngOnInit();
        this._setMinDate(this.field.minDate);
        this._setMaxDate(this.field.maxDate);
    }

    /**
     * Nastavi minimalni datum
     *
     * @memberof MpFormFieldDatetimeComponent
     */
    protected _setMinDate(minDate: string): void {
        if (minDate) {
            if (minDate === 'now') {
                this.minDate = new Date();
                this.minDate.setDate((new Date()).getDate());
            } else {
                this.minDate = new Date(Date.parse(minDate));
            }
        }
    }

    /**
     * Nastavi maximalni datum
     *
     * @protected
     * @param {string} maxDate
     * @memberof MpFormFieldDatetimeComponent
     */
    protected _setMaxDate(maxDate: string): void {
        if (maxDate === 'now') {
            this.maxDate = new Date();
            this.maxDate.setDate((new Date()).getDate());
        } else {
            this.maxDate = new Date(Date.parse(maxDate));
        }
    }

}
