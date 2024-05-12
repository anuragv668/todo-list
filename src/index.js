// ALL THE DOM TASKS ARE HANDLED HERE

// importing modules
import logic from './modules/logic.js';


// importing styles
import "./styles/style.css";
import "./styles/heading.css";
import "./styles/sidebar.css";
import "./styles/content.css";


const body = document.querySelector('body');

//sidebar
const sidebar = document.querySelector('.sidebar');

//content or list items
const content = document.querySelector('.content');

//dialog for taking user input for tasks
const dialog = document.createElement("dialog");

