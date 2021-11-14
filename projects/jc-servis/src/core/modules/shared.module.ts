import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';


/**
 * Modul se sharovanymi komponentami
 *
 * @export
 * @class ResponsiveModule
 */
@NgModule({
    exports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatCardModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatBottomSheetModule,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatCardModule,
        MatListModule,
        MatDialogModule,
        MatSnackBarModule,
        MatBottomSheetModule,
    ]
})
export class SharedModule { }
