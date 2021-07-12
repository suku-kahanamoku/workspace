import { Directive, Input } from '@angular/core';

import { Loadable } from './loadable.abstract';
import { ITreeItem } from '../interfaces/item.interface';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../animations/route.animations';

@Directive()
export abstract class Themeable extends Loadable {

    /**
     *
     *
     * @protected
     * @type {ITreeItem[]}
     * @memberof Themeable
     */
    protected _itemTree: ITreeItem[] = [];

    /**
     *
     *
     * @readonly
     * @type {*}
     * @memberof Themeable
     */
    public get itemTree(): any {
        return this._itemTree;
    }

    /**
     * Nazev tridy pro animaci
     *
     * @memberof Themeable
     */
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    /**
     *
     *
     * @memberof Themeable
     */
    @Input('data') set itemList(itemList: ITreeItem[]) {
        super.itemList = itemList;
        this._itemTree = this._createTreeNode(<ITreeItem[]>super.itemList);
    }

    ngOnInit(): void { }

    /**
     * Vlozi potomky do rodicu => vytvori stromovou strukturu
     *
     * @protected
     * @memberof Themeable
     */
    protected _createTreeNode(data: ITreeItem[]): ITreeItem[] {
        // vytvori reference potomku do rodice
        const itemList: ITreeItem[] = Array.isArray(data) ? data : [];
        itemList.map((item: any) => {
            if (item.parentId && item.visible !== false) {
                // vytahne rodic item
                const parentItem = <any>itemList.find(inItem => inItem._id === item.parentId);
                if (parentItem) {
                    // pokud rodic nema zadneho potomka, pripravi pole
                    if (!parentItem.children) parentItem.children = [];
                    // pokud dane item v rodici jeste neexistuje, jej vlozi do rodice
                    if (parentItem.children.indexOf(item) < 0) parentItem.children.push(item);
                    // todo url musi generovat backend a smazat any typ z iterace
                    item.url = `${parentItem.url}/${item.url}`;
                }
            }
        });
        // vrati vyfiltrovane pole (itemy bez rodicu)
        return itemList.filter(item => (!item.parentId && item.visible !== false) || item.visible !== false);
    }

}