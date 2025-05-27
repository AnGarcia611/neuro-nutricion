import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Psicobioticos() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Estado inicial del mute
    const audioMuted = localStorage.getItem('audioMuted') === 'true';
    setIsMuted(audioMuted);
    const pageAudio = document.getElementById('pageAudio');
    if (pageAudio) {
      pageAudio.muted = audioMuted;
    }

    // Configurar carrusel de imágenes
    const images = [
      'imagenes/psicobioticos/lupa_2.png',
      'imagenes/psicobioticos/cerebro.png',
      'imagenes/psicobioticos/lupa.png',
      'imagenes/psicobioticos/mujer.png',
      'imagenes/psicobioticos/organismos.png'
    ];
    let currentIndex = 0;
    const illustration = document.querySelector('.illustration');
    const arrowHand = document.querySelector('.icon-arrow-hand');

    // Función para cambiar imagen con efecto deslizante
    function changeImageWithSlide(nextIndex, direction) {
      if (!illustration) return;
      
      illustration.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s';
      illustration.style.transform = `translateX(${direction === 'left' ? '-100%' : '100%'})`;
      illustration.style.opacity = '0';
      setTimeout(() => {
        illustration.src = images[nextIndex];
        illustration.style.transition = 'none';
        illustration.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;
        setTimeout(() => {
          illustration.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s';
          illustration.style.transform = 'translateX(0)';
          illustration.style.opacity = '1';
        }, 20);
      }, 400);
    }

    if (arrowHand) {
      arrowHand.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % images.length;
        changeImageWithSlide(nextIndex, 'left');
        currentIndex = nextIndex;
      });
    }

    // Soporte para swipe/touch en la imagen (ignorando según especificaciones)
    if (illustration) {
      let startX = null;
      illustration.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
        }
      });
      illustration.addEventListener('touchend', function (e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        let diffX = endX - startX;
        if (Math.abs(diffX) > 40) {
          let direction = diffX < 0 ? 'left' : 'right';
          let nextIndex = diffX < 0
            ? (currentIndex + 1) % images.length
            : (currentIndex - 1 + images.length) % images.length;
          changeImageWithSlide(nextIndex, direction);
          currentIndex = nextIndex;
        }
        startX = null;
      });

      // Soporte para arrastrar con mouse en desktop
      let mouseDown = false;
      let mouseStartX = null;
      illustration.addEventListener('mousedown', function (e) {
        mouseDown = true;
        mouseStartX = e.clientX;
      });
      illustration.addEventListener('mouseup', function (e) {
        if (!mouseDown || mouseStartX === null) return;
        let mouseEndX = e.clientX;
        let diffX = mouseEndX - mouseStartX;
        if (Math.abs(diffX) > 40) {
          let direction = diffX < 0 ? 'left' : 'right';
          let nextIndex = diffX < 0
            ? (currentIndex + 1) % images.length
            : (currentIndex - 1 + images.length) % images.length;
          changeImageWithSlide(nextIndex, direction);
          currentIndex = nextIndex;
        }
        mouseDown = false;
        mouseStartX = null;
      });
      illustration.addEventListener('mouseleave', function () {
        mouseDown = false;
        mouseStartX = null;
      });
    }

    // Audio de fondo
    const savedAudioTime = parseFloat(localStorage.getItem('audioTime')) || 0;

    const handleLoadedMetadata = () => {
      if (savedAudioTime > 0 && savedAudioTime < pageAudio.duration) {
        pageAudio.currentTime = savedAudioTime;
      }
    };

    const handleTimeUpdate = () => {
      localStorage.setItem('audioTime', pageAudio.currentTime);
    };

    const handleEnded = () => {
      pageAudio.currentTime = 0;
      pageAudio.play();
    };

    if (pageAudio) {
      pageAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      pageAudio.addEventListener('timeupdate', handleTimeUpdate);
      pageAudio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (pageAudio) {
        pageAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        pageAudio.removeEventListener('timeupdate', handleTimeUpdate);
        pageAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const toggleSound = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    const pageAudio = document.getElementById('pageAudio');
    if (pageAudio) {
      pageAudio.muted = newIsMuted;
    }
    localStorage.setItem('audioMuted', newIsMuted);
  };

  const handleIconClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <style>{`
        /* Icono de sonido */
        .sound-toggle {
            position: absolute;
            top: 100px;
            right: 100px;
            width: 5%;
            cursor: pointer;
            z-index: 1001;
            transition: transform 0.2s;
            animation: scaleIn 1s ease-out forwards;
            animation-delay: 0.2s;
            transform: scale(0);
            opacity: 0;
        }

        .sound-toggle:hover {
            transform: scale(1.2);
        }

        .sound-toggle img {
            width: 100%;
            height: 100%;
            display: block;
        }

        .sound-toggle .icon-off {
            display: none;
        }

        .sound-toggle.muted .icon-on {
            display: none;
        }

        .sound-toggle.muted .icon-off {
            display: block;
        }

        /* Animación de entrada para el icono de sonido */
        @keyframes scaleIn {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        .sound-toggle .icon-on {
            animation: scaleIn 1s ease-out forwards;
            animation-delay: 1s;
            transform: scale(0);
            opacity: 0;
        }
      `}</style>

      {/* Audio de fondo */}
      <audio id="pageAudio" src="audio/principal.mp3" autoPlay></audio>

      {/* Icono de sonido */}
      <div 
        className={`sound-toggle ${isMuted ? 'muted' : ''}`} 
        onClick={toggleSound}
        title="Silenciar/Activar sonido"
      >
        <span className="icon-on">
          <img src="iconos/sonido_index_off_blanco.png" alt="Sonido activado" />
        </span>
        <span className="icon-off">
          <img src="iconos/sonido_index_on.png" alt="Sonido desactivado" />
        </span>
      </div>

      <main className="content-section">
        <div className="content-container">
          <section className="info-section">
            <header className="header-section">
              <h1>Descubre cómo actúan los psicobióticos</h1>
            </header>
            <div className="text-container">
              <p>Los psicobióticos son organismos vivos que, cuando se ingieren en cantidades adecuadas, pueden
                beneficiar la salud mental a través de la interacción con el eje intestino-cerebro.</p>
            </div>
          </section>
          <div className="image-container">
            <img src="imagenes/psicobioticos/lupa_2.png" alt="Ilustración de intestinos" className="illustration" />
          </div>
          <img src="iconos/icono_7.png" alt="Ícono flecha mano" className="icon-arrow-hand" />
        </div>
      </main>
      
      <div className="icons-grid">
        <div className="icon-box inicio" onClick={() => handleIconClick('/')}>
          <img src="iconos/icono_1.png" alt="Ícono de cerebro" className="icon" />
        </div>
        <div className="icon-box index" onClick={() => handleIconClick('/inicio')}>
          <img src="iconos/icono_2.png" alt="Ícono de alimentación" className="icon" />
        </div>
        <div className="icon-box neuro-nutricion" onClick={() => handleIconClick('/neuro-nutricion')}>
          <img src="iconos/icono_3.png" alt="Ícono de intestino" className="icon" />
        </div>
        <div className="icon-box test-emocional" onClick={() => handleIconClick('/test-emocional')}>
          <img src="iconos/icono_6.png" alt="Ícono de mano" className="icon" />
        </div>
        <div className="icon-box psicobioticos" onClick={() => handleIconClick('/psicobioticos')}>
          <img src="iconos/icono_4.png" alt="Ícono de agua" className="icon" />
        </div>
        <div className="icon-box contactanos" onClick={() => handleIconClick('/contactanos')}>
          <img src="iconos/icono_5.png" alt="Ícono de información" className="icon" />
        </div>
      </div>
    </>
  );
}

export default Psicobioticos;
