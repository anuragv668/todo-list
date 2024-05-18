// ALL THE DOM TASKS ARE HANDLED HERE

// importing modules
import logic from './modules/logic.js';


// importing styles
import "./styles/style.css";
import "./styles/sidebar.css";
import "./styles/content.css";
import "./styles/dialog.css";
import "./styles/task.css";

const sidebar = document.querySelector('.sidebar'); //sidebar

const content = document.querySelector('.content'); //main content

const dialog = content.querySelector(".dialog"); //dialog for taking user input for tasks

const descDialog = content.querySelector('.descDialog');

const editDialog = content.querySelector('.editDialog');

const form = content.querySelector('form'); //formData

const date = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
date.setAttribute('min', today);
date.setAttribute('value', today);

const taskList = content.querySelector('.taskList'); //list for all tasks

const addTaskBtn = content.querySelector('.addtask'); //button for adding task
addTaskBtn.addEventListener("click", () => {dialog.showModal()});

function printTasks(arr, givenContainer) {
  for (let i = 0; i < arr.length; i++) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');
    const priority = document.createElement('div');
    priority.classList.add(arr[i]['priority']);
    taskContainer.appendChild(priority);

    const dateCont = document.createElement('div');
    dateCont.textContent = arr[i]['dueDate'];
    taskContainer.appendChild(dateCont);

    const task = document.createElement('div');
    task.textContent = arr[i]['title'];
    taskContainer.appendChild(task);
    
    const desc = document.createElement('div');
    desc.textContent = "Description";
    desc.addEventListener('click', () => {
      descDialog.showModal();
      descDialog.querySelector('.descriptionBody').textContent = arr[i]['description'];
      descDialog.querySelector('.closeDescription').addEventListener('click', () => {descDialog.close()});
    });
    taskContainer.appendChild(desc); 

    const deleteTask = document.createElement('div');
    deleteTask.textContent = 'Delete';
    deleteTask.addEventListener('click', () => {
      logic.removeFromList(i);
      emptyTasks(givenContainer);
      printTasks(arr, givenContainer);
    });
    taskContainer.appendChild(deleteTask);

    givenContainer.appendChild(taskContainer);
  }
}
//removes all child elements of a given container
function emptyTasks(container) {
  while(container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//submits the form
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

