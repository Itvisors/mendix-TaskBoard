import { Component, ReactNode, createElement } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { TaskBoardContainerProps } from "../typings/TaskBoardProps";
import { Column } from "./components/Column";
import { ColumnData, ItemData, TaskBoardData } from "./types/CustomTypes";

import "./ui/TaskBoard.css";

export default class TaskBoard extends Component<TaskBoardContainerProps> {
    private taskBoardData: TaskBoardData;

    // Temp state update to force a render
    state = {
        lastUpdated: new Date()
    };

    constructor(props: TaskBoardContainerProps) {
        super(props);

        // Create hardcoded data for first tests.
        this.taskBoardData = {
            itemMap: new Map<string, ItemData>(),
            columnArray: [
                {
                    columnId: "column-1",
                    itemKeyArray: ["item-1", "item-2", "item-3", "item-4"]
                },
                {
                    columnId: "column-2",
                    itemKeyArray: []
                },
                {
                    columnId: "column-3",
                    itemKeyArray: []
                }
            ],
            columnIndexMap: new Map<string, number>()
        };
        // Items
        this.taskBoardData.itemMap
            .set("item-1", { itemId: "item-1" })
            .set("item-2", { itemId: "item-2" })
            .set("item-3", { itemId: "item-3" })
            .set("item-4", { itemId: "item-4" });

        // Build map of key to array index. This bit we will also need with real data.
        this.taskBoardData.columnArray.forEach((columnData, index) => {
            this.taskBoardData.columnIndexMap.set(columnData.columnId, index);
        });
    }

    onDragEnd = (result: DropResult): void => {
        const { destination, source, draggableId } = result;

        // No destination, dropped elsewhere, so it is an invalid drop, ignore
        if (!destination) {
            return;
        }

        // If dropped at same position, no need to persist that change
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Retrieve the start and finish columns from the state
        const startIndex = this.taskBoardData.columnIndexMap.get(source.droppableId);
        const finishIndex = this.taskBoardData.columnIndexMap.get(destination.droppableId);
        if (startIndex === undefined || finishIndex === undefined) {
            return;
        }
        const start = this.taskBoardData.columnArray[startIndex];
        const finish = this.taskBoardData.columnArray[finishIndex];

        // Take the element from the start array
        start.itemKeyArray.splice(source.index, 1);

        console.info("Item " + draggableId + " has been dropped on " + finish.columnId);
        if (start.columnId === finish.columnId) {
            // Moving within the same column
            start.itemKeyArray.splice(destination.index, 0, draggableId);
        } else {
            // Moving from one column to another
            finish.itemKeyArray.splice(destination.index, 0, draggableId);
        }

        // Temp state update to force a render
        this.setState({
            lastUpdated: new Date()
        });
    };

    render(): ReactNode {
        console.info("render");
        const isVertical = true; // set from widget property
        let className = "taskBoardContainer " + this.props.class;
        if (isVertical) {
            className += " taskBoardContainerVertical";
        }
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={className}>
                    {this.taskBoardData.columnArray.map(columnData => {
                        return (
                            <Column
                                key={columnData.columnId}
                                columnData={columnData}
                                items={this.getItems(columnData)}
                                isDropDisabled={false}
                                isVertical={isVertical}
                            />
                        );
                    })}
                </div>
            </DragDropContext>
        );
    }

    getItems(columnData: ColumnData): ItemData[] {
        const items: ItemData[] = [];
        // A simple itemKeyArray.map() will not work with TypeScript because it complains about possible undefined values.
        // So a bit more old school
        for (const itemKey of columnData.itemKeyArray) {
            const item = this.taskBoardData.itemMap.get(itemKey);
            if (item) {
                items.push(item);
            }
        }
        return items;
    }
}
