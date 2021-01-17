import { Injectable, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IConfig } from "../interfaces/config.interface";
import { ITERATE } from "../utils/modify-object.functions";

@Injectable()
export abstract class Configurable implements OnInit, OnDestroy {

    /**
     * Config
     *
     * @type {IConfig}
     * @memberof Configurable
     */
    @Input()
    config!: IConfig;

    /**
     * Subscription - pripojena komunikace s backendem, appkou, ...
     *
     * @protected
     * @type {*}
     * @memberof Configurable
     */
    protected _subscriptions: any = {};

    /**
     * Init
     *
     * @abstract
     * @memberof Configurable
     */
    abstract ngOnInit(): void;

    /**
     * Destroy
     *
     * @memberof Configurable
     */
    ngOnDestroy(): void {
        ITERATE(this._subscriptions, (subscriber: Subscription) => {
            if (subscriber) subscriber.unsubscribe();
        });
    }
}