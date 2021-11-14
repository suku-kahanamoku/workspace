import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'ngx-swiper-wrapper';

import data from '../../assets/data/data.json';
import { HomeComponent } from './home';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from '../../core/utils/modify-object.functions';
import { DirectiveModule } from '../../core/directives/directive.module';
import { SharedModule } from '../../core/modules/shared.module';
import { ProjectFormModule } from '../../modules/form/form.module';

const CMP_LIST = [
  HomeComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '1' || (menu._id === '1' && menu.cmp)), CMP_LIST)),
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    SwiperModule,
    DirectiveModule,
    SharedModule,
    ProjectFormModule
  ]
})
export class HomeModule { }
