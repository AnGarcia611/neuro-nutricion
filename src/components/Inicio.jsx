import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/inicio.css';
import Orb from './ui/Orb';

function Inicio() {
  const [isMuted, setIsMuted] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const savedAudioTime = parseFloat(localStorage.getItem('audioTime')) || 0;
    const introAudio = document.getElementById('introAudio');

    // Estado inicial del mute
    const audioMuted = localStorage.getItem('audioMuted') === 'true';
    setIsMuted(audioMuted);
    if (introAudio) {
      introAudio.muted = audioMuted;
    }

    const handleLoadedMetadata = () => {
      if (savedAudioTime > 0 && savedAudioTime < introAudio.duration) {
        introAudio.currentTime = savedAudioTime;
      }
    };

    const handleTimeUpdate = () => {
      localStorage.setItem('audioTime', introAudio.currentTime);
    };

    const handleEnded = () => {
      introAudio.currentTime = 0;
      introAudio.play();
    };

    if (introAudio) {
      introAudio.addEventListener('loadedmetadata', handleLoadedMetadata);
      introAudio.addEventListener('timeupdate', handleTimeUpdate);
      introAudio.addEventListener('ended', handleEnded);
    }

    return () => {
      if (introAudio) {
        introAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        introAudio.removeEventListener('timeupdate', handleTimeUpdate);
        introAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);

  const toggleSound = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    const introAudio = document.getElementById('introAudio');
    if (introAudio) {
      introAudio.muted = newIsMuted;
    }
    localStorage.setItem('audioMuted', newIsMuted);
  };

  const handleOrbClick = () => {
    if (showInfoCard) {
      // Si está visible, iniciamos animación de cierre
      setIsClosing(true);
      setTimeout(() => {
        setShowInfoCard(false);
        setIsClosing(false);
      }, 500); // Duración de la animación contractToOrb
    } else {
      // Si está oculta, la mostramos
      setShowInfoCard(true);
    }
  };

  return (
    <>
      {/* Video de fondo */}
      <video autoPlay muted loop id="background-video">
        <source src="video/Neuronas_video.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Icono de regreso al inicio */}
      <Link to="/" className="corner-icon">
        <img src="iconos/icono_1_blanco.png" alt="Volver al inicio" />
      </Link>

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

      {/* Audio de bienvenida */}
      <audio id="introAudio" src="audio/principal.mp3" autoPlay></audio>

      {/* Orb component in the center - solo visible cuando info-card está oculta */}
      {!showInfoCard && (
        <div className="orb-center" onClick={handleOrbClick}>
          <Orb 
            hue={280} 
            hoverIntensity={0.3} 
            rotateOnHover={true} 
            forceHoverState={false} 
          />
          <div className="orb-text">
            Click aquí
          </div>
        </div>
      )}

      {/* Tarjeta de información */}
      {showInfoCard && (
        <div className={`info-card ${isClosing ? 'closing' : ''}`}>
          <h1>NEURO NUTRICIÓN</h1>
          <h2>Tu mente también se alimenta</h2>
          <p>La forma en que te alimentas puede cambiar cómo te sientes, piensas y actúas. Tu estado emocional, tu energía
            diaria e incluso tu claridad mental están profundamente conectados con lo que pones en tu plato.</p>
          <p>¿Sabías que ciertos alimentos estimulan neurotransmisores como la serotonina o la dopamina?</p>
          <p>¿O que el estrés y la ansiedad pueden mejorar con pequeños cambios nutricionales?</p>
          <p>La neuronutrición te invita a redescubrir el equilibrio desde adentro.</p>
          <hr className="divider" />
          <Link to="/neuro-nutricion" className="comenzar-btn">COMENZAR</Link>
          <div className="card-footer">
            <p>Alimentar tu mente es el primer paso para sentirte mejor.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Inicio;
