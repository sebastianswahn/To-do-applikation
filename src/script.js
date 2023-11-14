const task = document.querySelector("#task");

task.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTask();
  setStyleCheckbox();
});

function validateTask() {
  const addTask = document.querySelector("#addTask");
  const taskError = document.querySelector("#taskError");
  const taskList = document.querySelector("#taskList");
  const newItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const addTaskValue = addTask.value;

  taskError.textContent = "";

  if (addTask.value.trim() === "") {
    taskError.textContent = "Du måste skriva in en uppgift";
  } else if (addTask.value.trim().length < 5) {
    taskError.textContent = "Din uppgift behöver innehålla minst 5 tecken";
  } else if (addTask.value.trim().length > 80) {
    taskError.textContent = "Var god och beskriv din uppgift med max 80 tecken";
  } else {
    newItem.textContent = addTaskValue;
    taskList.appendChild(newItem);
    newItem.appendChild(checkbox);

    addTask.value = "";
  }
}

const clearForm = document.querySelector("#clearedTask");
clearForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateClear();
  /*   changeStyle() */
});

function validateClear() {
  const checkbox = document.querySelector("input[type='checkbox']");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const clearApproved = document.querySelector("#clearApproved");
  const clearError = document.querySelector("#clearError");
  if (checkboxes.checked) {
    clearError.textContent =
      "Du måste göra klart alla uppgifter innan du kan skicka in";
  } else if (checkbox.checked) {
    clearApproved.textContent = "Bra jobbat!";
  }
}
/*   const task1 = document.querySelector("#no1");
  const task2 = document.querySelector("#no2");
  const task3 = document.querySelector("#no3");
  const task4 = document.querySelector("#no4");
 */
/*   const clearApproved = document.querySelector("#clearApproved");
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  const clearError = document.querySelector("#clearError");

  if (checkboxes.checked) {
    clearApproved.textContent = "Bra jobbat!";
  } else {
    clearError.textContent = "";
  }
} */
/* function changeStyle() {
  const listItem1 = document.querySelector("#listItem1");
  const listItem2 = document.querySelector("#listItem2");
  const listItem3 = document.querySelector("#listItem3");
  const listItem4 = document.querySelector("#listItem4");
  const task1 = document.querySelector("#no1");
  const task2 = document.querySelector("#no2");
  const task3 = document.querySelector("#no3");
  const task4 = document.querySelector("#no4");

  if (task1.checked) {
    listItem1.classList.add("text-green-500", "line-through");
  }
  if (task2.checked) {
    listItem2.classList.add("text-green-500", "line-through");
  }
  if (task3.checked) {
    listItem3.classList.add("text-green-500", "line-through");
  }
  if (task4.checked) {
    listItem4.classList.add("text-green-500", "line-through");
  }
} */

function setStyleCheckbox() {
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
