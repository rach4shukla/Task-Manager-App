// Define colors for each task type
const taskTypeColors = {
  "To Do": "#faedcb",
  "In Progress": "#c9e4de",
  "Done": "#c6def1",
};

// Define an array to store tasks or retrieve from local storage
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

// Display tasks with background colors based on task type
function displayTasks(filteredTasks) {
  const taskList = document.getElementById("allTaskList");
  taskList.innerHTML = "";
  let searchResults = allTasks;

  if (filteredTasks !== undefined) {
    searchResults = filteredTasks;
  }

  searchResults.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", index % 2 === 0 ? "even" : "odd");

    const taskTypeColor = taskTypeColors[task.taskType];
    taskDiv.style.backgroundColor = taskTypeColor;

    if (!task.isEditing) {
      // Display the task details
      taskDiv.innerHTML = `
        <div class="descriptionList">
          <div class="description"><strong>Task Name:</strong> ${task.name}</div>
          <div class="description"><strong>Task Description:</strong> ${task.description}</div>
          <div class="description"><strong>Task Type:</strong> ${task.taskType}</div>
          <div class="description"><strong>Task Priority:</strong> ${task.taskPriority}</div>
          <div class="description"><strong>Assigned To:</strong> ${task.assignedTo}</div>
          <button onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
    } else {
      // Display the edit form
      taskDiv.innerHTML = `
        <div class="edit-form">
          <input type="text" id="editTaskName" value="${task.name}" placeholder="Task Name">
          <input type="text" id="editTaskDescription" value="${task.description}" placeholder="Task Description">
          <select id="editTaskType">
            <option value="To Do" ${task.taskType === "To Do" ? "selected" : ""}>To Do</option>
            <option value="In Progress" ${task.taskType === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Done" ${task.taskType === "Done" ? "selected" : ""}>Done</option>
          </select>
          <select id="editTaskPriority">
            <option value="High" ${task.taskPriority === "High" ? "selected" : ""}>High</option>
            <option value="Medium" ${task.taskPriority === "Medium" ? "selected" : ""}>Medium</option>
            <option value="Low" ${task.taskPriority === "Low" ? "selected" : ""}>Low</option>
          </select>
          <input type="text" id="editAssignedTo" value="${task.assignedTo}" placeholder="Assigned To">
          <button onclick="updateTask(${index})">Update</button>
          <button onclick="cancelEdit(${index})">Cancel</button>
        </div>
      `;
    }

    taskList.appendChild(taskDiv);
  });
}

// Edit a task
function editTask(index) {
  // Set the task to editing mode
  allTasks[index].isEditing = true;
  displayTasks();
}

// Update a task
function updateTask(index) {
  // Update the task details
  const taskName = document.getElementById("editTaskName").value;
  const taskDescription = document.getElementById("editTaskDescription").value;
  const assignedTo = document.getElementById("editAssignedTo").value;
  const taskType = document.getElementById("editTaskType").value;
  const taskPriority = document.getElementById("editTaskPriority").value;

  const updatedTask = {
    name: taskName,
    description: taskDescription,
    taskType: taskType,
    taskPriority: taskPriority,
    assignedTo: assignedTo,
  };

  allTasks[index] = updatedTask;
  allTasks[index].isEditing = false; // Exit editing mode
  saveTasks();
  displayTasks();
}

// Cancel editing and display the original task
function cancelEdit(index) {
  // Exit editing mode
  allTasks[index].isEditing = false;
  displayTasks();
}

// Delete a task
function deleteTask(index) {
  allTasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// Add a task
function addTask() {
  const taskName = document.getElementById("taskName").value;
  const taskDescription = document.getElementById("taskDescription").value;
  const assignedTo = document.getElementById("assignedTo").value;
  const taskPriority = document.getElementById("taskPriority").value;
  const taskType = document.getElementById("taskType").value;

  const task = {
    name: taskName,
    description: taskDescription,
    taskType: taskType,
    taskPriority: taskPriority,
    assignedTo: assignedTo,
  };

  allTasks.push(task);
  saveTasks();
  displayTasks();
}

// Filter tasks
function filterTasks() {
  const search = document.getElementById("search").value.toLowerCase();
  const filteredTasks = allTasks.filter((task) => {
    return (
      task.name.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search) ||
      task.taskType.toLowerCase().includes(search) ||
      task.taskPriority.toLowerCase().includes(search) ||
      task.assignedTo.toLowerCase().includes(search)
    );
  });
  displayTasks(filteredTasks);
}

// Initial display of tasks
displayTasks();
