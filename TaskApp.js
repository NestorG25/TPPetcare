//alert("Works!")
//console.log document.getElementById('formTask').addEventListener('submit', saveTask);
document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    alert('enviando formulario');
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    console.log(description);
    //console.log("title",title);
    //console.log("description",description);
    //console.log(task)

    let task = {
        title,
        description
    };

    if (localStorage.getItem('tasks') === null) { // Si no hay tareas en localStorage
        let tasks = [];//agrega
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else { // Si ya hay tareas en localStorage
        let tasks = JSON.parse(localStorage.getItem('tasks')); // Obtiene tareas antiguas
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Almacena nuevamente
    }
    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();
}
function deleteTask(title) {
    //console.log("deleteTask",title);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title === title) { // Encuentra la tarea por su título
            tasks.splice(i, 1); // Elimina la tarea
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Actualiza localStorage
    getTasks(); // Refresca la lista de tareas
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')); // Si no hay tareas, asigna un array vacío
    let tasksView = document.getElementById('tasks'); // Div donde se mostrarán las tareas
    tasksView.innerHTML = ''; // Limpia el contenido anterior

    // Iterar sobre las tareas y crear su representación en HTML
        for (let i = 0; i < tasks.length; i++) {
            let title = tasks[i].title;
            let description = tasks[i].description;
        tasksView.innerHTML += `<div class="card mb-3">
                <div class="card-body">
                    <p>${title} - ${description}
                    <a href=#  onclick="deleteTask('${title}')"class="btn btn-danger ml-5">Delete</a>
                    </p>
                </div>
            </div>`;
    }
}
// Llama a getTasks al cargar la página
getTasks();