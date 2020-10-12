## TaskBoard
Create taskboards or other lists with items, allowing the user to drag the items to reorder them and move the items between columns.

Wrapper around the [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)

## Features
- Flexible number of columns
- Horizontal and vertical orientation of the lists
- Block items from being dragged
- Configure where items can be moved to

## Usage
- Make sure you have some unique identifier on your column and item entities.
- The item entity needs to allow for a sequence number. The widget sets the sequence number after an item was dropped.
- Configure the column datasource
- Configure the item datasource. Make sure the items are returned sorted on the sequence number.
- Configure the action to handle the drop. You **must** retrieve all items in the same column and commit them so the updated sequence numbers are saved to the database.

## Page layout
The widget can handle scrolling the list during the drag, but only if the page uses a layout without scroll container. Regular layouts have a scroll container, preventing the widget from taking control of scrolling.

## Sample project
Check out the sample project for a working task board.

## Issues, suggestions and feature requests
https://github.com/Itvisors/mendix-TaskBoard/issues

