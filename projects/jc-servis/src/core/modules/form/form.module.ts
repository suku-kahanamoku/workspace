import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

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
import { TRANSLATE_MODULE_CONFIG } from '../../utils/modify-object.functions';
import { SharedModule } from '../shared.module';

/**
 * Form module
 *
 * @export
 * @class FormModule
 */
@NgModule({
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
        ReactiveFormsModule,
        SharedModule,
    ],
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
        SharedModule,
    ]
})
export class FormModule { }
