function logout() {
    firebase.auth().signOut()
    .then(() => {
        window.location.href = '../../index.html';
    })
    .catch(error => {
        console.error("Erro ao sair:", error);
    });
}