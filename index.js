const textTask = document.getElementById('text-task');
const taskItemContainer = document.getElementById('task-item-container');

function addTask() {
    let taskText = textTask.value.trim();
    if(taskText === "") return;

    let newTaskItem = document.createElement('div'); // Change from 'p' to 'div' to support flexbox layout
    newTaskItem.innerHTML = `<span>${textTask.value}</span>`; // Wrap text in a <span> to separate from buttons
    newTaskItem.id = 'task-list';
    
    let noOfPara = taskItemContainer.childElementCount;
    if (noOfPara % 2 == 0) {
        newTaskItem.classList.add('odd');
    } else {
        newTaskItem.classList.add('even');
    }

    let checkButton = document.createElement('button');
    checkButton.innerHTML = '&#x2714;'; // HTML entity for the "tick" symbol
    checkButton.classList.add('check-btn');

    let removeButton = document.createElement('button');
    removeButton.innerHTML = '&#x2716;'; // HTML entity for the "cross" symbol
    removeButton.classList.add('remove-btn');

    let buttonContainer = document.createElement('div'); // Container to hold buttons (optional)
    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(removeButton);

    newTaskItem.appendChild(buttonContainer);

    // Remove the task when the "X" button is clicked
    removeButton.addEventListener('click', function() {
        newTaskItem.remove();
        updateLocalStorage();
    });

    // Strike through the task text when the "tick" button is clicked
    checkButton.addEventListener('click', function() {
        newTaskItem.classList.toggle('strikethrough');
        checkButton.remove();
        updateLocalStorage();
    });

    taskItemContainer.appendChild(newTaskItem);
    textTask.value = '';
    updateLocalStorage();    
}

function updateLocalStorage(){
    const tasks = Array.from(taskItemContainer.children).map(task => {
            const tasksText = task.childNodes[0].textContent;
        return {
            text: tasksText,
            completed: task.classList.contains('strikethrough')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const storedTask = JSON.parse(localStorage.getItem('tasks')) || []
    storedTask.forEach(task =>{
        let newTaskItem = document.createElement('div');
        newTaskItem.innerHTML = `<span>${task.text}</span>`;
        newTaskItem.id = 'task-list';
        let noOfPara = taskItemContainer.childElementCount;
        if(noOfPara%2 == 0){
            newTaskItem.classList.add('odd');
        }
        else{
            newTaskItem.classList.add('even');
        }

        let checkButton = document.createElement('button');
        checkButton.innerHTML = ' &#x2714;';
        checkButton.classList.add('check-btn');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = '&#x2716;';
        removeButton.classList.add('remove-btn');

        let buttonContainer = document.createElement('div'); // Container to hold buttons (optional)
        buttonContainer.appendChild(checkButton);
        buttonContainer.appendChild(removeButton);

        newTaskItem.appendChild(buttonContainer);
        
        removeButton.addEventListener('click', function () {
            newTaskItem.remove();
            updateLocalStorage(); // Update storage after removing
        });

        checkButton.addEventListener('click', function () {
            newTaskItem.classList.toggle('strikethrough');
            checkButton.remove();
            updateLocalStorage(); // Update storage after checking/unchecking
        });

        if (task.completed) {
            newTaskItem.classList.add('strikethrough');
            checkButton.remove();
        }

        taskItemContainer.appendChild(newTaskItem);
    })
}

document.addEventListener('DOMContentLoaded', loadTasks);
