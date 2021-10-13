import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { ServiceComponent } from './service';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { AppliancesComponent } from './appliances/appliances';
import { SharedModule } from 'projects/core/modules/shared.module';

const CMP_LIST = [
  ServiceComponent,
  AppliancesComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '3' || (menu._id === '3' && menu.cmp)), CMP_LIST)),
    SharedModule,
  ]
})
export class ServiceModule { }
