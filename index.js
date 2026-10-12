const botonMenu = document.getElementById('botonMenu');
const menuPrincipal = document.getElementById('menuPrincipal');
const elementosSubmenu = document.querySelectorAll('.tiene-submenu');

botonMenu.addEventListener('click', () => {
    menuPrincipal.classList.toggle('abierto');
    const icono = botonMenu.querySelector('i');
    icono.classList.toggle('fa-bars');
    icono.classList.toggle('fa-times');
});

elementosSubmenu.forEach(elemento => {
    const enlace = elemento.querySelector('.enlace-submenu');
    if (enlace) {
        enlace.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                elemento.classList.toggle('activo');
            }
        });
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.cabecera')) {
        menuPrincipal.classList.remove('abierto');
        const icono = botonMenu.querySelector('i');
        icono.classList.add('fa-bars');
        icono.classList.remove('fa-times');
        elementosSubmenu.forEach(el => el.classList.remove('activo'));
    }
});

const tarjetas = document.querySelectorAll('.tarjeta');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada, indice) => {
        if (entrada.isIntersecting) {
            setTimeout(() => {
                entrada.target.classList.add('visible');
            }, indice * 150);
        }
    });
}, { threshold: 0.15 });

tarjetas.forEach(tarjeta => observador.observe(tarjeta));

document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        const destino = this.getAttribute('href');
        if (destino !== '#') {
            e.preventDefault();
            const seccion = document.querySelector(destino);
            if (seccion) {
                seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        if (window.innerWidth <= 768) {
            menuPrincipal.classList.remove('abierto');
            const icono = botonMenu.querySelector('i');
            icono.classList.add('fa-bars');
            icono.classList.remove('fa-times');
        }
    });
});

let ultimoScroll = 0;
window.addEventListener('scroll', () => {
    const cabecera = document.querySelector('.cabecera');
    const actual = window.pageYOffset;
    
    if (actual > 80) {
        cabecera.style.background = 'rgba(255, 255, 255, 0.95)';
        cabecera.style.boxShadow = '0 4px 30px rgba(99, 102, 241, 0.12)';
    } else {
        cabecera.style.background = 'rgba(255, 255, 255, 0.85)';
        cabecera.style.boxShadow = '0 2px 20px rgba(99, 102, 241, 0.08)';
    }
    ultimoScroll = actual;
});
// ===== CHATBOT =====
const botonChat = document.getElementById('botonChat');
const ventanaChat = document.getElementById('ventanaChat');
const cerrarChat = document.getElementById('cerrarChat');
const cuerpoChat = document.getElementById('cuerpoChat');
const entradaMensaje = document.getElementById('entradaMensaje');
const enviarMensaje = document.getElementById('enviarMensaje');
const opciones = document.querySelectorAll('.opcion');

// Abrir / cerrar
botonChat.addEventListener('click', () => {
    ventanaChat.classList.toggle('abierta');
});

cerrarChat.addEventListener('click', () => {
    ventanaChat.classList.remove('abierta');
});

// Agregar mensaje al chat
function agregarMensaje(texto, esUsuario = false) {
    const div = document.createElement('div');
    div.className = `mensaje ${esUsuario ? 'usuario' : 'bot'}`;
    div.innerHTML = `<p>${texto}</p>`;
    cuerpoChat.appendChild(div);
    cuerpoChat.scrollTop = cuerpoChat.scrollHeight;
}

// Respuestas automáticas
function obtenerRespuesta(mensaje) {
    const texto = mensaje.toLowerCase();
    
    if (texto.includes('producto') || texto.includes('productos')) {
        return 'Tenemos una gran variedad de equipos: laptops, tablets, componentes y más 📱💻. Visita nuestra sección <strong>Productos</strong> para ver todo el catálogo.';
    }
    if (texto.includes('envío') || texto.includes('envios') || texto.includes('envíos')) {
        return 'Hacemos envíos a todo el Perú 🇵🇪. Los tiempos de entrega son de 2 a 5 días hábiles según tu ubicación. El costo se calcula al finalizar la compra.';
    }
    if (texto.includes('factura') || texto.includes('facturación')) {
        return 'Emitimos factura electrónica 📄. Solo debes indicar tu RUC o DNI al momento de completar tus datos de compra.';
    }
    if (texto.includes('hablar') || texto.includes('persona') || texto.includes('whatsapp') || texto.includes('contacto')) {
        return '¡Claro que sí! 🤗 Escríbenos al WhatsApp: <strong>+51 987 654 321</strong> y te atenderemos personalmente.';
    }
    if (texto.includes('hola') || texto.includes('buenos días') || texto.includes('buenas')) {
        return '¡Hola! 😊 Mucho gusto. Cuéntanos, ¿qué necesitas saber?';
    }
    
    return 'Gracias por tu mensaje 💙. Te recomendamos escribirnos por WhatsApp para una atención más rápida: <strong>+51 987 654 321</strong>';
}

// Enviar mensaje
function enviarMensajeTexto() {
    const texto = entradaMensaje.value.trim();
    if (!texto) return;
    
    agregarMensaje(texto, true);
    entradaMensaje.value = '';
    
    // Simular escritura
    setTimeout(() => {
        agregarMensaje(obtenerRespuesta(texto));
    }, 600);
}

enviarMensaje.addEventListener('click', enviarMensajeTexto);
entradaMensaje.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') enviarMensajeTexto();
});

// Opciones rápidas
opciones.forEach(boton => {
    boton.addEventListener('click', () => {
        const texto = boton.getAttribute('data-respuesta');
        agregarMensaje(texto, true);
        setTimeout(() => {
            agregarMensaje(obtenerRespuesta(texto));
        }, 600);
    });
});
