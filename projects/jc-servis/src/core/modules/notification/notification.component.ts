import { Component, Input, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Custom komponenta
 *
 * @export
 * @class NotificationComponent
 */
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnDestroy {

    /**
     * Typ zobrazeni
     *
     * @type {('success' | 'info' | 'warning' | 'error')}
     * @memberof MpNotificationTextComponent
     */
    @Input() state?: 'success' | 'info' | 'warning' | 'danger';

    /**
     * Typ zobrazeni, zda se dany text zobrazil ve snackabru, alertu nebo dialogu
     *
     * @type {('snackbar' | 'alert' | 'modal')}
     * @memberof NotificationComponent
     */
    @Input() type?: 'snackbar' | 'alert' | 'modal';

    /**
     * Text pro zobrazeni
     *
     * @type {string}
     * @memberof NotificationComponent
     */
    @Input() text?: string;

    /**
     * Dodatecne parametry
     *
     * @type {*}
     * @memberof NotificationComponent
     */
    @Input() params: any;

    /**
     * Creates an instance of NotificationComponent.
     * 
     * @param {MatSnackBar} _snackbar
     * @param {MatBottomSheet} _alert
     * @param {MatDialog} _dialog
     * @memberof NotificationComponent
     */
    constructor(
        protected _snackbar: MatSnackBar,
        protected _alert: MatBottomSheet,
        protected _dialog: MatDialog
    ) { }

    /**
     * Destroy
     *
     * @memberof NotificationComponent
     */
    ngOnDestroy(): void {
        this._snackbar.dismiss();
    }

    /**
     * Zavre otevreny snack
     *
     * @memberof NotificationComponent
     */
    close(state?: boolean): void {
        this._snackbar.dismiss();
        this._alert._openedBottomSheetRef?.dismiss(state);
        this._dialog.openDialogs.find(dialog => dialog.componentInstance === this)?.close(state);
    }

}
