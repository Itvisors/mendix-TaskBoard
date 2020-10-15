## TaskBoard
Create taskboards or other lists with items, allowing the user to drag the items to reorder them and move the items between columns.

Wrapper around the [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

## Features
- Flexible number of columns
- Horizontal and vertical orientation of the lists
- Block items from being dragged
- Configure where items can be moved to

## Limitations
- Unfortunately it is not yet possible for the widget to update the datasource item data directly. 

## Usage
- Make sure you have some unique identifier on your column and item entities.
- The item entity needs to allow for a sequence number. The widget sets the sequence number after an item was dropped.
- Configure the column datasource
- Configure the item datasource. Make sure the items are returned sorted on the sequence number.
- Configure the action to handle the drop. 
- Set the sequence numbers of the items in the column using the passed JSON data. Be sure to check the sample project for an example of this logic.
- After handling the drop, clear the ID values and drop data on the context.

## Preventing flickering
Calling the drop action is asynchronous. In first versions of the widget, the dropped items would briefly be visible at the old position while the drop action (your microflow) was running. To fix this, the widget stores the ID of the column the item was dragged from in the context. The drop action **must** clear this value. For numeric IDs, zero is treated as empty. If the dragged from column ID is not cleared, the columns will still show as valid or invalid drop target.

## Page layout
The widget can handle scrolling the list during the drag, but only if the page uses a layout without scroll container. Regular layouts have a scroll container, preventing the widget from taking control of scrolling.

## Sample project
Check out the sample project for a working task board.

## Issues, suggestions and feature requests
https://github.com/Itvisors/mendix-TaskBoard/issues

