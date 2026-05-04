// storage.js - localStorage abstraction

export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const loadTasks = () => {
  return JSON.parse(localStorage.getItem('tasks')) || [];
};

export const clearTasks = () => {
  localStorage.removeItem('tasks');
};