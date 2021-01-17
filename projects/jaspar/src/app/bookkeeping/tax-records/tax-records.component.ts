import { Component } from '@angular/core';

import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-tax-records',
  templateUrl: './tax-records.component.html',
  styleUrls: ['./tax-records.component.scss']
})
export class TaxRecordsComponent extends Loadable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
