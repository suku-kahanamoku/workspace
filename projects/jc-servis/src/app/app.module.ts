import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormBuilder } from '@angular/forms';
import localeCs from '@angular/common/locales/cs';

import data from '../assets/data/data.json';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectMenuModule } from '../modules/menu/menu.module';
import { GET_ROUTES, TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';

registerLocaleData(localeCs, 'CS');

const MODULES = {
  HomeModule: () => import('./home/home.module').then(m => m.HomeModule),
  BookingModule: () => import('./booking/booking.module').then(m => m.BookingModule),
  ReferenceModule: () => import('./reference/blog.module').then(m => m.ReferenceModule),
  ContactModule: () => import('./contact/contact.module').then(m => m.ContactModule),
  ServiceModule: () => import('./service/service.module').then(m => m.ServiceModule),
}

const CMP_LIST = [
  AppComponent,
  PageNotFoundComponent
];

@NgModule({
  declarations: CMP_LIST,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(GET_ROUTES(data.menu.filter(menu => !menu.parentId), CMP_LIST, MODULES)),
    TranslateModule.forRoot(TRANSLATE_MODULE_CONFIG),
    MatSidenavModule,
    ProjectMenuModule,
  ],
  providers: [
    FormBuilder,
    { provide: LOCALE_ID, useValue: 'cs-CZ' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
