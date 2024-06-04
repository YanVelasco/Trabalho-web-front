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