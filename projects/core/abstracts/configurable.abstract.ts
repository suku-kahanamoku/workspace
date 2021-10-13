import { Directive, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IConfig } from "../interfaces/config.interface";
import { AppService } from "../services/app.service";
import { ITERATE } from "../utils/modify-object.functions";

@Directive()
export abstract class Configurable implements OnInit, OnDestroy {

    /**
     * Config
     *
     * @type {IConfig}
     * @memberof Configurable
     */
    @Input() config!: IConfig;

    /**
     * Subscription - pripojena komunikace s backendem, appkou, ...
     *
     * @protected
     * @type {*}
     * @memberof Configurable
     */
    protected _subscriptions: any = {};

    /**
     * App service
     *
     * @abstract
     * @type {AppService}
     * @memberof Configurable
     */
    abstract appService: AppService;

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
        ITERATE(this._subscriptions, (subscriber: Subscription) => subscriber?.unsubscribe());
    }
}