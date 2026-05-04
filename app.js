// app.js - Application logic (entry point)
import { loadTasks, saveTasks } from './modules/storage.js';
import { renderTaskList, updateCounters } from './modules/render.js';
import { validateTaskInput } from './modules/validation.js';

let tasks = loadTasks();
let currentFilter = 'all';
let editingId = null;

const history = [];
const saveState = () => {
  history.push(JSON.stringify(tasks));
  if (history.length > 50) history.shift();
};

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

const taskForm      = document.getElementById('task-form');
const taskInput     = document.getElementById('task-input');
const charCount     = document.getElementById('char-count');
const errorMsg      = document.getElementById('error-msg');
const taskList      = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const counterEl     = document.getElementById('task-counter');
const clearDoneBtn  = document.getElementById('clear-completed');
const allBtn        = document.querySelector('[data-filter="all"]');
const activeBtn     = document.querySelector('[data-filter="active"]');
const completedBtn  = document.querySelector('[data-filter="completed"]');

function refresh() {
  renderTaskList(taskList, tasks, currentFilter);
  updateCounters(tasks, allBtn, activeBtn, completedBtn, counterEl);
}

refresh();

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const value = taskInput.value;
  const { valid, error } = validateTaskInput(value);

  if (!valid) {
    errorMsg.textContent = error;
    errorMsg.style.display = 'block';
    taskInput.classList.add('input-error');
    return;
  }

  errorMsg.style.display = 'none';
  taskInput.classList.remove('input-error');

  if (editingId !== null) {
    saveState();
    const idx = tasks.findIndex(t => t.id === editingId);
    if (idx !== -1) tasks[idx].text = value.trim();
    editingId = null;
    taskForm.querySelector('button[type="submit"]').textContent = '+ Add Task';
  } else {
    saveState();
    tasks.push(createTask(value));
  }

  saveTasks(tasks);
  taskInput.value = '';
  charCount.textContent = '0 / 120';
  refresh();
});

taskInput.addEventListener('input', () => {
  const len = taskInput.value.length;
  charCount.textContent = `${len} / 120`;
  charCount.style.color = len > 100 ? '#e74c3c' : '';

  if (taskInput.value.trim()) {
    errorMsg.style.display = 'none';
    taskInput.classList.remove('input-error');
  }
});

taskList.addEventListener('click', e => {
  const taskEl = e.target.closest('.task');
  if (!taskEl) return;

  const taskId = Number(taskEl.dataset.id);
  const taskIdx = tasks.findIndex(t => t.id === taskId);

  if (e.target.closest('.delete-btn')) {
    if (confirm('Delete this task?')) {
      saveState();
      tasks.splice(taskIdx, 1);
      saveTasks(tasks);
      refresh();
    }
  }

  if (e.target.closest('.edit-btn')) {
    editingId = taskId;
    taskInput.value = tasks[taskIdx].text;
    charCount.textContent = `${tasks[taskIdx].text.length} / 120`;
    taskForm.querySelector('button[type="submit"]').textContent = '✔ Save Edit';
    taskInput.focus();
  }

  if (e.target.type === 'checkbox') {
    saveState();
    tasks[taskIdx].completed = e.target.checked;
    taskEl.classList.toggle('completed', e.target.checked);
    saveTasks(tasks);
    updateCounters(tasks, allBtn, activeBtn, completedBtn, counterEl);
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    refresh();
  });
});

if (clearDoneBtn) {
  clearDoneBtn.addEventListener('click', () => {
    const doneCount = tasks.filter(t => t.completed).length;
    if (doneCount === 0) return;
    if (confirm(`Remove ${doneCount} completed task(s)?`)) {
      saveState();
      tasks = tasks.filter(t => !t.completed);
      saveTasks(tasks);
      refresh();
    }
  });
}