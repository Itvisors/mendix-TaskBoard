/**
 * This file was generated from TaskBoard.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";

export interface TaskBoardContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    columnDatasource: ListValue;
    columnWidgets: ListWidgetValue;
    columnIdAttr: ListAttributeValue<BigJs.Big | string>;
    allowedDropColumnsAttr: ListAttributeValue<string>;
    itemDatasource: ListValue;
    itemWidgets: ListWidgetValue;
    itemIdAttr: ListAttributeValue<BigJs.Big | string>;
    linkedToColumnIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemIsDragDisabledAttr?: ListExpressionValue<boolean>;
    droppedItemIdAttr: EditableValue<BigJs.Big | string>;
    draggedFromColumnIdAttr: EditableValue<BigJs.Big | string>;
    droppedOnColumnIdAttr: EditableValue<BigJs.Big | string>;
    dropDataAttr: EditableValue<string>;
    onDropAction?: ActionValue;
}

export interface TaskBoardPreviewProps {
    class: string;
    style: string;
    columnDatasource: {} | null;
    columnWidgets: { widgetCount: number; renderer: ComponentType };
    columnIdAttr: string;
    allowedDropColumnsAttr: string;
    itemDatasource: {} | null;
    itemWidgets: { widgetCount: number; renderer: ComponentType };
    itemIdAttr: string;
    linkedToColumnIdAttr: string;
    itemIsDragDisabledAttr: string;
    droppedItemIdAttr: string;
    draggedFromColumnIdAttr: string;
    droppedOnColumnIdAttr: string;
    dropDataAttr: string;
    onDropAction: {} | null;
}
