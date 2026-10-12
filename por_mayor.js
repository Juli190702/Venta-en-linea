// POR MAYOR
const formMayor = document.getElementById('formMayor');
if (formMayor) {
    formMayor.addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('exitoMayor').style.display = 'block';
        formMayor.reset();
    });
}