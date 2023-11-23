const resetDBForm = document.querySelector("#resetDB");

resetDBForm.addEventListener("click", async (e) => {
  e.preventDefault();
  await deleteTodo();
});

const apiKey = "a9ee9b5b-682e-455d-b480-ce37dd6450ac";
const todoId = "655f9b3fcde2352586ba4844"; // här kan du ta bort dina testobjekt

const apiLink = `https://js1-todo-api.vercel.app/api/todos/${todoId}?apikey=${apiKey}`;

const deleteTodo = async () => {
  try {
    const response = await fetch(apiLink, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Successfully deleted:", data);
  } catch (error) {
    console.error("Error deleting to-do:", error);
  }
};

/* const resetDBForm = document.querySelector("#resetDB");

resetDBForm.addEventListener("click", async (e) => {
  e.preventDefault();
  deleteTodo();
});

const apiKey = "a9ee9b5b-682e-455d-b480-ce37dd6450ac";
const todoId = `655edc9fc128dce7236720ef`;

const apiLink = `https://js1-todo-api.vercel.app/api/todos/{todoID}?apikey=a9ee9b5b-682e-455d-b480-ce37dd6450ac`;

const deleteTodo = async (todoId) => {
  const url = `${apiLink}/${todoId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Successfully deleted:", data);
  } catch (error) {
    console.error("Error deleting to-do:", error);
  }
}; */

/* const deleteTodos = async () => {
  try {
    // Delete each todo item
    for (const todoId of todoIdsToDelete) {
      await deleteTodo(todoId);
    }
    console.log("All to-do items deleted successfully.");
  } catch (error) {
    console.error("Error deleting to-do items:", error);
  } */
/* }; */
