import { Component, ElementRef, Input } from '@angular/core';

import { Themeable } from '../../core/abstracts/themeable.abstract';
import { IMenu } from '../../core/interfaces/menu.interface';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent extends Themeable {

  static title = 'ContactComponent';

  /**
   * Vrati seznam objektu
   *
   * @readonly
   * @type {IMenu[]}
   * @memberof ContactComponent
   */
  get itemList(): IMenu[] {
    return <IMenu[]>super.itemList;
  }

  /**
   * Nastavi seznam objektu
   *
   * @memberof ContactComponent
   */
  @Input()
  set itemList(itemList: IMenu[]) {
    super.itemList = itemList;
  }

  readonly iframe: any = {};

  constructor(public readonly appService: AppService, public _el: ElementRef) {
    super()
  }

  ngOnInit(): void {
    this.iframe.height = this._el.nativeElement.querySelector('.content').clientHeight;
    this.iframe.width = window.innerWidth;
  }

}
