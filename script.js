// My unique array to store all tasks
let myTaskList = [];

// Load tasks from local storage if available
if (localStorage.getItem('myTaskList')) {
    myTaskList = JSON.parse(localStorage.getItem('myTaskList'));
}

// Function to create a new task object
function createTask(name, category, deadline, status) {
    return {
        id: Date.now() + Math.random().toString(16).slice(2), // unique id
        name,
        category,
        deadline,
        status
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
    renderFilters(); // Immediately update filter options after adding a task
    renderTaskList();
    clearInputs();
});

function clearInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskStatus').value = 'In Progress';
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

    let html = `<table class="my-task-table">
        <thead>
            <tr>
                <th>Task</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Update</th>
                <th>Actions</th>
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
                    <span class="status ${task.status.replace(' ', '-').toLowerCase()}">${task.status}</span>
                </td>
                <td>
                    <select data-id="${task.id}" class="status-changer">
                        <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>
                </td>
                <td>
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
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

    // Attach event listeners for delete
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteTask(id);
        });
    });

    // Attach event listeners for edit
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editTask(id);
        });
    });
}

function updateTaskStatus(id, newStatus) {
    myTaskList = myTaskList.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
    );
    saveTasks();
    rerenderAll(); // Use rerenderAll to update both filters and task list
}

function deleteTask(id) {
    myTaskList = myTaskList.filter(task => task.id !== id);
    saveTasks();
    rerenderAll();
}

function editTask(id) {
    const task = myTaskList.find(t => t.id === id);
    if (!task) return;
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskStatus').value = task.status;

    // Remove the old task so when user clicks Add, it will be replaced
    myTaskList = myTaskList.filter(t => t.id !== id);
    saveTasks();
    rerenderAll();
}

// Initial render
rerenderAll(); // Use rerenderAll instead of renderTaskList()

// Render filter controls
function renderFilters() {
    const filterSection = document.getElementById('filters');
    // Get unique categories
    const categories = [...new Set(myTaskList.map(task => task.category))];
    let html = `
        <label>Filter by Category:
            <select id="filterCategory">
                <option value="">All</option>
                ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>
        </label>
        <label>Filter by Status:
            <select id="filterStatus">
                <option value="">All</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Overdue">Overdue</option>
            </select>
        </label>
        <button id="clearFilters">Clear Filters</button>
    `;
    filterSection.innerHTML = html;

    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterStatus').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', () => {
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterStatus').value = '';
        renderTaskList();
    });
}

function applyFilters() {
    const cat = document.getElementById('filterCategory').value;
    const status = document.getElementById('filterStatus').value;
    let filtered = myTaskList;
    if (cat) filtered = filtered.filter(task => task.category === cat);
    if (status) filtered = filtered.filter(task => task.status === status);
    renderTaskList(filtered);
}

renderFilters();

// Update filters after adding or updating tasks
function rerenderAll() {
    renderFilters();
    renderTaskList();
}