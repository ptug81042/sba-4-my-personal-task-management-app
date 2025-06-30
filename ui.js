// ui.js

export function clearInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('taskDeadline').value = '';
    document.getElementById('taskStatus').value = 'In Progress';
}

export function renderFilters(categories, onApplyFilters, onClearFilters) {
    const filtersSection = document.getElementById('filters');

    const statusOptions = ['In Progress', 'Completed', 'Overdue'];

    let categoryOptionsHTML = `<option value="">All Categories</option>`;
    categories.forEach(cat => {
        categoryOptionsHTML += `<option value="${cat}">${cat}</option>`;
    });

    let statusOptionsHTML = `<option value="">All Statuses</option>`;
    statusOptions.forEach(status => {
        statusOptionsHTML += `<option value="${status}">${status}</option>`;
    });

    filtersSection.innerHTML = `
        <label for="filterCategory">Category: </label>
        <select id="filterCategory">${categoryOptionsHTML}</select>

        <label for="filterStatus">Status: </label>
        <select id="filterStatus">${statusOptionsHTML}</select>

        <button id="applyFiltersBtn">Apply Filters</button>
        <button id="clearFiltersBtn">Clear Filters</button>
    `;

    document.getElementById('applyFiltersBtn').onclick = onApplyFilters;
    document.getElementById('clearFiltersBtn').onclick = onClearFilters;
}

export function renderTaskList(tasks, onStatusChange, onEdit, onDelete, onToggleComplete, onDragStart, onDragOver, onDrop) {
    const taskSection = document.getElementById('task-list-section');
    if (!tasks.length) {
        taskSection.innerHTML = '<p>No tasks yet. Add something!</p>';
        return;
    }

    let html = `<table class="my-task-table" aria-label="Task list" role="grid">
        <thead>
            <tr>
                <th>Done</th>
                <th>Task</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;

    tasks.forEach(task => {
        html += `
            <tr draggable="true" data-id="${task.id}" role="row" tabindex="0">
                <td data-label="Done">
                    <input type="checkbox" class="status-checkbox" data-id="${task.id}" ${task.status === 'Completed' ? 'checked' : ''} aria-label="Mark task '${task.name}' completed" />
                </td>
                <td data-label="Task">${task.name}</td>
                <td data-label="Category">${task.category}</td>
                <td data-label="Deadline">${task.deadline}</td>
                <td data-label="Status">
                    <span class="status ${task.status.replace(' ', '-').toLowerCase()}">${task.status}</span>
                </td>
                <td data-label="Actions">
                    <button class="edit-btn" data-id="${task.id}" aria-label="Edit task ${task.name}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}" aria-label="Delete task ${task.name}">Delete</button>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    taskSection.innerHTML = html;

    // Attach event listeners for completion checkbox
    document.querySelectorAll('.status-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            const id = e.target.getAttribute('data-id');
            const completed = e.target.checked;
            onToggleComplete(id, completed);
        });
    });

    // Attach event listeners for edit and delete
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', e => onEdit(e.target.getAttribute('data-id')));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', e => onDelete(e.target.getAttribute('data-id')));
    });

    // Attach drag and drop event listeners
    const rows = document.querySelectorAll('.my-task-table tbody tr');
    rows.forEach(row => {
        row.addEventListener('dragstart', onDragStart);
        row.addEventListener('dragover', onDragOver);
        row.addEventListener('drop', onDrop);
        row.addEventListener('dragenter', e => e.preventDefault());
        row.addEventListener('dragleave', e => e.currentTarget.classList.remove('drag-over'));
    });
}
