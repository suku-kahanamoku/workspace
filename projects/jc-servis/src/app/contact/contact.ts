import { Component, ElementRef, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent extends Themeable {

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
    this.load();
  }

  load(): void {
    this.config.params.fields = {
      name: {
        label: 'Jméno',
        required: true,
        icon: {
          value: 'font_download'
        }
      },
      lastname: {
        label: 'Příjmeni',
        required: true,
        icon: {
          value: 'font_download'
        }
      },
      phone: {
        label: 'Telefon',
        icon: {
          value: 'phone'
        }
      },
      email: {
        label: 'E-mail',
        required: true,
        icon: {
          value: 'email'
        }
      },
      message: {
        label: 'Zpráva',
        type: 'textarea',
        icon: {
          value: 'help'
        }
      }
    }
  }

}
