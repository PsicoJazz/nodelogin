const form = {
    email: () => document.getElementById('email'),
    password: () => document.getElementById('password'),
    emailError: () => document.querySelector('.email-error'),
    passwordError: () => document.querySelector('.password-error'),
    entrar: () => document.querySelector('.entrar'),
    registrar: () => document.querySelector('.registrar'),
    esqueci: () => document.querySelector('.esqueci')
};

function validateFields() {
    toggleButtonDisabled();
      
}

function isPasswordValid() {
    const password = form.password().value;
    return password.length > 5;
}

function isEmailValid() {
    const email = form.email().value;

    if (!email) {
        return false;
    }

    return validateEmail(email);
}

function toggleEmailError(show = !isEmailValid()) {
    form.emailError().style.display = show ? 'block' : 'none';
    form.emailValidError().style.display = show ? 'none' : 'block';
}

function toggleButtonDisabled() {
    const emailValid = isEmailValid();
    const passwordValid = isPasswordValid();
    form.entrar().disabled = !emailValid || !passwordValid;
    form.registrar().disabled = !emailValid || !passwordValid;
    form.esqueci().disabled = !emailValid;
}

function togglePasswordVisibility() {
    const passwordInput = form.password();
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}  

function togglePasswordError(show = !isPasswordValid()) {
    form.passwordError().style.display = show ? 'block' : 'none';
}


function recoverPassword() {
    const email = form.email().value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
        alert("Se este email estiver cadastrado, você receberá um link para redefinir sua senha.");
    })
    .catch(error => {
        alert(error.message);
    });

}

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

function getErrorMessage(error) {
    if (error.code == 'auth/invalid-credential') {
        return 'Usuário não encontrado. Verifique o email e a senha e tente novamente.';
    }
    if (error.code == 'auth/invalid-email') {
        return 'Email inválido. Verifique o email e tente novamente.';
    }
    return error.message;
    }
}
  
function register() {
    window.location.href = 'paginas/register/register.html';

}

