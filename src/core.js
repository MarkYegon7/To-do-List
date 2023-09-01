import './styles.css';
import { renderTasks } from './render.js';
import {
  addTask, setTasks, getTasks,
} from './taskManager.js';

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(getTasks())); // Update localStorage with all tasks
}

function initializeApp() {
  const addTaskButton = document.getElementById('add-button');
  const taskInput = document.getElementById('task-input');
  const clearButton = document.getElementById('clear-button');

  clearButton.addEventListener('click', () => {
    const tasks = getTasks(); // Clear tasks
    tasks.length = 0;
    updateLocalStorage();
    renderTasks();
  });

  addTaskButton.addEventListener('click', () => {
    const newTaskDescription = taskInput.value.trim();
    if (newTaskDescription !== '') {
      addTask(newTaskDescription);
      updateLocalStorage();
      renderTasks();
      taskInput.value = '';
    }
  });
  renderTasks();
}

window.addEventListener('load', () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    const tasksData = JSON.parse(storedTasks);
    setTasks(tasksData); // Load tasks from localStorage
  }
  initializeApp();
  renderTasks();
});
