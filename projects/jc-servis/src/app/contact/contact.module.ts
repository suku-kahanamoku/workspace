import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';

import data from '../../assets/data/data.json';
import { ContactComponent } from './contact';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { SharedModule } from 'projects/core/modules/shared.module';
import { ProjectFormModule } from '../../modules/form/form.module';
import { DirectiveModule } from 'projects/core/directives/directive.module';

const CMP_LIST = [
  ContactComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '5' || (menu._id === '5' && menu.cmp)), CMP_LIST)),
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    DirectiveModule,
    SharedModule,
    MatListModule,
    ProjectFormModule
  ]
})
export class ContactModule { }
