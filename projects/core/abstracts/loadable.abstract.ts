import { Directive, Input } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { Configurable } from "./configurable.abstract";
import { IConfig } from "../interfaces/config.interface";
import { IItem } from "../interfaces/item.interface";
import { ITERATE } from "../utils/modify-object.functions";
import { HttpErrorResponse } from "@angular/common/http";

@Directive()
export abstract class Loadable extends Configurable {

    /**
     * Seznam objektu
     *
     * @private
     * @type {IItem[]}
     * @memberof Loadable
     */
    private _itemList: IItem[] = [];

    /**
     * Vrati seznam objektu
     *
     * @type {IItem[]}
     * @memberof Loadable
     */
    get itemList(): IItem[] {
        return this._itemList;
    }

    /**
     * Nastavi seznam objektu
     *
     * @memberof Loadable
     */
    @Input('data') set itemList(itemList: IItem[]) {
        this._itemList = [];
        itemList?.length && itemList.map(this.addItem.bind(this));
    }

    /**
     * Vybrany objekt
     *
     * @type {(BehaviorSubject<IItem | any>)}
     * @memberof Loadable
     */
    readonly item$: BehaviorSubject<IItem | any> = new BehaviorSubject(undefined);

    /**
     * Vrati vybrany objekt
     *
     * @readonly
     * @type {IItem}
     * @memberof Loadable
     */
    get item(): IItem | any {
        return this.item$.value;
    }

    /**
     * Nastavy vybrany objekt
     *
     * @memberof Loadable
     */
    @Input() set item(item: IItem | any) {
        this.item$.next(item);
    }

    /**
     * Pomocna promena, podle ktere se da urcit, zda probiha dotaz na backend
     *
     * @readonly
     * @type {Subscription}
     * @memberof Loadable
     */
    get loading(): Subscription {
        return this._subscriptions.load || { closed: true };
    }

    /**
     * Kazdy zdedeny modul musi mit load metodu
     *
     * @param {IConfig} config
     * @param {*} [successClbk=this._onLoad]
     * @param {*} [errorClbk=this._onLoadError]
     * @memberof Loadable
     */
    load(config: IConfig, successClbk = this._onLoad, errorClbk = this._onLoadError): void {
        if (config?.params?.restUrl) {
            this._subscriptions.load && this._subscriptions.load.unsubscribe();
            this._subscriptions.load = this.appService.http.load(config.params.restUrl)
                .subscribe(successClbk, errorClbk);
        }
    }

    /**
     * Udalosti po nacteni dat (callback pro load metodu - success)
     *
     * @protected
     * @param {IItem[]} [data]
     * @memberof Loadable
     */
    protected _onLoad(data?: IItem[]): void {
        this.itemList = data || [];
    }

    /**
     * Udalosti na error
     *
     * @protected
     * @param {HttpErrorResponse} error
     * @memberof Loadable
     */
    protected _onLoadError(error: HttpErrorResponse): void {
        
    }

    /**
     * Ze seznamu vybere objekt s danym id
     *
     * @param {string} itemId
     * @returns {IItem}
     * @memberof Loadable
     */
    getItem(itemId: string): IItem {
        return <IItem>this._itemList.find(item => item._id === itemId);
    }

    /**
     * Ze seznamu vybere objekt s danym id a ulozi ho do this.item
     *
     * @param {string} itemId
     * @returns {IItem}
     * @memberof Loadable
     */
    selectItem(itemId: string): IItem {
        return this.item = this.getItem(itemId);
    }

    /**
     * Do seznamu vlozi dany objekt
     *
     * @param {IItem} item
     * @returns {number}
     * @memberof Loadable
     */
    addItem(item: IItem): number {
        const index = this._itemList.findIndex(tmpItem => tmpItem._id === item._id);
        // pokud neexistuje vlozi do seznamu novy item
        if (index < 0) {
            this._itemList.push(item);
        }
        // pokud existuje mergne (aktualizuje) data
        else {
            const tmpItem = <any>this._itemList[index];
            ITERATE(item, (param: any, key: any) => tmpItem[key] = param);
        }
        return this._itemList.length;
    }

    /**
     * Ze seznamu odstrani dany objekt
     *
     * @param {string} itemId
     * @returns {number}
     * @memberof Loadable
     */
    removeItem(itemId: string): number {
        this._itemList = this._itemList.filter(item => item._id !== itemId);
        // pokud v seznamu nic neni, pro jistotu odstrani i vybrazny item
        if (!this._itemList.length) this.item = undefined;
        // vrati pocet itemu v listu
        return this._itemList.length;
    }

}
