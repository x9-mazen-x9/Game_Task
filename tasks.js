const TaskManager = {
    createTaskElement(task, onComplete, onDelete) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text} <small>(${task.priority})</small></span>
            <div class="actions">
                <button class="complete-btn">✔️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        li.querySelector('.complete-btn').onclick = () => onComplete(task.id);
        li.querySelector('.delete-btn').onclick = () => onDelete(task.id);
        
        return li;
    }
};
