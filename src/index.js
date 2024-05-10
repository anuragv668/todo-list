// ALL THE DOM TASKS WILL BE HANDLED HERE

// importing styles
import "./styles/style.css";
import "./styles/heading.css";
import "./styles/sidebar.css";
import "./styles/content.css";


//heading
const body = document.querySelector('body');
const heading = document.createElement('h1');
heading.textContent = "To Do List";
heading.classList.add("heading");
body.appendChild(heading);


//sidebar
const sidebar = document.createElement('div');
sidebar.classList.add('sidebar');
body.appendChild(sidebar);


//content or list items
const content = document.createElement('div');
content.classList.add('content');
body.appendChild(content);
