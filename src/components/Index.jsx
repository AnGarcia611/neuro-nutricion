import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashCursor from './ui/SplashCursor';
import '../styles/index.css';

function Index() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Revisar si hay un valor diferente a cero en localStorage
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

    const saveAudioTimeAndRedirect = () => {
      if (introAudio) {
        localStorage.setItem('audioTime', introAudio.currentTime);
        introAudio.pause();
      }
      navigate('/inicio');
    };

    // Ocultar la introducción después de 5.5 segundos
    const timer = setTimeout(saveAudioTimeAndRedirect, 5500);

    return () => {
      clearTimeout(timer);
      if (introAudio) {
        introAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        introAudio.removeEventListener('timeupdate', handleTimeUpdate);
        introAudio.removeEventListener('ended', handleEnded);
      }
    };
  }, [navigate]);

  const toggleSound = () => {
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);
    const introAudio = document.getElementById('introAudio');
    if (introAudio) {
      introAudio.muted = newIsMuted;
    }
    localStorage.setItem('audioMuted', newIsMuted);
  };

  return (
    <>
      <SplashCursor />
      <div className="intro-overlay" id="introOverlay">
        {/* Icono de sonido con las nuevas imágenes */}
        <div
          className={`sound-toggle ${isMuted ? 'muted' : ''}`}
          onClick={toggleSound}
          title="Silenciar/Activar sonido"
        >
          {/* Icono ON (invertido) */}
          <span className="icon-on">
            <img src="iconos/sonido_index_off.png" alt="Sonido activado" />
          </span>
          {/* Icono OFF (invertido) */}
          <span className="icon-off">
            <img src="iconos/sonido_index_on.png" alt="Sonido desactivado" />
          </span>
        </div>
        <img src="video/bienvenida.gif" alt="Bienvenida" className="intro-gif" />
        {/* Audio de bienvenida */}
        <audio id="introAudio" src="audio/principal.mp3" autoPlay></audio>
      </div>
    </>
  );
}

export default Index;
