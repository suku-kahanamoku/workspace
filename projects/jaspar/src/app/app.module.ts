import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import data from '../assets/data/data.json';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectMenuModule } from '../modules/menu/menu.module';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';

const MODULES = {
  HomeModule: () => import('./home/home.module').then(m => m.HomeModule),
  BookkeepingModule: () => import('./bookkeeping/bookkeeping.module').then(m => m.BookkeepingModule),
  ArchivModule: () => import('./archiv/archiv.module').then(m => m.ArchivModule),
  ForeignLanguageModule: () => import('./foreign-language/foreign-language.module').then(m => m.ForeignLanguageModule),
  BlogModule: () => import('./blog/blog.module').then(m => m.BlogModule),
  ReferenceModule: () => import('./reference/reference.module').then(m => m.ReferenceModule),
  ContactModule: () => import('./contact/contact.module').then(m => m.ContactModule),
}

const CMP_LIST = [
  AppComponent,
  PageNotFoundComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    BrowserModule,
    RouterModule.forRoot(GET_ROUTES(data.menu.filter(menu => !menu.parentId), CMP_LIST, MODULES)),
    BrowserAnimationsModule,
    ProjectMenuModule,
    HttpClientModule,
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
