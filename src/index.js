// ALL THE DOM TASKS ARE HANDLED HERE

// importing modules
// import logic from './modules/logic.js';


// importing styles
import "./styles/style.css";
import "./styles/sidebar.css";
import "./styles/content.css";
import "./styles/dialog.css";


//sidebar
const sidebar = document.querySelector('.sidebar');

//content or list items
const content = document.querySelector('.content');

//dialog for taking user input for tasks
const dialog = content.querySelector("dialog");

const addTaskBtn = content.querySelector('.addtask');
addTaskBtn.addEventListener("click", () => {dialog.showModal()});

const submitbtn = dialog.querySelector('.submitbtn')
submitbtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});
