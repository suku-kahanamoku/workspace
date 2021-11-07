import { Injectable } from '@angular/core';
import { ValidatorFn, Validators, AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { IFormField } from './form-field/form-field.interface';
import { AppService } from 'projects/core/services/app.service';
import { IS_DEFINED } from 'projects/core/utils/check-basic.functions';
import { ITERATE } from 'projects/core/utils/modify-object.functions';
import { VALIDATE_EMAIL, VALIDATE_NAME, VALIDATE_PHONE_NUMBER, VALIDATE_PASSWORD, VALIDATE_PASSWORD_REPEAT, VALIDATE_TIN, VALIDATE_VATID, VALIDATE_ZIP, VALIDATE_STREET, VALIDATE_CITY } from 'projects/core/utils/validator.functions';

/**
 * Servis pro form komponenty.
 * Posila pozadavky ohledne vsech form dat na backend
 *
 *
 * @export
 * @class FormService
 */
@Injectable({
    providedIn: 'root'
})
export class FormService {


    /**
     * Creates an instance of FormService.
     * @param {AppService} appService
     * @param {FormBuilder} formBuilder
     * @memberof FormService
     */
    constructor(
        public readonly appService: AppService,
        public readonly formBuilder: FormBuilder
    ) { }

    /**
     * Vrati vsechny validacni funkce pro dany field
     *
     * @param {IFormField} field
     * @returns {ValidatorFn[]}
     * @memberof FormService
     */
    getValidators(field: IFormField): ValidatorFn[] {
        const validators = [];
        if (field.validation) {
            const validator = this.getValidator(field.validation.type || field.type);
            if (validator) validators.push(validator);
        }
        if (field.required) validators.push(this.getValidator('required'));
        if (field.max) validators.push(this.getValidator('max')(field.max));
        if (field.min) validators.push(this.getValidator('min')(field.min));
        // vrati vsechny validatory, ktere byly definovany
        return validators;
    }

    /**
     * Vrati validacni funkci
     *
     * @memberof FormService
     */
    getValidator = (name: string): any => {
        switch (name) {
            case 'required': return Validators.required;
            case 'max': return Validators.max;
            case 'min': return Validators.min;
            case 'email': return VALIDATE_EMAIL;
            case 'name': return VALIDATE_NAME;
            case 'phone': return VALIDATE_PHONE_NUMBER;
            case 'password': return VALIDATE_PASSWORD;
            case 'passwordRepeat': return VALIDATE_PASSWORD_REPEAT;
            case 'tin': return VALIDATE_TIN;
            case 'vatid': return VALIDATE_VATID;
            case 'zip': return VALIDATE_ZIP;
            case 'street': return VALIDATE_STREET;
            case 'city': return VALIDATE_CITY;
        }
    }

    /**
     * Vytvori a vrati formControl (field pro ngForm nebo group)
     *
     * @param {IFormField} field
     * @returns {AbstractControl}
     * @memberof FormService
     */
    getFormControl(field: IFormField): AbstractControl {
        // pro multiple a file jsou hodnoty pole
        if (field.multiple || field.type === 'file') {
            field.value = Array.isArray(field.value)
                ? field.value.filter(item => IS_DEFINED(item))
                : (IS_DEFINED(field.value) ? [field.value] : []);
        }
        // vytvori formControl
        const formControl = this.formBuilder.control(
            { value: field.value, disabled: field.disabled || false }, this.getValidators(field)
        );
        return formControl;
    }

    /**
     * Vrati vsechny formControl ze vsech formGroup
     * REKURZE
     *
     * @param {(FormGroup)} group
     * @returns {AbstractControl[]}
     * @memberof FormService
     */
    getFormControls(group: FormGroup): AbstractControl[] {
        let result: AbstractControl[] = [];
        ITERATE(group.controls, (formControl: AbstractControl) => {
            // pokud je to instance FromGroup, rekurzivne se zavolat tato funkce a vrati vsechny formControls
            if (formControl instanceof FormGroup)
                result = [...result, ...this.getFormControls(formControl)];
            else
                result.push(formControl);
        });
        return result;
    }

    /**
     * Opakuje hodnotu do jineho fieldu
     *
     * @deprecated vytvorit ve sprave definition na fieldu password
     * @param {AbstractControl} outFormControl
     * @param {(AbstractControl | AbstractControl[])} inFormControl
     * @memberof FormService
     */
    repeatValue(outFormControl: AbstractControl, inFormControl: AbstractControl | AbstractControl[]): void {
        if (outFormControl && inFormControl) {
            // pokud je to pole, projede a zkontroluje a zkopiruje hodnoty
            if (Array.isArray(inFormControl)) {
                inFormControl.map(formControl => {
                    if (formControl && formControl.value !== outFormControl)
                        formControl.patchValue(outFormControl.value || undefined);
                });
            }
            // jinak jen zkontroluje a zkopiruje hodnotu
            else {
                if (outFormControl.value !== inFormControl.value)
                    inFormControl.patchValue(outFormControl.value || undefined);
            }
        }
    }

}
