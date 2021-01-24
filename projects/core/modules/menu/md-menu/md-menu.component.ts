import { Component, Input, OnInit, HostBinding } from '@angular/core';

import { IMenu } from 'projects/core/interfaces/menu.interface';

/**
 * Komponenta zobrazujici material design menu
 *
 * @export
 * @class MdMenuComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-md-menu',
    templateUrl: './md-menu.component.html',
    styleUrls: ['./md-menu.component.scss']
})
export class MdMenuComponent implements OnInit {

    /**
     * Menu data
     *
     * @protected
     * @type {Menu}
     * @memberof MdMenuComponent
     */
    @Input()
    menu!: IMenu;

    ngOnInit(): void {

    }

}
