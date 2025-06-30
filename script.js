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

function renderTaskList(filteredTasks = null) {
    const taskSection = document.getElementById('task-list-section');
    const tasksToShow = filteredTasks || myTaskList;

    // Check for overdue tasks
    const today = new Date().toISOString().split('T')[0];
    tasksToShow.forEach(task => {
        if (task.status !== 'Completed' && task.deadline < today) {
            task.status = 'Overdue';
        } else if (task.status === 'Overdue' && task.deadline >= today) {
            task.status = 'In Progress';
        }
    });

    saveTasks();

    if (tasksToShow.length === 0) {
        taskSection.innerHTML = '<p>No tasks yet. Add something!</p>';
        return;
    }

    let html = `
        <table class="my-task-table">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Category</th>
                    <th>Deadline</th>
                    <th>Status</th>
                    <th>Update</th>
                </tr>
            </thead>
            <tbody>
    `;

    tasksToShow.forEach(task => {
        html += `
            <tr>
                <td>${task.name}</td>
                <td>${task.category}</td>
                <td>${task.deadline}</td>
                <td>
                    <span class="status ${task.status.replace(' ', '_').toLowerCase()}">${task.status}</span>
                </td>
                <td>
                    <select data-id="${task.id}" class="status-changer">
                        <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    taskSection.innerHTML = html;

    // Attach event listeners for status change
    document.querySelectorAll('.status-changer').forEach(select => {
        select.addEventListener('change', (e) => {
            const id = e.target.getAttribute('data-id');
            const newStatus = e.target.value;
            updateTaskStatus(id, newStatus);
        });
    });
}

function updateTaskStatus(id, newStatus) {
    myTaskList = myTaskList.map(task => task.id === id ? { ...task, status: newStatus } : task);
    saveTasks();
    renderTaskList();
}

// Initial render
renderTaskList();