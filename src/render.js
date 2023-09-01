import {
  deleteTask,
  editTaskDescription,
  getTasks,
  updateLocalStorage,
} from './taskManager.js';

export function updateTaskStyles() {
  const tasks = getTasks();
  const taskDescriptions = document.querySelectorAll('.task-description');
  taskDescriptions.forEach((taskDescription, index) => {
    const task = tasks[index];
    if (task) {
      taskDescription.style.textDecoration = task.completed
        ? 'line-through'
        : 'none';
    }
  });
}

export function renderTasks() {
  const tasks = getTasks();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      updateTaskStyles(tasks);
      updateLocalStorage(tasks);
    });
    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = task.description;
    taskDescription.addEventListener('click', () => {
      const taskInput = document.createElement('input');
      taskInput.type = 'text';
      taskInput.value = task.description;
      taskInput.addEventListener('blur', () => {
        const newDescription = taskInput.value.trim();
        if (newDescription !== '') {
          editTaskDescription(index, newDescription);
          renderTasks(tasks);
          updateLocalStorage(tasks);
        }
      });
      taskDescription.innerHTML = '';
      taskDescription.appendChild(taskInput);
      taskInput.focus();
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
      renderTasks(tasks);
      updateLocalStorage(tasks);
    });
    listItem.appendChild(checkbox);
    listItem.appendChild(taskDescription);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
    const hr = document.createElement('hr');
    todoList.appendChild(hr);
  });
  if (tasks.length === 0) {
    const message = document.createElement('p');
    message.textContent = 'No tasks to display.';
    todoList.appendChild(message);
  }
}
