/**
 * This file was generated from TaskBoard.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ListValue, ListAttributeValue, ListExpressionValue, ListWidgetValue } from "mendix";

export interface TaskBoardContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
    columnDatasource: ListValue;
    columnWidgets: ListWidgetValue;
    columnIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemDatasource: ListValue;
    itemWidgets: ListWidgetValue;
    itemIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemSqeNbrAttr: ListAttributeValue<BigJs.Big>;
    linkedToColumnIdAttr: ListAttributeValue<BigJs.Big | string>;
    itemIsDragDisabledAttr?: ListExpressionValue<boolean>;
}

export interface TaskBoardPreviewProps {
    class: string;
    style: string;
    columnDatasource: {} | null;
    columnWidgets: { widgetCount: number; renderer: ComponentType };
    columnIdAttr: string;
    itemDatasource: {} | null;
    itemWidgets: { widgetCount: number; renderer: ComponentType };
    itemIdAttr: string;
    itemSqeNbrAttr: string;
    linkedToColumnIdAttr: string;
    itemIsDragDisabledAttr: string;
}
