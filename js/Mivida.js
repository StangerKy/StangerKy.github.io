const fechaInicio = new Date(2025, 6, 14);
const diasTranscurridosElement = document.getElementById('dias_transcurridos');
const aniosMesesDiasTranscurridosElement = document.getElementById('anios_meses_dias_transcurridos');
const imagePairs = document.querySelectorAll('.image-pair');
const rotateButton = document.getElementById('rotateButton');
const music = document.getElementById('background-music');
const juegoLink = document.getElementById('juego-link');
let currentIndex = 0;

function actualizarContador() {
        const fechaActual = new Date();
        const diferenciaMilisegundos = fechaActual.getTime() - fechaInicio.getTime();
        const milisegundosPorDia = 1000 * 60 * 60 * 24;
        const diasTotales = Math.floor(diferenciaMilisegundos / milisegundosPorDia);

        let anios = fechaActual.getFullYear() - fechaInicio.getFullYear();
        let meses = fechaActual.getMonth() - fechaInicio.getMonth();
        let dias = fechaActual.getDate() - fechaInicio.getDate();

        if (dias < 0) {
                meses--;
                dias += new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0).getDate();
        }
        if (meses < 0) {
                anios--;
                meses += 12;
        }

        diasTranscurridosElement.innerText = diasTotales;
        aniosMesesDiasTranscurridosElement.innerText = `${anios} años, ${meses} meses y ${dias} días`;
}

function rotateImagePairs() {
        imagePairs.forEach(pair => pair.classList.remove('active'));
        currentIndex = (currentIndex + 1) % imagePairs.length;
        imagePairs[currentIndex].classList.add('active');
}

rotateButton.addEventListener('click', () => {
        music.play();
        rotateImagePairs();
});

function createShootingStars() {
        const numStars = 35;
        for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'shooting-star';
                star.style.top = `${Math.random() * 100}vh`;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.animationDelay = `${Math.random() * 15}s`;
                document.body.appendChild(star);
        }
}

// Lógica para el menú desplegable
document.querySelector('.dropbtn').addEventListener('click', () => {
        document.getElementById("myDropdown").classList.toggle("show");
});

window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
                const dropdowns = document.getElementsByClassName("dropdown-content");
                for (let i = 0; i < dropdowns.length; i++) {
                        const openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                                openDropdown.classList.remove('show');
                        }
                }
        }
}

// Nueva función para controlar la visibilidad del juego
function controlarVisibilidadJuego() {
        const fechaActual = new Date();
        const mes = fechaActual.getMonth(); // Los meses en JS van de 0 a 11
        const dia = fechaActual.getDate();

        const esSeptiembre = (mes === 8 && dia >= 21 && dia <= 30);
        const esMarzo = (mes === 2 && dia >= 21 && dia <= 31);

        if (esSeptiembre || esMarzo) {
                juegoLink.style.display = 'block';
        } else {
                juegoLink.style.display = 'none';
        }
}

actualizarContador();
setInterval(actualizarContador, 60000);
createShootingStars();
controlarVisibilidadJuego();