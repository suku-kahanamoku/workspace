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

    /**
     * Kontrola zda neni link zrusen
     *
     * @readonly
     * @type {boolean}
     * @memberof MdMenuComponent
     */
    get isNavigable() {
        // pokud neni nastaven => kontroluje zda je to root item a ma potomky
        if (this.menu) {
            if (this.menu.parentId)
                return true;
            else if (!this.menu.children || !this.menu.children.length)
                return true;
        }
        return false;
    }

    ngOnInit(): void {

    }

}
