const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const error = document.getElementById("error");



// Load Tasks
async function loadTasks() {
  const response = await fetch("/tasks");

  const tasks = await response.json();

  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const text = document.createElement("span");

    text.textContent = task.text;

    if (task.completed) {
      text.classList.add("completed");
    }

    const actions = document.createElement("div");

    actions.classList.add("actions");

    // Complete Button
    const completeBtn = document.createElement("button");

    completeBtn.textContent = "✔";

    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", async () => {
      await fetch(`/tasks/${task.id}`, {
        method: "PUT",
      });

      loadTasks();
    });

    // Delete Button
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "🗑";

    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", async () => {
      await fetch(`/tasks/${task.id}`, {
        method: "DELETE",
      });

      loadTasks();
    });

    actions.appendChild(completeBtn);

    actions.appendChild(deleteBtn);

    li.appendChild(text);

    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

// Add Task
addBtn.addEventListener("click", async () => {
  const task = taskInput.value.trim();

  if (task === "") {
    error.textContent = "Please enter a task";
    return;
  }

  error.textContent = "";

  await fetch("/tasks", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      text: task,
    }),
  });

  taskInput.value = "";

  loadTasks();
});

loadTasks();
