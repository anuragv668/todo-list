// ALL THE LOGIC WILL IS HERE


//task factory function
function createTask(title, description, priority, dueDate) {
  return {
    title,
    description,
    priority,
    dueDate
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

function returnList() {
  return list;
}

export default {
  createTask
};

