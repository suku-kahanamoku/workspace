import { Component, Input } from '@angular/core';

import { Themeable } from '../../core/abstracts/themeable.abstract';
import { IMenu } from '../../core/interfaces/menu.interface';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.scss']
})
export class AboutUsComponent extends Themeable {

  /**
   * Vrati seznam objektu
   *
   * @readonly
   * @type {IMenu[]}
   * @memberof AboutUsComponent
   */
  get itemList(): IMenu[] {
    return <IMenu[]>super.itemList;
  }

  /**
   * Nastavi seznam objektu
   *
   * @memberof AboutUsComponent
   */
  @Input()
  set itemList(itemList: IMenu[]) {
    super.itemList = itemList;
  }

  constructor(public readonly appService: AppService) {
    super()
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {

  }

}
