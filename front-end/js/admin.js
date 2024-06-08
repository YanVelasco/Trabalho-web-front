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
        div.className = "couse-container";
        
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
        title.placeholder = "Title"
        
        const description = document.createElement("input");
        description.id = course.id + "-description";
        description.className = "course course-description";
        description.type = "text";
        description.value = course.description;
        description.placeholder = "Description"
        
        const hours = document.createElement("input");
        hours.id = course.id + "-hours";
        hours.className = "course course-hours";
        hours.type = "text";
        hours.value = course.hours;
        hours.placeholder = "Hours"
        
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
        courseList.appendChild(div);
        courseList.appendChild(line);
    });

    const addButton = document.getElementById("new-course");
    addButton.onclick = addCourse;
}

async function addCourse() {
    new_title = document.getElementById("new-title");
    new_description = document.getElementById("new-description");
    new_hours = document.getElementById("new-hours");

    if (new_title.value == "" || new_description.value == "" || new_hours.value == "" || isNaN(new_hours.value)){
        alert("Favor preencha todos os campos com valores válidos");
        return;
    }

    if (!backendAlive) {
        courses = JSON.parse(localStorage.getItem('courses'));

        const highestId = Math.max(...courses.map(course => course.id));

        course = {
            id: highestId + 1,
            title: new_title.value,
            description: new_description.value,
            hours: new_hours.value
        }

        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
    } else {
        const response = await fetch(backendUrl + "courses/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: new_title.value,
                description: new_description.value,
                hours: new_hours.value
            })
        });
        if (response.ok) { }
        else if (response.status === 400) {
            alert("Favor preencha todos os campos");
        }
        else {
            alert("Erro ao adicionar curso");
        }
    }

    new_title.value = "";
    new_description.value = "";
    new_hours.value = "";
    initialize();
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
        courses = JSON.parse(localStorage.getItem('courses'));
        course = courses.filter(c => c.id === course.id);
        
        if(course.length === 0) {
            alert("Curso não encontrado");
            return;
        }

        course = course[0];
        title = document.getElementById(course.id + "-title").value;
        description = document.getElementById(course.id + "-description").value;
        hours = document.getElementById(course.id + "-hours").value;

        if (title == "" || description == "" || hours == "") {
            alert("Favor preencha todos os campos");
            return;
        }

        course.title = title;
        course.description = description;
        course.hours = hours;

        localStorage.setItem('courses', JSON.stringify(courses));

        initialize();
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
    if (!confirm("Deseja realmente deletar o curso?")) {
        return;
    }

    if (!backendAlive) {
        courses = JSON.parse(localStorage.getItem('courses'));
        course = courses.filter(c => c.id === id);
        
        if(course.length === 0) {
            alert("Curso não encontrado");
            return;
        }

        course = course[0];

        index = courses.indexOf(course);
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        initialize();
    } else {
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