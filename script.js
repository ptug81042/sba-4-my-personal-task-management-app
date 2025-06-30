// My unique array to store all tasks
let myTaskList = [];

// Load tasks from local storage if available
if (localStorage.getItem('myTaskList')) {
    myTaskList = JSON.parse(localStorage.getItem('myTaskList'));
}

// Function to create a new task object
function createTask(name, category, deadline, status) {
    return {
        id: Date.now() + Math.random().toString(16).slice(2), // Unique id
        name: name,
        category: category,
        deadline: deadline,
        status: status
    };
}

// Add Task button event
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const name = document.getElementById('taskName').value.trim();
    const category = document.getElementById('taskCategory').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    const status = document.getElementById('taskStatus').value;

    if (!name || !category || !deadline) {
        alert('Please fill out all fields!');
        return;
    }

    const newTask = createTask(name, category, deadline, status);
    myTaskList.push(newTask);
    saveTasks();
    renderTaskList();
    clearInputs();
});

function clearInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskStatus').value = 'In Progrees';
}

function saveTasks() {
    localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}

