/**
 * This file was generated from TaskBoard.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export interface TaskBoardContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    columnDatasource: ListValue;
    columnWidgets: ListWidgetValue;
    columnIdAttr: ListAttributeValue<Big | string>;
    allowedDropColumnsAttr: ListAttributeValue<string>;
    itemDatasource: ListValue;
    itemWidgets: ListWidgetValue;
    itemIdAttr: ListAttributeValue<Big | string>;
    itemSeqNbrAttr: ListAttributeValue<Big>;
    linkedToColumnIdAttr: ListAttributeValue<Big | string>;
    itemIsDragDisabledAttr?: ListExpressionValue<boolean>;
    droppedItemIdAttr: EditableValue<Big | string>;
    draggedFromColumnIdAttr: EditableValue<Big | string>;
    droppedOnColumnIdAttr: EditableValue<Big | string>;
    dropDataAttr: EditableValue<string>;
    onDropAction?: ActionValue;
}

export interface TaskBoardPreviewProps {
    class: string;
    style: string;
    columnDatasource: {} | null;
    columnWidgets: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    columnIdAttr: string;
    allowedDropColumnsAttr: string;
    itemDatasource: {} | null;
    itemWidgets: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    itemIdAttr: string;
    itemSeqNbrAttr: string;
    linkedToColumnIdAttr: string;
    itemIsDragDisabledAttr: string;
    droppedItemIdAttr: string;
    draggedFromColumnIdAttr: string;
    droppedOnColumnIdAttr: string;
    dropDataAttr: string;
    onDropAction: {} | null;
}
