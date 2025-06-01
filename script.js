document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  // Load tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  function renderTasks() {
    taskList.innerHTML = "";
    savedTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <span>${task.text}</span>
        <div>
          <button onclick="toggleComplete(${index})">:heavy_check_mark:</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
  }
  taskForm.addEventListener("submit", e => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      savedTasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      renderTasks();
    }
  });
  window.toggleComplete = function(index) {
    savedTasks[index].completed = !savedTasks[index].completed;
    renderTasks();
  };
  window.deleteTask = function(index) {
    savedTasks.splice(index, 1);
    renderTasks();
  };
  renderTasks();
});