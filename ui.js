// ui.js
export function clearInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskStatus').value = 'In Progress';
}

export function renderTaskList(tasks, onStatusChange, onEdit, onDelete) {
    const taskSection = document.getElementById('task-list-section');
    if (!tasks.length) {
        taskSection.innerHTML = '<p>No tasks yet. Add something!</p>';
        return;
    }

    let html = `<table class="my-task-table">
        <thead>
            <tr>
                <th>Task</th><th>Category</th><th>Deadline</th><th>Status</th><th>Update</th><th>Actions</th>
            </tr>
        </thead>
        <tbody>`;

    tasks.forEach(task => {
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
            </tr>`;
    });

    html += '</tbody></table>';
    taskSection.innerHTML = html;

    // Attach event listeners
    document.querySelectorAll('.status-changer').forEach(el => {
        el.addEventListener('change', e => onStatusChange(e.target.getAttribute('data-id'), e.target.value));
    });
    document.querySelectorAll('.edit-btn').forEach(el => {
        el.addEventListener('click', e => onEdit(e.target.getAttribute('data-id')));
    });
    document.querySelectorAll('.delete-btn').forEach(el => {
        el.addEventListener('click', e => onDelete(e.target.getAttribute('data-id')));
    });
}

export function renderFilters(categories, onFilterChange, onClear) {
    const filterSection = document.getElementById('filters');
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
        <button id="clearFilters">Clear Filters</button>`;

    filterSection.innerHTML = html;

    document.getElementById('filterCategory').addEventListener('change', onFilterChange);
    document.getElementById('filterStatus').addEventListener('change', onFilterChange);
    document.getElementById('clearFilters').addEventListener('click', onClear);
}
