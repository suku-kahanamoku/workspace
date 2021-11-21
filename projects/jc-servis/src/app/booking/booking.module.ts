import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { BookingComponent } from './booking';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { DirectiveModule } from 'projects/core/directives/directive.module';
import { SharedModule } from 'projects/core/modules/shared.module';
import { AppCalendarModule } from 'projects/core/modules/calendar/calendar.module';

const CMP_LIST = [
  BookingComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '2' || (menu._id === '2' && menu.cmp)), CMP_LIST)),
    DirectiveModule,
    SharedModule,
    AppCalendarModule
  ]
})
export class BookingModule { }
