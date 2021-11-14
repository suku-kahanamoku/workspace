import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { AboutUsComponent } from './about-us';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from '../../core/utils/modify-object.functions';

const CMP_LIST = [
  AboutUsComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '2' || (menu._id === '2' && menu.cmp)), CMP_LIST))
  ]
})
export class AboutUsModule { }
