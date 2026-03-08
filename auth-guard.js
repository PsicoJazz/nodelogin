firebase.auth().onAuthStateChanged(function(user) {
    setTimeout(() => {
        if (!user) {
            window.location.href = '/index.html';
        } else {
            console.log("Usuário logado:", user.email);
        }
    }, 100); // espera 100ms
});