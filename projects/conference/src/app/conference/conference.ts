import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.html',
  styleUrls: ['./conference.scss']
})
export class ConferenceComponent extends Themeable {

  /**
   * Vrati seznam objektu
   *
   * @readonly
   * @type {IMenu[]}
   * @memberof ConferenceComponent
   */
  get itemList(): IMenu[] {
    return <IMenu[]>super.itemList;
  }

  /**
   * Nastavi seznam objektu
   *
   * @memberof ConferenceComponent
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
