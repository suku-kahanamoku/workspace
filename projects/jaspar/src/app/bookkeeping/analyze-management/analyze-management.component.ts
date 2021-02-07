import { Component } from '@angular/core';

import { Themeable } from 'projects/core/abstracts/themeable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';
import { AppService } from 'projects/core/services/app.service';

@Component({
  selector: 'app-analyze-management',
  templateUrl: './analyze-management.component.html',
  styleUrls: ['./analyze-management.component.scss']
})
export class AnalyzeManagementComponent extends Themeable {

  constructor(public readonly appService: AppService) {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
