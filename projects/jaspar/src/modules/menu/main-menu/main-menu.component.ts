import { Component, Input } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IMenu } from 'projects/core/interfaces/menu.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html'
})
export class MainMenuComponent extends Themeable {

  constructor(public readonly appService: AppService) {
    super();
  }

}
