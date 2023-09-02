import { getTasks, setTasks, updateLocalStorage } from './taskManager.js';

export function toggleTaskStatus(index) {
  const tasks = getTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = !tasks[index].completed;
    // setTasks(tasks)
    updateLocalStorage();
  }
}

export function clearCompletedTasks() {
  const tasks = getTasks();
  const updatedTasks = tasks.filter((task) => !task.completed);
  setTasks(updatedTasks);
  //   tasks.length = 0;
  //   tasks.push(...updatedTasks);
  updateLocalStorage();
}

// Function to toggle the completed status of a task by index
// export function toggleTaskCompleted(index) {
//     const tasks = getTasks();
//     if (index >= 0 && index < tasks.length) {
//       tasks[index].completed = !tasks[index].completed;
//       setTasks(tasks);
//       updateLocalStorage();
//     }
//   }

// // Function to mark all tasks as completed or not completed
// export function toggleAllCompleted(completed) {
//     const tasks = getTasks();
//     tasks.forEach((task) => (task.completed = completed));
//     setTasks(tasks);
//     updateLocalStorage();
//   }