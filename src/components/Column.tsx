import { Component, ReactNode, createElement } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnData, ItemData } from "../types/CustomTypes";
import { Item } from "./Item";

export interface ColumnProps {
    columnData: ColumnData;
    items: ItemData[];
    isDropDisabled: boolean;
    isVertical: boolean;
}

export class Column extends Component<ColumnProps> {
    render(): ReactNode {
        return (
            <div className="taskBoardColumn taskBoardColumnVertical">
                <span>{this.props.columnData.columnId}</span>
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
                                {this.props.items.map((itemData, index) => {
                                    return <Item key={itemData.itemId} itemData={itemData} index={index} />;
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
