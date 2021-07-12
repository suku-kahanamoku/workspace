import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { InfoComponent } from './info/info.component';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  InfoComponent,
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '5'), CMP_LIST)),
  ]
})
export class ContactModule { }
