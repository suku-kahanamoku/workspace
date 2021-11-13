import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { ReferenceComponent } from './reference';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { DirectiveModule } from 'projects/core/directives/directive.module';
import { SharedModule } from 'projects/core/modules/shared.module';

const CMP_LIST = [
  ReferenceComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '4' || (menu._id === '4' && menu.cmp)), CMP_LIST)),
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    DirectiveModule,
    SharedModule,
  ]
})
export class ReferenceModule { }
