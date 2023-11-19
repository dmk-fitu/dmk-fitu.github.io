const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
  // Prompt the user for input
  const todoText = prompt('Enter your new TODO:');
  if (todoText === null || todoText.trim() === '') {
    
    return;
  }

  // Create a new TODO item
  const todoItem = document.createElement('li');
  todoItem.className = classNames.TODO_ITEM;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = classNames.TODO_CHECKBOX;
  checkbox.addEventListener('change', updateCounts);

  const todoTextSpan = document.createElement('span');
  todoTextSpan.className = classNames.TODO_TEXT;
  todoTextSpan.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTodoItem(todoItem));

  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoTextSpan);
  todoItem.appendChild(deleteButton);

  list.insertBefore(todoItem, list.firstChild);

  updateCounts();
}

function updateCounts() {
  const todoItems = list.getElementsByClassName(classNames.TODO_ITEM);
  const checkedItems = list.querySelectorAll(`.${classNames.TODO_CHECKBOX}:checked`);

  itemCountSpan.textContent = todoItems.length;

  uncheckedCountSpan.textContent = todoItems.length - checkedItems.length;

  Array.from(todoItems).forEach((item) => {
    list.appendChild(item);
  });

  Array.from(todoItems).forEach((item) => {
    const checkbox = item.querySelector(`.${classNames.TODO_CHECKBOX}`);
    const todoText = item.querySelector(`.${classNames.TODO_TEXT}`);

    if (checkbox.checked) {
  
      item.style.opacity = '0.5';
      todoText.style.textDecoration = 'line-through';
    } else {

      item.style.opacity = '1';
      todoText.style.textDecoration = 'none';
    }
  });
}

function deleteTodoItem(item) {
  list.removeChild(item);
  updateCounts();
}

function downloadTodoList() {
  const todoItems = list.getElementsByClassName(classNames.TODO_ITEM);
  const todoListText = Array.from(todoItems)
    .map((item) => item.querySelector(`.${classNames.TODO_TEXT}`).textContent)
    .join('\n');

  const blob = new Blob([todoListText], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'todo-list.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
