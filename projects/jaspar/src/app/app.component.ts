import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import data from '../assets/data/data.json';
import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { CLONE } from 'projects/core/utils/modify-object.functions';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Themeable {

  title = 'jaspar';

  constructor(
    public readonly appService: AppService,
    private _translate: TranslateService
  ) {
    super();
    this._translate.setDefaultLang('cs');
  }

  ngOnInit(): void {
    this.load()
  }

  load(): void {
    this._onLoad(CLONE(data.menu.filter(menu => !menu.redirectTo)));
  }

}
