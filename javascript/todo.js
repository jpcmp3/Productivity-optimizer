const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const inProgressLane = document.getElementById("in-progress-lane");
const doneLane = document.getElementById("done-lane");
const clearAllButton = document.getElementById("clear-all-btn");

// Load tasks from local storage on page load
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(({ text, lane }) => {
    const laneElement = document.getElementById(lane);
    if (laneElement) {
      createTaskElement(text, laneElement);
    }
  });
});

// Function to create and append task elements
function createTaskElement(taskText, laneElement) {
  const newTask = document.createElement("p");
  newTask.classList.add("task");

  newTask.setAttribute("draggable", "true");
  newTask.innerText = taskText;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    updateLocalStorage(); // Update local storage after the task is dropped
  });

  laneElement.appendChild(newTask);
}

// Add new task to the DOM and local storage
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) return;

  createTaskElement(value, todoLane);

  // Save the new task to local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: value, lane: "todo-lane" });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
});

function updateLocalStorage() {
  const tasks = Array.from(document.querySelectorAll(".task")).map((task) => {
    const parentLane = task.parentElement; // Get the parent element (which should have a valid ID)
    const laneId = parentLane ? parentLane.id : ""; // Get the ID of the parent lane
    return { text: task.innerText, lane: laneId }; // Save the task and its parent lane
  });

  localStorage.setItem("tasks", JSON.stringify(tasks)); // Store in localStorage
}

// Add drag-and-drop functionality to lanes
document.querySelectorAll(".lane").forEach((lane) => {
  lane.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingTask = document.querySelector(".is-dragging");
    if (draggingTask) {
      lane.appendChild(draggingTask);
    }
  });

  lane.addEventListener("drop", () => {
    updateLocalStorage(); // Save updated positions when a task is dropped
  });
});

clearAllButton.addEventListener("click", () => {
  // Remove all tasks from the DOM
  const tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => task.remove());

  // Also clear tasks from localStorage
  localStorage.removeItem("tasks");
});
