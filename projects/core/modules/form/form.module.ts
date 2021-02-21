import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { FormFieldCheckboxComponent } from './form-field/checkbox/checkbox.component';
import { FormFieldDateComponent } from './form-field/date/date.component';
import { FormFieldDatetimeComponent } from './form-field/datetime/datetime.component';
import { FormFieldNumberComponent } from './form-field/number/number.component';
import { FormFieldPasswordComponent } from './form-field/password/password.component';
import { FormFieldRadioComponent } from './form-field/radio/radio.component';
import { FormFieldSearchComponent } from './form-field/search/search.component';
import { FormFieldSelectComponent } from './form-field/select/select.component';
import { FormFieldTextComponent } from './form-field/text/text.component';
import { FormFieldTextareaComponent } from './form-field/textarea/textarea.component';
import { FormFieldEmailComponent } from './form-field/email/email.component';
import { HttpLoaderFactory } from 'projects/core/utils/modify-object.functions';

export class CustomDateAdapter extends NativeDateAdapter {
    getFirstDayOfWeek = (): number => 1
}

/**
 * Objekt s metadaty, vetsinou slouzi pro pretezovani modulu
 * 
 * @export
 * @constant NgModule
 */
export const METADATA: NgModule = {
    declarations: [
        FormFieldTextComponent,
        FormFieldNumberComponent,
        FormFieldEmailComponent,
        FormFieldSelectComponent,
        FormFieldSearchComponent,
        FormFieldRadioComponent,
        FormFieldCheckboxComponent,
        FormFieldTextareaComponent,
        FormFieldDateComponent,
        FormFieldDatetimeComponent,
        /* FormFieldFileComponent, */
        FormFieldPasswordComponent,
    ],
    entryComponents: [
        FormFieldTextComponent,
        FormFieldNumberComponent,
        FormFieldEmailComponent,
        FormFieldSelectComponent,
        FormFieldSearchComponent,
        FormFieldRadioComponent,
        FormFieldCheckboxComponent,
        FormFieldTextareaComponent,
        FormFieldDateComponent,
        FormFieldDatetimeComponent,
        /*  FormFieldFileComponent, */
        FormFieldPasswordComponent,
    ],
    exports: [
        FormFieldTextComponent,
        FormFieldNumberComponent,
        FormFieldEmailComponent,
        FormFieldSelectComponent,
        FormFieldSearchComponent,
        FormFieldRadioComponent,
        FormFieldCheckboxComponent,
        FormFieldTextareaComponent,
        FormFieldDateComponent,
        FormFieldDatetimeComponent,
        /* FormFieldFileComponent, */
        FormFieldPasswordComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatNativeDateModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ]
}

/**
 * Form module
 *
 * @export
 * @class FormModule
 */
@NgModule(METADATA)
export class FormModule { }
