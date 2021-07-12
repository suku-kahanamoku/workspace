import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { AppService } from 'projects/core/services/app.service';

/**
 * Komponenta zobrazujici material design menu
 *
 * @export
 * @class MdMenuComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'md-menu',
  templateUrl: './md-menu.component.html'
})
export class MdMenuComponent implements OnInit {

  @ViewChild('childMenu') public childMenu!: any;

  @ViewChild('menu') public menu!: any;

  @Input() items!: any[];

  @Input() isRoot: boolean = false;

  @Input() isRootNavigable: boolean = true;

  constructor(public readonly appService: AppService) { }

  ngOnInit() { }

}
