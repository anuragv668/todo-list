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

// setting date input 
const date = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
date.setAttribute('min', today);
date.setAttribute('value', today);

const taskList = content.querySelector('.taskList'); //list for all tasks

const addTaskBtn = content.querySelector('.addtask'); //button for adding task
addTaskBtn.addEventListener("click", () => {dialog.showModal()});

//sets priority for a task
const setPriority = (container, obj) => {
  const priority = document.createElement('div');
  priority.classList.add(obj['priority']);
  container.appendChild(priority);
};

//sets date for a task
const setDueDate = (container, obj) => {
  const dateCont = document.createElement('div');
  dateCont.textContent = obj['dueDate'];
  container.appendChild(dateCont);
};

const setTitle = (container, obj) => {
  const task = document.createElement('div');
  task.textContent = obj['title'];
  container.appendChild(task);
};

const setDescription = (container, obj) => {
    const desc = document.createElement('div');
    desc.textContent = "Description";
    desc.addEventListener('click', () => {
      descDialog.showModal();
      descDialog.querySelector('.descriptionBody').textContent = obj['description'];
      descDialog.querySelector('.closeDescription').addEventListener('click', () => {descDialog.close()});
    });
    container.appendChild(desc);
};

const setDelete = (container, obj, index, givenContainer) => {
  const deleteTask = document.createElement('div');
  deleteTask.textContent = 'Delete';
  deleteTask.addEventListener('click', () => {
    logic.removeFromList(index);
    emptyTasks(givenContainer);
    printTasks(obj, givenContainer);
  });
  container.appendChild(deleteTask);
};

function printTasks(arr, givenContainer) {
  for (let i = 0; i < arr.length; i++) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('taskContainer');

    setPriority(taskContainer, arr[i]);
    setDueDate(taskContainer, arr[i]); 
    setTitle(taskContainer, arr[i]); 
    setDescription(taskContainer, arr[i]);
    setDelete(taskContainer, arr, i, givenContainer); 

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

