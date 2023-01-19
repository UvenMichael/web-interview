const express = require('express');
const cors = require('cors');
const app = express();
const { updateFile, getFile } = require("./fileFunctions");
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    const todoLists = getFile();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(todoLists));
}),
app.post('/', function (req, res) {
    let response = '{status:"ok"}';
    const listId = req.body.listId;
    const todos = req.body.todos;
    const fileSaveSuccessful = updateFile(listId, todos);
    if (fileSaveSuccessful === false) {
        response = '{status:"failed"}';
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
}),
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
