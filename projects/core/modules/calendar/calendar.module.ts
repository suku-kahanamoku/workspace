import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TRANSLATE_MODULE_CONFIG } from 'projects/core/utils/modify-object.functions';
import { SharedModule } from '../shared.module';
import { CalendarComponent } from './calendar.component';

/**
 * Calendar module
 * !!!!!!!!!!!!!!!!! musi se importovat v projektove app.module !!!!!!!!!!!!!!!!
 *
 * @export
 * @class MpCalendarModule
 */
@NgModule({
  declarations: [
    CalendarComponent,
  ],
  exports: [
    CalendarComponent,
    CalendarModule,
    SharedModule,
    MatButtonToggleModule,
  ],
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TranslateModule.forChild(TRANSLATE_MODULE_CONFIG),
    SharedModule,
    MatButtonToggleModule,
  ]
})
export class AppCalendarModule { }
