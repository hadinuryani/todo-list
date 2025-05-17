document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function getTimeNow() {
    return new Date().toLocaleTimeString();
  }

  function renderTodos() {
    list.innerHTML = "";
    todos.forEach((todo, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${todo.text}</td>
        <td>${todo.createdAt}</td>
        <td>
          <button class="complete-btn" style="background-color : green;color:white;" data-index="${index}" ${todo.completed ? "disabled" : ""}>
            ✔
          </button>
        </td>
        <td>${todo.completedAt || ""}</td>
        <td>
          <button class="delete-btn" style="background-color : red;color:white;" data-index="${index}">X</button>
        </td>
      `;

      list.appendChild(row);
    });

  
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      });
    });

  
    document.querySelectorAll(".complete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        todos[index].completed = true;
        todos[index].completedAt = getTimeNow();
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      });
    });
  }

  renderTodos();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      todos.push({
        text: text,
        createdAt: getTimeNow(),
        completed: false,
        completedAt: null
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
      input.value = "";
    }
  });
});
