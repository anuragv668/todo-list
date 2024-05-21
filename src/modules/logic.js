// ALL THE LOGIC WILL IS HERE

//list for tasks
const list = [];

function saveToLocalStorage() {
  localStorage.setItem("taskList", JSON.stringify(list));
}

function loadFromLocalStorage() {
  const storedList = localStorage.getItem("taskList");
  if (storedList) {
    const parsedList = JSON.parse(storedList);
    // Clear the current list and add the loaded tasks
    list.length = 0; // Clear the existing list
    parsedList.forEach((task) => list.push(task));
  }
}

//task factory function
function createTask(title, dueDate, priority, description) {
  return {
    title,
    dueDate,
    priority,
    description,
  };
}

//list operations
function addToList(obj) {
  list.push(obj);
  saveToLocalStorage();
}

function removeFromList(index) {
  list.splice(index, 1);
  saveToLocalStorage();
}

function replace(index, object) {
  list[index] = object;
  saveToLocalStorage();
}

function returnList() {
  return list;
}

export default {
  createTask,
  addToList,
  removeFromList,
  returnList,
  replace,
  saveToLocalStorage,
  loadFromLocalStorage,
};
