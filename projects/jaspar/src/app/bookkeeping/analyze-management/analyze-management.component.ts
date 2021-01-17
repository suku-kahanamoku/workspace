import { Component } from '@angular/core';
import { Loadable } from 'projects/core/abstracts/loadable.abstract';
import { IConfig } from 'projects/core/interfaces/config.interface';

@Component({
  selector: 'app-analyze-management',
  templateUrl: './analyze-management.component.html',
  styleUrls: ['./analyze-management.component.scss']
})
export class AnalyzeManagementComponent extends Loadable {

  constructor() {
    super()
  }

  ngOnInit(): void {

  }

  load(config: IConfig): void {

  }

}
