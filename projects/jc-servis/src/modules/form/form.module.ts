import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { FormModule } from '../../core/modules/form/form.module';
import { TRANSLATE_MODULE_CONFIG } from '../../core/utils/modify-object.functions';
import { ContactFormComponent } from './contact-form/contact-form';


@NgModule({
  declarations: [
    ContactFormComponent
  ],
  exports: [
    ContactFormComponent
  ],
  imports: [
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    FormModule
  ],
})
export class ProjectFormModule { }
