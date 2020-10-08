import { Component, ReactNode, createElement } from "react";

import { TaskBoardContainerProps } from "../typings/TaskBoardProps";
import { Column } from "./components/Column";
import { TaskBoardData } from "./types/CustomTypes";

import "./ui/TaskBoard.css";

export default class TaskBoard extends Component<TaskBoardContainerProps> {
    private taskBoardData: TaskBoardData = {
        columnArray: [
            {
                columnId: "column-1",
                itemArray: [{ itemId: "item-1" }, { itemId: "item-2" }, { itemId: "item-3" }, { itemId: "item-4" }]
            },
            {
                columnId: "column-2",
                itemArray: []
            },
            {
                columnId: "column-3",
                itemArray: []
            }
        ]
    };

    render(): ReactNode {
        const className = "taskBoardContainer taskBoardContainerVertical " + this.props.class;
        return (
            <div className={className}>
                {this.taskBoardData.columnArray.map(columnData => {
                    return <Column key={columnData.columnId} data={columnData} />;
                })}
            </div>
        );
    }
}
