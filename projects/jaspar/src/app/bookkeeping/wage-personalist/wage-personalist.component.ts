import { Component } from '@angular/core';

import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-wage-personalist',
  templateUrl: './wage-personalist.component.html',
  styleUrls: ['./wage-personalist.component.scss']
})
export class WagePersonalistComponent extends Loadable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
