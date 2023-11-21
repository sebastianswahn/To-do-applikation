const task = document.querySelector("#task");

task.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTask();
  setStyleTask();
});

function validateTask() {
  const addTask = document.querySelector("#addTask");
  const taskError = document.querySelector("#taskError");
  const taskList = document.querySelector("#taskList");
  const newItem = document.createElement("li");
  newItem.classList = "px-2, mx-2";
  /*   const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList = "ml-2"; */
  const addTaskValue = addTask.value;

  taskError.textContent = "";

  if (addTask.value.trim() === "") {
    taskError.textContent = "Du måste skriva in en uppgift";
  } else if (addTask.value.trim().length < 5) {
    taskError.textContent = "Din uppgift behöver innehålla minst 5 tecken";
  } else if (addTask.value.trim().length > 35) {
    taskError.textContent = "Var god och beskriv din uppgift med max 35 tecken";
  } else {
    newItem.textContent = addTaskValue;
    taskList.appendChild(newItem);
    /*     newItem.appendChild(checkbox); */

    addTask.value = "";
  }
}
const saveToDB = document.querySelector("#saveToDB");

saveToDB.addEventListener("submit", (e) => {
  e.preventDefault();
  saveList();
});

async function saveList() {
  let title = document.querySelector("#taskListNameDate").value;
  let listItems = document.querySelectorAll("li");

  let body = Array.from(listItems).map((item) => item.textContent);

  const toDoList = {
    title,
    body,
  };
  console.log(toDoList);
  // Add your logic to save to the database here
}

/*   const res = await fetch(
    "https://js1-todo-api.vercel.app/api/todos?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(toDoList),
    }
  );
  console.log(res); */

const clearForm = document.querySelector("#clearedTask");
clearForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validationCheckboxes();
});

function setStyleTask() {
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
}
