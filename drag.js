let form = document.getElementById("todo-form");
let input = document.getElementById("todo-input");
let lists = document.querySelectorAll(".list");

let draggedTask = null;



let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function (taskData) {
  createTask(taskData.text, taskData.listIndex);
});



form.addEventListener("submit", function (event) {
  event.preventDefault();

  let taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTask(taskText, 0);

  saveTasks();

  input.value = "";
});



function createTask(taskText, listIndex) {
  let task = document.createElement("p");

  task.classList.add("task");

  task.textContent = taskText;

  task.setAttribute("draggable", "true");

  task.style.display = "flex";
  task.style.alignItems = "center";


  let deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";

  deleteButton.style.marginLeft = "auto";

  deleteButton.addEventListener("click", function () {
    task.remove();

    saveTasks();
  });

  task.appendChild(deleteButton);

  
  addDragEvents(task);

  
  lists[listIndex].appendChild(task);
}



function addDragEvents(task) {
  task.addEventListener("dragstart", function () {
    draggedTask = task;

    task.classList.add("dragging");
  });

  task.addEventListener("dragend", function () {
    task.classList.remove("dragging");

    draggedTask = null;

    saveTasks();
  });
}



lists.forEach(function (list) {
  list.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  list.addEventListener("drop", function (event) {
    event.preventDefault();

    if (draggedTask) {
      list.appendChild(draggedTask);

      saveTasks();
    }
  });
});



function saveTasks() {
  let tasks = [];

  lists.forEach(function (list, listIndex) {
    let taskElements = list.querySelectorAll(".task");

    taskElements.forEach(function (task) {
      tasks.push({
        text: task.firstChild.textContent,
        listIndex: listIndex,
      });
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
