import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

import data from '../../assets/data/data.json';
import { InfoComponent } from './info/info.component';
import { GET_ROUTES, HttpLoaderFactory } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  InfoComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '1'), CMP_LIST)),
    MatButtonModule,
    MatIconModule,
    SwiperModule
  ]
})
export class HomeModule { }
