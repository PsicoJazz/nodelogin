// Objeto com referências aos elementos
const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailError: () => document.querySelector('.email-error'),
    passwordError: () => document.querySelector('.password-error'),
    entrar: () => document.querySelector('.entrar'),
    registrar: () => document.querySelector('.registrar'),
    esqueci: () => document.querySelector('.esqueci')
};

// Função para validar campos
function validateFields() {
    toggleButtonDisabled();
}

// Valida senha
function isPasswordValid() {
    const password = form.password().value;
    return password.length > 5;
}

// Valida email
function isEmailValid() {
    const email = form.email().value;
    if (!email) return false;
    return validateEmail(email);
}

// Regex para email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Exibe erro de email
function toggleEmailError(show = !isEmailValid()) {
    form.emailError().style.display = show ? 'block' : 'none';
}

// Habilita ou desabilita botões
function toggleButtonDisabled() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();

    form.entrar().disabled = !emailValid || !passwordValid;
    form.registrar().disabled = !emailValid || !passwordValid;
    form.esqueci().disabled = !emailValid;
}

// Alterna visibilidade da senha
function togglePasswordVisibility() {
    const passwordInput = form.password();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// Exibe erro de senha
function togglePasswordError(show = !isPasswordValid()) {
    form.passwordError().style.display = show ? 'block' : 'none';
}

// Recuperar senha
function recoverPassword() {
    const email = form.email().value;
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Se este email estiver cadastrado, você receberá um link para redefinir sua senha.");
        })
        .catch(error => {
            alert(getErrorMessage(error));
        });
}

// Login
function login() {
    firebase.auth().signInWithEmailAndPassword(
        form.email().value,
        form.password().value
    )
    .then(() => {
        window.location.href = 'paginas/home/home.html';
    })
    .catch(error => {
        alert(getErrorMessage(error));
        console.error("Erro ao logar:", error);
    });
}

// Função auxiliar para mensagens de erro
function getErrorMessage(error) {
    if (error.code === 'auth/invalid-credential') {
        return 'Usuário não encontrado. Verifique o email e a senha e tente novamente.';
    }
    if (error.code === 'auth/invalid-email') {
        return 'Email inválido. Verifique o email e tente novamente.';
    }
    if (error.code === 'auth/wrong-password') {
        return 'Senha incorreta. Verifique o email e a senha e tente novamente.';
    }
    return error.message;
}

// Registrar: redireciona para página de registro
function register() {
    window.location.href = 'paginas/register/register.html';
}

// Adicionar event listeners se quiser evitar inline onclick
form.entrar().addEventListener('click', login);
form.registrar().addEventListener('click', register);
form.esqueci().addEventListener('click', recoverPassword);