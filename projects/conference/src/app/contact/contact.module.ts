import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

import data from '../../assets/data/data.json';
import { ContactComponent } from './contact.component';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  ContactComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '2' || (menu._id === '2' && menu.cmp)), CMP_LIST)),
    SwiperModule
  ]
})
export class ContactModule { }
