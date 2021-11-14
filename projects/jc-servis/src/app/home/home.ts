import { Component, Input } from '@angular/core';

import { Themeable } from '../../core/abstracts/themeable.abstract';
import { IMenu } from '../../core/interfaces/menu.interface';
import { AppService } from '../../core/services/app.service';
import { CLONE } from '../../core/utils/modify-object.functions';
import data from '../../assets/data/data.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent extends Themeable {

  static title = 'HomeComponent';

  /**
   * Vrati seznam objektu
   *
   * @readonly
   * @type {IMenu[]}
   * @memberof HomeComponent
   */
  get itemList(): IMenu[] {
    return <IMenu[]>super.itemList;
  }

  /**
   * Nastavi seznam objektu
   *
   * @memberof HomeComponent
   */
  @Input()
  set itemList(itemList: IMenu[]) {
    super.itemList = itemList;
  }

  constructor(public readonly appService: AppService) {
    super()
  }

  ngOnInit(): void {
    this.config = {
      _id: 'home',
      params: {
        slideConfig: {
          slidesPerView: 1,
          autoplay: {
            delay: 5000
          }
        }
      }
    }
    this.load();
  }

  load(): void {
    this._onLoad(
      CLONE(
        data.menu
          .map((menu: any) => ({ ...menu, ...menu.cs }))
          .filter((menu: any) => menu.visible !== false)
      )
    );
  }

}
