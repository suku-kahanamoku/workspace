import { Component } from '@angular/core';

import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent extends Loadable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
