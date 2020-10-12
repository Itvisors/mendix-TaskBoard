/**
 * This file was generated from TaskBoard.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { EditableValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";

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
    itemSeqNbrAttr: ListAttributeValue<BigJs.Big>;
    linkedToColumnIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemIsDragDisabledAttr?: ListExpressionValue<boolean>;
    droppedOnColumnIdAttr: EditableValue<BigJs.Big | string>;
    onDropAction?: ListActionValue;
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
    itemSeqNbrAttr: string;
    linkedToColumnIdAttr: string;
    itemIsDragDisabledAttr: string;
    droppedOnColumnIdAttr: string;
    onDropAction: {} | null;
}
