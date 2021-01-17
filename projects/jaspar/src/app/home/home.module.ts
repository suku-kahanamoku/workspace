import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as data from '../../assets/data/menu';
import { AboutComponent } from './about/about.component';
import { ReferenceComponent } from './reference/reference.component';
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
  AboutComponent,
  ReferenceComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    RouterModule.forChild(GET_ROUTES(data.home, CMP_LIST)),
  ]
})
export class HomeModule { }
