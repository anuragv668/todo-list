// ALL THE LOGIC WILL IS HERE


//task factory function
function createTask(title, dueDate, priority, description) {
  return {
    title,
    dueDate,
    priority,
    description
  }
}

//list for tasks
const list = [];

//list operations 
function addToList(obj) {
  list.push(obj);
}

function removeFromList(index) {
  list.splice(index , 1);
}

function replace(index, object) {
  list.splice(index, 1, object);
}

function returnList() {
  return list;
}

export default {
  createTask,
  addToList,
  removeFromList,
  returnList,
  replace
};

