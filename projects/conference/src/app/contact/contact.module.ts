import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

import data from '../../assets/data/data.json';
import { ContactComponent } from './contact.component';
import { GET_ROUTES, HttpLoaderFactory } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  ContactComponent
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
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '2'), CMP_LIST)),
    SwiperModule
  ]
})
export class ContactModule { }
