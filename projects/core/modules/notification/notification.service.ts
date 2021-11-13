import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';

import { ITERATE } from 'projects/core/utils/modify-object.functions';
import { Configurable } from 'projects/core/abstracts/configurable.abstract';
import { IS_DEFINED, IS_OBJECT_ID } from 'projects/core/utils/check-basic.functions';
import { RESOLVE_MARKS } from 'projects/core/utils/modify-string.functions';
import { NotificationComponent } from './notification.component';

/**
 *
 *
 * @export
 * @class NotificationService
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Subscription - pripojena komunikace s backendem, appkou, ...
   *
   * @protected
   * @type {*}
   * @memberof NotificationService
   */
  protected _subscriptions: any = {};

  /**
   * Fronta s texty, komponenty nebo sablonami
   *
   * @protected
   * @type {INotification[]}
   * @memberof NotificationService
   */
  protected _queue: INotification[] = [];

  /**
   * Otevrene dialogove okno
   *
   * @protected
   * @type {MatDialogRef<any>}
   * @memberof NotificationService
   */
  protected _openedDialogRef?: MatDialogRef<any>;

  /**
   * Creates an instance of NotificationService.
   * 
   * @param {HttpClient} _http
   * @param {*} snackbar
   * @param {*} alert
   * @memberof NotificationService
   */
  constructor(
    protected _http: HttpClient,
    public readonly dialog: MatDialog,
    public readonly snackbar: MatSnackBar,
    public readonly alert: MatBottomSheet
  ) {
    this._startNextRequest()
  }

  /**
   * Destroy
   *
   * @memberof NotificationService
   */
  ngOnDestroy(): void {
    ITERATE(this._subscriptions, (subscriber: any) => subscriber?.unsubscribe());
    this.closeAll();
  }

  /**
   * Nacte data z notification
   *
   * @param {string} idSyscode
   * @param {Function} [callback]
   * @param {(Configurable | any)} [cmp]
   * @memberof NotificationService
   */
  load(idSyscode: string, callback?: Function, cmp?: Configurable | any): void {
    if (idSyscode) {
      let url = '/_/v1/Notification';
      if (IS_OBJECT_ID(idSyscode)) {
        url += `/${idSyscode}`;
      } else {
        url += `?where={"_syscode":"${idSyscode}"}`;
      }
      this._subscriptions[idSyscode]?.unsubscribe();
      this._subscriptions[idSyscode] = this._http.get(url)
        .pipe(filter(data => IS_DEFINED(data)))
        .subscribe(data => this.set(data, callback, cmp));
    }
  }

  /**
   * Nastavi notifikace pro zobrazeni
   *
   *
   * @param {*} notifications
   * @param {Function} [callback]
   * @param {Configurable} [cmp]
   * @memberof NotificationService
   */
  set(notifications: any, callback?: Function, cmp?: Configurable): void {
    if (notifications) {
      if (Array.isArray(notifications)) {
        notifications.map(
          item => this.add(
            (cmp ? RESOLVE_MARKS(item.rawData, cmp) : item.rawData),
            item.params,
            item.vtype,
            item.state,
            callback
          )
        );
      } else {
        this.add(
          (cmp ? RESOLVE_MARKS(notifications.rawData, cmp) : notifications.rawData),
          notifications.params,
          notifications.vtype,
          notifications.state,
          callback
        );
      }
    }
  }

  /**
   * Vlozi do fronty a spusti frontu
   *
   * @param {(Configurable | TemplateRef<any> | string)} data
   * @param {*} [options={}]
   * @param {('snackbar' | 'alert')} [type]
   * @param {('success' | 'info' | 'warning' | 'danger')} [state]
   * @param {Function} [callback]
   * @memberof NotificationService
   */
  add(
    data: Configurable | TemplateRef<any> | string,
    options: any = {},
    type?: 'snackbar' | 'alert',
    state?: 'success' | 'info' | 'warning' | 'danger',
    callback?: Function
  ): void {
    if (data && this._queue.findIndex(item => item.data === data) < 0) {
      this._queue.push(<INotification>{ data: data, options: options, type: type, state: state, callback: callback });
    }
    // spusti frontu
    this._startNextRequest();
  }

  /**
   * Spusti snackbar
   *
   * @param {(Configurable | TemplateRef<any> | string)} data
   * @param {*} [options={}]
   * @param {('success' | 'info' | 'warning' | 'danger')} [state='info']
   * @memberof NotificationService
   */
  openSnackbar(
    data: Configurable | TemplateRef<any> | string,
    options: any = {},
    state: 'success' | 'info' | 'warning' | 'danger' = 'info',
    type: 'snackbar' | 'alert' | 'modal' = 'snackbar',
    callback?: Function
  ): void {
    options = { ...{ duration: 4000 }, ...options };
    // otevre z daneho stringu
    if (typeof data === 'string') {
      this.snackbar.openFromComponent(NotificationComponent, options);
      if (this.snackbar._openedSnackBarRef) {
        this.snackbar._openedSnackBarRef.instance.type = type;
        this.snackbar._openedSnackBarRef.instance.state = state;
        this.snackbar._openedSnackBarRef.instance.text = data;
        this.snackbar._openedSnackBarRef.instance.params = options || {};
      }
    }
    // otevre z dane sablony
    else if (data instanceof TemplateRef) {
      this.snackbar.openFromTemplate(data, options);
    }
    // otevre z dane komponenty
    else {
      this.snackbar.openFromComponent(<any>data, options);
    }
    setTimeout(() => {
      // po kazdem zavreni se znovu spusti fronta
      this._subscriptions.afterCloseSnack?.unsubscribe();
      this._subscriptions.afterCloseSnack = this.snackbar._openedSnackBarRef?.afterDismissed().subscribe(
        (state: any) => {
          callback && options.buttons?.length && callback(state);
          this._startNextRequest();
        }
      );
    });
    callback && !options.buttons?.length && callback();
  }

  /**
   * Zavre snackbar
   *
   * @memberof NotificationService
   */
  closeSnackbar(): void {
    this.snackbar?._openedSnackBarRef?.dismiss();
  }

  /**
   * Otevre alert
   *
   * @param {*} data
   * @param {MatBottomSheetConfig} [options={}]
   * @param {('success' | 'info' | 'warning' | 'danger')} [type='danger']
   * @memberof NotificationService
   */
  openAlert(
    data: any,
    options: MatBottomSheetConfig | any = {},
    state: 'success' | 'info' | 'warning' | 'danger' = 'danger',
    type: 'snackbar' | 'alert' | 'modal' = 'alert',
    callback?: Function
  ): void {
    if (typeof data === 'string') {
      this.alert.open(NotificationComponent, options);
      if (this.alert._openedBottomSheetRef) {
        this.alert._openedBottomSheetRef.instance.type = type;
        this.alert._openedBottomSheetRef.instance.state = state;
        this.alert._openedBottomSheetRef.instance.text = data;
        this.alert._openedBottomSheetRef.instance.params = options || {};
      }
    } else {
      this.alert.open(data, options);
    }
    // po kazdem zavreni se znovu spusti fronta
    setTimeout(() => {
      // po kazdem zavreni se znovu spusti fronta
      this._subscriptions.afterCloseAlert?.unsubscribe();
      this._subscriptions.afterCloseAlert = this.alert._openedBottomSheetRef?.afterDismissed().subscribe(
        (state: any) => {
          callback && options.buttons?.length && callback(state);
          this._startNextRequest();
        }
      );
    });
    callback && !options.buttons?.length && callback();
  }

  /**
   * Zavre alert
   *
   * @param {*} [data]
   * @memberof NotificationService
   */
  closeAlert(data?: any): void {
    this.alert?._openedBottomSheetRef?.dismiss(data);
  }

  /**
   * Otevre dialogove okno
   *
   * @param {*} data
   * @param {(MatDialogConfig | any)} [options={}]
   * @param {('success' | 'info' | 'warning' | 'danger')} [state='info']
   * @param {('snackbar' | 'alert' | 'modal')} [type='modal']
   * @param {Function} [callback]
   * @memberof NotificationService
   */
  openDialog(
    data: any,
    options: MatDialogConfig | any = {},
    state: 'success' | 'info' | 'warning' | 'danger' = 'info',
    type: 'snackbar' | 'alert' | 'modal' = 'modal',
    callback?: Function
  ): void {
    if (typeof data === 'string') {
      this._openedDialogRef = this.dialog.open(NotificationComponent, options);
      this._openedDialogRef.componentInstance.type = type;
      this._openedDialogRef.componentInstance.state = state;
      this._openedDialogRef.componentInstance.text = data;
      this._openedDialogRef.componentInstance.params = options || {};
    } else {
      this._openedDialogRef = this.dialog.open(data, options);
    }
    // po kazdem zavreni se znovu spusti fronta
    setTimeout(() => {
      // po kazdem zavreni se znovu spusti fronta
      this._subscriptions?.afterCloseDialog?.unsubscribe();
      this._subscriptions.afterCloseDialog = this._openedDialogRef?.afterClosed().subscribe(
        state => {
          delete this._openedDialogRef;
          callback && options.buttons?.length && callback(state);
          this._startNextRequest();
        }
      );
    });
    callback && !options.buttons?.length && callback();
  }

  /**
   * Zavre vsechna modalni, alert, snack okna
   *
   * @memberof NotificationService
   */
  closeAll(): void {
    this.dialog.closeAll();
    this.closeAlert();
    this.closeSnackbar();
  }

  /**
   * Spusti dalsi notifikaci z fronty
   *
   * @protected
   * @memberof NotificationService
   */
  protected _startNextRequest(): void {
    if (this._queue.length > 0) {
      const notification = this._queue[0];
      if (notification.options && notification.options.delay) {
        setTimeout(() => this._execute(notification), notification.options.delay);
      }
      else {
        this._execute(notification);
      }
    }
  }

  /**
   * Otevre notifikaci a odebere z fronty
   *
   * @protected
   * @param {INotification} notification
   * @memberof NotificationService
   */
  protected _execute(notification: INotification): void {
    if (!this._openedDialogRef && !this.alert._openedBottomSheetRef && !this.snackbar._openedSnackBarRef) {
      switch (notification.type) {
        case 'alert':
          this.openAlert(
            notification.data, notification.options, notification.state, notification.type, notification.callback
          );
          this._queue.shift();
          break;

        case 'modal':
          this.openDialog(
            notification.data, notification.options, notification.state, notification.type, notification.callback
          );
          this._queue.shift();
          break;

        default:
          this.openSnackbar(
            notification.data, notification.options, notification.state, notification.type || 'snackbar', notification.callback
          );
          this._queue.shift();
          break;
      }
    }
  }

}

/**
 * Interface pro notifikaci
 *
 * @interface INotification
 */
interface INotification {
  data: Configurable | TemplateRef<any> | string;
  options?: any;
  type: 'snackbar' | 'alert' | 'modal';
  state: 'success' | 'info' | 'warning' | 'danger';
  callback: Function;
}
