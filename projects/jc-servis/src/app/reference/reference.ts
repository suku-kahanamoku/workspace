import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.html',
  styleUrls: ['./reference.scss']
})
export class ReferenceComponent extends Themeable {

  /**
   * Vrati seznam objektu
   *
   * @readonly
   * @type {IMenu[]}
   * @memberof ReferenceComponent
   */
  get itemList(): IMenu[] {
    return <IMenu[]>super.itemList;
  }

  /**
   * Nastavi seznam objektu
   *
   * @memberof ReferenceComponent
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
