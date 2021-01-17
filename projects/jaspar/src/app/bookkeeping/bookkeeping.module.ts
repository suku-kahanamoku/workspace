import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import data from '../../assets/data/data.json';
import { AccountancyComponent } from './accountancy/accountancy.component';
import { TaxRecordsComponent } from './tax-records/tax-records.component';
import { TaxAdviceComponent } from './tax-advice/tax-advice.component';
import { AnalyzeManagementComponent } from './analyze-management/analyze-management.component';
import { WagePersonalistComponent } from './wage-personalist/wage-personalist.component';
import { IMenu } from 'projects/core/interfaces/menu.interface';

const GET_ROUTES = (menuList: IMenu[], cmpList: any[]): any => menuList.map(menu => {
  const result: any = { path: menu.url };
  // component routa
  if (menu.cmp) {
    result.component = cmpList.find(tmpCmp => tmpCmp.name === menu.cmp);
  }
  // loadChildren routa
  else if (menu.module) {
    switch (menu.module) {
      /* case 'HomeModule':
        result.loadChildren = () => import('./home/home.module').then(m => m.HomeModule);
        break; */
    }
  }
  else if (menu.redirectTo) {
    result.redirectTo = menu.redirectTo;
    result.pathMatch = 'full'
  }
  //
  return result;
});

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
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '2'), CMP_LIST)),
  ]
})
export class BookkeepingModule { }
