import { Component } from '@angular/core';

import { Themeable } from '../../core/abstracts/themeable.abstract';
import { IConfig } from '../../core/interfaces/config.interface';
import { AppService } from '../../core/services/app.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent extends Themeable {

  static title = 'PageNotFoundComponent';

  constructor(public readonly appService: AppService) {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
