import { Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';
import { IConfig } from 'projects/core/interfaces/config.interface';
import { IItem } from 'projects/core/interfaces/item.interface';
import { IS_DEFINED } from 'projects/core/utils/check-basic.functions';
import { GET_VALUE, ITERATE } from 'projects/core/utils/modify-object.functions';
import { REMOVE_LAST_STRING, RESOLVE_MARKS } from 'projects/core/utils/modify-string.functions';

import { Formable } from '../form/formable.abstract';

/**
 * Komponenta pro zobrazovani textu.
 * Dokaze zobrazit seznam textu nebo i detail textu.
 * Odposlouchava svuj config, tzn. pokud se zmeni, aktualizuje svoje data
 *
 * @export
 * @class CalendarComponent
 * @extends {MpFormModelComponent}
 */
@Component({
  selector: 'mp-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent extends Formable {

  /**
   *
   *
   * @type {CalendarView}
   * @memberof CalendarComponent
   */
  view: CalendarView = CalendarView.Month;

  /**
   *
   *
   * @memberof CalendarComponent
   */
  CalendarView = CalendarView;

  /**
   *
   *
   * @type {Date}
   * @memberof CalendarComponent
   */
  date: Date = new Date();

  /**
   * Udalosti po zmene configu
   *
   * @protected
   * @param {IConfig} config
   * @memberof CalendarComponent
   */
  ngOnInit(): void {
    if (this.config) {
      switch (this.config.params.calendarConfig.view) {
        case CalendarView.Day:
          this.view = CalendarView.Day;
          break;

        case CalendarView.Week:
          this.view = CalendarView.Week;
          break;

        default:
          this.view = CalendarView.Month;
          break;
      }
    }
  }

  /**
   * Do seznamu vlozi dany objekt
   *
   * @param {IItem} item
   * @returns {number}
   * @memberof CalendarComponent
   */
  addItem(item: IItem): number {
    if (item) {
      ITERATE(this.config.params.dataMap, (mapper: any, key: string) => this._convert(item, mapper, key));
    }
    return super.addItem(item);
  }

  /**
   * Mapovaci funkce
   *
   * @protected
   * @param {*} item
   * @param {*} mapper
   * @param {*} key
   * @memberof CalendarComponent
   */
  protected _convert(item: any, mapper: any, key: string): void {
    if (IS_DEFINED(mapper.type) && IS_DEFINED(mapper.value)) {
      let value;
      if (mapper.value.indexOf('${') >= 0) {
        value = this._getAttribute(mapper, RESOLVE_MARKS(mapper.value, item));
      } else {
        const name = mapper.value.split('.').pop();
        const group = REMOVE_LAST_STRING(mapper.value, '.', true);
        value = this._getAttribute(mapper, GET_VALUE(item, name, group === name ? undefined : group));
      }
      item[key] = value;
    }
    //
    else if (typeof mapper === 'object') {
      item[key] = IS_DEFINED(item[key]) ? item[key] : {};
      ITERATE(mapper, (tmpMapper: any, tmpKey: string) => this._convert(item[key], tmpMapper, tmpKey));
    }
  }

  /**
   * Vrati spravne hodnoty
   *
   * @protected
   * @param {*} mapper
   * @param {*} value
   * @returns {*}
   * @memberof CalendarComponent
   */
  protected _getAttribute(mapper: any, value: string): any {
    switch (mapper.type) {
      case 'date':
        return new Date(value);

      case 'value':
        return mapper.value;

      default:
        return value;
    }
  }

}
