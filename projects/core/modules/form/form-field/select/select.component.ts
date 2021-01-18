import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { FormService } from '../../form.service';
import { FormFieldAbstract } from '../form-field.abstract';
import { IS_EQUAL } from 'projects/core/utils/check-basic.functions';
import { IS_ABSOLUTE_URL } from 'projects/core/utils/check-url.functions';
import { INTERSECTION } from 'projects/core/utils/modify-object.functions';
import { RESOLVE_MARKS } from 'projects/core/utils/modify-string.functions';

/**
 * Selectbox field
 *
 * @export
 * @class FormFieldSelectComponent
 * @extends {MpFormFieldAbstract}
 */
@Component({
    selector: 'app-form-field-select',
    templateUrl: './select.component.html'
})
export class FormFieldSelectComponent extends FormFieldAbstract {

    /**
     * Pomocna promena, podle ktere se da urcit, zda probiha dotaz na backend
     *
     * @readonly
     * @type {Subscription}
     * @memberof MpFormFieldSearchComponent
     */
    get loading(): Subscription {
        return this._subscriptions.load || { closed: true };
    }

    /**
     * Creates an instance of FormFieldSelectComponent.
     * @param {FormService} formService
     * @memberof FormFieldSelectComponent
     */
    constructor(formService: FormService) {
        super(formService);
    }

    /**
     * Init
     *
     * @memberof FormFieldSelectComponent
     */
    ngOnInit(): void {
        super.ngOnInit();
        this.load(this.field ? this.field.restOptions : undefined);
    }

    /**
     * Nacteni options
     *
     * @memberof FormFieldSelectComponent
     */
    load(restOptions: any): void {
        if (restOptions && restOptions.url) {
            // pokud je to absolutni url vola get metodu bez bearera
            const restUrl = RESOLVE_MARKS(restOptions.url, this);
            const subscriber = IS_ABSOLUTE_URL(restUrl)
                ? this.appService.http.get(restUrl)
                : this.appService.http.load(restUrl);
            // po nacteni se vytvori options
            if (this._subscriptions.load) this._subscriptions.load.unsubscribe();
            this._subscriptions.load = subscriber
                .subscribe(data => this._onLoad(data, restOptions.value, restOptions.label));
        }
    }

    /**
     * Udalosti po nacteni dat
     *
     * @protected
     * @param {*} data
     * @param {string} valueKey
     * @param {string} labelKey
     * @memberof FormFieldSelectComponent
     */
    protected _onLoad(data: any, valueKey: string, labelKey: string): void {
        data = Array.isArray(data) ? data : [data];
        this.field.options = data.map(
            (item: any) => ({
                value: valueKey === 'item' ? item : item[valueKey],
                label: labelKey.match(/\${(.*?)}/ig) ? RESOLVE_MARKS(labelKey, item) : item[labelKey],
                item: item
            })
        );
        // pokud je to pole nastavi se prunik hodnot
        if (Array.isArray(this.formControl.value))
            this.formControl.patchValue(INTERSECTION(this.field.options?.map(val => val.value) || [], this.formControl.value));
        // musi existovat v nactenem poli
        else if (this.field.options?.find(item => item.value === this.formControl.value))
            this.formControl.patchValue(this.formControl.value);
        // jinak se resetne hodnota
        else
            this.formControl.patchValue(null);
    }

    /**
     * Udalosti po zmene hodnoty
     *
     * @protected
     * @param {*} value
     * @memberof FormFieldSelectComponent
     */
    protected _onValueChange(value: any): void {
        if (typeof value !== 'undefined' && !IS_EQUAL(this.field.value, value))
            this.field.option = this._getOption(value);
        super._onValueChange(value);
    }

    /**
     * Vrati vybrany option
     *
     * @protected
     * @param {*} value
     * @returns {*}
     * @memberof FormFieldSelectComponent
     */
    protected _getOption(value: any): any {
        if (this.field && this.field.options) {
            if (Array.isArray(value))
                return this.field.options.filter(option => value.indexOf(option.value) >= 0);
            else
                return this.field.options.find(option => option.value === value);
        }
    }

}
