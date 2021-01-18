import { Component } from '@angular/core';
import { startWith, map, debounceTime } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { FormFieldSelectComponent } from '../select/select.component';
import { IS_OBJECT } from 'projects/core/utils/check-basic.functions';
import { IFormField } from '../form-field.interface';

/**
 * Search field
 *
 * @export
 * @class FormFieldSearchComponent
 * @extends {MpFormFieldSelectComponent}
 */
@Component({
    selector: 'app-form-field-search',
    templateUrl: './search.component.html',
    styles: []
})
export class FormFieldSearchComponent extends FormFieldSelectComponent {

    /**
       * Pomocny form control
       *
       * @type {AbstractControl}
       * @memberof FormFieldSearchComponent
       */
    fakeControl!: AbstractControl;

    /**
     * Vyfiltrovane options
     *
     * @type {Observable<string[]>}
     * @memberof FormFieldSearchComponent
     */
    filteredOptions!: Observable<string[]>;

    /**
     * Destroy - funkce ktera se spusti pred odstranenim daneho objektu
     *
     * @memberof FormFieldSearchComponent
     */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        if (this.fakeControl) {
            this.fakeControl.clearValidators();
            this.fakeControl.clearAsyncValidators();
            this.fakeControl.updateValueAndValidity();
        }
    }

    /**
     * Inicializace formControl a fakeControl
     *
     * @protected
     * @param {IFormField} field
     * @memberof FormFieldSearchComponent
     */
    protected _initFormControl(field: IFormField): void {
        if (field) {
            this.fakeControl = this.formService.getFormControl(field);
            this.filteredOptions = this.fakeControl.valueChanges.pipe(
                debounceTime(400),
                startWith(''),
                map(value => this._filter(value))
            );
            super._initFormControl(field);
        }
    }

    /**
     * Udalosti po zmene hodnoty
     *
     * @protected
     * @param {*} value
     * @memberof FormFieldSearchComponent
     */
    protected _onValueChange(value: any): void {
        this.fakeControl.patchValue(value);
        super._onValueChange(value);
    }

    /**
     * Filtracni funkce
     *
     * @protected
     * @param {string} value
     * @returns {string[]}
     * @memberof FormFieldSearchComponent
     */
    protected _filter = (value: string): string[] => this.field && this.field.options && !IS_OBJECT(value)
        ? this.field.options.filter(
            option => option && (option.value === value || option.label.toLowerCase().indexOf((value || '').toLowerCase())) >= 0
        )
        : (value || '').toString().length ? [] : this.field.options || []

    /**
     * Zobrazi label
     * !!! Je pouzita vne autocomplete !!!
     * pozor this je formControl
     *
     * @param {*} value
     * @returns {string}
     * @memberof FormFieldSearchComponent
     */
    display = (value: string): string => this.field && this.field.options
        ? (this.field.options.find(opt => opt.value === value) || { label: '' }).label
        : '';

    /**
     * Udalosti na blur
     *
     * @memberof FormFieldSearchComponent
     */
    onBlur(): void {
        this.fakeControl.patchValue(this.formControl.value);
        super.onBlur();
    }

}
