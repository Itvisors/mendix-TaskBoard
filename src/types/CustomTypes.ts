import { ObjectItem } from "mendix";

export type ColumnDropTargetStatus = "None" | "Allowed" | "NotAllowed";

export interface ItemData {
    itemId: string;
    isDragDisabled?: boolean;
}

export interface ColumnData {
    columnId: string;
    itemKeyArray: string[];
    allowedDropColumnKeyArray: string[];
}

export interface ColumnItemData {
    itemData: ItemData;
    itemMendixObject: ObjectItem;
}
