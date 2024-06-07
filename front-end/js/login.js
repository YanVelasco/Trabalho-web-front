const btnLogin = document.querySelector('#btnLogin') 
const fieldUser = document.querySelector('#username') 
const fieldPassword = document.querySelector('#password') 
const formLogin = document.querySelector("#form-login") 
 
const user = { 
    'login': 'admin', 
    'password': 'admin' 
} 
 
function userIsAuthenticated() { 
    return user.login === fieldUser.value && 
        user.password === fieldPassword.value 
} 
 
function resetFormLogin() { 
    formLogin.reset() 
} 
 
async function login() { 
 
    if (userIsAuthenticated()) { 
        localStorage.setItem('user', user.login) 
        resetFormLogin() 
        window.location.href = "../pages/admin.html" 
    } else { 
        localStorage.removeItem('user') 
        resetFormLogin() 
        alert('Usuário/Senha inválidos.') 
    } 
} 
 
btnLogin.addEventListener('click', (e) => { 
    e.preventDefault() 
    login() 
})