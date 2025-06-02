import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/psicobioticos.css';
import SplashCursor from './ui/SplashCursor';
import Stack from './ui/Stack';

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

  // Declarar el array de imágenes fuera del JSX
  const images = [
    { id: 1, img: 'imagenes/psicobioticos/lupa_2.png' },
    { id: 2, img: 'imagenes/psicobioticos/cerebro.png' },
    { id: 3, img: 'imagenes/psicobioticos/lupa.png' },
    { id: 4, img: 'imagenes/psicobioticos/mujer.png' },
    { id: 5, img: 'imagenes/psicobioticos/organismos.png' }
  ];

  return (
    <>
      <SplashCursor />
      {/* Audio de fondo */}
      <audio id="pageAudio" src="audio/principal.mp3" autoPlay></audio>

      {/* Icono de sonido */}
      <div
        className={`sound-toggle ${isMuted ? 'muted' : ''}`}
        onClick={toggleSound}
        title="Silenciar/Activar sonido"
      >
        <span className="icon-on">
          <img src="iconos/sound_off.svg" alt="Sonido activado" />
        </span>
        <span className="icon-off">
          <img src="iconos/sound_on.svg" alt="Sonido desactivado" />
        </span>
      </div>

      <main className="content-section">
        <div className="content-container">
          <section className="info-section">
            <h1>
              Descubre cómo actúan<br />
              los psicobióticos
            </h1>
            <p>Los psicobióticos son organismos vivos que, cuando se ingieren en cantidades adecuadas, pueden
              beneficiar la salud mental a través de la interacción con el eje intestino-cerebro.</p>
          </section>

          <Stack
            randomRotation={true}
            sensitivity={180}
            cardDimensions={{ width: 300, height: 600 }}
            animationConfig={{ stiffness: 100, damping: 20 }}
            sendToBackOnClick={true}
            cardsData={images}
          />
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
