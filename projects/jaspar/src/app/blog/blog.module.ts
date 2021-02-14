import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import data from '../../assets/data/data.json';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { GET_ROUTES, HttpLoaderFactory } from 'projects/core/utils/modify-object.functions';

const CMP_LIST = [
  ArticleDetailComponent,
  ArticleListComponent
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
    RouterModule.forChild(GET_ROUTES(data.menu.filter(menu => menu.parentId === '6'), CMP_LIST)),
  ]
})
export class BlogModule { }
