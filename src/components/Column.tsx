import { Component, ReactNode, createElement } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnData, ColumnItemData } from "../types/CustomTypes";
import { Item } from "./Item";
import { ListWidgetValue, ObjectItem } from "mendix";

export interface ColumnProps {
    columnData: ColumnData;
    columnMendixObject: ObjectItem | undefined;
    items: ColumnItemData[];
    isDropDisabled: boolean;
    isVertical: boolean;
    columnWidgets: ListWidgetValue;
    itemWidgets: ListWidgetValue;
}

export class Column extends Component<ColumnProps> {
    render(): ReactNode {
        const { columnMendixObject } = this.props;
        return (
            <div className="taskBoardColumn taskBoardColumnVertical" data-columnid={this.props.columnData.columnId}>
                <div className="taskBoardColumnHeader">
                    {columnMendixObject && this.props.columnWidgets(columnMendixObject)}
                </div>
                <Droppable droppableId={this.props.columnData.columnId} isDropDisabled={this.props.isDropDisabled}>
                    {(provided, snapshot) => {
                        let className = "taskBoardItemList";
                        if (this.props.isVertical) {
                            className += " taskBoardItemListVertical";
                        }
                        if (snapshot.isDraggingOver) {
                            className += " taskBoardItemListDraggingOver";
                        }
                        return (
                            <div className={className} ref={provided.innerRef} {...provided.droppableProps}>
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
