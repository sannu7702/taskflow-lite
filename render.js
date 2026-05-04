// render.js - DOM rendering functions

export const escapeHTML = (str) => {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    "'": '&#39;', '"': '&quot;'
  })[tag]);
};

export const renderTaskList = (taskListElement, tasks, currentFilter = 'all') => {
  const filtered = tasks.filter(t => {
    if (currentFilter === 'active') return !t.completed;
    if (currentFilter === 'completed') return t.completed;
    return true;
  });

  taskListElement.innerHTML = '';

  if (filtered.length === 0) {
    taskListElement.innerHTML = `
      <li class="empty-state">
        <div class="empty-icon">📋</div>
        <p>${currentFilter === 'all' ? 'No tasks yet. Add your first task!' : 'No ' + currentFilter + ' tasks.'}</p>
      </li>`;
    return;
  }

  filtered.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.className = `task ${task.completed ? 'completed' : ''}`;
    taskElement.dataset.id = task.id;

    taskElement.innerHTML = `
      <label class="task-label">
        <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
        <span class="checkmark"></span>
        <span class="task-text">${escapeHTML(task.text)}</span>
      </label>
      <div class="task-actions">
        <button class="edit-btn" aria-label="Edit task">✏️</button>
        <button class="delete-btn" aria-label="Delete task">🗑️</button>
      </div>`;

    taskListElement.appendChild(taskElement);
  });
};

export const updateCounters = (tasks, allBtn, activeBtn, completedBtn, counterEl) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  if (counterEl) {
    counterEl.textContent = `${active} task${active !== 1 ? 's' : ''} left`;
  }

  if (allBtn) allBtn.dataset.count = total;
  if (activeBtn) activeBtn.dataset.count = active;
  if (completedBtn) completedBtn.dataset.count = completed;
};