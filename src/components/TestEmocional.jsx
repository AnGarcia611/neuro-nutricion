import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/test-emocional.css';
import FadeContent from './ui/FadeContent';

function TestEmocional() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [containerBg, setContainerBg] = useState('#AE1B8F');
  const [selectedState, setSelectedState] = useState('initial');

  const states = [
    {
      name: 'initial',
      backgroundColor: '#AE1B8F',
      subtitle: '¿Cómo te has sentido últimamente?',
      handImage: 'imagenes/mano.png',
      recommendation: ''
    },
    {
      name: 'stressed',
      backgroundColor: '#EC6F2D',
      subtitle: 'El estrés prolongado puede alterar el equilibrio de tu sistema nervioso y afectar tu bienestar general.',
      handImage: 'imagenes/estresado.png',
      recommendation: 'Incorpora alimentos como avena, banano, nueces o chocolate negro e infusiones naturales. Estos ayudan a regular la serotonina y promover una sensación de calma.'
    },
    {
      name: 'sad',
      backgroundColor: '#FA79B6',
      subtitle: 'La falta de motivación y energía puede estar vinculada a deficiencias de nutrientes clave en tu dieta.',
      handImage: 'imagenes/triste.png',
      recommendation: ' Añade alimentos ricos en omega-3, vitamina D y antioxidantes como pescado azul, huevo y frutas rojas. Favorecen la claridad mental y el equilibrio emocional.'
    },
    {
      name: 'happy',
      backgroundColor: '#2C9DFF',
      subtitle: '¡Estás en sintonía con tu cuerpo y tu mente! Una buena alimentación puede ayudarte a mantener ese estado.',
      handImage: 'imagenes/alegre.png',
      recommendation: 'Continúa con una dieta balanceada que incluya frutas, verduras frescas y suficiente agua. Tu energía es el reflejo de tus hábitos.'
    }
  ];

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

  useEffect(() => {
    // Cambia el fondo y otros efectos visuales al cambiar el estado
    const state = states.find(s => s.name === selectedState) || states[0];
    setContainerBg(state.backgroundColor);
  }, [selectedState]);

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

  const handleEmojiClick = (stateName) => {
    setSelectedState(stateName);
  };

  const handleReset = () => {
    setSelectedState('initial');
  };

  const state = states.find(s => s.name === selectedState) || states[0];

  return (
    <div className="test-emocional-container" style={{ minHeight: '100vh', minWidth: '100vw', background: containerBg, transition: 'background 0.5s' }}>
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

      {/* Imágenes de estados emocionales */}
      <div className="state-images">
        <img src="imagenes/fondo_estresado.png" alt="Estresado" className="state-image estresado hidden" />
        <img src="imagenes/fondo_triste.png" alt="Triste" className="state-image triste hidden" />
        <img src="imagenes/fondo_alegre.png" alt="Alegre" className="state-image alegre hidden" />
      </div>
      <img src="imagenes/fondo_1.svg" alt="Fondo 1" className="background-figure background-figure-1" />
      <img src="imagenes/fondo_2.svg" alt="Fondo 2" className="background-figure background-figure-2" />
      <div className="hand-pointer-container">
        <img
          src={state.handImage}
          alt={selectedState === 'initial' ? 'Mano apuntando' : `Estado ${selectedState}`}
          className="hand-pointer"
        />
      </div>
      <div className="test-emocional-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="test-container">
        <FadeContent blur duration={500} key={selectedState + '-title'}>
          <h1 className="test-title">TEST EMOCIONAL</h1>
        </FadeContent>
        <FadeContent blur duration={500} key={selectedState + '-subtitle1'}>
          {selectedState === 'initial' && <h2 className="test-subtitle">¿Cómo te has sentido últimamente?</h2>}
        </FadeContent>
        <FadeContent blur duration={500} key={selectedState + '-subtitle2'}>
          {selectedState === 'initial' && <h2 className="test-subtitle">Selecciona una opción</h2>}
        </FadeContent>
        <FadeContent blur duration={500} key={selectedState + '-subtitle3'}>
          {selectedState !== 'initial' && <h2 className="test-subtitle">{state.subtitle}</h2>}
        </FadeContent>
        <FadeContent blur duration={500} key={selectedState + '-recomendacion'}>
          <p className="parrafo-recomendacion">{state.recommendation}</p>
        </FadeContent>
        <button className="reset-button" style={{ display: selectedState === 'initial' ? 'none' : 'block' }} onClick={handleReset}>VOLVER</button>
        {selectedState === 'initial' && (
          <div className="emojis-row">
            <div className="emoji-option" onClick={() => handleEmojiClick('stressed')}>
              <div className="emoji-container">
                <img src="imagenes/estresado.png" alt="Estresado" />
              </div>
              <span className="emoji-label">ESTRESADO/A</span>
            </div>
            <div className="emoji-option" onClick={() => handleEmojiClick('sad')}>
              <div className="emoji-container">
                <img src="imagenes/triste.png" alt="Triste" />
              </div>
              <span className="emoji-label">TRISTE</span>
            </div>
            <div className="emoji-option" onClick={() => handleEmojiClick('happy')}>
              <div className="emoji-container">
                <img src="imagenes/alegre.png" alt="Alegre" />
              </div>
              <span className="emoji-label">ALEGRE</span>
            </div>
          </div>
        )}
      </div>

      {/* Íconos en la parte inferior */}
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
    </div>
  );
}

export default TestEmocional;
