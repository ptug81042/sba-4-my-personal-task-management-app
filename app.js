// app.js
import { Task } from './task.js';
import { saveTasks, loadTasks } from './storage.js';
import { clearInputs, renderTaskList, renderFilters } from './ui.js';

let tasks = loadTasks();

function updateOverdueStatus() {
    const today = new Date().toISOString().split('T')[0];
    tasks.forEach(task => {
        if (task.isOverdue(today)) {
            task.status = 'Overdue';
        } else if (task.status === 'Overdue' && task.deadline >= today) {
            task.status = 'In Progress';
        }
    });
}

function rerenderAll() {
    updateOverdueStatus();
    const categories = [...new Set(tasks.map(t => t.category))];
    renderFilters(categories, applyFilters, clearFilters);
    renderTaskList(tasks, updateTaskStatus, editTask, deleteTask);
    saveTasks(tasks);
}

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const name = document.getElementById('taskName').value.trim();
    const category = document.getElementById('taskCategory').value.trim();
    const deadline = document.getElementById('taskDeadline').value;
    const status = document.getElementById('taskStatus').value;

    if (!name || !category || !deadline) {
        alert('Please fill out all fields!');
        return;
    }

    const newTask = new Task(name, category, deadline, status);
    tasks.push(newTask);
    clearInputs();
    rerenderAll();
});

function updateTaskStatus(id, newStatus) {
    tasks = tasks.map(t => t.id === id ? {...t, status: newStatus} : t);
    rerenderAll();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    rerenderAll();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('taskName').value = task.name;
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskStatus').value = task.status;

    tasks = tasks.filter(t => t.id !== id);
    rerenderAll();
}

function applyFilters() {
    const cat = document.getElementById('filterCategory').value;
    const status = document.getElementById('filterStatus').value;
    let filtered = tasks;
    if (cat) filtered = filtered.filter(t => t.category === cat);
    if (status) filtered = filtered.filter(t => t.status === status);
    renderTaskList(filtered, updateTaskStatus, editTask, deleteTask);
}

function clearFilters() {
    document.getElementById('filterCategory').value = '';
    document.getElementById('filterStatus').value = '';
    rerenderAll();
}

// Initialize app
rerenderAll();
