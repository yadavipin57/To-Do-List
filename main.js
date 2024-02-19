const form = document.querySelector('form');
const inputBox = document.querySelector('#input-box');
const submitTask = document.querySelector('#submit-task');
const addedTask = document.querySelector('.added-task');
const resetButton = document.querySelector('.reset');

// ADDING a task

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (inputBox.value === '') return alert('Type something');

  // New div
  const newTask = document.createElement('div');
  newTask.setAttribute('class', 'new-task');

  // toggleCircle
  let toggleCircle = document.createElement('span');
  toggleCircle.setAttribute('class', 'toggle-circle');
  toggleCircle.innerHTML = `<i class="fa-regular fa-circle"></i>`;

  // inputField
  let inputField = document.createElement('input');
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('id', 'addedInput');
  inputField.setAttribute('readonly', '');
  inputField.setAttribute('value', `${inputBox.value}`);

  // editButton
  let editButton = document.createElement('button');
  editButton.setAttribute('class', 'edit-button');
  editButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;

  // deleteButton
  let deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete-button');
  deleteButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

  // Toggle click change
  toggleCircle.addEventListener('click', function () {
    toggleEdit(inputField, toggleCircle);
    saveData();
  });

  // Edit inputField
  editButton.addEventListener('click', function () {
    editInput(inputField, editButton);
    saveData();
  });

  // Deleting newTask
  deleteButton.addEventListener('click', function () {
    deleteInput(newTask);
    saveData();
  });

  newTask.appendChild(toggleCircle);
  newTask.appendChild(inputField);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);
  addedTask.appendChild(newTask);

  inputBox.value = '';
  saveData();
});

// TOGGLE a task

function toggleEdit(inputField, toggleCircle) {
  toggleIcon = toggleCircle.querySelector('i');
  if (inputField.style.textDecoration === 'line-through') {
    inputField.style.textDecoration = 'none';
    toggleIcon.style.backgroundColor = 'white';
    inputField.style.color = 'black';
  } else {
    inputField.style.textDecoration = 'line-through';
    inputField.style.color = '#2d2d2d';
    toggleIcon.style.backgroundColor = '#ff5945';
    toggleIcon.style.borderRadius = '50%';
  }
}

// EDIT a inputField

function editInput(inputField, editButton) {
  if (inputField.hasAttribute('readonly')) {
    inputField.removeAttribute('readonly');
    editButton.innerHTML = `<i class="fa-regular fa-floppy-disk"></i>`;
  } else {
    inputField.setAttribute('value', `${inputField.value}`);
    inputField.setAttribute('readonly', '');
    editButton.innerHTML = `<i class="fa-solid fa-pencil"></i>`;
  }
}

// DELETE a inputFiled

function deleteInput(newTask) {
  addedTask.removeChild(newTask);
}

// SAVING & SHOWING data

function saveData() {
  localStorage.setItem('data', addedTask.innerHTML);
}

function showTask() {
  const getItem = localStorage.getItem('data');
  if (getItem) {
    addedTask.innerHTML = getItem;

    const newTask = document.querySelectorAll('.new-task');
    newTask.forEach((todoItem) => {
      const toggleCircle = todoItem.querySelector('.toggle-circle');
      const inputField = todoItem.querySelector('input');
      const editButton = todoItem.querySelector('.edit-button');
      const deleteButton = todoItem.querySelector('.delete-button');

      toggleCircle.addEventListener('click', () => {
        toggleEdit(inputField, todoItem);
        saveData();
      });

      editButton.addEventListener('click', () => {
        editInput(inputField, editButton);
        saveData();
      });

      deleteButton.addEventListener('click', () => {
        addedTask.removeChild(todoItem);
        saveData();
      });
    });
  }
  saveData();
}
showTask();

// RESETING the data

resetButton.addEventListener('click', function () {
  localStorage.removeItem('data');
  addedTask.innerHTML = '';
});
