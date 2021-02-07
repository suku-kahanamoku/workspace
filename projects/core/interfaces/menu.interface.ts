import { ITreeItem } from "./item.interface";

export interface IMenu extends ITreeItem {
    cmp?: string;
    module?: string;
    redirectTo?: string;
    url: string;
    name: string;
    children: IMenu[];
}