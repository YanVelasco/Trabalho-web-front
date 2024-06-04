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

async function fetchCourses() {
    const response =  await fetch("http://localhost:8080/courses/list");
    if (response.ok) {
        fillCourses(await response.json());
    };
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

fetchCourses();