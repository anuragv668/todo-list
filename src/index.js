// ALL THE DOM TASKS ARE HANDLED HERE
// importing modules
import logic from "./modules/logic.js";

// importing styles
import "./styles/style.css";
import "./styles/content.css";
import "./styles/dialog.css";
import "./styles/task.css";

const sidebar = document.querySelector(".sidebar"); //sidebar
const content = document.querySelector(".content"); //main content
const dialog = content.querySelector(".dialog"); //dialog for taking user input for tasks
const descDialog = content.querySelector(".descDialog");
const editDialog = content.querySelector(".editdialog");
const form = content.querySelector("form"); //formData
form.reset();
// setting date input
const date = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
date.setAttribute("min", today);
date.setAttribute("value", today);

const taskList = content.querySelector(".taskList"); //list for all tasks

const addTaskBtn = content.querySelector(".addtask"); //button for adding task
addTaskBtn.addEventListener("click", () => {
  dialog.showModal();
});

//sets priority for a task
const setPriority = (container, obj) => {
  const priority = document.createElement("div");
  priority.classList.add(obj["priority"]);
  container.appendChild(priority);
};

//sets date for a task
const setDueDate = (container, obj) => {
  const dateCont = document.createElement("div");
  dateCont.textContent = obj["dueDate"];
  container.appendChild(dateCont);
};

const setTitle = (container, obj) => {
  const task = document.createElement("div");
  task.textContent = obj["title"];
  container.appendChild(task);
};

const setDescription = (container, obj) => {
  const desc = document.createElement("div");
  desc.classList.add("pointer");
  desc.textContent = "Description";
  desc.addEventListener("click", () => {
    descDialog.showModal();
    descDialog.querySelector(".descriptionBody").textContent =
      obj["description"];
    descDialog
      .querySelector(".closeDescription")
      .addEventListener("click", () => {
        descDialog.close();
      });
  });
  container.appendChild(desc);
};

const setDelete = (container, arr, index, givenContainer) => {
  const deleteTask = document.createElement("div");
  deleteTask.classList.add("pointer");
  deleteTask.textContent = "Delete";
  deleteTask.addEventListener("click", () => {
    logic.removeFromList(index);
    emptyTasks(givenContainer);
    printTasks(arr, givenContainer);
  });
  container.appendChild(deleteTask);
};

const editTask = (container, arr, index, givenContainer) => {
  const edit = document.createElement("div");
  edit.classList.add("pointer");
  edit.textContent = "edit";
  edit.addEventListener("click", () => {
    let editTitle = editDialog.querySelector("#title");
    editTitle.value = arr[index]["title"];

    let editDate = editDialog.querySelector("#date");
    editDate.value = arr[index]["dueDate"];

    let priorityValue = arr[index]["priority"];
    let editPriorityHigh = editDialog.querySelector("#high");
    let editPriorityMedium = editDialog.querySelector("#medium");
    let editPriorityLow = editDialog.querySelector("#low");
    if (priorityValue === "high") {
      editPriorityHigh.checked = true;
    } else if (priorityValue === "medium") {
      editPriorityMedium.checked = true;
    } else {
      editPriorityLow.checked = true;
    }

    let editDescription = editDialog.querySelector("#desc");
    editDescription.value = arr[index]["description"];
    editDialog.showModal();
    let editform = editDialog.querySelector(".editForm");

    // let newSaveChangesBtn = editDialog.createElement(elem);
    // newSaveChangesBtn.classList.add('saveChangesBtn');
    let saveChangesBtn = editDialog.querySelector(".saveChangesBtn");
    let newSaveChangesBtn = saveChangesBtn.cloneNode(true);
    saveChangesBtn.parentNode.replaceChild(newSaveChangesBtn, saveChangesBtn);
    newSaveChangesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const formData = new FormData(editform);
      logic.replace(index, logic.createTask(...formData.values()));
      emptyTasks(givenContainer);
      printTasks(arr, givenContainer);
      editDialog.close();
    });
  });
  container.appendChild(edit);
};

function printTasks(arr, givenContainer) {
  for (let i = 0; i < arr.length; i++) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("taskContainer");

    setPriority(taskContainer, arr[i]);
    setDueDate(taskContainer, arr[i]);
    setTitle(taskContainer, arr[i]);
    setDescription(taskContainer, arr[i]);
    editTask(taskContainer, arr, i, givenContainer);
    setDelete(taskContainer, arr, i, givenContainer);

    givenContainer.appendChild(taskContainer);
  }
}
//removes all child elements of a given container
function emptyTasks(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//submits the form
const submitbtn = dialog.querySelector(".submitbtn");
submitbtn.addEventListener("click", (e) => {
  //prevents default action
  e.preventDefault();

  //gets the form data
  const formData = new FormData(form);

  logic.addToList(logic.createTask(...formData.values()));
  let rList = logic.returnList();
  emptyTasks(taskList);
  printTasks(rList, taskList);
  form.reset();
  dialog.close();
});

logic.loadFromLocalStorage(); //accesses the local storage
printTasks(logic.returnList(), taskList);
