// ALL THE DOM TASKS ARE HANDLED HERE

// importing modules
import logic from './modules/logic.js';


// importing styles
import "./styles/style.css";
import "./styles/sidebar.css";
import "./styles/content.css";
import "./styles/dialog.css";
import "./styles/priority.css";

const sidebar = document.querySelector('.sidebar'); //sidebar

const content = document.querySelector('.content'); //main content

const dialog = content.querySelector("dialog"); //dialog for taking user input for tasks

const form = content.querySelector('form'); //formData

const taskList = content.querySelector('.taskList'); //list for all tasks

const addTaskBtn = content.querySelector('.addtask'); //button for adding task
addTaskBtn.addEventListener("click", () => {dialog.showModal()});

function printTasks(arr, givenContainer) {
  for (let i = 0; i < arr.length; i++) {
    const taskContainer = document.createElement('div');
    const priority = document.createElement('div');
    priority.classList.add(arr[i]['priority']);
    taskContainer.appendChild(priority);
    givenContainer.appendChild(taskContainer);
  }
}

function emptyTasks(container) {
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const submitbtn = dialog.querySelector('.submitbtn')
submitbtn.addEventListener("click", (e) => {
  //prevents default action
  e.preventDefault();

  //gets the form data 
  const formData = new FormData(form);

  logic.addToList(logic.createTask(...formData.values()));
  let rList = logic.returnList();
  emptyTasks(taskList);
  printTasks(rList, taskList);
  dialog.close();
});
