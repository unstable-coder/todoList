const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// This is our "Database" (just a simple array for now)
let todoList = [];

// 1. ROUTE: Show the To-Do List
app.get('/', (req, res) => {
    // Render the 'index.ejs' file and send the todoList array to it
    res.render('index', { tasks: todoList });
});

// 2. ROUTE: Add a new task
app.post('/add', (req, res) => {
    const newTask = req.body.task; // Get data from the input box
    if (newTask) {
        todoList.push(newTask); // Add to the array
    }
    res.redirect('/'); // Reload the page to show the new list
});

// 3. ROUTE: Delete a task
app.post('/delete', (req, res) => {
    const taskToDelete = req.body.taskIndex;
    // Remove the item at the specific index
    todoList.splice(taskToDelete, 1); 
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});