// Select DOM elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-button");
const todoList = document.getElementById("all-todos");
const deleteSelectedBtn = document.getElementById("delete-selected");
const deleteAllBtn = document.getElementById("delete-all");
const filterAll = document.getElementById("all");
const filterPending = document.getElementById("rem");
const filterCompleted = document.getElementById("com");
const completedCount = document.getElementById("c-count");
const totalCount = document.getElementById("r-count");

let todos = []; // Data store

// Add todo
addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    todos.push({ text, completed: false });
    input.value = "";
    renderTodos();
});

// Allow "Enter" to add
input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// Render todos
function renderTodos(filter = "all") {
    todoList.innerHTML = "";

    const filtered = todos.filter(todo => {
        if (filter === "pending") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    filtered.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item";

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" data-index="${index}" ${todo.completed ? "checked" : ""}>
            <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
            <button class="delete-btn" data-index="${index}"><i class="bx bx-trash"></i></button>
        `;

        todoList.appendChild(li);
    });

    completedCount.textContent = todos.filter(t => t.completed).length;
    totalCount.textContent = todos.length;
}

// Toggle complete or delete
todoList.addEventListener("click", e => {
    const index = e.target.closest("[data-index]")?.dataset.index;

    if (e.target.classList.contains("todo-checkbox")) {
        todos[index].completed = !todos[index].completed;
    }

    if (e.target.closest(".delete-btn")) {
        todos.splice(index, 1);
    }

    renderTodos();
});

// Delete selected
deleteSelectedBtn.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// Delete all
deleteAllBtn.addEventListener("click", () => {
    todos = [];
    renderTodos();
});

// Filters
filterAll.addEventListener("click", () => renderTodos("all"));
filterPending.addEventListener("click", () => renderTodos("pending"));
filterCompleted.addEventListener("click", () => renderTodos("completed"));

// Initial render
renderTodos();
