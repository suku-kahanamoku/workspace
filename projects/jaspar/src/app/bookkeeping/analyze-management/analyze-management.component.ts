import { Component } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-analyze-management',
  templateUrl: './analyze-management.component.html',
  styleUrls: ['./analyze-management.component.scss']
})
export class AnalyzeManagementComponent extends Themeable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
