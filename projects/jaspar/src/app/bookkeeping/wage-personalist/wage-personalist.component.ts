import { Component } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-wage-personalist',
  templateUrl: './wage-personalist.component.html',
  styleUrls: ['./wage-personalist.component.scss']
})
export class WagePersonalistComponent extends Themeable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
