const tasks = [];

export function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  updateLocalStorage(); // Call the updateLocalStorage function
}

export function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    // Update the task indexes
    tasks.forEach((task, idx) => {
      task.index = idx + 1;
    });
    updateLocalStorage(); // Call the updateLocalStorage function
  }
}

export function editTaskDescription(index, newDescription) {
  tasks[index].description = newDescription;
  updateLocalStorage(); // Call the updateLocalStorage function
}

export function getTasks() {
  return tasks;
}

export function setTasks(newTasks) {
  tasks.length = 0;
  tasks.push(...newTasks);
  updateLocalStorage(); // Call the updateLocalStorage function
}
