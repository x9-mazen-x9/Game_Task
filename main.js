// الحالة الافتراضية للتطبيق (State)
let gameState = Storage.load('master_rpg_state') || {
    xp: 0,
    level: 1,
    tasks: []
};

// تحديث الواجهة عند البداية
GameLogic.updateUI(gameState);
renderTasks();

// إضافة مهمة جديدة
document.getElementById('addTaskBtn').onclick = () => {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('taskPriority').value;

    if (input.value.trim() === "") return;

    const newTask = {
        id: Date.now(),
        text: input.value,
        priority: priority,
        completed: false,
        xpValue: priority === 'high' ? 50 : (priority === 'medium' ? 25 : 10)
    };

    gameState.tasks.push(newTask);
    saveAndRefresh();
    input.value = "";
};

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = "";
    gameState.tasks.forEach(task => {
        const el = TaskManager.createTaskElement(task, toggleTask, deleteTask);
        list.appendChild(el);
    });
}

function toggleTask(id) {
    const task = gameState.tasks.find(t => t.id === id);
    if (task && !task.completed) {
        task.completed = true;
        const result = GameLogic.updateXP(gameState.xp, task.xpValue);
        gameState.xp = result.newXP;
        
        if (result.leveledUp) {
            gameState.level++;
            showLevelUpModal();
        }
        saveAndRefresh();
    }
}

function deleteTask(id) {
    gameState.tasks = gameState.tasks.filter(t => t.id !== id);
    saveAndRefresh();
}

function saveAndRefresh() {
    Storage.save('master_rpg_state', gameState);
    GameLogic.updateUI(gameState);
    renderTasks();
}

function showLevelUpModal() {
    const modal = document.getElementById('levelUpModal');
    document.getElementById('newLevel').innerText = gameState.level;
    modal.classList.remove('hidden');
    
    // تشغيل تأثير الاحتفال (Confetti)
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6c5ce7', '#a29bfe', '#fab1a0']
        });
    }
}

window.closeModal = () => {
    document.getElementById('levelUpModal').classList.add('hidden');
};
