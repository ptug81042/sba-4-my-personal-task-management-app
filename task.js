// task.js
export class Task {
    constructor(name, category, deadline, status) {
        this.id = Date.now() + Math.random().toString(16).slice(2); // unique id
        this.name = name;
        this.category = category;
        this.deadline = deadline;
        this.status = status;
    }

    isOverdue(currentDate) {
        return this.status !== 'Completed' && this.deadline < currentDate;
    }
}
