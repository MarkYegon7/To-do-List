import './styles.css';

const tasks = [
  { description: 'Buy groceries', completed: false, index: 0 },
  { description: 'Walk the dog', completed: false, index: 1 },
  { description: 'Clean the house', completed: false, index: 2 },
];

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  const addTaskButton = document.getElementById('add-button');
  const taskInput = document.getElementById('task-input');
  const clearButton = document.getElementById('clear-button');

  // Clear existing content before re-rendering
  todoList.innerHTML = '';

  function updateTaskStyles() {
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

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      updateTaskStyles(); // Call the function to update task styles
    });

    const taskDescription = document.createElement('span');
    taskDescription.classList.add('task-description'); // Add class for styling
    taskDescription.textContent = task.description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); // Add class for styling
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
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
    return;
  }

  clearButton.addEventListener('click', () => {
    tasks.length = 0;
    renderTasks();
  });

  addTaskButton.addEventListener('click', () => {
    const newTaskDescription = taskInput.value.trim();
    if (newTaskDescription !== '') {
      const newTask = {
        description: newTaskDescription,
        completed: false,
        index: 1,
      };
      tasks.unshift(newTask);
      renderTasks();
      taskInput.value = '';
    }
  });
}

window.addEventListener('load', renderTasks);
