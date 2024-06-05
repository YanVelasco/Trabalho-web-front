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

let subscribedCourses = [];

function fillCourses(courses) {
    const courseList = document.getElementById('courseList');
    courses.forEach(course => {
        const courseItem = document.createElement('li');
        courseItem.id = `course-${course.id}`;
        courseItem.innerHTML = `
            <h2>${course.title}</h2>
            <p>${course.description}</p>
            <button class="subscribe-button">Inscrever-se</button>
            <span class="subscribed-checkmark" style="display: none;">✓</span>
        `;
        const subscribeButton = courseItem.querySelector('.subscribe-button');
        const subscribedCheckmark = courseItem.querySelector('.subscribed-checkmark');
        subscribeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            subscribeToCourse(course, courseItem);
        });
        subscribedCheckmark.addEventListener('click', (event) => {
            event.stopPropagation();
            unsubscribeFromCourse(course.id);
        });
        courseItem.addEventListener('click', () => showCourseModal(course));
        courseList.appendChild(courseItem);
    });
    const loading = document.getElementById('backend-await');
    loading.style.display = 'none';
}

function showCourseModal(course) {
    const courseModal = document.getElementById('courseModal');
    const courseModalTitle = document.getElementById('courseModalTitle');
    const courseModalDescription = document.getElementById('courseModalDescription');
    let courseModalSubscribe = document.getElementById('courseModalSubscribe');
    let courseModalSubscribed = document.getElementById('courseModalSubscribed');
    const courseModalClose = document.getElementById('courseModalClose');

    courseModalTitle.textContent = course.title;
    courseModalDescription.textContent = course.description;

    const isSubscribed = subscribedCourses.some(subscribedCourse => subscribedCourse.id === course.id);

    if (isSubscribed) {
        courseModalSubscribe.style.display = 'none';
        courseModalSubscribed.style.display = '';
    } else {
        courseModalSubscribe.style.display = '';
        courseModalSubscribed.style.display = 'none';
    }

    // Remove event listeners existentes para evitar duplicação
    const newSubscribeButton = courseModalSubscribe.cloneNode(true);
    const newSubscribedCheckmark = courseModalSubscribed.cloneNode(true);
    courseModalSubscribe.parentNode.replaceChild(newSubscribeButton, courseModalSubscribe);
    courseModalSubscribed.parentNode.replaceChild(newSubscribedCheckmark, courseModalSubscribed);
    courseModalSubscribe = newSubscribeButton;
    courseModalSubscribed = newSubscribedCheckmark;

    courseModalSubscribe.addEventListener('click', (event) => {
        event.stopPropagation();
        const courseItem = document.getElementById(`course-${course.id}`);
        subscribeToCourse(course, courseItem);
        courseModalSubscribe.style.display = 'none';
        courseModalSubscribed.style.display = '';
    });

    courseModalSubscribed.addEventListener('click', (event) => {
        event.stopPropagation();
        unsubscribeFromCourse(course.id);
        courseModalSubscribe.style.display = '';
        courseModalSubscribed.style.display = 'none';
    });

    courseModal.classList.add('show');

    courseModalClose.addEventListener('click', () => {
        courseModal.classList.add('fade-out');
        setTimeout(() => {
            courseModal.classList.remove('show');
            courseModal.classList.remove('fade-out');
        }, 500); // combine isso com a duração da sua animação fade-out
    });
}


function subscribeToCourse(course, courseItem) {
    // Adiciona o curso à lista de cursos inscritos
    subscribedCourses.push(course);

    // Atualiza a exibição do item do curso
    const subscribeButton = courseItem.querySelector('.subscribe-button');
    const subscribedCheckmark = courseItem.querySelector('.subscribed-checkmark');
    subscribeButton.style.display = 'none';
    subscribedCheckmark.style.display = '';

    // Atualiza a lista de cursos inscritos na tela inicial
    updateSubscribedCourses();
}

function unsubscribeFromCourse(courseId) {
    // Remove o curso da lista de cursos inscritos
    subscribedCourses = subscribedCourses.filter(course => course.id !== courseId);

    // Atualiza a exibição do item do curso
    const courseItem = document.getElementById(`course-${courseId}`);
    const subscribeButton = courseItem.querySelector('.subscribe-button');
    const subscribedCheckmark = courseItem.querySelector('.subscribed-checkmark');
    subscribeButton.style.display = '';
    subscribedCheckmark.style.display = 'none';

    // Atualiza a lista de cursos inscritos na tela inicial
    updateSubscribedCourses();
}

function updateSubscribedCourses() {
    // Atualiza a lista de cursos inscritos na tela inicial
    const subscribedCoursesList = document.getElementById('subscribedCoursesList');
    subscribedCoursesList.innerHTML = '';
    subscribedCourses.forEach(course => {
        const courseItem = document.createElement('li');
        courseItem.textContent = course.title;
        subscribedCoursesList.appendChild(courseItem);
    });

    // Atualiza a soma total de horas na tela inicial
    const totalHours = subscribedCourses.reduce((sum, course) => sum + course.hours, 0);
    const totalHoursElement = document.getElementById('totalHours');
    totalHoursElement.textContent = `Total de horas: ${totalHours}`;
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
        "description": 'Aprenda Java, uma linguagem de programação versátil e amplamente utilizada. Ideal para construir aplicações robustas, seguras e portáteis.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 2,
        "title": 'HTML',
        "description": 'Domine o HTML, a linguagem de marcação padrão para a criação de páginas web. Um bloco de construção fundamental do desenvolvimento web.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 3,
        "title": 'CSS',
        "description": 'Pratique CSS, uma linguagem de folha de estilo usada para descrever a aparência e a formatação de um documento escrito em HTML.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 4,
        "title": 'PHP',
        "description": 'Mergulhe no PHP, uma linguagem de script do lado do servidor popular projetada para desenvolvimento web, mas também usada como linguagem de programação de propósito geral.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 5,
        "title": 'JavaScript',
        "description": 'Explore o JavaScript, uma linguagem de programação de alto nível e interpretada que é uma tecnologia central da World Wide Web.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 6,
        "title": 'MySQL',
        "description": 'Aprenda MySQL, um sistema de gerenciamento de banco de dados que usa SQL como interface. É um dos bancos de dados mais populares do mundo.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 7,
        "title": 'Bootstrap',
        "description": 'Conheça o Bootstrap, um framework de código aberto para desenvolvimento com HTML, CSS e JS. Desenvolva sites responsivos, móveis primeiro, na web com a biblioteca de componentes front-end mais popular do mundo.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 8,
        "title": 'Git',
        "description": 'Aprenda Git, um sistema de controle de versão distribuído que permite rastrear mudanças no código fonte durante o desenvolvimento de software.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 9,
        "title": 'GitHub',
        "description": 'Explore o GitHub, uma plataforma de hospedagem de código-fonte com controle de versão usando o Git. É onde mais de 65 milhões de desenvolvedores moldam o futuro do software, juntos.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 10,
        "title": 'Visual Studio Code',
        "description": 'Domine o Visual Studio Code, um editor de código-fonte desenvolvido pela Microsoft para Windows, Linux e macOS. Ele inclui suporte para depuração, controle Git incorporado, realce de sintaxe, complementação inteligente de código, snippets e refatoração de código.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 11,
        "title": 'XAMPP',
        "description": 'Aprenda XAMPP, uma distribuição Apache de código aberto que fornece aos desenvolvedores um servidor web fácil de instalar.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 12,
        "title": 'PHPMyAdmin',
        "description": 'Conheça o PHPMyAdmin, uma ferramenta de software livre escrita em PHP, destinada a lidar com a administração do MySQL pela Web.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 13,
        "title": 'Apache',
        "description": 'Explore o Apache, o servidor web mais popular do mundo. Ele é um projeto de código aberto mantido pela Apache Software Foundation.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 14,
        "title": 'NetBeans',
        "description": 'Aprenda NetBeans, um ambiente de desenvolvimento integrado (IDE) para desenvolvimento de software. Ele permite que os aplicativos sejam desenvolvidos a partir de um conjunto de módulos de software chamados módulos.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 15,
        "title": 'Eclipse',
        "description": 'Domine o Eclipse, um ambiente de desenvolvimento integrado (IDE) usado no desenvolvimento de programas de computador. É o IDE mais amplamente utilizado para desenvolvimento Java.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 16,
        "title": 'Visual Studio',
        "description": 'Aprenda Visual Studio, um ambiente de desenvolvimento integrado (IDE) da Microsoft. Ele é usado para desenvolver programas de computador, bem como sites, aplicativos da web, serviços da web e aplicativos móveis.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 17,
        "title": 'Notepad++',
        "description": 'Conheça o Notepad++, um editor de texto e de código-fonte com suporte a várias linguagens. Ele busca reduzir o uso de energia mundial ao ter uma execução mais eficiente e reduzindo a carga da CPU, resultando em um ambiente mais verde.',
        "createdAt": new Date(),
        "hours": 10
    },
    {
        "id": 18,
        "title": 'Notepad',
        "description": 'Aprenda sobre o Notepad, um simples editor de texto que é incluído em todas as versões do Microsoft Windows. Ele é usado para criar, abrir e ler arquivos de texto sem formatação.',
        "createdAt": new Date(),
        "hours": 10
    }
]

initialize();