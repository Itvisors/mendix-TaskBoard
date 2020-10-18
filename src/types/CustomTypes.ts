import { ObjectItem } from "mendix";

export type ColumnDropTargetStatus = "None" | "Allowed" | "NotAllowed";

export interface ItemData {
    itemId: string;
    seqNbr: number;
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

export interface DropDataItem {
    itemId: string;
    seqNbr: number;
}
