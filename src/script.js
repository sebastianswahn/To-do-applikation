const task = document.querySelector("#task");
const saveToDB = document.querySelector("#saveToDB");
const form2 = document.querySelector("#getToDoList");
const listBin = document.getElementById("toDoListContainer");
const apiUrl =
  "https://js1-todo-api.vercel.app/api/todos?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac";

/* task.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTask();
  setStyleTask();
}); */

//Mycket förvirrad över måsvingarna, har flyttat dem en miljon gånger men ja jag vet fortfarande inte om det rätt

function validateTask() {
  const addTask = document.querySelector("#addTask");
  const taskError = document.getElementById("clearError");
  /*   const taskList = document.querySelector("#taskList");
  const newItem = document.createElement("li");
  newItem.classList = "px-2, mx-2"; */

  /*   const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList = "ml-2"; DEN HÄR VILL DU lägga till tillsammans med getrequest för checkboxarna förstör arrayen */

  /*   const addTaskValue = addTask.value; */

  taskError.textContent = "";

  if (addTask.value.trim() === "") {
    taskError.textContent = "Du måste skriva in en uppgift";
  } else if (addTask.value.trim().length < 3) {
    taskError.textContent = "Din uppgift behöver innehålla minst 3 tecken";
  } else if (addTask.value.trim().length > 35) {
    taskError.textContent = "Var god och beskriv din uppgift med max 35 tecken";
  } else {
    saveList();
    /*     newItem.appendChild(checkbox); ^ */

    addTask.value = "";
  }
}

//Den här funktionen är för senare när jag lyckats hämta min to do list från databasen

//Nu sparar jag To -do listan med titel och tasks i en array

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

      const taskTitle = document.createElement("span");
      taskTitle.textContent = task.title;
      taskTitle.className = "flex-grow";

      li.appendChild(taskTitle);
      li.appendChild(checkbox);

      placeTasks.appendChild(li);
    });
  } catch (error) {
    console.error("Error populating dropdown:", error);
  }
}

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  populateDiv("toDoListContainer");
});

listBin.addEventListener("click", (e) => {
  setStyleTask();
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
/* async function getSavedList() {
  try {
    const selectedTitle = document.querySelector("#selectList").value;

    console.log("selected title:", selectedTitle);
    //Här går något fel och jag tror det är jag som bara inte kan komma på hur jag kan välja hela objektet istället för titeln bara

        const apiUrl = `https://js1-todo-api.vercel.app/api/todos?title=${encodeURIComponent(
      selectedTitle
    )}&apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error!  Status: ${response.status}`);
    }
    const listData = await response.json();
    console.log("Task data:", listData);

    displayListData(listData);
  } catch (error) {
    console.error("Error:", error);
  }
} */

/* function displayListData(listData) {
  const taskContainer = document.getElementById("toDoListContainer");

  // Rensar ur om de finns nåt content där
  taskContainer.innerHTML = "";

  // Tänkte att detta skulle funka men det gör det INTE
  const objectDetails = document.createElement("div");
  objectDetails.textContent = `${JSON.stringify("title", "body")}`;
  taskContainer.appendChild(objectDetails);

  //Här kommercheckboxarna, jag ska vänta att sätta in stylingfunktionen tills jag fått lite mer ordning och här är det verkligen kaos jag har ingen aning om vad jag håller på med

  listData.forEach((listItem) => {
    const listItem = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `taskCheckbox`;
    checkbox.name = "taskCheckbox";
    listItem.appendChild(checkbox);

    const label = document.createElement("label");
    label.textContent = list.title;
    label.htmlFor = `taskCheckbox`;
    listItem.appendChild(label);

    taskContainer.appendChild(listItem);
  });
} */
