const backendUrl = "http://localhost:8080/";
let backendAlive = false;

async function initialize() {
    let courses = await fetchList();
    let courseList = document.getElementById("courseList");

    backendAlive = await healthcheck();

    while(courseList.firstChild) { 
        courseList.removeChild(courseList.firstChild); 
    } 

    courses.forEach((course) => {
        const div = document.createElement("div");
        
        const id = document.createElement("input");
        id.className = "course course-id";
        id.type = "text";
        id.value = course.id.toString().padStart(3, "0");
        id.disabled = true;

        const title = document.createElement("input");
        title.id = course.id + "-title";
        title.className = "course course-title";
        title.type = "text";
        title.value = course.title;
        
        const description = document.createElement("input");
        description.id = course.id + "-description";
        description.className = "course course-description";
        description.type = "text";
        description.value = course.description;
        
        const hours = document.createElement("input");
        hours.id = course.id + "-hours";
        hours.className = "course course-hours";
        hours.type = "text";
        hours.value = course.hours;
        
        const button = document.createElement("button");
        button.className = "course course-button";
        button.innerHTML = "Salvar";
        button.onclick = updateCourse.bind(button, course);

        const bdelete = document.createElement("button");
        bdelete.className = "course course-delete";
        bdelete.innerHTML = "Deletar";
        bdelete.onclick = deleteCourse.bind(bdelete, course.id);
                
        const line = document.createElement("p");
        line.innerHTML = "<hr>";

        div.appendChild(id)
        div.appendChild(title)
        div.appendChild(description);
        div.appendChild(hours);
        div.appendChild(button);
        div.appendChild(bdelete);
        div.appendChild(line);
        courseList.appendChild(div);
    });

    const addButton = document.getElementById("new-course");
    addButton.onclick = addCourse;
}

async function addCourse() {
    if (!backendAlive) {
        alert("Backend desabilitado");
        return;
    } else {
        const response = await fetch(backendUrl + "courses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: document.getElementById("new-title").value,
                description: document.getElementById("new-description").value,
                hours: document.getElementById("new-hours").value
            })
        });
        if (response.ok) {        
            initialize();
        }
        else if (response.status === 400) {
            alert("Favor preencha todos os campos");
        }
        else {
            alert("Erro ao adicionar curso");
        }
    }
}

async function fetchList() {
    if (!backendAlive) {
        return JSON.parse(localStorage.getItem('courses'));
    } else {
        const response = await fetch(backendUrl + "courses");
        if (!response.ok) {
            alert("Erro ao buscar cursos. Backend desabilitado?");
        }
        return await response.json();
    }
}

async function updateCourse(course) {
    if (!backendAlive) {
        alert("Backend desabilitado");
        return;
    } else {
        const response = await fetch(backendUrl + "courses/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: course.id,
                title: document.getElementById(course.id + "-title").value,
                description: document.getElementById(course.id + "-description").value,
                hours: document.getElementById(course.id + "-hours").value
            })
        });
        if (response.ok) {
            initialize();
        } else if (response.status === 404) {
            alert("Curso não encontrado");
        } else if (response.status === 400) {
            alert("Favor preencha todos os campos");
        } else {
            alert("Erro ao atualizar curso");
        }
    }
}

async function deleteCourse(id) {
    if (!backendAlive) {
        
        return;
    } else {
        if (confirm("Deseja realmente deletar o curso?")) {
            const response = await fetch(backendUrl + "courses/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                initialize();
            } else if (response.status === 404) {
                alert("Curso não encontrado");
            }        
            else {
                alert("Erro ao deletar curso");
            }
        }
    }
}

async function healthcheck() {
    try{
        const response =  await fetch(backendUrl + "health");
        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        return false
    }
}

initialize();