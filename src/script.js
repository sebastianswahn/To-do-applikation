const task = document.querySelector("#task");

task.addEventListener("submit", (e) => {
  e.preventDefault();
  validateTask();
  setStyleTask();
});

//Mycket förvirrad över måsvingarna, har flyttat dem en miljon gånger men ja jag vet fortfarande inte om det rätt


function validateTask() {
  const addTask = document.querySelector("#addTask");
  const taskError = document.querySelector("#taskError");
  const taskList = document.querySelector("#taskList");
  const newItem = document.createElement("li");
  newItem.classList = "px-2, mx-2";

  /*   const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList = "ml-2"; DEN HÄR VILL DU lägga till tillsammans med getrequest för checkboxarna förstör arrayen */

  const addTaskValue = addTask.value;

  taskError.textContent = "";

  if (addTask.value.trim() === "") {
    taskError.textContent = "Du måste skriva in en uppgift";
  } else if (addTask.value.trim().length < 3) {
    taskError.textContent = "Din uppgift behöver innehålla minst 3 tecken";
  } else if (addTask.value.trim().length > 35) {
    taskError.textContent = "Var god och beskriv din uppgift med max 35 tecken";
  } else {
    newItem.textContent = addTaskValue;
    taskList.appendChild(newItem);
    /*     newItem.appendChild(checkbox); ^ */

    addTask.value = "";
  }
}

//Den här funktionen är för senare när jag lyckats hämta min to do list från databasen

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
//Nu sparar jag To -do listan med titel och tasks i en array

const saveToDB = document.querySelector("#saveToDB");
saveToDB.addEventListener("submit", (e) => {
  e.preventDefault();
  saveList();
});

    async function saveList() {
  let title;
  let body;
  try {
    title = document.querySelector("#taskListNameDate").value;
    let listItems = document.querySelectorAll("li");


    if (listItems.length > 0) {
      body = Array.from(listItems).map((item) => item.textContent);
    } else {
      console.warn("No list items found. Cannot save empty list.");
      return;
    }

    const toDoList = {
      title,
      body,
    };

    console.log(toDoList);

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
    console.log(res);

    //Här var det sjukt jobbigt för jag ville rensa fälten men det tog mig mycket tid att inse att det gick snabbare att rensa fälten än att göra en post-request så bodyn hann aldrig hänga med

    if (res.status !== 201) {
        throw new Error(res.status);
      } else {
        setTimeout(clearForm, 4000)
      }
     } catch (error) {
        console.log(error.message);
      }
    }
  
    function clearForm () {

      const taskListNameDate = document.querySelector("#taskListNameDate");
      taskListNameDate.value = "";
      const removeLi = document.querySelectorAll("li");
      removeLi.forEach((li) => {
        li.remove();
      });
    }
  
    //Här är problemet att man inte kan ladda om sidan för då måste man av någon anledning skapa ett nytt objekt för att kunna se de man gjorde tidigare

    const selectList = document.querySelector("#selectList");
    selectList.addEventListener("click", async (e) => {
    e.preventDefault();
    fetchTasks();
    await populateDropdown();
    });

    const apiUrl =
     "https://js1-todo-api.vercel.app/api/todos?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac";


    async function fetchTasks() {
    try {
    const response = await fetch(apiUrl);

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
    async function populateDropdown() {
    const dropdown = document.getElementById("selectList");

    try {
    const lists = await fetchTasks();

    // Misstänker att kanske detta är problemet^
    dropdown.innerHTML = "";

    //Presenterar titlarna på objekten som options i selector elementet

    lists.forEach((list) => {
      const option = document.createElement("option");
      option.value = list.title;
      option.text = list.title;
      dropdown.appendChild(option);
    });
    } catch (error) {
    console.error("Error populating dropdown:", error);
    }
    }
    const form2 = document.querySelector("#getToDoList");
    form2.addEventListener("submit", (e) => {
    e.preventDefault();
    getSavedList();
    displayListData();
    });

    async function getSavedList() {
    try {
    const selectedTitle = document.querySelector("#selectList").value;

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
     }  catch (error) {
        console.error("Error:", error);
     }
    }

    function displayListData(listData) {
  const taskContainer = document.getElementById("toDoListContainer");

  // Rensar ur om de finns nåt content där
  taskContainer.innerHTML = "";

  // Tänkte att detta skulle funka men det gör det INTE
  const objectDetails = document.createElement("div");
  objectDetails.textContent = `${JSON.stringify("title", "body")}`;
  taskContainer.appendChild(objectDetails);

  //Här kommercheckboxarna, jag ska vänta att sätta in stylingfunktionen tills jag fått lite mer ordning
        
  listData.forEach((....) => {
    const listItem = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `taskCheckbox_${...}`; 
    checkbox.name = "taskCheckbox";
    listItem.appendChild(checkbox);

    const label = document.createElement("label");
    label.textContent = list.title;
    label.htmlFor = `taskCheckbox_${...}`;
    listItem.appendChild(label);

    taskContainer.appendChild(listItem);
  });

