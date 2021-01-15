import { Subscription } from "rxjs";
import { IConfig } from "../interfaces/config.interface";

import { Configurable } from "./configurable.abstract";


/**
 * Abstrakce pro loadable komponenty
 *
 * @export
 * @abstract
 * @class Loadable
 * @extends {Configurable}
 */
export abstract class Loadable extends Configurable {

    /**
     * Nactena data
     *
     * @type {any[]}
     * @memberof Loadable
     */
    items: any[] = [];

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

}
