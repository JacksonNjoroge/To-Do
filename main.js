const form = document.getElementById('form');
const input = document.getElementById('form-input');
const todoItems = document.getElementById('todo-items');
const doneItems = document.getElementById('done');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let doneTodos = JSON.parse(localStorage.getItem('doneTodos')) || [];

function renderingElements() {
    // Clear current lists
    todoItems.innerHTML = '';
    doneItems.innerHTML = '';

    // Render "Doing" items
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <i class='bx bx-check-double'></i>
        <p>${todo}</p>
        <i class='bx bxs-trash'></i>`;
        
        li.querySelector('.bx-check-double').addEventListener('click', () => markAsDone(index));
        li.querySelector('.bxs-trash').addEventListener('click', () => deleteTodo(index, 'doing'));

        todoItems.appendChild(li);
    });

    // Render "Done" items
    doneTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <p>${todo}</p>
        <i class='bx bxs-trash'></i>`;
        
        li.querySelector('.bxs-trash').addEventListener('click', () => deleteTodo(index, 'done'));

        doneItems.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = input.value.trim();
    if (newTodo) {
        todos.push(newTodo);
        input.value = '';
        saveTodos();
        renderingElements();
    }
});

function markAsDone(index) {
    const doneTodo = todos.splice(index, 1)[0]; // Remove from todos and add to doneTodos
    doneTodos.push(doneTodo);
    saveTodos();
    renderingElements();
}

function deleteTodo(index, listType) {
    if (listType === 'doing') {
        todos.splice(index, 1);
    } else if (listType === 'done') {
        doneTodos.splice(index, 1);
    }
    saveTodos();
    renderingElements();
}

renderingElements();
