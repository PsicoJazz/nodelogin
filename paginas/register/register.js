function onchangeEmail() {
    const email = form.email().value;
    form.emailInvalidError().style.display = validateEmail(email) ? 'none' : 'block';
    
}

function onchangePassword() {
    const password = form.password().value;
    form.passwordError().style.display = password.length >= 6 ? 'none' : 'block';
}

function onchangeConfirmPassword() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordError().style.display = password === confirmPassword ? 'none' : 'block';
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-error'),

    password: () => document.getElementById('password'),
    passwordError: () => document.getElementById('password-error'),

    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordError: () => document.getElementById('confirmPassword-error')
}

function register() {
    const email = form.email().value;
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(() => {
        window.location.href = '../../paginas/home/home.html';
    })

    .catch(error => {
        alert(getErrorMessage(error));
    });

}

function getErrorMessage(error) {
    if (error.code === 'auth/email-already-in-use') {
        return 'O email já está em uso. Por favor, tente outro.';
    }
    return error.message;
}


function togglePasswordVisibility() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const type = password.type === "password" ? "text" : "password";
    password.type = type;
    confirmPassword.type = type;

}