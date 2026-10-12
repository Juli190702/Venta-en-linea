// POR MENOR
const formMenor = document.getElementById('formMenor');
if (formMenor) {
    formMenor.addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('exitoMenor').style.display = 'block';
        formMenor.reset();
    });
}