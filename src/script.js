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

//validerar innan man lägger till i databasen

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
//Sparar To-Do till databasen

function clearForm() {
  const taskListNameDate = document.querySelector("#toDoListContainer");
  taskListNameDate.innerHTML = "";
}

//tömmer containern innan hämtningen så att det inte blir dubletter

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

//Hämtar alla tasks från databasen

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

      const checkboxContainer = document.createElement("div");
      checkboxContainer.classList.add("flex", "items-center");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.classList.add("mr-2");
      checkbox.id = `taskCheckbox_${task._id}`;

      setStyleTask(li, checkbox.checked);

      const taskTitle = document.createElement("span");
      taskTitle.textContent = task.title;
      taskTitle.className = "flex-grow";

      const removeIcon = document.createElement("i");
      removeIcon.className = "fa fa-trash text-red-500 cursor-pointer ";

      checkboxContainer.appendChild(checkbox);
      li.appendChild(checkboxContainer);
      li.appendChild(taskTitle);
      li.appendChild(removeIcon);

      placeTasks.appendChild(li);

      checkbox.addEventListener("change", () => {
        const taskId = checkbox.id.split("_")[1];
        updateTaskStatus(taskId, checkbox.checked);
        setStyleTask(li, checkbox.checked);
      });

      removeIcon.addEventListener("click", () => {
        const taskId = checkbox.id.split("_")[1];

        if (checkbox.checked) {
          removeTask(taskId, li);
        } else {
          displayErrorModal();
        }
      });
    });
  } catch (error) {
    console.error("Error populating dropdown:", error);
  }
}

//Skapar lista av objekten hämtade från databasen

async function removeTask(taskId, li) {
  try {
    const apiUrl = `https://js1-todo-api.vercel.app/api/todos/${taskId}?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac`;
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }

    console.log(`Task with ID ${taskId} deleted successfully`);
    li.remove();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

//Gör deleterequest och tar bort från listan

function displayErrorModal() {
  const errorMessage = document.getElementById("modal");
  errorMessage.classList.remove("hidden");
}
//Skapar errormeddelande om man försöker ta bort en Todo som inte är avklarad

function setStyleTask(li, completed) {
  if (completed) {
    li.classList.add("text-green-500", "line-through");
  } else {
    li.classList.remove("text-green-500", "line-through");
  }
}
//Sätter en visuell klarmarkering för användare

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  populateDiv("toDoListContainer");
});

listBin.addEventListener("click", (e) => {
  setStatus();
});

function setStatus() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskId = checkbox.id.split("_")[1];
      const completed = checkbox.checked;

      if (completed) {
        console.log("Checkbox checked. Task ID:", taskId);
      } else {
        console.log("Checkbox unchecked. Task ID:", taskId);
      }

      updateTaskStatus(taskId, completed);
    });
  });
}
//Sätter status på databasen utifrån om To Do checkboxen är checkad eller inte

async function updateTaskStatus(taskId, completed) {
  const apiUrl = `https://js1-todo-api.vercel.app/api/todos/${taskId}?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch task data");
    }

    const taskData = await response.json();

    taskData.completed = completed;

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
  } catch (error) {
    console.error("Error updating task status:", error.message);
  }
}
//uppdaterar databasens completed- status
const okBtn = document.getElementById("goBack");
okBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeModal();
});

function closeModal() {
  const errorMessage = document.getElementById("modal");
  errorMessage.classList.add("hidden");
}
//modalhantering
