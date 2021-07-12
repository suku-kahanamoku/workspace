import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { AccountancyComponent } from './accountancy/accountancy.component';
import { TaxRecordsComponent } from './tax-records/tax-records.component';
import { TaxAdviceComponent } from './tax-advice/tax-advice.component';
import { AnalyzeManagementComponent } from './analyze-management/analyze-management.component';
import { WagePersonalistComponent } from './wage-personalist/wage-personalist.component';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  AccountancyComponent,
  TaxRecordsComponent,
  TaxAdviceComponent,
  AnalyzeManagementComponent,
  WagePersonalistComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '2'), CMP_LIST)),
  ]
})
export class BookkeepingModule { }
