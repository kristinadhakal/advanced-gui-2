// My Tasks Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = initTasks();
displayTasks();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'add') {
    addTask();
  } else if (selection === 'toggle') {
    toggleTask();
  } else if (selection === 'remove') {
    removeTask();
  } else if (selection === 'clear') {
    clearAll();
  }
}

// MENU FUNCTIONS
function addTask() {
  let userTask = prompt('Please enter a new task:');
  tasks.push(newTask(userTask));
  saveTasks();
  displayTasks();
}

function toggleTask() {
  let taskIndex = +prompt('Please enter number of task to toggle:');
  let task = tasks[taskIndex];
  if (task.completed === '') {
    task.completed = 'completed';
  } else {
    task.completed = '';
  }
  saveTasks();
  displayTasks();
}

function removeTask() {
  let taskIndex = +prompt('Please enter number of task to remove:');
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();
}

function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// HELPERS
function initTasks() {
  let jsonTasks = localStorage.getItem('tasks');
  return JSON.parse(jsonTasks) ?? [];
}

function displayTasks() {
  let outputStr = '';
  for (let i = 0; i < tasks.length; i++) {
    outputStr += getTaskHTMLStr(tasks[i], i);
  }
  tasksEl.innerHTML = outputStr;
}

function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: '',
  };
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskHTMLStr(task, index) {
  return `
    <div class="${task.completed}">
      ${index}: ${task.description}
    </div>
  `;
}
