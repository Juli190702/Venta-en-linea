// POR UNIDADES
const formUnidades = document.getElementById('formUnidades');
if (formUnidades) {
    formUnidades.addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('exitoUnidades').style.display = 'block';
        formUnidades.reset();
    });
}