backendAlive = false;
backendUrl = "http://localhost:8080/";

function filterCourses() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const courseList = document.getElementById('courseList');
    const courses = courseList.getElementsByTagName('li');

    Array.from(courses).forEach(course => {
        const courseTitle = course.getElementsByTagName('h2')[0].textContent.toLowerCase();
        if (courseTitle.includes(filter)) {
            course.style.display = '';
        } else {
            course.style.display = 'none';
        }
    });
}

function fillCourses(courses) {
    const courseList = document.getElementById('courseList');
    courses.forEach(course => {
        const courseItem = document.createElement('li');
        courseItem.innerHTML = `
            <h2>${course.title}</h2>
            <p>${course.description}</p>
        `;
        courseList.appendChild(courseItem);
    });
    const loading = document.getElementById('backend-await');
    loading.style.display = 'none'; 
}

async function initialize() {
    courses = []
    backendAlive = await healthcheck();
    if (backendAlive) {
        courses = await fetchCourses();
    } else {
        courses = data;
    }
    console.log(courses)
    fillCourses(courses);
}

// BACKEND CODE
async function fetchCourses() {
    const response =  await fetch(backendUrl + "courses/list");
    return await response.json();
}

async function healthcheck() {
    try{
        const response =  await fetch(backendUrl + "health");
        console.log(response.ok)
        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        return false
    }
}

// local
const data = [
    {
        "id": 1,
        "title": 'Java',
        "description": 'Seja bem-vindo ao site de cadastro de alunos, professores e disciplinas. Rodando Local', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 2,
        "title": 'HTML', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 3,
        "title": 'CSS', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 4,
        "title": 'PHP', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 5,
        "title": 'JavaScript', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 6,
        "title": 'MySQL', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 7,
        "title": 'Bootstrap', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 8,
        "title": 'Git', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 9,
        "title": 'GitHub', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 10,
        "title": 'Visual Studio Code', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 11,
        "title": 'XAMPP', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 12,
        "title": 'PHPMyAdmin', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 13,
        "title": 'Apache', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 14,
        "title": 'NetBeans', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 15,
        "title": 'Eclipse', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 16,
        "title": 'Visual Studio', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 17,
        "title": 'Notepad++', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    },
    {
        "id": 18,
        "title": 'Notepad', 
        "description": 'Este site foi desenvolvido como trabalho da disciplina de Desenvolvimento Web.', 
        "createdAt": new Date(), 
        "hours": 10
    }
]

initialize();