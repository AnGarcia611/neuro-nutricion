import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/neuro-nutricion.css';
import Aurora from './ui/Aurora';

function NeuroNutricion() {
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

    // Configurar cards interactivas
    const cards = document.querySelectorAll('.nn-card');
    let hoverTimeout;

    // Función para actualizar las clases de las tarjetas
    function updateCards() {
      let activeIndex = -1;
      cards.forEach((card, index) => {
        if (card.classList.contains('active')) {
          activeIndex = index;
        }
        card.classList.remove('adjacent');
      });

      if (activeIndex !== -1 && window.innerWidth > 768) {
        if (activeIndex > 0) {
          cards[activeIndex - 1].classList.add('adjacent');
        }
        if (activeIndex < cards.length - 1) {
          cards[activeIndex + 1].classList.add('adjacent');
        }
      }
    }

    // Establecer la tarjeta #3 como activa al inicio (índice 2)
    const mainCardIndex = 2;
    if (cards.length > mainCardIndex) {
      cards[mainCardIndex].classList.add('active');
      updateCards();
    }

    // Para dispositivos de escritorio, volver a la card principal cuando el mouse sale del contenedor
    const cardsContainer = document.querySelector('.cards-container');
    if (!('ontouchstart' in window) && cardsContainer) {
      cardsContainer.addEventListener('mouseleave', function () {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          cards.forEach(c => c.classList.remove('active'));
          if (cards.length > mainCardIndex) {
            cards[mainCardIndex].classList.add('active');
            updateCards();
          }
        }, 100);
      });
    }

    // Añadir manejadores de eventos para hover en las tarjetas
    cards.forEach(card => {
      if (!('ontouchstart' in window)) {
        card.addEventListener('mouseenter', function () {
          clearTimeout(hoverTimeout);
          cards.forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          updateCards();
        });
      } else {
        card.addEventListener('click', function () {
          cards.forEach(c => c.classList.remove('active'));
          this.classList.add('active');
          updateCards();
        });

        card.addEventListener('touchstart', function () {
          this.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', function () {
          setTimeout(() => {
            this.style.transform = '';
          }, 100);
        });
      }
    });

    updateCards();

    window.addEventListener('orientationchange', function () {
      setTimeout(updateCards, 100);
    });

    window.addEventListener('resize', updateCards);

    // Audio de fondo
    const savedAudioTime = parseFloat(localStorage.getItem('audioTime')) || 0;

    const handleLoadedMetadata = () => {
      if (savedAudioTime > 0 && savedAudioTime < pageAudio.duration) {
        pageAudio.currentTime = savedAudioTime;
      }
    };

    const handleTimeUpdate = () => {
      // Guardar solo si el audio está reproduciéndose
      if (!pageAudio.paused && !pageAudio.ended) {
        localStorage.setItem('audioTime', pageAudio.currentTime);
      }
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
      clearTimeout(hoverTimeout);
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
      {/* Agregar el audio de fondo */}
      <audio id="pageAudio" src="audio/principal.mp3" autoPlay></audio>

      {/* Icono de sonido */}
      <div
        className={`sound-toggle ${isMuted ? 'muted' : ''}`}
        onClick={toggleSound}
        title="Silenciar/Activar sonido"
      >
        <span className="icon-on">
          <img src="iconos/sonido_index_off.png" alt="Sonido activado" />
        </span>
        <span className="icon-off">
          <img src="iconos/sonido_index_on.png" alt="Sonido desactivado" />
        </span>
      </div>

      <main className="neuro-nutricion-container">
        <div style={{ width: "100%", height: 1000, borderRadius: 0, overflow: "hidden", margin: "auto", position: 'absolute' }}>
          <Aurora colorStops={["#96EFFF", "#FE0578", "#96EFFF"]} amplitude={1.2} blend={0.4} />
        </div>
        {/* <Aurora
          colorStops={["#4F2F88", "#FE0578", "#96EFFF"]}
          amplitud={5}
          blend={1}
          speed={2}
        /> */}


        <div className="header-section">{/* Content goes here */}
          <h1 className="titulo-principal animate-title">¿Qué es la Neuro nutrición?</h1>
          <p className="description animate-description">Alimenta tu mente desde el plato. La Neuronutrición estudia cómo
            lo que comes impacta tu salud mental y emocional.</p>
        </div>
        <div className="cards-container animate-cards">
          <div className="nn-card intestino-card">
            <img src="imagenes/imagen_1.png" alt="Microbiota intestinal" />
            <div className="card-info">
              <h3>El secreto del intestino</h3>
              <p>Un viaje al centro de tu microbiota.</p>
              <p>Este documental explora cómo los billones de microbios en tu intestino afectan tu salud mental,
                inmunidad y emociones.</p>
              <p>Documental recomendado</p>
              <div className="button-container">
                <a href="https://www.netflix.com/co/Title/81436688" target="_blank" rel="noopener noreferrer">
                  <button className="leer-mas-btn">VER</button>
                </a>
              </div>
            </div>
          </div>
          <div className="nn-card doctor-card">
            <img src="imagenes/imagen_2.png" alt="Doctor especialista" />
            <div className="card-info">
              <h3>Conexión intestino y cerebro</h3>
              <p>Claves ocultas detrás de la ansiedad y la depresión.</p>
              <p>Un experto revela cómo tu salud digestiva influye directamente en tu estado emocional. Entiende
                el rol del intestino en la producción de neurotransmisores clave.</p>
              <p>Video con experto</p>
              <div className="button-container">
                <a href="https://www.youtube.com/live/eYa66UwdsHM?themeRefresh=1" target="_blank"
                  rel="noopener noreferrer">
                  <button className="leer-mas-btn">VER VIDEO</button>
                </a>
              </div>
            </div>
          </div>
          <div className="nn-card main-card active">
            <img src="imagenes/imagen_3.png" alt="Cerebro como planta y alimentos saludables" />
            <div className="card-info">
              <h3>Nutrición y salud mental</h3>
              <p>Estrategias basadas en evidencia.</p>
              <p>Conoce cómo la alimentación puede influir en la ansiedad, depresión y otros trastornos mentales.
                Un enfoque desde la nutrición clínica.</p>
              <p>Artículos recomendados</p>
              <div className="button-container">
                <a href="https://cmnutriologos.com/2025/02/06/nutricion-y-salud-mental-intervenciones-basadas-en-evidencia/"
                  target="_blank" rel="noopener noreferrer">
                  <button className="leer-mas-btn">LEER MÁS</button>
                </a>
              </div>
            </div>
          </div>
          <div className="nn-card cerebro-libro-card">
            <img src="imagenes/imagen_4.png" alt="Cerebro y libro" />
            <div className="card-info">
              <h3>Alimenta tu cerebro</h3>
              <p>Infografía animada sobre alimentos y salud mental.</p>
              <p>Un recorrido visual y educativo que explica cómo ciertos alimentos mejoran la memoria, reducen el
                estrés y fortalecen la mente. Ideal para aprender de forma rápida y atractiva.</p>
              <p>Infografía en video</p>
              <div className="button-container">
                <a href="https://www.youtube.com/watch?v=uuUkYXMKABQ" target="_blank" rel="noopener noreferrer">
                  <button className="leer-mas-btn">VER VIDEO</button>
                </a>
              </div>
            </div>
          </div>
          <div className="nn-card comida-mala-card">
            <img src="imagenes/imagen_5.png" alt="Comida no saludable" />
            <div className="card-info">
              <h3>El Cerebro y la alimentación</h3>
              <p>¿Cómo influye tu dieta en tus emociones, decisiones y conducta?</p>
              <p>Aquí podrás ver cómo la dieta afecta la memoria, las emociones, la conducta y hasta la toma de
                decisiones.</p>
              <p>Documental recomendado</p>
              <div className="button-container">
                <a href="https://www.youtube.com/watch?v=4B8Q-v6L0hk" target="_blank" rel="noopener noreferrer">
                  <button className="leer-mas-btn">VER VIDEO</button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="icons-grid animate-icons-grid">
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
      </main>
    </>
  );
}

export default NeuroNutricion;
