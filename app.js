// Selectors
const todoInput = document.querySelector('.todo__input')
const todoBtn = document.querySelector('.todo__btn-add')
const todoList = document.querySelector('.todo__list')
const filterOption = document.querySelector('.form__select')

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(e) {
  e.preventDefault()
  // If input not equal empty string
  if (!todoInput.value == '') {
    // Create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo__list-wrapper')
    // Create li
    const todoItem = document.createElement('li')
    todoItem.classList.add('todo__list-item')
    todoItem.innerText = todoInput.value
    todoDiv.appendChild(todoItem)
    // Add ToDo to LacalStorage
    saveToLocalStorage(todoInput.value)
    // Create check mark button
    const completedBtn = document.createElement('button')
    completedBtn.classList.add('todo__btn-checked')
    completedBtn.classList.add('btn')
    completedBtn.innerHTML = `
  <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
  width="352.62px" height="352.62px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" 
  xml:space="preserve">
      <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
        c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
        c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
        c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
        C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
        c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"/>
  </svg>`
    todoDiv.appendChild(completedBtn)
    // Create delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('todo__btn-delete')
    deleteBtn.classList.add('btn')
    deleteBtn.innerHTML = `
  <svg height="512pt" viewBox="-64 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 80h-32v-48h-64v48h-32v-80h128zm0 0" fill="#62808c"/>
    <path d="m304 512h-224c-26.507812 0-48-21.492188-48-48v-336h320v336c0 26.507812-21.492188 48-48 48zm0 0" fill="#e76e54"/>
    <path d="m384 160h-384v-64c0-17.671875 14.328125-32 32-32h320c17.671875 0 32 14.328125 32 32zm0 0" fill="#77959e"/>
    <path d="m260 260c-6.246094-6.246094-16.375-6.246094-22.625 0l-41.375 41.375-41.375-41.375c-6.25-6.246094-16.378906-6.246094-22.625 0s-6.246094 16.375 0 22.625l41.375 41.375-41.375 41.375c-6.246094 6.25-6.246094 16.378906 0 22.625s16.375 6.246094 22.625 0l41.375-41.375 41.375 41.375c6.25 6.246094 16.378906 6.246094 22.625 0s6.246094-16.375 0-22.625l-41.375-41.375 41.375-41.375c6.246094-6.25 6.246094-16.378906 0-22.625zm0 0" fill="#fff"/>
  </svg>`
    todoDiv.appendChild(deleteBtn)
    // Append to list
    todoList.appendChild(todoDiv)
    // Clear input value
    todoInput.value = ''
  }
}

function deleteCheck(e) {
  const item = e.target
  // Delete ToDo item
  if (item.classList[0] == 'todo__btn-delete') {
    const todoDelete = item.parentElement
    todoDelete.classList.add('fall')
    removeLocalStorageTodos(todoDelete)
    todoDelete.addEventListener('transitionend', function () {
      todoDelete.remove()
    })
  }
  // Checked ToDo item
  if (item.classList[0] == 'todo__btn-checked') {
    const todoChecked = item.parentElement
    todoChecked.classList.toggle('completed')
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach(function (item) {
    switch (e.target.value) {
      case 'all':
        item.style.display = 'flex'
        break
      case 'completed':
        if (item.classList.contains('completed')) {
          item.style.display = 'flex'
        } else {
          item.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!item.classList.contains('completed')) {
          item.style.display = 'flex'
        } else {
          item.style.display = 'none'
        }
        break
    }
  })
}

function saveToLocalStorage(item) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(item)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  let todos = null
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (item) {
    // Create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo__list-wrapper')
    // Create li
    const todoItem = document.createElement('li')
    todoItem.classList.add('todo__list-item')
    todoItem.innerText = item
    todoDiv.appendChild(todoItem)
    // Create check mark button
    const completedBtn = document.createElement('button')
    completedBtn.classList.add('todo__btn-checked')
    completedBtn.classList.add('btn')
    completedBtn.innerHTML = `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
    width="352.62px" height="352.62px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" 
    xml:space="preserve">
        <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
          c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
          c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
          c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
          C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
          c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"/>
    </svg>`
    todoDiv.appendChild(completedBtn)
    // Create delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('todo__btn-delete')
    deleteBtn.classList.add('btn')
    deleteBtn.innerHTML = `
    <svg height="512pt" viewBox="-64 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 80h-32v-48h-64v48h-32v-80h128zm0 0" fill="#62808c"/>
      <path d="m304 512h-224c-26.507812 0-48-21.492188-48-48v-336h320v336c0 26.507812-21.492188 48-48 48zm0 0" fill="#e76e54"/>
      <path d="m384 160h-384v-64c0-17.671875 14.328125-32 32-32h320c17.671875 0 32 14.328125 32 32zm0 0" fill="#77959e"/>
      <path d="m260 260c-6.246094-6.246094-16.375-6.246094-22.625 0l-41.375 41.375-41.375-41.375c-6.25-6.246094-16.378906-6.246094-22.625 0s-6.246094 16.375 0 22.625l41.375 41.375-41.375 41.375c-6.246094 6.25-6.246094 16.378906 0 22.625s16.375 6.246094 22.625 0l41.375-41.375 41.375 41.375c6.25 6.246094 16.378906 6.246094 22.625 0s6.246094-16.375 0-22.625l-41.375-41.375 41.375-41.375c6.246094-6.25 6.246094-16.378906 0-22.625zm0 0" fill="#fff"/>
    </svg>`
    todoDiv.appendChild(deleteBtn)
    // Append to list
    todoList.appendChild(todoDiv)
  })
}

function removeLocalStorageTodos(item) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = item.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}