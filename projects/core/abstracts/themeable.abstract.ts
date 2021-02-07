import { Directive, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';

import { Loadable } from './loadable.abstract';
import { IItem, ITreeItem } from '../interfaces/item.interface';
import { GET_VALUE } from '../utils/modify-object.functions';

@Directive()
export abstract class Themeable extends Loadable {

    /**
     * Vrati seznam objektu
     *
     * @readonly
     * @type {ITreeItem[]}
     * @memberof Themeable
     */
    get itemList(): ITreeItem[] {
        return <ITreeItem[]>super.itemList;
    }

    /**
     * Nastavi seznam objektu
     *
     * @memberof Themeable
     */
    @Input('data') set itemList(itemList: ITreeItem[]) {
        super.itemList = itemList;
        this._setThemeData(this.itemList);
        this.config?.params?.expanded && this.treeControl.expandAll();
    }

    /**
     * Objekt s jednourovnovym uzlem
     *
     * @type {MatTreeFlattener<ITreeItem, FlatNode>}
     * @memberof Themeable
     */
    treeFlattener: MatTreeFlattener<ITreeItem, FlatNode> = new MatTreeFlattener(
        (node: ITreeItem, level: number) => new FlatNode(node, !!node.children, level),
        (node: FlatNode): number => node.level,
        (node: FlatNode): boolean => node.expandable,
        (item: ITreeItem): Observable<ITreeItem[]> => of(<any[]>item.children)
    );

    /**
     * Kontroler pro objekt s jednourovnovym uzlem
     *
     * @type {(NestedTreeControl<ITreeItem> | FlatTreeControl<FlatNode>)}
     * @memberof Themeable
     */
    treeControl: any = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);

    /**
     * Strom s objekty
     *
     * @type {(MatTreeNestedDataSource<ITreeItem> | MatTreeFlatDataSource<ITreeItem, FlatNode>)}
     * @memberof Themeable
     */
    itemTree: any = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    /**
     * Kontrola, zda node je rozeviraci
     * Je pouzit zkraceny zapis => naschval, nerozsirovat "{}" !!!
     *
     * @memberof Themeable
     */
    isExpandable = (_: number, node: any): boolean => node.expandable

    /**
     * Sort objekt
     *
     * @type {MatSort}
     * @memberof Themeable
     */
    @ViewChild(MatSort) set sort(sort: MatSort) {
        this.itemTable.sort = sort;
        this.itemTable.sortingDataAccessor = this._sortingDataAccessor;
    }

    /**
     * Tabulka s objekty
     *
     * @type {MatTableDataSource<IItem>}
     * @memberof Themeable
     */
    readonly itemTable: MatTableDataSource<IItem> = new MatTableDataSource();

    /**
     * Inicializace komponenty
     *
     * @param {BehaviorSubject<ICmpConfig>} [rxjsConfig]
     * @memberof Themeable
     */
    ngOnInit(): void {
        if (this.config?.params?.nested) {
            this.treeControl = new NestedTreeControl<ITreeItem>(node => node.children);
            this.itemTree = new MatTreeNestedDataSource();
            this.isExpandable = (_: number, node: ITreeItem): boolean => !!node.children && node.children.length > 0;
        }
    }

    /**
     * Ze seznamu vybere objekt s danym id
     *
     * @param {string} itemId
     * @returns {ITreeItem}
     * @memberof Themeable
     */
    getItem(itemId: string): ITreeItem {
        return <ITreeItem>super.getItem(itemId);
    }

    /**
     * Vybere item, aktivuje vetev stromu => rozbali
     *
     * @param {string} itemId
     * @returns {ITreeItem}
     * @memberof Themeable
     */
    selectItem(itemId: string): ITreeItem {
        super.selectItem(itemId);
        // vyresetuje active atribut u vsech objektu
        this.itemList.map((item: ITreeItem) => delete item.active);
        // rekurzivne aktivuje itemy
        this._activateItem(this.item);
        // rozbali aktivovane vetve
        const nodes = this.treeControl.dataNodes;
        if (nodes && !this.config?.params?.expanded) {
            nodes.map((node: FlatNode) => node.expandable && node.item.active
                ? this.treeControl.expand(node) : this.treeControl.collapse(node));
        }
        return this.item;
    }

    /**
     * Odstrani objekty ze seznamu, tabulky, stromu
     *
     * @param {string} itemId
     * @returns {number}
     * @memberof Themeable
     */
    removeItem(itemId: string): number {
        const data = this.itemList.filter(item => item._id !== itemId);
        this.itemTree.data = data;
        this.itemTable.data = data;
        this.itemTable._updateChangeSubscription();
        return super.removeItem(itemId);
    }

    /**
     * Nastavi data pro strom a tabulku
     *
     * @protected
     * @param {ITreeItem[]} data
     * @memberof Themeable
     */
    protected _setThemeData(data: ITreeItem[]): void {
        this.itemTree.data = this._createTreeNode(data);
        this.itemTable.data = data;
        if (this.itemTree instanceof MatTreeNestedDataSource)
            this.treeControl.dataNodes = data;
    }

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
        return itemList.filter(item => !item.parentId && item.visible !== false);
    }

    /**
     * Aktivuje potomka a jeho rodice
     * !!! rekurze !!!
     *
     * @protected
     * @param {ITreeItem} item
     * @memberof Themeable
     */
    protected _activateItem(item: ITreeItem): void {
        if (item) {
            item.active = true;
            item.parentId && this._activateItem(this.getItem(item.parentId));
        }
    }

    /**
     * Sortovaci funkce
     *
     * @protected
     * @memberof Themeable
     */
    protected _sortingDataAccessor = (item: any, property: string) => {
        let result = item[property];
        if (property.indexOf('.') >= 0) {
            const path = property.split('.');
            const name = <string>path.pop();
            result = GET_VALUE(item, name, name === property ? undefined : path.join('.'));
        }
        return result
    }

}

/**
 * Flat node objekt
 *
 * @class FlatNode
 */
class FlatNode {

    /**
     * Creates an instance of FlatNode.
     * @param {ITreeItem} item
     * @param {boolean} expandable
     * @param {number} level
     * @memberof FlatNode
     */
    constructor(
        public readonly item: ITreeItem,
        public expandable: boolean,
        public level: number
    ) { }

}