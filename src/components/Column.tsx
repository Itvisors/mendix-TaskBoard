import { Component, ReactNode, createElement } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnData, ColumnDropTargetStatus, ColumnItemData } from "../types/CustomTypes";
import { Item } from "./Item";
import { ListWidgetValue, ObjectItem } from "mendix";

export interface ColumnProps {
    columnData: ColumnData;
    columnMendixObject: ObjectItem | undefined;
    items: ColumnItemData[];
    columnDropStatus: ColumnDropTargetStatus;
    isVertical: boolean;
    columnWidgets: ListWidgetValue;
    itemWidgets: ListWidgetValue;
}

export class Column extends Component<ColumnProps> {
    render(): ReactNode {
        const { columnMendixObject } = this.props;
        let columnClassName = "taskBoardColumn + columnDropStatus" + this.props.columnDropStatus;
        if (this.props.isVertical) {
            columnClassName += " taskBoardColumnVertical";
        }
        return (
            <div className={columnClassName} data-columnid={this.props.columnData.columnId}>
                <div className="taskBoardColumnHeader">
                    {columnMendixObject && this.props.columnWidgets.get(columnMendixObject)}
                </div>
                <Droppable
                    droppableId={this.props.columnData.columnId}
                    isDropDisabled={this.props.columnDropStatus === "NotAllowed"}
                >
                    {(provided, snapshot) => {
                        let itemListClassName = "taskBoardItemList";
                        if (this.props.isVertical) {
                            itemListClassName += " taskBoardItemListVertical";
                        }
                        if (snapshot.isDraggingOver) {
                            itemListClassName += " taskBoardItemListDraggingOver";
                        } else if (snapshot.draggingFromThisWith) {
                            itemListClassName += " taskBoardItemListDraggingFrom";
                        }
                        return (
                            <div className={itemListClassName} ref={provided.innerRef} {...provided.droppableProps}>
                                {this.props.items.map((columnItemData, index) => {
                                    return (
                                        <Item
                                            key={columnItemData.itemData.itemId}
                                            columnItemData={columnItemData}
                                            index={index}
                                            itemWidgets={this.props.itemWidgets}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        );
    }
}
