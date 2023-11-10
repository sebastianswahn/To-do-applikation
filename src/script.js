const task = document.querySelector("#task");

task.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTask();
});

function validateTask() {
  const addTask = document.querySelector("#addTask");
  const taskError = document.querySelector("#taskError");

  if (addTask.value.trim() === "") {
    taskError.textContent = "Du måste skriva in en uppgift";
  } else if (addTask.value.trim().length < 5) {
    taskError.textContent = "Din uppgift behöver innehålla minst 5 tecken";
  } else if (addTask.value.trim().length > 80) {
    taskError.textContent = "Var god och beskriv din uppgift med max 80 tecken";
  } else {
    taskError.textContent = "";
  }
}

const clearForm = document.querySelector("#clearedTask");
clearForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateClear();
});

function validateClear() {
  const task1 = document.querySelector("#no1");
  const task2 = document.querySelector("#no2");
  const task3 = document.querySelector("#no3");
  const task4 = document.querySelector("#no4");
  let checkBoxes = task1 && task2 && task3 && task4;
  const clearError = document.querySelector("#clearError");
  if (!checkBoxes.checked) {
    clearError.textContent = "You need to choose atleast 1 task to be cleared";
  } else {
    clearError.textContent = "";
  }
}
