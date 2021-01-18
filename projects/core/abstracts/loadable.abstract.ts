import { Injectable, Input } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

import { Configurable } from "./configurable.abstract";
import { IConfig } from "../interfaces/config.interface";
import { IItem } from "../interfaces/item.interface";
import { ITERATE } from "../utils/modify-object.functions";


@Injectable()
export abstract class Loadable extends Configurable {

    /**
     * Nactena data
     *
     * @type {IItem[]}
     * @memberof Loadable
     */
    itemList: IItem[] = [];

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
     * @abstract
     * @param {IConfig} config
     * @memberof Loadable
     */
    abstract load(config: IConfig): void;

    /**
     * Ze seznamu vybere objekt s danym id
     *
     * @param {string} itemId
     * @returns {IItem}
     * @memberof Loadable
     */
    getItem(itemId: string): IItem {
        return <IItem>this.itemList.find(item => item._id === itemId);
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
        const index = this.itemList.findIndex(tmpItem => tmpItem._id === item._id);
        // pokud neexistuje vlozi do seznamu novy item
        if (index < 0) {
            this.itemList.push(item);
        }
        // pokud existuje mergne (aktualizuje) data
        else {
            const tmpItem = <any>this.itemList[index];
            ITERATE(item, (param: any, key: any) => tmpItem[key] = param);
        }
        return this.itemList.length;
    }

    /**
     * Ze seznamu odstrani dany objekt
     *
     * @param {string} itemId
     * @returns {number}
     * @memberof Loadable
     */
    removeItem(itemId: string): number {
        this.itemList = this.itemList.filter(item => item._id !== itemId);
        // pokud v seznamu nic neni, pro jistotu odstrani i vybrazny item
        if (!this.itemList.length) this.item = undefined;
        // vrati pocet itemu v listu
        return this.itemList.length;
    }

}
