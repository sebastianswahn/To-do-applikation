const task = document.querySelector("#task");
const saveToDB = document.querySelector("#saveToDB");
const form2 = document.querySelector("#getToDoList");
const listBin = document.getElementById("toDoListContainer");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const apiUrl =
  "https://js1-todo-api.vercel.app/api/todos?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac";

function validateTask() {
  const addTask = document.querySelector("#addTask");
  const taskError = document.getElementById("clearError");

  taskError.textContent = "";

  if (addTask.value.trim() === "") {
    taskError.textContent = "Du måste skriva in en uppgift";
  } else if (addTask.value.trim().length < 3) {
    taskError.textContent = "Din uppgift behöver innehålla minst 3 tecken";
  } else if (addTask.value.trim().length > 35) {
    taskError.textContent = "Var god och beskriv din uppgift med max 35 tecken";
  } else {
    saveList();

    addTask.value = "";
  }
}

saveToDB.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTask();
});

async function saveList() {
  let title;
  try {
    title = document.querySelector("#addTask").value;

    const toDoList = {
      title,
    };

    //Post-request av listan som man skapat (kanske behöver inte använda JSON.stringify)

    const res = await fetch(
      "https://js1-todo-api.vercel.app/api/todos?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(toDoList),
      }
    );
    console.log("post res", res);

    //Här var det sjukt jobbigt för jag ville rensa fälten men det tog mig mycket tid att inse att det gick snabbare att rensa fälten än att göra en post-request så bodyn hann aldrig hänga med
    /* 
    if (res.status !== 201) {
      throw new Error(res.status);
    } else {
      setTimeout(clearForm, 4000);
    } */
  } catch (error) {
    console.log(error.message);
  }
}

function clearForm() {
  const taskListNameDate = document.querySelector("#toDoListContainer");
  taskListNameDate.innerHTML = "";
}

async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    console.log("we got response", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

async function populateDiv(containerId) {
  clearForm();
  try {
    const tasks = await fetchTasks();

    const placeTasks = document.getElementById(containerId);

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add(
        "flex",
        "items-center",
        "justify-between",
        "border-b",
        "p-2",
        "mr-2"
      );
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.classList.add("ml-2");
      checkbox.id = `taskCheckbox_${task._id}`;

      setStyleTask(li, checkbox.checked);

      const taskTitle = document.createElement("span");
      taskTitle.textContent = task.title;
      taskTitle.className = "flex-grow";

      li.appendChild(taskTitle);
      li.appendChild(checkbox);

      placeTasks.appendChild(li);

      checkbox.addEventListener("change", () => {
        const taskId = checkbox.id.split("_")[1];
        updateTaskStatus(taskId, checkbox.checked);
        setStyleTask(li, checkbox.checked);
      });
    });
  } catch (error) {
    console.error("Error populating dropdown:", error);
  }
}

function setStyleTask(li, completed) {
  // Add or remove classes based on the completed status
  if (completed) {
    li.classList.add("text-green-500", "line-through");
  } else {
    li.classList.remove("text-green-500", "line-through");
  }
}

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  populateDiv("toDoListContainer");
});

listBin.addEventListener("click", (e) => {
  setStatus();
});

/* function setStyleTask() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    const li = checkbox.closest("li");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        li.classList.add("text-green-500", "line-through");
      } else {
        li.classList.remove("text-green-500", "line-through");
      }
    });
  });
} */
function setStatus() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = checkbox.id.split("_")[1];
      const completed = checkbox.checked; // Get the checkbox state

      if (completed) {
        console.log("Checkbox checked. Task ID:", taskId);
      } else {
        console.log("Checkbox unchecked. Task ID:", taskId);
      }

      updateTaskStatus(taskId, completed); // Pass the completed state to the function
    });
  });
}

async function updateTaskStatus(taskId, completed) {
  const apiUrl = `https://js1-todo-api.vercel.app/api/todos/${taskId}?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac`;

  try {
    // Fetch the current task data
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch task data");
    }

    const taskData = await response.json();

    // Update the completed status based on the checkbox state
    taskData.completed = completed;

    // Make the PUT request to update the task
    const putResponse = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!putResponse.ok) {
      throw new Error("Failed to update task status");
    }

    // Handle success if needed
  } catch (error) {
    console.error("Error updating task status:", error.message);
  }
}

const finishedTaskBtn = document.getElementById("missionCompleted");

finishedTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateFinishedTasks();
});
/* 
function validateFinishedTasks() {
  let atLeastOneChecked = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      atLeastOneChecked = true;
      const taskId = checkbox.id.split("_")[1];
      console.log("Updating task status for task ID:", taskId);

      updateTaskStatus(taskId);
    }
  });
} */
/* 
function updateTaskStatus(taskId) {
  const apiUrl = `https://js1-todo-api.vercel.app/api/todos/${taskId}`;

   */
