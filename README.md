# Scriptbook 📓

This is an interactive coding environment (sorta like codepen). You can write Javascript, see it being executed in the browser, and write comprehensive documentation using markdown!

## Installing the package

run `npm install scriptbook` in your console

## Running the package

`scriptbook serve` :: this will run the package with the default settings

`scriptbook serve mynotes.js` :: this will run the package with a specified file to use/run

`scriptbook serve example.js --port 3050` :: This will run the package with the specified file and on port 3050

## Using the package

- Click any cell to edit
- The code in each code editor is all joined together into one file. So if you define a variable in cell #1, you can refer to that variable in any following code cell!
- You can show any React component, string, number, or anything else by calling a function built forthis environment `show`
- Re-order or delete cells using the button on the top right corner of each cell
- Add new cells by hovering on the divider between each cell

### Additional Information

All of your changes get saved to the file you opened Scriptbook with. So if you run `scriptbook serve example.js`, all of the text and code you write will be saved to the test.js file
