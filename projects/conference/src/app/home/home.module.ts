import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

import data from '../../assets/data/data.json';
import { HomeComponent } from './home';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  HomeComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '1' || (menu._id === '1' && menu.cmp)), CMP_LIST)),
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    SwiperModule
  ]
})
export class HomeModule { }
