const fs = require("fs");

const updateFile = (listId, todos) => {
    let todoLists = getFile();
    todoLists[listId].todos = todos;
    const jsonString = JSON.stringify(todoLists);
    fs.writeFile('./jsonFiles/todoLists.json', jsonString, error => {
        if (error) {
            console.log('Error writing file', error);
            return false;

        } else {
            return true;
        }
    })
}

const getFile = () => {
    try {
        const data = fs.readFileSync('./jsonFiles/todoLists.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { updateFile, getFile };

