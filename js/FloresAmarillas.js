document.addEventListener('DOMContentLoaded', () => {
    const flowerGallery = document.querySelector('.flower-gallery');
    const pointsProgressElement = document.getElementById('points-progress');
    const messageElement = document.querySelector('.flower-container p:nth-of-type(1)');
    const totalHearts = parseInt(localStorage.getItem('playerHearts')) || 0;
    const maxFlowers = 20;

    // Actualiza el texto de progreso
    pointsProgressElement.textContent = `${totalHearts}/250 puntos`;

    // Lógica para cuando se alcanzan o superan los 250 puntos
    if (totalHearts >= 250) {
        // Limpiamos la galería para quitar las flores individuales
        flowerGallery.innerHTML = '';
        
        // Creamos y agregamos la nueva imagen del ramo en forma de corazón
        const specialImage = document.createElement('img');
        specialImage.src = '../Imagenes/RamoFlorAmarilla.png';
        specialImage.alt = 'Ramo de Flores Amarillas en forma de Corazón';
        specialImage.classList.add('special-flower-arrangement');
        flowerGallery.appendChild(specialImage);

        // Ocultamos el mensaje original de "Gana puntos..."
        if (messageElement) {
            messageElement.style.display = 'none';
        }

        // Cambiamos el mensaje para reflejar que el ramo está completo
        const finalMessage = document.createElement('p');
        finalMessage.textContent = 'Ya haz ganado Todos los Puntos, ya ha crecido el ramo al maximo 😊';
        finalMessage.style.color = '#e74c3c';
        finalMessage.style.fontWeight = 'bold';
        finalMessage.style.marginTop = '20px';
        flowerGallery.appendChild(finalMessage);

    } else {
        const flowersToShow = Math.min(Math.floor(totalHearts / 10), maxFlowers);

        if (flowersToShow > 0) {
            for (let i = 0; i < flowersToShow; i++) {
                const img = document.createElement('img');
                img.src = '../Imagenes/FlorAmarilla.png';
                img.alt = 'Flor Amarilla';
                img.classList.add('flower');
                flowerGallery.appendChild(img);
            }
        } else {
            const message = document.createElement('p');
            message.textContent = 'Aún no tienes suficientes puntos para tu primera flor.';
            flowerGallery.appendChild(message);
        }
    }

});
