import { Directive, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { Loadable } from './loadable.abstract';
import { ITreeItem } from '../interfaces/item.interface';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../animations/route.animations';

@Directive()
export abstract class Themeable extends Loadable {

    /**
     * Nazev tridy pro animaci
     *
     * @memberof Themeable
     */
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

    private _transformer = (node: any, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<any>((node: any) => node.level, (node: any) => node.expandable)

    treeFlattener = new MatTreeFlattener(this._transformer, (node: any) => node.level, (node: any) => node.expandable, node => node.children);

    protected _itemTree = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

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

    hasChild = (_: number, node: any) => node.expandable;

    /**
     *
     *
     * @memberof Themeable
     */
    @Input('data') set itemList(itemList: ITreeItem[]) {
        super.itemList = itemList;
        this._itemTree.data = this._createTreeNode(<ITreeItem[]>super.itemList);
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
        return itemList.filter(item => !item.parentId);
    }

}