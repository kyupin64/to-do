# to-do

When you first open the page, add a new list by typing a name into the input field at the top of the page, then click the "Submit" button. There are some list suggestions under the input that may give you some ideas. Once you have at least one list, the list input box switches to the left side of the screen and under it is a clickable list of each list you've added.

Add list items by clicking the "+" button under the list title in the main portion of the screen. Enter a to-do item in the input and click "Submit" to add it to your list. To the left of the new list item is a checkbox which you can click to mark the item as completed. You can also unmark it by clicking the box again. Click the pencil icon to the right of the to-do item to edit the text of the item and then click "Submit" to apply the change. Click the trashcan icon to the rght of the pencil icon to delete the list item. It will pull up a confirmation popup, press the "Yes, delete" button to delete the item and the "No, go back" button to keep the item and make the popup go away.

Under all the list items are three more buttons. The first one at the top, "Edit list name," will change the title at the top of the page to an input field where you can edit the title text and submit it again. The next button, "Clear completed," will again pull up a deletion confirmation box to delete all the items you've marked as completed. Once again, you can choose to either delete all the items or go back. The last button, "Delete list," will delete the entire list, including the items, the title, and the button on the left "list of lists" bar.

Careful when you delete anything, it will delete it for good... But I did implement local storage, so you can close the tab/refresh and all your lists will stay the same.

There is one problem. Since I didn't add IDs to the list items, if you make two items with the same text, they'll both be crossed off if you press the checkbox next to either of them, and when you clear all completed items they'll both be removed. I should've added IDs to begin with, and it's not too complicated of a fix, so I might try to go back and fix that.

The buttons in the header don't actually do anything. I wanted to make a settings screen that let you choose whether new list items/lists were placed at the top vs the bottom of the list and a dark theme option, but I ran out of time. I also did not implement drag and drop reordering, I wasn't sure exactly how to do it and I didn't have enough time to figure it out.
