const backendUrl = "http://localhost:8080/";

async function initialize() {
    let courses = await fetchList();
    let courseList = document.getElementById("courseList");

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
        bdelete.innerHTML = "Delete";
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
    initialize();
}

async function fetchList() {
    const response = await fetch(backendUrl + "courses");
    return await response.json();
}

async function updateCourse(course) {
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
    initialize();
}

async function deleteCourse(id) {
    const response = await fetch(backendUrl + "courses/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    initialize();
}


initialize();